import * as THREE from 'three';
import RapierPhysics from '~~/assets/js/Three/Physics/GravityClumpRapier.js';
import { resizeRendererToDisplaySize, setupPostProcessing } from '~~/assets/js/Three/HelperFunctions.js';
// import RapierPhysics from '/workspace/frontend/assets/js/GravityClumpRapier.js';
import { OrbitControls } from '~~/assets/js/Three/OrbitControls';
import { N8AOPostPass } from "n8ao";
import { HalfFloatType } from "three";
import {
  BloomEffect,
  DepthOfFieldEffect,
  ToneMappingEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  BlendFunction,
  ColorChannel,
  DepthDownsamplingPass,
  EdgeDetectionMode,
  NormalPass,
  SSAOEffect,
  SMAAEffect,
  SMAAPreset,
  FXAAEffect,
  TextureEffect
} from 'postprocessing';

let width, height;


import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


let composer;
let scene, camera, renderer, controls
let iMesh;
let physics;
let pointer;
let matrix;
const COUNT = 30;
let raycaster
let kinematicBody;
let texture
let renderRequested = false;



async function initThree(canvas, proxy, mainRenderer, data, state) {


    width = state.width
    height = state.height
  
    scene = new THREE.Scene();
    // scene.background = new THREE.Color('red');


    // Camera
    camera = new THREE.PerspectiveCamera(40, width / height, 1, 100);
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, -4);
    raycaster = new THREE.Raycaster();


  
    renderer = mainRenderer



    controls = new OrbitControls(camera, proxy);
    controls.target.set(0, 0, -4);
    controls.enableZoom = false;
    controls.enable = false;
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.enableRotate = false;
    controls.update();
  
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 4.75);
    scene.add(ambientLight);
  
    const spotLight = new THREE.DirectionalLight(0xffffff, 3);
    spotLight.penumbra = 0;
    spotLight.position.set(30, 50, 30);
    spotLight.target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);
  
    // const spotLight2 = new THREE.SpotLight('#fff', 75);
    // spotLight2.penumbra = 1;
    // spotLight2.position.set(-20, -20, 20);
    // spotLight2.target.position.set(0, 0, 0);
    // spotLight2.castShadow = false;
    // scene.add(spotLight2);



    const loader = new RGBELoader();
    loader.load('/hdr/bridge_small.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        //scene.background = texture; // Optional: set the background to the environment map
        
        // Update all materials in the scene to use the environment map
        scene.traverse((object) => {
          if (object.isMesh) {
            if (object.material.isMeshStandardMaterial) {
                object.material.envMap = texture;
                object.material.envMapIntensity = 0.0125; // Adjust intensity as needed
                object.material.needsUpdate = true;
            }
        }
        });
    });





  
    // Physics
    const initPhysics = new Promise(async (resolve, reject) => {
      try {
        console.log('Physics initializing...');
        physics = await RapierPhysics();
        console.log('Physics initialized', physics);
        resolve(physics); // Resolve the promise with the physics object
      } catch (error) {
        console.error('Failed to initialize physics:', error);
        reject(error); // Reject the promise if there is an error
      }
    });
   


    const imageBitmapLoader = new THREE.ImageBitmapLoader();
    imageBitmapLoader.setOptions({ imageOrientation: 'flipY' });

    const loadTexture = (url) => {
      return new Promise((resolve, reject) => {
        imageBitmapLoader.load(
          url,
          (imageBitmap) => {
            const texture = new THREE.Texture(imageBitmap);
            console.log('Texture loaded:', texture);
            resolve(texture);
          },
          undefined,
          (err) => reject(err)
        );
      });
    };

    const texture = await loadTexture('/GravityImages/grav5.jpg').catch(err => {
      console.error('Failed to load texture:', err);
      return texture
    });


    texture.needsUpdate = true; 

    


    const baubleMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.0,
      metalness: 0.05, 
      envMapIntensity: 1000,
      map: texture
    });
  
    // Instanced Mesh
    const sphereGeometry = new THREE.SphereGeometry(0.75, 128, 128);
    iMesh = new THREE.InstancedMesh(sphereGeometry, baubleMaterial, COUNT);
    iMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
    iMesh.castShadow = true;
    iMesh.receiveShadow = true;
    iMesh.userData.physics = { body_type: 'dynamic', mass: 1, restitution: 0.5, friction: 5 };
    scene.add(iMesh);

    for (let i = 0; i < COUNT; i++) {
      matrix = new THREE.Matrix4();
      matrix.setPosition(THREE.MathUtils.randFloatSpread(35), THREE.MathUtils.randFloatSpread(35), THREE.MathUtils.randFloatSpread(35));
      iMesh.setMatrixAt(i, matrix);
    }
    iMesh.instanceMatrix.needsUpdate = true;
  



    // Pointer (Mouse-controlled sphere)
    // Create a material with transparency
    const pointermaterial = new THREE.MeshBasicMaterial({color: "#fff", transparent: true, opacity: 0});
    const pointerGeometry = new THREE.SphereGeometry(1.8, 8, 8);
    pointer = new THREE.Mesh(pointerGeometry, pointermaterial);
    // pointer.position.set(0, 0, 0);
    pointer.userData.physics = { body_type: 'kinematic_position', mass: 1, restitution: 1.4, friction: 5};
    scene.add(pointer);
    kinematicBody = true;




    // Attempt to initialize all components
    try {
      console.log('Initialization started...');
      await Promise.all([initPhysics]);
      await physics.addScene(scene); 
      console.log('Physics scene added.');
      // composer = setupPostProcessing(renderer, scene, camera, width, height);




      if (!composer) {
        createComposer()
        }


      resizeRendererToDisplaySize(renderer, composer, camera, width, height)

  
      // animate();
    
    } catch (error) {
      console.log('Failed to load all objects and initialize physics:', error);
    }
  
    console.log("Clump Scene polycount:", renderer.info.render.triangles);
    console.log("Clump Active Drawcalls:", renderer.info.render.calls);
    console.log("Clump Textures in Memory", renderer.info.memory.textures);
    console.log("Clump Geometries in Memory", renderer.info.memory.geometries);

    return {renderer, scene, camera, controls}

  }






  function createComposer(){


      // EffectComposer setup
      composer = new EffectComposer(renderer, {frameBufferType: HalfFloatType});
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);


      // const smaaEffect = new SMAAEffect({
      //     edgeDetectionMode: EdgeDetectionMode.DEPTH,
      //     preset: SMAAPreset.ULTRA,
      // });

        const n8aoPass = new N8AOPostPass(
          scene,
          camera,
          width,
          height,
      );



      n8aoPass.configuration.halfRes = true;
      n8aoPass.configuration.aoRadius = 10;
      n8aoPass.configuration.intensity = 1;
      n8aoPass.configuration.color = new THREE.Color('black');
      n8aoPass.configuration.aoSamples = 10;
      n8aoPass.configuration.denoiseSamples = 6;
      n8aoPass.configuration.renderMode = 0;
      n8aoPass.configuration.gammaCorrection = false;
      n8aoPass.configuration.depthAwareUpsampling = true;
      n8aoPass.configuration.colorMultiply = true;
      n8aoPass.configuration.screenSpaceRadius = true;



  // Add ToneMappingEffect
  const toneMappingEffect = new ToneMappingEffect({
    mode: ToneMappingMode.AGX, // You can choose other modes like REINHARD2_ADAPTIVE
    resolution: 512,
    whitePoint: 10,
    middleGrey: 1,
    minLuminance: 0.01,
    averageLuminance: 1,
    adaptationRate: 100
  });

  const fxaaEffect = new FXAAEffect();


  // Create an EffectPass with all your effects
  const effectPass = new EffectPass(camera, fxaaEffect);

  composer.addPass(n8aoPass);
  composer.addPass(effectPass);
}





