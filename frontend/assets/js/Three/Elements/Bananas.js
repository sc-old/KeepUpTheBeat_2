import * as THREE from 'three';
import { resizeRendererToDisplaySize } from '~~/assets/js/Three/HelperFunctions.js';
import { OrbitControls } from '~~/assets/js/Three/OrbitControls';
import { MathUtils } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { FXAAEffect } from 'postprocessing';




import { N8AOPostPass } from "n8ao";
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
  TextureEffect
} from 'postprocessing';



const objectConfig = {
    bananas: {
      scaleAmount: 0.25,
      rotateAmountZ: 0,
      spotLightIntensity: 0.8,
      spotLight2Intensity: 0,
      spotLightColor: 0xFFA500,
      spotLight2Color: 0xFFC0CB,
      hdrIntensity: 0.08,
      backgroundColor: '#ffd073',
      closePositionFactor: 15,
      farPositionFactor: 18,
      yPositionSpread: 3
    },
    strawberries: {
      scaleAmount: 0.13,
      rotateAmountZ: 0,
      spotLightIntensity: 2.5,
      spotLight2Intensity: 500,
      spotLightColor: 0xFFA500,
      spotLight2Color: 0xFFC0CB,
      hdrIntensity: 0.125,
      backgroundColor: '#ff968f',
      closePositionFactor: 15,
      farPositionFactor: 18,
      yPositionSpread: 3
    },
    watch: {
      scaleAmount: 4,
      rotateAmountZ: Math.PI * Math.random() / 0.5,
      spotLightIntensity: 2.75,
      spotLight2Intensity: 20,
      spotLightColor: 0xFFFFFF,
      spotLight2Color: 0xFFFFFF,
      hdrIntensity: 0.52,
      backgroundColor: '#f7f7f7',
      closePositionFactor: 15,
      farPositionFactor: 18,
      yPositionSpread: 3
    },
    airpods: {
      scaleAmount: 5,
      rotateAmountZ: 0,
      spotLightIntensity: 2.3,
      spotLight2Intensity: 30,
      spotLightColor: 0xFFFFFF,
      spotLight2Color: 0xFFFFFF,
      hdrIntensity: 0.125,
      backgroundColor: '#cccccc',
      closePositionFactor: 15,
      farPositionFactor: 18,
      yPositionSpread: 3
    }
  };



  let loadedModels = {};
let modelQueue = ['watch', 'bananas', 'strawberries', 'airpods']; // Initial load order
let currentLoadIndex = 0;


let composer, controls, scene, camera, renderer, raycaster;
const objectURLs = [];
let spotLight, spotLight2;
let loader;
let devicePixelRatio;
let widthFactor
const dummy = new THREE.Object3D();
const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;
let COUNT = 200;
let isMobile;
const clock = new THREE.Clock();
let width, height, canvas_width, canvas_height;
const objectData = [];
const farFactor = 60;
const closeFactor = 40;
let bokehScale
let setSpeed = 0.1015;
let lowQualityMode = false;
let activeCount = 0
let closeObjectCount
let activeObject = modelQueue[0];

const paths = {
    bananas: {
        high: '/floatingFruits/bananas/banana_high.glb',
        medium: '/floatingFruits/bananas/banana_medium.glb',
        low: '/floatingFruits/bananas/banana_low.glb'
    },
    strawberries: {
        high: '/floatingFruits/strawberries/strawberry_high.glb',
        medium: '/floatingFruits/strawberries/strawberry_high.glb',
        low: '/floatingFruits/strawberries/strawberry_high.glb'
    },
    watch: {
        high: '/floatingFruits/watch/watch3.glb',
        medium: '/floatingFruits/watch/watch3.glb',
        low: '/floatingFruits/watch/watch3.glb'
    },
    airpods: {
        high: '/floatingFruits/watch/airpods_high_1.glb',
        medium: '/floatingFruits/watch/airpods_medium.glb',
        low: '/floatingFruits/watch/airpods_low.glb'
    }
};



