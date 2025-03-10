

import { resizeRendererToDisplaySize, setupPostProcessing } from '~~/assets/js/Three/HelperFunctions.js';
import * as THREE from 'three';
import { OrbitControls } from '~~/assets/js/Three/OrbitControls';
import { MathUtils } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DepthOfFieldEffect } from 'postprocessing';
import { ToneMappingEffect } from 'postprocessing';
// import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'; 


let cardtemplate_path = "/ghost/cardtemplate3.png";
let cardtemplateback_path = "/ghost/cardtemplateback4.png";
let flower_path = "/ghost/flower3.png";
let noise2_path = "/ghost/noise2.png";
let color11_path = "/ghost/color11.png";
let backtexture_path = "/ghost/color3.webp";
let skullmodel = "/astro/astro.glb";
let voronoi_path = "/ghost/rgbnoise2.png";

let scene,
	sceneRTT,
	camera,
	cameraRTT,
	renderer,
	canvas,
	width = 0,
	height = 0,
	canvas_width = 0,
	canvas_height = 0,
	frontmaterial,
	backmaterial,
	controls,
	bloomPass,
	composer,
	frontcard,
	backcard;
let options = {
	exposure: 2.8,
	bloomStrength: 0.8,
	bloomThreshold: 0.1,
	bloomRadius: 0.9,
	color0: [197, 81, 245],
	color1: [65, 0, 170],
	color2: [0, 150, 255],
	isanimate: false
};


const vert = `
  varying vec2 vUv;
  varying vec3 camPos;
  varying vec3 eyeVector;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    camPos = cameraPosition;
    vNormal = normal;
    vec4 worldPosition = modelViewMatrix * vec4( position, 1.0);
    eyeVector = normalize(worldPosition.xyz - abs(cameraPosition));
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const fragPlane = `
	varying vec2 vUv;
  uniform sampler2D skullrender;
  uniform sampler2D cardtemplate;
  uniform sampler2D backtexture;
  uniform sampler2D noiseTex;
  uniform sampler2D color;
  uniform sampler2D noise;
  uniform vec4 resolution;
  varying vec3 camPos;
  varying vec3 eyeVector;
  varying vec3 vNormal;

  float Fresnel(vec3 eyeVector, vec3 worldNormal) {
    return pow( 1.0 + dot( eyeVector, worldNormal), 1.80 );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy/resolution.xy ;
    vec4 temptex = texture2D( cardtemplate, vUv);
    vec4 skulltex = texture2D( skullrender, uv - 0.5 );
    gl_FragColor = temptex;
    float f = Fresnel(eyeVector, vNormal);
    vec4 noisetex = texture2D( noise, mod(vUv*2.,1.));
    if(gl_FragColor.g >= .5 && gl_FragColor.r < 0.6){
      gl_FragColor = f + skulltex;
      gl_FragColor += noisetex/5.;

    } else {
      vec4 bactex = texture2D( backtexture, vUv);
      float tone = pow(dot(normalize(camPos), normalize(bactex.rgb)), 1.);
      vec4 colortex = texture2D( color, vec2(tone,0.));

      //sparkle code, dont touch this!
      vec2 uv2 = vUv;
      vec3 pixeltex = texture2D(noiseTex,mod(uv*5.,1.)).rgb;      
      float iTime = 1.*0.004;
      uv.y += iTime / 10.0;
      uv.x -= (sin(iTime/10.0)/2.0);
      uv2.y += iTime / 14.0;
      uv2.x += (sin(iTime/10.0)/9.0);
      float result = 0.0;
      result += texture2D(noiseTex, mod(uv*4.,1.) * 0.6 + vec2(iTime*-0.003)).r;
      result *= texture2D(noiseTex, mod(uv2*4.,1.) * 0.9 + vec2(iTime*+0.002)).b;
      result = pow(result, 10.0);
      gl_FragColor *= colortex;
      gl_FragColor += vec4(sin((tone + vUv.x + vUv.y/10.)*10.))/8.;
      // gl_FragColor += vec4(108.0)*result;

    }

    gl_FragColor.a = temptex.a;
  }
