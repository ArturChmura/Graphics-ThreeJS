

export function fragmentShader() {

  return `
  #define PI 3.1415926538
  struct DirectionalLight
  {
    vec3 direction;
    vec3 color;
  };
  
  struct PointLight
  {
    vec3 color;
    vec3 position;
    float distance;
  };
  struct SpotLight
  {
    vec3 color;
    vec3 position;
    vec3 direction;
    float distance;
    float coneCos;
    float penumbraCos;
    float decay;
  };
  
  uniform SpotLight spotLights[NUM_SPOT_LIGHTS];
  uniform PointLight pointLights[NUM_POINT_LIGHTS];
  uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];
  
  varying vec3 normalInterp;
  varying vec3 vertPos;
  
  float Ka = 0.1; // Ambient reflection coefficient
  float Kd = 1.0; // Diffuse reflection coefficient
  float Ks = 0.6; // Specular reflection coefficient
  
  uniform float shininessVal; // Shininess
  
  uniform sampler2D map;
  varying vec2 vUv;
  uniform vec3 meshColor;
  
  uniform vec3 ambientLightColor;
  
  uniform float fogDensity;
  uniform vec3 fogColor;

  vec3 getAdd(vec3 L, vec3 N, float lambertian, vec3 color)
  {
    vec3 R = reflect(-L, N);      // Reflected light vector
    vec3 V = normalize(-vertPos); // Vector to viewer
    // Compute the specular term
    float specAngle = max(dot(R, V), 0.0);
    float specular = pow(specAngle, shininessVal);
    vec3 add = Kd * lambertian * color +
    Ks * specular * color;
    return add;
  }

  void main()
  {
    vec3 N = normalize(normalInterp);
    vec3 color = vec3(Ka * ambientLightColor);
  
    for (int i = 0; i < NUM_DIR_LIGHTS; ++i)
    {
      vec3 L = normalize(directionalLights[i].direction);
  
      // Lambert's cosine law
      float lambertian = max(dot(N, L), 0.0);
      if (lambertian > 0.0)
      {
        vec3 add = getAdd(L,N,lambertian,directionalLights[i].color);
        color = color + add;
      }
 
    }

  
    for (int i = 0; i < NUM_POINT_LIGHTS; ++i)
    {
      vec3 L = normalize(pointLights[i].position - vertPos);
  
      // Lambert's cosine law
      float lambertian = max(dot(N, L), 0.0);
      if (lambertian > 0.0)
      {
        vec3 add = getAdd(L,N,lambertian,pointLights[i].color);
        float distance = distance(pointLights[i].position,vertPos );
        add *= max(0.0, 1.0 - (distance)/pointLights[i].distance);
        color = color + add;
      }
    
    }
  
    for (int i = 0; i < NUM_SPOT_LIGHTS; ++i)
    {
      vec3 L = normalize(spotLights[i].position - vertPos);
      float angleCos = dot(spotLights[i].direction, L);
      float coneCos = spotLights[i].coneCos;

      if (angleCos > coneCos)
      {
        float lambertian = max(dot(N, L), 0.0);
        if (lambertian > 0.0)
        {
          vec3 add = getAdd(L,N,lambertian,spotLights[i].color);
          if(angleCos < spotLights[i].penumbraCos)
          {
            add = add * (angleCos - coneCos)/(spotLights[i].penumbraCos - coneCos);
          }
    
          float distance = distance(spotLights[i].position,vertPos );
          add *= max(0.0, 1.0 - (distance)/spotLights[i].distance);
          color = color + add;
        }
      
      }

   
    }
  
    if (meshColor.x != -1.0)
    {
      gl_FragColor = vec4(color, 1.0) * vec4(meshColor, 1.0);
    }
    else
    {
      vec4 mapTexel = texture2D(map, vUv) * vec4(color, 1.0);
      gl_FragColor = mapTexel;
     
    }
    float distance = length(vertPos);
    float fogMulti = 1.0/exp(distance*fogDensity*distance*fogDensity);
    gl_FragColor =  gl_FragColor + vec4(fogColor,1.0)*(1.0-fogMulti);
  }
  `

}


