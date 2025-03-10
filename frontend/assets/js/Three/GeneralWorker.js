
import * as THREE from 'three';
import {EventDispatcher} from 'three';
import WebGPU from 'three/examples/jsm/capabilities/WebGPU.js';
import { v4 as uuidv4 } from 'uuid';
import { resizeRendererToDisplaySize, dispose_three } from '~/assets/js/Three/HelperFunctions.js';

  
const scenesData = {};  // Store scene-related data here
let activeScenes = []; 
let canvas
let mainRenderer
let composer
let camera



const state = {
    width: 0,
    height: 0,
    canvas_width: 0,
    canvas_height: 0,
    top: 0,
    left: 0,
    devicePixelRatio: 0,
    time: 0,
    mouse: { x: 0, y: 0 },
    is_visible: true,
    speed:1,
  }





// ==================== Receive messages from the main thread ====================
// ==================== Receive messages from the main thread ====================
// ==================== Receive messages from the main thread ====================





self.addEventListener('message', function(e) {

    const handlers = {
      init, setState, handleResize, dispose_it, togVis,
      makeProxy, setSpecialProps, event: proxyManager.handleEvent
    };

    const fn = handlers[ e.data.type ];
    if ( typeof fn !== 'function' ) {
      throw new Error( 'no handler for type: ' + e.data.type );
    }
      fn( e.data );

    }, false);





// ==================== Set New State ====================
// ==================== Set New State ====================
// ==================== Set New State ====================



function setState(data) {
  Object.keys(data.state).forEach(key => {
      state[key] = data.state[key]; // Update the state
      if (key === 'is_visible') {
        // handleVisibility(data.name, data.state[key])
          // if (newState.state[key]) {
            // if  (!isAnimating) {
            //   // animate(); // Start animation if visible
            // }
          // }
          
      }
  });
}



// ==================== Import Init And All Functions For Specific Element ====================
// ==================== Import Init And All Functions For Specific Element ====================
// ==================== Import Init And All Functions For Specific Element ====================



async function init(data) {
  console.log(' received init', data);
  setState(data);

  if(!canvas){
    canvas = data.canvas
  }

  if(!mainRenderer){
    if (data.useComposer){
    mainRenderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      canvas, 
      antialias: false,
      stencil: false,
      logarithmicDepthBuffer: true,
      depth: false,
      powerPreference: "high-performance",
      precision: 'highp' });
  } else {
    mainRenderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      canvas, 
      antialias: true,
      stencil: false,
      logarithmicDepthBuffer: false,
      depth: true,
      powerPreference: "high-performance",
      precision: 'highp' });
  }
}


  const proxy = proxyManager.getProxy(data.canvasId);
  console.log('proxy', proxy);

  // Check if the device is mobile based on screen width
  const isMobile = data.state.width < 768;

  
  // Helper function for loading a scene
  const loadScene = async (sceneName, key) => {
    const module = await import(`~/assets/js/Three/Elements/${sceneName}.js`);
    const sceneResult = await module.initThree(canvas, proxy, mainRenderer, data.scenes[key], data.state);
    scenesData[key] = {
      id: uuidv4(),
      threeName: sceneName,
      proxy: proxy,
      renderer: mainRenderer,
      composer: sceneResult.composer,
      scene: sceneResult.scene,
      camera: sceneResult.camera,
      controls: sceneResult.controls,
      sceneAssets: sceneResult.sceneAssets,
      isVisible: false,
      state: {
        width: data.state.width,
        height: data.state.height,
        canvas_width: data.state.canvas_width,
        canvas_height: data.state.canvas_height,
        top: data.state.top,
        left: data.state.left,
        devicePixelRatio: data.state.devicePixelRatio,
      }
    };
  };

  // First load the scenes with immediateRender: true
  for (const key in data.scenes) {
      const sceneData = data.scenes[key];
    if (sceneData.immediateRender && (!isMobile || sceneData.includeMobile !== false)) {
        console.log('----------- sceneData.threeName IMMEDIATE ----------', sceneData.threeName)
        await loadScene(sceneData.threeName, key);
        toggleSceneVisibility([0]);
    }
  }

  // Then load the other scenes with a delay
  for (const key in data.scenes) {
      const sceneData = data.scenes[key];
      if (!sceneData.immediateRender && (!isMobile || sceneData.includeMobile !== false)) {
        const delay = 800; // Set the desired delay for non-immediate renders
        console.log('----------- sceneData.threeName DELAY ----------', sceneData.threeName)
        await new Promise((resolve) => setTimeout(() => resolve(loadScene(sceneData.threeName, key)), delay));
      }
  }


}



