
import * as THREE from "three";
export function getAmbientLight() {
    var ambientLight = new THREE.AmbientLight(0xdddddd, 0.05);
    return ambientLight;
};