// ==================== animate  ====================
// ==================== animate  ====================
// ==================== animate  ====================

let isAnimating

  const animate = () => {
    if (!isAnimating) return;
    renderRequested = false;
    controls.update();
    composer.render();
    // renderer.render(scene, camera);
    // requestAnimationFrame(animate);



    if(!physics.areAllObjectsStationary()){
      requestRenderIfNotRequested()
    }
  };


  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(animate);   
    }
  }




  const toggleAnimation = (sceneData, isAnim) => {
    isAnimating = isAnim
    renderer.clear()
    renderer.autoClearColor = true;
    renderer.autoClear = true
    if (isAnim){
      scene.visible = true
      renderer.logarithmicDepthBuffer = true;
      renderer.shadowMap.enabled = true;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.outputEncoding = THREE.sRGBEncoding;
      animate()
    } else {
      scene.visible = false
      renderer.logarithmicDepthBuffer = false;
      renderer.shadowMap.enabled = false;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.outputEncoding = THREE.LinearEncoding;
  }
  };


  



// ==================== Mouse Move ====================
// ==================== Mouse Move ====================
// ==================== Mouse Move ====================



let mousePosition = new THREE.Vector3();
let planeNormal = new THREE.Vector3(0, 0, 1);
let plane = new THREE.Plane(planeNormal, 0);

async function onMouseMove(mouse) {

    requestRenderIfNotRequested()
    // Convert mouse coordinates to 3D space
    mousePosition.set(mouse.x, mouse.y, 0.5);
    mousePosition.unproject(camera);

    // Calculate the intersection of the mouse ray with a plane at z=0
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, mousePosition);
    

    // Update the visual pointer
    pointer.position.copy(mousePosition);

    // Update the physics body
    if (kinematicBody) {
        physics.mousePosition({
          mousePosition
        });
    }
}



  
async function toggleVisibility(vis){

}


async function onScroll(data) {

}


async function onMouseUpDown(data){

}


  export { initThree, onMouseMove, toggleVisibility, onScroll, onMouseUpDown, toggleAnimation };