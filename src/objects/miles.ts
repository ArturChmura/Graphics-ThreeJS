import * as THREE from "three";
import { IUniform, MeshStandardMaterial, Scene, Vector3 } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GetMaterial } from "../GetMaterial";
import { onError, onProgress } from "../loaderFunctions";

export function AddMiles(scene: Scene) {

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath('models/Miles/');


    const material = GetMaterial(
        {
            normalMap: textureLoader.load('Normals.png'),
            alphaMap: textureLoader.load("Opacity.png"),
            map: textureLoader.load("Base colour.png"),
            aoMap: textureLoader.load("AO.png"),
            side: THREE.DoubleSide,
            roughnessMap: textureLoader.load("Roughness.png"),
            metalnessMap: textureLoader.load("Metallic.png"),
        }
    )

    const objLoader = new OBJLoader();
    objLoader.setPath("models/Miles/");
    objLoader.load('Pose 1.obj', function (object) {

        object.scale.set(30, 30, 30);
        object.rotateX(Math.PI / 2);
        object.castShadow = true;
        object.receiveShadow = true;

        object.position.set(0, 200, 0);
        var box = new THREE.Box3().setFromObject(object);
        object.position.setZ(object.position.z - box.min.z);

        object.traverse(function (child) {

            (<THREE.Mesh>child).material = material;

        });


        scene.add(object);
    }, onProgress, onError);
}