const hdrPaths = {
  bananas: '/hdr/cathedral_small.hdr',
  strawberries: '/hdr/cathedral_small.hdr',
  watch: '/hdr/cathedral_small.hdr',
  airpods: '/hdr/cathedral_small.hdr',
};



const preloadedHDRs = {};


async function initThree(canvas, proxy, mainRenderer, data, state) {

    width = state.width;
    height = state.height;
    canvas_width = state.canvas_width;
    canvas_height = state.canvas_height;
    devicePixelRatio = state.devicePixelRatio
    


    if (state.width < 768){
      isMobile = true
      COUNT = 50
      widthFactor = 4.5
      closeObjectCount = Math.round(COUNT * 0.25); // 40% of objects
      bokehScale = 3
    } else {
      isMobile = false
      COUNT = 200
      widthFactor = 10
      closeObjectCount = Math.round(COUNT * 0.7); // 70% of objects
      bokehScale = 7
    }



    console.log('width:', width);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(7, canvas_width / canvas_height, 1, 100);
    camera.position.set(0, 0, 10);

    // renderer = new THREE.WebGLRenderer({ 
    //     antialias: true, 
    //     alpha: true, 
    //     canvas, 
    //     stencil: false, 
    //     depth: false, 
    //     logarithmicDepthBuffer: true,
    //     powerPreference: "high-performance",
    //     precision: 'highp' });

    renderer = mainRenderer
    

    // raycaster = new THREE.Raycaster();

    controls = new OrbitControls(camera, proxy);
    controls.target.set(0, 0, 0);
    controls.update();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.enableRotate = false;

    spotLight = new THREE.SpotLight('orange', 3);
    spotLight.position.set(10, 20, 10);
    spotLight.penumbra = 1;
    spotLight.decay = 0;

    spotLight2 = new THREE.SpotLight('pink', 500);
    spotLight2.penumbra = 1;
    spotLight2.position.set(-10, -15, 10);

    scene.add(spotLight);
    // scene.add(spotLight2);




    loader = new GLTFLoader();



   // Load first three models
   await loadFirstThreeModels();



   // Set up objects for the first three loaded models
   for (const key in loadedModels) {
       setupObjects(loadedModels[key].high, loadedModels[key].medium, loadedModels[key].low, key);
   }




    resizeRendererToDisplaySize(renderer, composer, camera, width, height);


    // Preload HDR textures
    await preloadHDRs();

    switchObject(activeObject); // Initial switch to set the active object


   if (!composer) {
    createComposer()
    }

    // animate();
    return { renderer, composer, scene, camera, controls };
}








function createComposer(){



  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);


//   const smaaEffect = new SMAAEffect({
//     edgeDetectionMode: EdgeDetectionMode.DEPTH,
//     preset: SMAAPreset.ULTRA,
// });


// const n8aoPass = new N8AOPostPass(
//   scene,
//   camera,
//   width,
//   height,
// );



// n8aoPass.configuration.halfRes = true;
// n8aoPass.configuration.aoRadius = 4;
// n8aoPass.configuration.intensity = 1.2;
// n8aoPass.configuration.color = new THREE.Color('black');
// n8aoPass.configuration.aoSamples = 4;
// n8aoPass.configuration.denoiseSamples = 4;
// n8aoPass.configuration.renderMode = 0;
// n8aoPass.configuration.gammaCorrection = false;
// n8aoPass.configuration.depthAwareUpsampling = true;
// n8aoPass.configuration.colorMultiply = true;
// n8aoPass.configuration.screenSpaceRadius = true;



  const toneMappingEffect = new ToneMappingEffect();
  const tonePass = new EffectPass(camera, toneMappingEffect);
  composer.addPass(tonePass);

  const depthOfFieldEffect = new DepthOfFieldEffect(camera, {
      focusDistance: 0.1,
      focalLength: 0.135,
      bokehScale: bokehScale
  });


  const fxaaEffect = new FXAAEffect();
  composer.addPass(new EffectPass(camera, fxaaEffect));


  // const smaaPass = new EffectPass(camera, smaaEffect);



  // composer.addPass(n8aoPass);
  // composer.addPass(smaaPass);

  const dofPass = new EffectPass(camera, depthOfFieldEffect);
  composer.addPass(dofPass);


}




