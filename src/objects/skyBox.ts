
import { GetMaterial } from "../GetMaterial";
import * as THREE from "three";
export function getSkyBox() {
    var skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    var skyBoxMaterial = GetMaterial({ color: 0x9999ff, side: THREE.BackSide, fog: true });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    return skyBox;
}
