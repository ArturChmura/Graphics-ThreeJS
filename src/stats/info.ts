import { GetMaterialName } from "../GetMaterial";

export function GetClock() {

    let timeText = document.createElement('div');
    timeText.style.zIndex = '1';
    timeText.style.width = '200px';
    timeText.style.height = '50px';
    timeText.style.backgroundColor = "transparent";
    timeText.style.fontSize = "30px";
    timeText.style.top = 0 + 'px';
    timeText.style.left = 0 + 'px';
    return timeText;
}


export function GetmaterialDiv() {

    let materialDiv = document.createElement('div');
    materialDiv.innerHTML = GetMaterialName();
    return materialDiv;
}


export function GetInfo(clock: HTMLElement, material: HTMLElement) {

    let parentDiv = document.createElement('div');
    parentDiv.style.position = 'absolute';
    parentDiv.style.zIndex = '1';
    parentDiv.style.width = '250px';
    parentDiv.style.height = '300px';
    parentDiv.style.backgroundColor = "blue";
    parentDiv.style.fontSize = "30px";
    parentDiv.innerHTML = "Time: ";
    parentDiv.style.top = 0 + 'px';
    parentDiv.style.left = 0 + 'px';
    parentDiv.appendChild(clock);

    const infoText = document.createElement('div');
    infoText.style.fontSize = "20px";
    infoText.innerHTML =
        `Controls:<br>
    Movement - WASD<br>
    SpotLight - IJKL<br>
    Change Material - Q<br>
    Change Camera - 1,2,3<br>
    <br>
    Material:
    `
    parentDiv.appendChild(infoText);
    infoText.appendChild(material);

    return parentDiv;
}