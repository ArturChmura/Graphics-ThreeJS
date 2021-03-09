
import { GetMaterial } from "../GetMaterial";
import * as THREE from "three";
import { Group, Material, MeshPhongMaterial, PointLightHelper, Scene, Texture, Vector3 } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { onError, onProgress } from "../loaderFunctions";

export function AddPointLight(scene: Scene) {
    const lightColor = 0x00ff00;
    const position = new Vector3(500, 500, 30)
    var light = new THREE.PointLight(lightColor, 1, 1000, 2);
    light.position.set(position.x, position.y, position.z);
    scene.add(light);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath('models/lamp/textures/');
    const material = GetMaterial({
        map: textureLoader.load("lantern_Base_Color.jpg"),
        metalnessMap: textureLoader.load("lantern_Metallic.jpg"),
        aoMap: textureLoader.load("lantern_Mixed_AO.jpg"),
        normalMap: textureLoader.load("lantern_Normal_OpenGL.jpg"),
        alphaMap: textureLoader.load("lantern_Opacity.jpg"),
        roughnessMap: textureLoader.load("lantern_Roughness.jpg"),
        emissive: lightColor,
        emissiveIntensity: 0.2,
    });

    // model




    const objLoader = new OBJLoader();
    objLoader.setPath("models/lamp/");
    objLoader.load('lantern_obj.obj', function (object) {
        object.position.set(position.x, position.y, position.z);
        object.scale.set(0.5, 0.5, 0.5);
        object.rotateX(Math.PI / 2);
        object.castShadow = true;
        object.receiveShadow = true;
        object.castShadow = true;
        object.traverse(function (child) {
            (<THREE.Mesh>child).material = material;
        });


        scene.add(object);
    }, onProgress, onError);

    let pointLightHelper: PointLightHelper;
    pointLightHelper = new PointLightHelper(light);
    scene.add(pointLightHelper);
};