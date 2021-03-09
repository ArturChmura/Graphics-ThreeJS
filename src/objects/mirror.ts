import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { GetMaterial } from "../GetMaterial";

export function addMirror(scene: THREE.Scene) {
    const mirrorSize = new Vector2(500, 500);
    const mirrorPosition = new Vector3(0, 500, 250);
    let mirrorGeometry = new THREE.PlaneBufferGeometry(mirrorSize.x, mirrorSize.y);
    const mirrorBack1: Reflector = new Reflector(mirrorGeometry, {
        color: new THREE.Color(0x7F7F7F),
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
    });
    mirrorBack1.rotateX(Math.PI / 2);
    mirrorBack1.position.set(mirrorPosition.x, mirrorPosition.y, mirrorPosition.z);
    scene.add(mirrorBack1);

    const frameThiccness = 5;

    const material = GetMaterial({ color: 0xffff00, side: THREE.DoubleSide })

    const geometry1 = new THREE.PlaneGeometry(mirrorSize.x + 2 * frameThiccness, frameThiccness);
    const upFrame = new THREE.Mesh(geometry1, material);
    upFrame.rotateX(Math.PI / 2);
    upFrame.position.set(mirrorPosition.x, mirrorPosition.y, mirrorPosition.z + mirrorSize.y / 2 + frameThiccness / 2);

    const geometry2 = new THREE.PlaneGeometry(frameThiccness, mirrorSize.y + 2 * frameThiccness);
    const leftFrame = new THREE.Mesh(geometry2, material);
    leftFrame.rotateX(Math.PI / 2);
    leftFrame.position.set(mirrorPosition.x - mirrorSize.x / 2 - frameThiccness / 2, mirrorPosition.y, mirrorPosition.z);

    const geometry3 = new THREE.PlaneGeometry(frameThiccness, mirrorSize.y + 2 * frameThiccness);
    const rightFrame = new THREE.Mesh(geometry3, material);
    rightFrame.rotateX(Math.PI / 2);
    rightFrame.position.set(mirrorPosition.x + mirrorSize.x / 2 + frameThiccness / 2, mirrorPosition.y, mirrorPosition.z);


    const geometry4 = new THREE.PlaneGeometry(mirrorSize.x + 2 * frameThiccness, frameThiccness);
    const downFrame = new THREE.Mesh(geometry4, material);
    downFrame.rotateX(Math.PI / 2);
    downFrame.position.set(mirrorPosition.x, mirrorPosition.y, mirrorPosition.z - mirrorSize.y / 2 - frameThiccness / 2);

    scene.add(upFrame, leftFrame, rightFrame, downFrame);
}