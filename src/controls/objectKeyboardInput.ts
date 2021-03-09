
import * as THREE from "three";
import { DirectionalLight, Object3D, RGBA_ASTC_10x10_Format, SpotLight, Vector2, Vector3 } from "three";


declare const THREEx: any;
var keyboard = new THREEx.KeyboardState();
const speedPerSec = 300;
const rotationPerSec = Math.PI / 2;



export function HandleWASD(flaming: THREE.Object3D, backCamera: THREE.PerspectiveCamera, followingCamera: THREE.PerspectiveCamera, spotLight: SpotLight, delta: number) {

    const zAsix = new THREE.Vector3(0, 0, 1);


    let lightDirection = SubtractVectors(spotLight.target.position, spotLight.position);
    if (keyboard.pressed("a")) {
        flaming.rotateZ(delta * rotationPerSec);
    }
    if (keyboard.pressed("d")) {
        flaming.rotateZ(- delta * rotationPerSec);
    }
    if (keyboard.pressed("j")) {
        lightDirection.applyAxisAngle(zAsix, delta * rotationPerSec);
    }
    if (keyboard.pressed("l")) {
        lightDirection.applyAxisAngle(zAsix, -delta * rotationPerSec);
    }

    let pertendicular = new Vector3(-lightDirection.y, lightDirection.x, 0).normalize();
    if (keyboard.pressed("i")) {
        lightDirection.applyAxisAngle(pertendicular, -delta * rotationPerSec);
    }
    if (keyboard.pressed("k")) {
        lightDirection.applyAxisAngle(pertendicular, delta * rotationPerSec);
    }

    var forward = new THREE.Vector3(0, 1, 0);
    ChangeVectorLength(forward, speedPerSec * delta);
    let zRotation = flaming.rotation.z;
    forward.applyAxisAngle(zAsix, zRotation);
    if (keyboard.pressed("w")) {
        flaming.position.add(forward);
    }
    if (keyboard.pressed("s")) {
        flaming.position.sub(forward);
    }

    const newSpotlightTargetPosition = AddVectors(spotLight.position, lightDirection);
    spotLight.target.position.set(newSpotlightTargetPosition.x, newSpotlightTargetPosition.y, newSpotlightTargetPosition.z);

    const backward = forward.clone().negate();
    ChangeVectorLength(backward, 500);

    backCamera.position.set(flaming.position.x + backward.x, flaming.position.y + backward.y, 200);

    backCamera.lookAt(flaming.position);
    followingCamera.lookAt(flaming.position);

}

function ChangeVectorLength(vector: THREE.Vector3, newLength: number) {
    const oldLength = vector.length();
    if (oldLength !== 0) {
        vector.multiplyScalar((newLength / oldLength));
    }
}

function AddVectors(v: Vector3, w: Vector3) {
    return new Vector3(v.x + w.x, v.y + w.y, v.z + w.z);
}

function SubtractVectors(v: Vector3, w: Vector3) {
    return new Vector3(v.x - w.x, v.y - w.y, v.z - w.z);
}