`;

const fragPlaneback = `
	varying vec2 vUv;
  uniform sampler2D skullrender;
  uniform sampler2D cardtemplate;
  uniform sampler2D backtexture;
  uniform sampler2D noiseTex;
  uniform sampler2D color;
  uniform sampler2D noise;
  uniform vec4 resolution;
  varying vec3 camPos;
  varying vec3 eyeVector;
  varying vec3 vNormal;

  float Fresnel(vec3 eyeVector, vec3 worldNormal) {
    return pow( 1.0 + dot( eyeVector, worldNormal), 1.80 );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy/resolution.xy ;
    vec4 temptex = texture2D( cardtemplate, vUv);
    vec4 skulltex = texture2D( skullrender, vUv );
    gl_FragColor = temptex;
    vec4 noisetex = texture2D( noise, mod(vUv*2.,1.));
    float f = Fresnel(eyeVector, vNormal);

    vec2 uv2 = vUv;
    vec3 pixeltex = texture2D(noiseTex,mod(uv*5.,1.)).rgb;      
    float iTime = 1.*0.004;
    uv.y += iTime / 10.0;
    uv.x -= (sin(iTime/10.0)/2.0);
    uv2.y += iTime / 14.0;
    uv2.x += (sin(iTime/10.0)/9.0);
    float result = 0.0;
    result += texture2D(noiseTex, mod(uv*4.,1.) * 0.6 + vec2(iTime*-0.003)).r;
    result *= texture2D(noiseTex, mod(uv2*4.,1.) * 0.9 + vec2(iTime*+0.002)).b;
    result = pow(result, 10.0);


    vec4 bactex = texture2D( backtexture, vUv);
    float tone = pow(dot(normalize(camPos), normalize(bactex.rgb)), 1.);
    vec4 colortex = texture2D( color, vec2(tone,0.));
    if(gl_FragColor.g >= .5 && gl_FragColor.r < 0.6){
      float tone = pow(dot(normalize(camPos), normalize(skulltex.rgb)), 1.);
      vec4 colortex2 = texture2D( color, vec2(tone,0.));
      if(skulltex.a > 0.2){
        gl_FragColor = colortex;
        // gl_FragColor += vec4(108.0)*result;
        // gl_FragColor += vec4(sin((tone + vUv.x + vUv.y/10.)*10.))/8.;
      } else {
        gl_FragColor = vec4(0.) + f;
        gl_FragColor += noisetex/5.;
      }
      gl_FragColor += noisetex/5.;
    
    } else {
      //sparkle code, dont touch this!    
      gl_FragColor *= colortex;
      gl_FragColor += vec4(sin((tone + vUv.x + vUv.y/10.)*10.))/8.;
    }

  }