function setupLighting(objectType) {
  const config = objectConfig[objectType];
  spotLight.intensity = config.spotLightIntensity;
  spotLight2.intensity = config.spotLight2Intensity;
  spotLight.color.setHex(config.spotLightColor);
  spotLight2.color.setHex(config.spotLight2Color);
}


function getPaths(objectType) {
    return paths[objectType];
}




async function loadFirstThreeModels() {
    const modelsToLoad = modelQueue.slice(0, 3);
    const loadPromises = modelsToLoad.map(key => loadModelSet(key));
    await Promise.all(loadPromises);
    currentLoadIndex = 3;
}

async function loadModelSet(key) {
    console.log(`Loading model set for: ${key}`); // Debug log
    const modelPaths = paths[key];
    const [high, medium, low] = await Promise.all([
        loadModel(modelPaths.high),
        loadModel(modelPaths.medium),
        loadModel(modelPaths.low),
        
    ]);
    loadedModels[key] = { high, medium, low };
    console.log(`Finished loading model set for: ${key}`); // Debug log
}




function loadModel(path) {
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => {
        objectURLs.forEach(url => URL.revokeObjectURL(url));
        resolve(gltf.scene);
      },
      undefined,
      (error) => reject(error)
    );
  });
}



function preloadHDRs() {
  const HDRloader = new RGBELoader();
  const loadPromises = Object.keys(hdrPaths).map(key => {
      return new Promise((resolve, reject) => {
        console.log(' ------------------------ hdrPaths[key] ------------------------', hdrPaths[key] )
          HDRloader.load(hdrPaths[key], function(texture) {
              texture.mapping = THREE.EquirectangularReflectionMapping;
              preloadedHDRs[key] = texture;
              resolve();
          }, undefined, reject);
      });
  });
  return Promise.all(loadPromises);
}







function switchHDR(objectType) {
  const hdrTexture = preloadedHDRs[objectType];
  if (hdrTexture) {
      scene.environment = hdrTexture;
      // Update all materials in the scene to use the new HDR environment map
      scene.traverse((object) => {
          if (object.isMesh && object.material.isMeshStandardMaterial) {
              object.material.envMap = hdrTexture;
              object.material.envMapIntensity = objectConfig[objectType].hdrIntensity || 1.0;
              object.material.needsUpdate = true;
          }
      });
  }
}






function setupObjects(high, medium, low, type) {
    const config = objectConfig[type];
    for (let i = 0; i < COUNT; i++) {
      const lod = new THREE.LOD();
  
      const highScene = high.clone();
      highScene.scale.setScalar(config.scaleAmount);
      highScene.rotation.x += config.rotateAmountZ;
      lod.addLevel(highScene, 0);
  
      const mediumScene = medium.clone();
      mediumScene.scale.setScalar(config.scaleAmount);
      mediumScene.rotation.x += config.rotateAmountZ;
      lod.addLevel(mediumScene, closeFactor);
  
      const lowScene = low.clone();
      lowScene.scale.setScalar(config.scaleAmount);
      lowScene.rotation.x += config.rotateAmountZ;
      lod.addLevel(lowScene, farFactor);
  
      // Position logic
      if (i < closeObjectCount) {
        if (i == 0) {
          lod.position.set(0, -0.7, -1.5);
        } else if (i < 5) {
          lod.position.set(
            rndFS(0.4) * widthFactor,   
            -Math.round(rndFS(config.yPositionSpread) * 2),  
            -Math.round(Math.sqrt(1 - Math.pow(i / 40 - 1, 2)) * config.closePositionFactor) 
          );
        } else {
          lod.position.set(
            rndFS(0.4) * widthFactor,   
            -Math.round(rndFS(config.yPositionSpread) * 4),  
            -Math.round(Math.sqrt(1 - Math.pow(i / 40 - 1, 2)) * config.farPositionFactor) 
          );
        }
      } else {
        lod.position.set(
          rndFS(0.5) * widthFactor,
          -Math.round(rndFS(config.yPositionSpread) * 5),
          -Math.round(Math.sqrt(1 - Math.pow((i - closeObjectCount) / (COUNT - closeObjectCount) - 1, 2)) * 30)
        );
      }
  
      lod.rotation.set(Math.random() * Math.PI, 0, Math.random() * Math.PI);
  
      if (!objectData[type]) {
        objectData[type] = [];
      }
  
      objectData[type].push({
        mesh: lod,
        speed: setSpeed
      });
  
      scene.add(lod);
    }

    switchHDR(config.hdrIntensity);
  }
  

