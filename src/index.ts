
import { AddMiles } from "./objects/miles";
import * as THREE from "three";
import { AnimationMixer, Color, DirectionalLightHelper, Group, Mesh, Object3D, PointLight, PointLightHelper, SpotLight, SpotLightHelper, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getBackCamera } from "./cameras/getBackCamera";
import { getFollowingCamera } from "./cameras/getFollowingCamera";
import { mainCamera as getMainCamera } from "./cameras/mainCamera";
import { HandleWASD } from "./controls/objectKeyboardInput";
import { showTime } from "./effects/clock";
import { DayNight } from "./effects/dayNight";
import { ChangeMaterial, GetMaterial, GetMaterialName } from "./GetMaterial";
import { getAmbientLight } from "./lights/ambientLight";
import { AddPointLight } from "./lights/pointLight";
import { getSubLight as getSunLight } from "./lights/sunLight";
import { getFloor } from "./objects/floor";
import { addMirror } from "./objects/mirror";
import { getSkyBox } from "./objects/skyBox";
import { getSphere } from "./objects/sphere";
import { getSunSphere } from "./objects/sunSphere";
import { GetClock, GetInfo, GetmaterialDiv } from "./stats/info";
import { getStats } from "./stats/stats";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";


//////////	
// MAIN //
//////////

// standard global variables
var container: HTMLElement | null;

var scene: THREE.Scene

var camera: THREE.PerspectiveCamera;
var mainCamera: THREE.PerspectiveCamera;
var backCamera: THREE.PerspectiveCamera;
var followingCamera: THREE.PerspectiveCamera;

var renderer: THREE.WebGLRenderer
var controls: any;
var stats: Stats;

declare const THREEx: any;
var clock = new THREE.Clock();

var sphere: THREE.Mesh;
let sunSphere: THREE.Mesh

let time: Date = new Date(2020, 11, 17, 10, 0, 0);
const timeMultiplier = 60 * 60 * 3;

var infoText: HTMLElement;
var materialText: HTMLElement;
var timeText: HTMLElement;

let sunLight: THREE.DirectionalLight;
let spotLight: SpotLight;

let sunHelper: DirectionalLightHelper;
let spotLightHelper: SpotLightHelper;

const mixers: AnimationMixer[] = [];
let flaming: Object3D;
let flamingGroup: Group;

init();
animate();



function init() {
    THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
    ///////////
    // SCENE //
    ///////////

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.0005);
    setupKeyControls();

    ////////////
    // CAMERA //
    ////////////
    mainCamera = getMainCamera();
    mainCamera.lookAt(scene.position);
    backCamera = getBackCamera();
    followingCamera = getFollowingCamera();
    camera = mainCamera;

    //////////////
    // RENDERER //
    //////////////
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    container = document.getElementById('ThreeJS');
    container?.appendChild(renderer.domElement);

    ////////////
    // EVENTS //
    ////////////
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });

    //////////////
    // CONTROLS //
    //////////////
    controls = new OrbitControls(mainCamera, renderer.domElement);

    ///////////
    // STATS //
    ///////////
    stats = getStats();
    container?.appendChild(stats.domElement);

    timeText = GetClock();
    materialText = GetmaterialDiv();
    infoText = GetInfo(timeText, materialText);
    document.body.appendChild(infoText);

    LoadSceneObjects();
}

function LoadSceneObjects() {
    ///////////
    // LIGHT //
    ///////////

    sunLight = getSunLight()
    scene.add(sunLight);

    AddPointLight(scene);

    scene.add(getAmbientLight());



    sunHelper = new DirectionalLightHelper(sunLight);
    scene.add(sunHelper);

    scene.add(getFloor());

    scene.add(getSkyBox());

    sphere = getSphere();
    scene.add(sphere);


    sunSphere = getSunSphere();
    scene.add(sunSphere);

    //scene.add(new THREE.AxesHelper(1000));

    flamingGroup = new Group();

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath('models/xStarFighter/');


    const material = GetMaterial(
        {
            map: textureLoader.load("Texture.png"),
        }
    )

    const loader = new FBXLoader();
    loader.load('models/xStarFighter/xStarFighter.fbx', (fbx) => {
        flaming = fbx;

        const s = 0.1;
        flaming.scale.set(s, s, s);
        flaming.rotateZ(Math.PI);
        flaming.rotateX(Math.PI / 2);

        flaming.updateMatrix();
        flaming.traverse(object => {
            const mesh = object as Mesh;
            if (mesh.isMesh) {
                mesh.material = material;
            }
        })

        flaming.castShadow = true;
        flaming.receiveShadow = true;
        flamingGroup.add(flaming);
        // const mixer = new THREE.AnimationMixer(flaming);
        // mixer.clipAction(gltf.animations[0]).setDuration(1).play();
        // mixers.push(mixer);


    })
    spotLight = new SpotLight(0xffffff, 1, 800, 30 / 180 * Math.PI, 5 / 180 * Math.PI);
    spotLight.position.set(flamingGroup.position.x, flamingGroup.position.y + 73, flamingGroup.position.z + 7,)
    spotLight.target.position.set(spotLight.position.x, spotLight.position.y + 100, spotLight.position.z);
    spotLightHelper = new SpotLightHelper(spotLight);
    spotLight.castShadow = true;
    spotLight.shadow.camera.fov = 70;


    flamingGroup.add(spotLight);
    flamingGroup.add(spotLight.target);


    flamingGroup.position.set(0, 0, 50);
    scene.add(flamingGroup, spotLightHelper);

    AddMiles(scene);


    addMirror(scene);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    var delta = clock.getDelta();

    for (let i = 0; i < mixers.length; i++) {

        mixers[i].update(delta);

    }

    HandleWASD(flamingGroup, backCamera, followingCamera, spotLight, delta);

    stats.update();
    time.setSeconds(time.getSeconds() + delta * timeMultiplier);
    DayNight(sunLight, sunSphere, time);
    showTime(timeText, time);

    controls.update();

    spotLightHelper.update();
    sunHelper.update();
}


function render() {
    renderer.render(scene, camera);
}



function setupKeyControls() {
    document.onkeydown = function (e) {
        switch (e.key) {
            case 'q':
                ChangeMaterial();
                scene.clear();
                materialText.innerHTML = GetMaterialName();
                LoadSceneObjects();
                break;
            case '1':
                camera = mainCamera;
                break;
            case '2':
                camera = backCamera;
                break;
            case '3':
                camera = followingCamera;
                break;
        }
    };
}