`;
const vertskull = `
      varying vec3 vNormal;
      varying vec3 camPos;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 eyeVector;

      void main() {
        vNormal = normal;
        vUv = uv;
        camPos = cameraPosition;
        vPosition = position;
        vec4 worldPosition = modelViewMatrix * vec4( position, 1.0);
        eyeVector = normalize(worldPosition.xyz - cameraPosition);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
`;
const fragskull = `
      #define NUM_OCTAVES 5
      uniform vec4 resolution;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float time;
      varying vec3 camPos;
      varying vec2 vUv;
      uniform vec3 color1;
      uniform vec3 color0;
      varying vec3 eyeVector;

      
      float rand(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);

        float res = mix(
          mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
          mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
      }

      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      float setOpacity(float r, float g, float b) {
        float tone = (r + g + b) / 3.0;
        float alpha = 1.0;
        if(tone<0.69) {
          alpha = 0.0;
        }
        return alpha;
      }

      vec3 rgbcol(float r, float g, float b) {
        return vec3(r/255.0,g/255.0,b/255.0);
      }

      float Fresnel(vec3 eyeVector, vec3 worldNormal) {
        return pow( 20.0 + dot( eyeVector, worldNormal), 3.0 );
      }
     
      void main() {
        vec2 olduv = gl_FragCoord.xy/resolution.xy ;
        float f = Fresnel(eyeVector, vNormal);
        float gradient2 = (f)*(.3 - vPosition.y) ;
        float scale = 8.;
        // olduv *= 0.5;
        // olduv.y -= 0.5; 
        olduv.y = olduv.y - time;
        vec2 p = olduv*scale;
        float noise = fbm( p + time );
        
        vec2 uv = gl_FragCoord.xy/resolution.xy ; 
        //  uv = normalize( vNormal ).xy ; 


        vec3 newCam = vec3(0.,5.,10.);
        float gradient = dot(.0 -  normalize( newCam ), normalize( vNormal )) ;

        vec3 viewDirectionW = normalize(camPos - vPosition);
        float fresnelTerm = dot(viewDirectionW, vNormal);  
        fresnelTerm = clamp( 1. - fresnelTerm, 0., 1.) ;

        vec3 color = vec3(noise) + gradient;
        vec3 color2 = color - 0.2;


        float noisetone = setOpacity(color.r,color.g,color.b);
        float noisetone2 = setOpacity(color2.r,color2.g,color2.b);



        vec4 backColor = vec4(color, 1.);
        backColor.rgb = rgbcol(color0.r,color0.g,color0.b)*noisetone;
        // backColor.a = noisetone;

        vec4 frontColor = vec4(color2, 1.);
        frontColor.rgb = rgbcol(color1.r,color1.g,color1.b)*noisetone;
        // frontColor.a = noisetone2;

        if(noisetone2>0.0){
          // show first color
          gl_FragColor = frontColor;
        } else {
          // show 2nd color
          gl_FragColor = backColor;
        }
      }

`;


const imageBitmapLoader = new THREE.ImageBitmapLoader();
imageBitmapLoader.setOptions({ imageOrientation: 'flipY' });

const loadTexture = (url) => {
  return new Promise((resolve, reject) => {
    imageBitmapLoader.load(
      url,
      (imageBitmap) => {
        const texture = new THREE.Texture(imageBitmap);
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      (err) => reject(err)
    );
  });
};

  



async function initThree(data, inputElement) {
		const { canvas } = data;
		width = data.state.width;
		height = data.state.height;
		canvas_width = data.state.canvas_width;
		canvas_height = data.state.canvas_height;

	camera = new THREE.PerspectiveCamera(
		35,
		width / 2 / height,
		1,
		10000
	);
	camera.position.z = 75 / (width / 2000);

	cameraRTT = new THREE.PerspectiveCamera(
		85,
		width / 2 / height,
		1,
		1000
	);
	// cameraRTT.position.z = 100;
	// cameraRTT.position.y = -8.5;
	cameraRTT.position.z = 50;
	cameraRTT.position.y = 8;


	scene = new THREE.Scene();
	// scene.background = new THREE.Color('grey');
	sceneRTT = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({ antialias: true, autoSize: true, alpha: true, canvas, stencil: false, depth: false });

	renderer.autoClear = false;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.interpolateneMapping = THREE.ACESFilmicToneMapping;
	renderer.outputEncoding = THREE.sRGBEncoding;
    controls = new OrbitControls(camera, inputElement);
    // controls.target.set(0, 0, 0);
    controls.update();
    controls.enableZoom = false;
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.enableRotate = true;





	 // Ambient light
	 const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Soft white light
	 scene.add(ambientLight);
 
	 // Directional light
	 const directionalLight = new THREE.DirectionalLight(0xffffff, 500); // White light, 50% intensity
	 directionalLight.position.set(1, 1, 1).normalize();
	 scene.add(directionalLight);


	

		  var renderScene = new RenderPass(sceneRTT, cameraRTT);
		  bloomPass = new UnrealBloomPass(
			  new THREE.Vector2(width, height),
			  0.7,
			  0.4,
			  0.5
		  );
		  composer = new EffectComposer(renderer);
		  composer.renderToScreen = false;
		  composer.addPass(renderScene);
		  composer.addPass(bloomPass);

		  plane();
		  planeback();
	loadskull();
	resizeRendererToDisplaySize(renderer, composer, camera, width, height)
	animate();
	return { renderer, composer, scene, camera, controls };
}








async function plane() {


	const [cardtemplate, backtexture, noise2, voronoi, color11] = await Promise.all([
		loadTexture(cardtemplate_path),
		loadTexture(backtexture_path),
		loadTexture(noise2_path),
		loadTexture(voronoi_path),
		loadTexture(color11_path),
	  ]);
	


	let geometry = new THREE.PlaneGeometry(20, 30);
	let frontmaterial = new THREE.ShaderMaterial({
		uniforms: {
			cardtemplate: {
				type: "t",
				value: cardtemplate
			},
			backtexture: {
				type: "t",
				value: backtexture
			},
			noise: {
				type: "t",
				value: noise2
			},
			skullrender: {
				type: "t",
				value: composer.readBuffer.texture
			},
			resolution: {
				value: new THREE.Vector2(width / 2, height)
			},
			noiseTex: {
				type: "t",
				value: voronoi
			},
			color: {
				type: "t",
				value: color11
			}
		},
		fragmentShader: fragPlane,
		vertexShader: vert,
		transparent: true,
		depthWrite: false
	});

	frontcard = new THREE.Mesh(geometry, frontmaterial);
	scene.add(frontcard);
}





async function planeback() {

	const [cardtemplateback, backtexture, noise2, flower, voronoi, color11] = await Promise.all([
		loadTexture(cardtemplateback_path),
		loadTexture(backtexture_path),
		loadTexture(noise2_path),
		loadTexture(flower_path),
		loadTexture(voronoi_path),
		loadTexture(color11_path)
	  ]);


	let geometry = new THREE.PlaneGeometry(20, 30);
	let backmaterial = new THREE.ShaderMaterial({
		uniforms: {
			cardtemplate: {
				type: "t",
				value: cardtemplateback
			},
			backtexture: {
				type: "t",
				value: backtexture
			},
			noise: {
				type: "t",
				value: noise2
			},
			skullrender: {
				type: "t",
				value: flower
			},
			resolution: {
				value: new THREE.Vector2(width / 2, height)
			},
			noiseTex: {
				type: "t",
				value: voronoi
			},
			color: {
				type: "t",
				value: color11
			}
		},
		fragmentShader: fragPlaneback,
		vertexShader: vert,
		transparent: true,
		depthWrite: false
	});
	backcard = new THREE.Mesh(geometry, backmaterial);
	backcard.rotation.set(0, Math.PI, 0);
	scene.add(backcard);
}




let eye,
	eye2,
	basicmat,
	skullmaterial,
	modelgroup = new THREE.Group();



	async function loadskull() {
		skullmaterial = new THREE.ShaderMaterial({
			uniforms: {
				time: {
					type: "f",
					value: 0.0
				},
				color1: {
					value: new THREE.Vector3(...options.color1)
				},
				color0: {
					value: new THREE.Vector3(...options.color0)
				},
				resolution: {
					value: new THREE.Vector2(width / 2, height)
				}
			},
			fragmentShader: fragskull,
			vertexShader: vertskull
			// depthWrite: false,
		});
	
		var spheregeo = new THREE.SphereGeometry(0.15, 18, 18);
		basicmat = new THREE.MeshBasicMaterial();
		basicmat.color.setRGB(...options.color2);
		eye = new THREE.Mesh(spheregeo, basicmat);
		eye2 = new THREE.Mesh(spheregeo, basicmat);
		eye.position.set(0, -21, 3.875);
		eye2.position.set(2.2, -6, -6.6);
		modelgroup = new THREE.Object3D();
		modelgroup.add(eye);
		// modelgroup.add(eye2);
	
	
	
		let gltfloader = new GLTFLoader();
		gltfloader.load(skullmodel, function (gltf) {
			let mesh2 = gltf.scene.clone();
			console.log("mesh2", mesh2);
			mesh2.position.set(0, -54, 0);
			mesh2.rotation.set(Math.PI, 0, Math.PI);
	
			mesh2.traverse(function (child) {
				if (child.isMesh && child.geometry) { // Ensure the child is a mesh and has geometry
					child.geometry = child.geometry.clone();
					child.geometry = BufferGeometryUtils.mergeVertices(child.geometry); 
					child.material = skullmaterial;
					child.verticesNeedUpdate = true;
					child.normalsNeedUpdate = true;
					child.uvsNeedUpdate = true;
					child.material.flatShading = THREE.SmoothShading;
					child.geometry.computeVertexNormals();
				}
			});
			
			mesh2.scale.set(2, 2, 2);
			modelgroup.add(mesh2);
			sceneRTT.add(modelgroup);
		});
	}
	
	



let matrix = new THREE.Matrix4();
let period = 5;
let clock = new THREE.Clock();

function updateDraw(deltaTime) {
	modelgroup.rotation.set(-camera.rotation._x, -camera.rotation._y, 0);
	if (options.isanimate) {
		matrix.makeRotationY((clock.getDelta() * 0.7 * Math.PI) / period);
		camera.position.applyMatrix4(matrix);
		camera.lookAt(frontcard.position);
	}

	bloomPass.threshold = options.bloomThreshold;
	bloomPass.strength = options.bloomStrength;
	bloomPass.radius = options.bloomRadius;

	if (skullmaterial) {
		skullmaterial.uniforms.time.value = deltaTime / 4000;
		skullmaterial.uniforms.color1.value = new THREE.Vector3(...options.color1);
		skullmaterial.uniforms.color0.value = new THREE.Vector3(...options.color0);
		eye2.material.color.setRGB(...options.color2);
		eye.material.color.setRGB(...options.color2);
	}
}

function animate(deltaTime) {
	requestAnimationFrame(animate);
	updateDraw(deltaTime);
	composer.render();
	renderer.render(scene, camera);
}





async function onMouseMove(mouse) {

}
  








  export { initThree, onMouseMove };