// ==================== Toggle Visibility ====================


// New function to toggle scene visibility
async function toggleSceneVisibility(sceneKeys) {
  const newActiveScenes = sceneKeys.map(key => parseInt(key));

  // Deactivate all scenes not in sceneKeys
  for (const key in scenesData) {
    const sceneKey = parseInt(key);
    if (!newActiveScenes.includes(sceneKey)) {
      if (scenesData[key].isVisible) {
        await stopSceneAnimation(key);
      }
    }
  }
  
  // Activate specified scenes
  for (const key of newActiveScenes) {
    if (scenesData[key] && !scenesData[key].isVisible) {
      await startSceneAnimation(key);
    }
  }
  
  // Update activeScenes array
  activeScenes = newActiveScenes;
  console.log('activeScenes ------ >', activeScenes);
}

async function startSceneAnimation(key) {
  const sceneData = scenesData[key];
  sceneData.isVisible = true;
  const module = await import(`~/assets/js/Three/Elements/${sceneData.threeName}.js`);
  module.toggleAnimation(sceneData, true);
}

async function stopSceneAnimation(key) {
  const sceneData = scenesData[key];
  sceneData.isVisible = false;
  const module = await import(`~/assets/js/Three/Elements/${sceneData.threeName}.js`);
  module.toggleAnimation(sceneData, false);
}

async function togVis(data) {
  if (data.visibility) {
    await toggleSceneVisibility([parseInt(data.targetScene)]);
  } else {
    const previousScene = findPreviousVisibleScene(parseInt(data.targetScene));
    if (previousScene !== null) {
      await toggleSceneVisibility([previousScene]);
    } else {
      // If no previous scene, turn off all animations
      for (const key in scenesData) {
        if (scenesData[key].isVisible) {
          await stopSceneAnimation(key);
        }
      }
      activeScenes = [];
    }
  }
}

function findPreviousVisibleScene(currentScene) {
  for (let i = currentScene - 1; i >= 0; i--) {
    if (scenesData[i] && scenesData[i].isVisible) {
      return i;
    }
  }
  return null;
}



// ==================== Handle Visibility ====================
// ==================== Handle Visibility ====================
// ==================== Handle Visibility ====================


async function handleVisibility(name, vis) {
  if (name == 'Bananas'){
    console.log('VISISIISIII -----------------------------', vis)
  }
  const { toggleVisibility } = await import( `~/assets/js/Three/Elements/${name}.js`);
  toggleVisibility(vis);
}





// ==================== Handle Resize ====================
// ==================== Handle Resize ====================
// ==================== Handle Resize ====================


async function handleResize(data) {
  const { width, height } = data.state;

  for (const key in scenesData) {
      const sceneData = scenesData[key];
      resizeRendererToDisplaySize(
          sceneData.renderer || mainRenderer, 
          sceneData.composer, 
          sceneData.camera, 
          width, 
          height
      );
      
      // Update scene state
      sceneData.state.width = width;
      sceneData.state.height = height;
    }
  }


// ==================== Use Mouse Coordinates ====================
// ==================== Use Mouse Coordinates ====================
// ==================== Use Mouse Coordinates ====================



async function handleMouseMove(data, name) {

  const mouseX = ((data.clientX - state.left) / state.canvas_width) * 2 - 1;
  const mouseY = -((data.clientY - data.top) / state.canvas_height) * 2 + 1; 

  const mouse = new THREE.Vector3();
  mouse.x = mouseX;
  mouse.y = mouseY;


    const { onMouseMove } = await import( `~/assets/js/Three/Elements/${name}.js`);
    onMouseMove(mouse);
}



// ==================== Handle Mouse Down ====================
// ==================== Handle Mouse Down ====================
// ==================== Handle Mouse Down ====================


async function handleMouseUpDown(data, name) {
  const { onMouseUpDown } = await import( `~/assets/js/Three/Elements/${name}.js`);
  onMouseUpDown(data); 
}





// ==================== Handle Double Click ====================
// ==================== Handle Double Click ====================
// ==================== Handle Double Click ====================


async function handleDoubleClick(data, name) {

  // toggleSceneVisibility([1]); // Activate the first scene


  const clickX = ((data.clientX - state.left) / state.canvas_width) * 2 - 1;
  const clickY = -((data.clientY - data.top) / state.canvas_height) * 2 + 1; 


  const click = new THREE.Vector3();
  click.x = clickX;
  click.y = clickY;

  const { onDoubleClick } = await import( `~/assets/js/Three/Elements/${name}.js`);
  onDoubleClick(click);
}


