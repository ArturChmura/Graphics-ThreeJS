
import * as THREE from "three";
export function getSubLight() {
    var directionalLight = new THREE.DirectionalLight(0xff1111, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 10;
    directionalLight.shadow.camera.far = 2000;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    const d = 1000;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;
    return directionalLight;
};