
import { GetMaterial } from "../GetMaterial";
import * as THREE from "three";
export function getSphere() {

    var sphereGeometry = new THREE.SphereGeometry(50, 32, 16);
    var sphereMaterial = GetMaterial({ color: 0xffffff });


    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.set(200, 150, 50);
    sphere.receiveShadow = true;
    return sphere;
}