let isAnimating

const toggleAnimation = (sceneData, isAnim) => {
  isAnimating = isAnim
  if (isAnim){

    renderer.logarithmicDepthBuffer = true;
    animate()
  } else{
    renderer.logarithmicDepthBuffer = false;
  }
};




const animate = () => {
    if (!isAnimating) return;

    const dt = Math.min(0.1, clock.getDelta());




    if (objectData[activeObject]) {
        for (let i = 0; i < COUNT; i++) {
            const data = objectData[activeObject][i];
            if (data && data.mesh) {
                const lod = data.mesh;

    

        lod.visible = true;

        lod.position.y += dt * data.speed;
        lod.rotation.x += dt / rnd(6, 14);
        lod.rotation.z += dt / rnd(6, 14);

        const distanceToCamera = camera.position.distanceTo(lod.position);
        if (distanceToCamera <= closeFactor) {  
            // Close to camera
            if (lod.position.y > 8 && data.speed >= 0) {
              lod.position.y = rndFS(-80, -85);  // Moving up, adjust down
            } else if (lod.position.y < -8 && data.speed < 0) {
              lod.position.y = rndFS(80, 85);   // Moving down, adjust up
            } // Otherwise, keep current y position
          } else if (distanceToCamera <= farFactor) {
            // Medium distance
            if (lod.position.y > 40 && data.speed >= 0) {
              lod.position.y = rndFS(-250, -275);
            } else if (lod.position.y < -40 && data.speed < 0) {
              lod.position.y = rndFS(250, 275);
            }
          } else {
            if (!lowQualityMode) {
            // Far from camera
            if (lod.position.y > 80 && data.speed >= 0) {
              lod.position.y = rndFS(-300, -325);
            } else if (lod.position.y < -80 && data.speed < 0) {
              lod.position.y = rndFS(300, 325);
            }
          } else {
            data.mesh.visible = false;
          }
          }
    }
}
    }


    if (!lowQualityMode && !isMobile) {
      requestAnimationFrame(animate);
    } else if(isMobile && !lowQualityMode) {
          setTimeout(() => requestAnimationFrame(animate), 1000 / 80); // 90 FPS
    } else {
        // Reduce frame rate when in low quality mode
        setTimeout(() => requestAnimationFrame(animate), 1000 / 20); // 20 FPS
  }

    //  renderer.render(scene, camera);
    composer.render();
};




const specialProps = async (data) => {
  console.log('special props --------------------', data)
  if (data.newProps.speed != setSpeed) {
        setSpeed = data.newProps.speed;
        const normalizedSpeed = (setSpeed - 50) / 10;
        
        // Iterate through all object types and update their speeds
        Object.keys(objectData).forEach(type => {
            objectData[type].forEach(item => {
                item.speed = normalizedSpeed;
            });
        });
    } 
    

    if (data.newProps.activeCount != activeCount) {


      activeCount = data.newProps.activeCount % modelQueue.length ;
      if (activeCount >= 0 && activeCount < modelQueue.length) {
        console.log('---------- switch it ---------------')
          switchObject(modelQueue[activeCount]);
      } else {
          console.warn(`Invalid activeCount: ${activeCount}`);
      }
    }
};






