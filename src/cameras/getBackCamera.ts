
import * as THREE from "three";
export function getBackCamera() {
    var SCREEN_WIDTH = window.innerWidth
    var SCREEN_HEIGHT = window.innerHeight;

    // camera attributes
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT
    var NEAR = 0.1, FAR = 20000;

    // set up camera
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    return camera;

}