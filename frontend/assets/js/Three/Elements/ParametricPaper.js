import * as THREE from 'three';
import { resizeRendererToDisplaySize, setupPostProcessing } from '~~/assets/js/Three/HelperFunctions.js';
import { OrbitControls } from '~~/assets/js/Three/OrbitControls';
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { NormalPass } from 'postprocessing';
import { PencilLinesPass } from '~~/assets/js/Three/Materials/PencilMaterial';

let coinPath = '/demos/briggs/briggs_coin.glb'

let coinModel;
let composer;
let scene, camera, renderer, controls
let initialAngle;
let width, height;
let directionalLight
let renderRequested = false;
let scrollY = 0;
let initialCameraPosition = new THREE.Vector3();
let cameraRadius = 8;

const loader = new GLTFLoader();

async function initThree(canvas, proxy, mainRenderer, data, state) {
    width = state.width
    height = state.height
  
    scene = new THREE.Scene();
    scene.background = new THREE.Color('transparent');

    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, -0.1, cameraRadius);
    camera.lookAt(0, 0, 0);
    initialCameraPosition.copy(camera.position);

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
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    controls.enable = true;
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.update();
  
    const hemisphereLight = new THREE.HemisphereLight(0x7a3114, 0x48c3ff, 0.5)
    scene.add(hemisphereLight)
  
    directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(1, 2.5, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Load coin model
    await new Promise((resolve) => {
        loader.load(coinPath, (gltf) => {
            coinModel = gltf.scene;
            scene.add(coinModel);
            coinModel.traverse(child => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            resolve();
        });
    });

    if (!composer) {
        createComposer()
    }

    resizeRendererToDisplaySize(renderer, composer, camera, width, height)

    return {renderer, scene, camera, controls}
}

function createComposer() {
    composer = new EffectComposer(renderer);
    
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const pencilLinePass = new PencilLinesPass({
      width: width,
      height: height,
      scene,
      camera,
      amount: 0.0
    });
    composer.addPass(pencilLinePass);
}





// ==================== animate  ====================
// ==================== animate  ====================
// ==================== animate  ====================

let isAnimating

const animate = () => {
    if (!isAnimating) return;
    renderRequested = false;
    controls.update();
    
    if (coinModel && isMousePress != 'mousedown') {
        coinModel.rotation.y += 0.0075;
    }

   
    
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

}





let isMousePress
async function onMouseUpDown(data){
  isMousePress = data.type
}









  export { initThree, onMouseMove, toggleVisibility, onScroll, onMouseUpDown, toggleAnimation };