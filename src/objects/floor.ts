
import * as THREE from "three";
import { GetMaterial } from "../GetMaterial";
export function getFloor() {

    var floorTexture = new THREE.TextureLoader().load('images/lava.jpg');
    floorTexture.wrapS = THREE.MirroredRepeatWrapping;
    floorTexture.wrapT = THREE.MirroredRepeatWrapping;
    floorTexture.repeat.set(200, 200);
    var floorMaterial = GetMaterial({ map: floorTexture });
    var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;

    return floor;
}