// ==================== Handle Scroll ====================
// ==================== Handle Scroll ====================
// ==================== Handle Scroll ====================


async function handleScroll(data, name) {

  //normalize mouse position from smooth scroll
  // handleMouseMove(data, name)

  const mouseX = ((data.clientX - state.left) / state.canvas_width) * 2 - 1;
  const mouseY = -((data.clientY - data.top) / state.canvas_height) * 2 + 1; 

  const mouse = new THREE.Vector3();
  mouse.x = mouseX;
  mouse.y = mouseY;

  
    const { onScroll } = await import( `~/assets/js/Three/Elements/${name}.js`);
    onScroll(data, mouse);

  
}



// ==================== SetSpeed ====================
// ==================== SetSpeed ====================
// ==================== SetSpeed ====================

async function setSpecialProps(data){
  const name = scenesData[parseInt(data.targetScene)].threeName
  const { specialProps } = await import( `~/assets/js/Three/Elements/${name}.js`);
  specialProps(data);

}



// ==================== Dispose ====================
// ==================== Dispose ====================
// ==================== Dispose ====================


async function dispose_it() {

    console.log('---------- dispose ----------');
    console.log('---------- dispose ----------');
    console.log('---------- dispose ----------');
    console.log('---------- dispose ----------');
    console.log('---------- dispose ----------');
    console.log('---------- dispose ----------');
    console.log('---------- dispose ----------');
    console.log('---------- dispose ----------');


    for (const key in scenesData) {
      const sceneData = scenesData[key];
      const name = scenesData[key].threeName
      const module = await import(`~/assets/js/Three/Elements/${name}.js`);
      module.toggleAnimation(sceneData, false);

      dispose_three(mainRenderer, scenesData[key].scene, scenesData[key].camera);

      console.log('---------- dispose ---------- zzzzzzzz');
      console.log('---------- dispose ---------- zzzzzzzz');
      console.log('---------- dispose ---------- zzzzzzzz');
      console.log('---------- dispose ---------- zzzzzzzz');
  
    }

    console.log('---------- dispose ---------- aaaaa');



 }
  


 // ==================== Proxy ====================
  // ==================== Proxy ====================
   // ==================== Proxy ====================

   
   function noop() {
   }
   
   class ElementProxyReceiver extends EventDispatcher {
   
     constructor() {
   
       super();
       // because OrbitControls try to set style.touchAction;
       this.style = {};
   
     }
     get clientWidth() {
   
       return this.width;
   
     }
     get clientHeight() {
   
       return this.height;
   
     }
     // OrbitControls call these as of r132. Maybe we should implement them
     setPointerCapture() { }
     releasePointerCapture() { }
     getBoundingClientRect() {
   
       return {
         left: this.left,
         top: this.top,
         width: this.width,
         height: this.height,
         right: this.left + this.width,
         bottom: this.top + this.height,
       };
   
     }
     handleEvent( data, name ) {
   
       if ( data.type === 'size' ) {
   
         this.left = data.left;
         this.top = data.top;
         this.width = data.width;
         this.height = data.height;
         return;
   
       }

       if (data.type === 'pointermove') {
        handleMouseMove(data, name)
       }

       if (data.type === 'mousedown' || data.type === 'mouseup') {
        handleMouseUpDown(data, name);
      }
      
       if (data.type === 'dblclick'){
        handleDoubleClick(data, name)
       }

       if (data.type == 'wheel'){
        handleScroll(data, name)
       }

   
       data.preventDefault = noop;
       data.stopPropagation = noop;
       this.dispatchEvent( data );
   
     }
     focus() {
       // no-op
     }
   
   }
   
   class ProxyManager {
   
     constructor() {
   
       this.targets = {};
       this.handleEvent = this.handleEvent.bind( this );
   
     }
     makeProxy( data ) {
   
       const { id } = data;
       const proxy = new ElementProxyReceiver();
       console.log('makeProxy', id, proxy);
       this.targets[ id ] = proxy;
   
     }
     getProxy( id ) {
      
       return this.targets[ id ];
   
     }
     handleEvent( data ) {
      this.targets[ data.id ].handleEvent( data.data, data.name );
      // console.log('--------- event Name ----------', data.name)
     }

   
   }
   

   
   const proxyManager = new ProxyManager();
   
   function makeProxy( data ) {
   
     proxyManager.makeProxy( data );
   
   }
   










   