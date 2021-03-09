
import * as THREE from "three";
import { GetMaterial } from "../GetMaterial";
export function getSunSphere() {
    var sphereGeometry = new THREE.SphereGeometry(50, 32, 16);
    var sphereMaterial = GetMaterial({ color: 0xFCD440, emissive: 0xFCD440 });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    return sphere;
}
