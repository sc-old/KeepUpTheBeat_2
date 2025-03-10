
import * as THREE from 'three';
import { resizeRendererToDisplaySize, setupPostProcessing } from '~~/assets/js/Three/HelperFunctions.js';
// import RapierPhysics from '/workspace/frontend/assets/js/GravityClumpRapier.js';
import { OrbitControls } from '~~/assets/js/Three/OrbitControls';
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { NormalPass } from 'postprocessing';
import { PencilLinesPass } from '~~/assets/js/Three/Materials/PencilMaterial';



let bullPath = '/demos/briggs/bull_3.glb'

let bullModel;
let composer;
let scene, camera, renderer, controls
let initialAngle;
let width, height;
let directionalLight
let renderRequested = false;
let scrollY = 0;
let initialCameraPosition = new THREE.Vector3();
let cameraRadius = 4;
const NUM_TORUSES = 20;
const toruses = [];


let currentCameraPosition = new THREE.Vector3();
let targetCameraPosition = new THREE.Vector3();
let lerpFactor = 0.1; // Adjust this value to control the smoothness of the transition
let isFirstScroll = true;


const loader = new GLTFLoader();

async function initThree(canvas, proxy, mainRenderer, data, state) {


    width = state.width
    height = state.height
  
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#fff');


    // Camera
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, -0.1, cameraRadius);
    camera.lookAt(0, 0, 0);
    initialCameraPosition.copy(camera.position);

    // Calculate the initial angle
    initialAngle = Math.atan2(initialCameraPosition.z, initialCameraPosition.x);




  
    renderer = mainRenderer;
    renderer.setClearColor('#fff')
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.CineonToneMapping
    renderer.toneMappingExposure = 1.75
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap



    controls = new OrbitControls(camera, proxy);
    controls.target.set(-1.5, -0.275, 0);
    controls.enableZoom = false;
    controls.enable = true;
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.update();
  
    const hemisphereLight = new THREE.HemisphereLight(0x7a3114, 0x48c3ff, 0.5)
    scene.add(hemisphereLight)
  
// Directional light for shadows
directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(5, 2.5, 5);
directionalLight.castShadow = true;

// Improve shadow quality
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;

scene.add(directionalLight);

// Helper to visualize the light direction (optional, remove in production)
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 100);
// scene.add(directionalLightHelper);

// const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(shadowHelper);


        // Load model into render target scene
        await new Promise((resolve) => {
            loader.load(bullPath, (gltf) => {
                bullModel = gltf.scene;
                scene.add(bullModel);
                bullModel.traverse(child => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                resolve();
            });
        });

        bullModel.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
          });
    
        // After loading the bull model
        bullModel.rotation.y += -0.65;
        // updateLightPosition();
    
        const floor = createFloor();
        floor.receiveShadow = true;
        scene.add(floor);
        floor.receiveShadow = true;

        // createToruses(); 

    



      if (!composer) {
        createComposer()
        }


      resizeRendererToDisplaySize(renderer, composer, camera, width, height)

  
    //   animate();



    return {renderer, scene, camera, controls}

  }




  function createComposer() {
    // EffectComposer setup
    composer = new EffectComposer(renderer);
    
    // Render Pass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // In createComposer function
// const normalPass = new NormalPass(scene, camera);
// composer.addPass(normalPass);

  
    // Pencil Lines Pass
    const pencilLinePass = new PencilLinesPass({
      width: width,
      height: height,
      scene,
      camera,
    });
    composer.addPass(pencilLinePass);
  }



  function createFloor() {
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshStandardMaterial({ color: '#fff' });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.875;
    floor.receiveShadow = true;
    return floor;
}


function createToruses() {
    for (let i = 0; i < NUM_TORUSES; i++) {
        const torus = createRandomTorus();
        scene.add(torus);
        toruses.push(torus);
    }
}

function createRandomTorus() {
    const geometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100);
    const material = new THREE.MeshStandardMaterial({ 
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.15
    });
    const torus = new THREE.Mesh(geometry, material);
    
    // Random position
    torus.position.set(
        (Math.random() - 1) * 15,  // x: -12.5 to 12.5
        (Math.random() - 0.2) * 12,   // y: -1 to 4
        (Math.random() - 1) * 10    // z: -4.5 to 0.5
    );
    
    // Random rotation speeds (slow)
    torus.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002
    };
    

    return torus;
}


// ==================== animate  ====================
// ==================== animate  ====================
// ==================== animate  ====================

let isAnimating

const animate = () => {
    if (!isAnimating) return;
    renderRequested = false;
    controls.update();
    
    // // Update camera position
    // updateCameraPosition();
    
    composer.render();
    requestRenderIfNotRequested();
};
  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(animate);   
    }
  }




  const toggleAnimation = (sceneData, isAnim) => {
    isAnimating = isAnim
    if (isAnim){
      scene.visible = true
      renderer.logarithmicDepthBuffer = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      animate()
    } else {
      scene.visible = false
      renderer.logarithmicDepthBuffer = false;
      renderer.shadowMap.enabled = false;
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




}



  
async function toggleVisibility(vis){

}

async function onScroll(data) {
    scrollY = data.scrollY;
    
    if (isFirstScroll) {
        isFirstScroll = false;
        currentCameraPosition.copy(initialCameraPosition);
    }
    
    updateCameraPosition();
    requestRenderIfNotRequested();
}


const MAX_ROTATION = Math.PI / 3; 
const Y_MOVEMENT_FACTOR = 0.2; // Adjust this to control the amount of y-axis movement



function updateCameraPosition() {
    if (isMousePress != 'mousedown') {
        if (camera) {
            // Calculate the angle based on scrollY
            const angleChange = scrollY * 0.0009;

            // Clamp the angle change to the range [0, MAX_ROTATION]
            const clampedAngleChange = Math.max(0, Math.min(angleChange, MAX_ROTATION));

            // Calculate the total angle, starting from the initial angle
            const totalAngle = initialAngle + clampedAngleChange;

            // Calculate new camera position
            const x = Math.cos(totalAngle) * cameraRadius;
            const z = Math.sin(totalAngle) * cameraRadius;
            
            // Calculate y with a slight movement
            const yOffset = Math.sin(totalAngle) * cameraRadius * Y_MOVEMENT_FACTOR;
            const y = initialCameraPosition.y + yOffset - 0.8;

            // Set the target camera position
            targetCameraPosition.set(x, y, z);

            // Lerp the current camera position towards the target
            currentCameraPosition.lerp(targetCameraPosition, lerpFactor);

            // Set new camera position
            camera.position.copy(currentCameraPosition);

            // Make the camera look at the center of the scene
            camera.lookAt(0, 0, 0);

            // Update the camera's up vector to maintain orientation
            camera.up.set(0, 1, 0);

            // Update controls target if necessary
            if (controls) {
                controls.target.set(-1.5, -0.275, 0);
                controls.update();
            }
        }
    }
}




let isMousePress
async function onMouseUpDown(data){
  isMousePress = data.type
}



function updateLightPosition() {
    if (bullModel) {
        const bullPosition = new THREE.Vector3();
        bullModel.getWorldPosition(bullPosition);
        
        directionalLight.position.set(
            bullPosition.x + 5,
            bullPosition.y + 5,
            bullPosition.z + 5
        );
        directionalLight.target = bullModel;
    }
}











  export { initThree, onMouseMove, toggleVisibility, onScroll, onMouseUpDown, toggleAnimation };