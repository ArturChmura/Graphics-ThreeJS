import { Color, Material, MeshLambertMaterial, MeshLambertMaterialParameters, MeshPhongMaterialParameters, MeshStandardMaterial, MeshStandardMaterialParameters, RepeatWrapping, ShaderMaterial, UniformsLib, UniformsUtils, Vector2 } from "three";
import { fragmentShader } from "./shaders/fragmentShaders/fragmentShader";
import { vertexShader } from "./shaders/fragmentShaders/vertexShader";

let materialNumber: number = 0;

interface MaterialParameter extends MeshPhongMaterialParameters, MeshLambertMaterialParameters, MeshStandardMaterialParameters { }

export function GetMaterial(parameters?: MaterialParameter | undefined): Material {

    switch (materialNumber) {
        case 0:
            const uniforms = UniformsUtils.merge([

                UniformsLib.lights,
                UniformsLib.fog,


            ]);
            uniforms.shininessVal = { value: parameters?.shininess ? parameters?.shininess : 30, }
            uniforms.map = { value: parameters?.map }
            if (uniforms.map.value) uniforms.map.value.wrapS = RepeatWrapping;
            if (parameters?.map) {
                uniforms.meshColor = { value: new Color(-1.0, -1.0, -1.0) }
            }
            else {
                uniforms.meshColor = { value: new Color(parameters?.color) }
            }
            uniforms.repeat = { value: parameters?.map?.repeat ? parameters.map.repeat : new Vector2(1.0), };

            (parameters as any).type = "ShaderMaterial";
            return new ShaderMaterial({
                ...parameters,
                fragmentShader: fragmentShader(),
                vertexShader: vertexShader(),
                lights: true,
                uniforms: uniforms,
                fog: true,
            })
        case 1:

            (parameters as any).type = "MeshLambertMaterial";
            return new MeshLambertMaterial(parameters);
        case 2:
            return new MeshStandardMaterial(parameters);

        default:
            return new Material();
    }
}

export function ChangeMaterial() {
    materialNumber = (materialNumber + 1) % 3
}

export function GetMaterialName(): string {
    switch (materialNumber) {
        case 0:
            return "Shader Phong Material"
        case 1:
            return "Lambert Material (Gouraud shading)"
        case 2:
            return "Standard Material"

        default:
            return "";
    }
}