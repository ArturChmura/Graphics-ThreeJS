import * as THREE from "three";
import { Color, MeshStandardMaterial } from "three";
export function DayNight(lightSource: THREE.Light, sunSphere: THREE.Mesh, time: Date) {
    const seconds = time.getHours() * 60 * 60 + time.getMinutes() * 60 + time.getSeconds();
    const secInDay = 24 * 60 * 60;
    const colorValue = 1 - Math.abs(secInDay / 2 - seconds) / (secInDay / 2);
    const lightCOlor = new THREE.Color(1, colorValue, colorValue);
    lightSource.color.set(lightCOlor);
    sunSphere.traverse((o) => {
        const child = o as THREE.Mesh;
        if (child.isMesh) {
            (child.material as MeshStandardMaterial).emissive = new THREE.Color(lightCOlor);
        }

    });


    let sunVector = new THREE.Vector3(0, 0, -1000);
    sunVector.applyAxisAngle(new THREE.Vector3(1, 0, 0), 2 * Math.PI * (seconds / secInDay));
    lightSource.position.set(sunVector.x, sunVector.y, sunVector.z);

    sunSphere.position.set(sunVector.x, sunVector.y, sunVector.z);
    lightSource.intensity = Math.max(1 - Math.abs(secInDay / 2 - seconds) / (secInDay / 4), 0);
}