const switchObject = async (objectType) => {
    console.log(`Switching to object: ${objectType}`); // Debug log
    


    // Hide all objects first
    Object.keys(objectData).forEach(type => {
        objectData[type].forEach(data => {
            data.mesh.visible = false;
        });
    });

    // Show only the objects of the selected type
    objectData[objectType].forEach(data => {
        data.mesh.visible = true;
    });

    // Update the scene background
    scene.background = new THREE.Color(objectConfig[objectType].backgroundColor);
    
    // Update lighting based on objectType
    setupLighting(objectType);

    // Switch HDR for the current object type
    switchHDR(objectType);
    
    // Track the active object
    activeObject = objectType;


   // Load the next model
   await loadNextModel(objectType);
};








async function loadNextModel(currentObjectType) {
    const currentIndex = modelQueue.indexOf(currentObjectType);
    if (currentIndex === -1) {
        console.error(`Current object type ${currentObjectType} not found in modelQueue`);
        return;
    }

    // Find the next unloaded model
    for (let i = currentIndex + 1; i < modelQueue.length; i++) {
        const nextModelType = modelQueue[i];
        if (!loadedModels[nextModelType]) {
            console.log(`Loading next model: ${nextModelType}`);
            try {
                await loadModelSet(nextModelType);
                setupObjects(loadedModels[nextModelType].high, loadedModels[nextModelType].medium, loadedModels[nextModelType].low, nextModelType);
                
                // Hide objects
                if (objectData[nextModelType]) {
                    objectData[nextModelType].forEach(data => {
                        if (data.mesh) {
                            data.mesh.visible = false;
                        }
                    });
                }
                
                console.log(`Finished loading and setup for ${nextModelType}`);
                return;
            } catch (error) {
                console.error(`Error loading model ${nextModelType}:`, error);
            }
        }
    }

    console.log("All models in queue are loaded");
}



// ==================== Mouse Move ====================
// ==================== Mouse Move ====================
// ==================== Mouse Move ====================

async function onMouseMove(mouse) {
    // if (!raycaster || !objectData[activeObject]) return; // Ensure raycaster is initialized and activeObject data exists

    // Limit raycaster updates for efficiency
    // raycaster.setFromCamera(mouse, camera);

    // Intersect with active objects only
    // for (const data of objectData[activeObject]) {
    //     const intersectedObject = data.mesh;
    //     // console.log(objectData[activeObject])

    //     // Check intersection
    //     const intersects = raycaster.intersectObject(intersectedObject);
    //     console.log(intersects)

        // if (intersects.length > 0) {
        //     console.log(intersectedObject)
            // // Animate movement towards the intersection point
            // const targetPosition = intersects[0].point;
            // const moveSpeed = 0.05; // Adjust the speed of movement

            // // Use lerp to smoothly move towards the target position
            // intersectedObject.position.lerp(targetPosition, moveSpeed);

            // // Rotate the object slightly
            // const rotationAmount = 0.05;
            // intersectedObject.rotation.x += (Math.random() - 0.5) * rotationAmount;
            // intersectedObject.rotation.y += (Math.random() - 0.5) * rotationAmount;
            // intersectedObject.rotation.z += (Math.random() - 0.5) * rotationAmount;
        // }
    // }
}







async function onScroll(data) {

    let scrollY = data.scrollY

    if(scrollY < height * 1.75){
      lowQualityMode = false;
      renderer.setPixelRatio(devicePixelRatio); 
    } else if (scrollY < height * 2.5){
      lowQualityMode = false;
      // if (isMobile){
      //   renderer.setPixelRatio(0.25);
      // }
      // renderer.setPixelRatio(0.85);
    } else if (scrollY < height * 3.25){
      lowQualityMode = true;
      // renderer.setPixelRatio(0.65);
    } else if (scrollY < height * 4){
      lowQualityMode = true;
      // renderer.setPixelRatio(0.25); 
    } else {
      lowQualityMode = true;
      // renderer.setPixelRatio(0.15); 
    }
}





async function toggleVisibility(vis) {

}










export { initThree, onMouseMove, onScroll, specialProps, toggleVisibility, toggleAnimation };
