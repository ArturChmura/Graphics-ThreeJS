export function vertexShader() {
  return `
  varying vec3 normalInterp;
  varying vec3 vertPos;
  varying vec2 vUv;
  uniform vec2 repeat;
  
  void main()
  {
      vUv =  uv*repeat;
      vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);
      vertPos = vec3(vertPos4) / vertPos4.w;
      gl_Position = projectionMatrix * vertPos4;
      normalInterp = normalMatrix * normal;
  }
`
}