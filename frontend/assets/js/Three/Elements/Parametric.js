import * as THREE from 'three';
import { OrbitControls } from '~~/assets/js/Three/OrbitControls';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { resizeRendererToDisplaySize } from '~~/assets/js/Three/HelperFunctions.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';



import { 
  astroidalEllipsoid,
  pillow,
  sineSurface,
  romanSurface,
  twistedSphere,
  breather,
  bonanJeenerKlein,
  twistedTorus,
  kleinBottle1,
  kleinBottle2
} from '~/assets/js/Three/ParametricFunctions.js';



const parametricFunctions = {
  astroidalEllipsoid,
  pillow,
  sineSurface,
  romanSurface,
  twistedSphere,
  breather,
  bonanJeenerKlein,
  twistedTorus,
  kleinBottle1,
  kleinBottle2
};

let material, geometry, new_geo, composer, scene, camera, renderer, controls;
let raycaster;
let lastRotation = new THREE.Vector3();
let isRotating = false;
// let paraObject
// let scale

// Add the extension functions
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;




async function initThree(canvas, proxy, mainRenderer, data, state) {

  // const { canvas } = data;
  const { width, height } = state;




  let paraObject = data.specialProps.paraObject
  let paraScale = data.specialProps.scale



  scene = new THREE.Scene();
  // scene.background = new THREE.Color('red');
  
  // Camera
  camera = new THREE.PerspectiveCamera(35, width / height, 0.01, 100);
  camera.position.set(0, 0, 20);
  camera.lookAt(0, 0, 0);
  raycaster = new THREE.Raycaster();


    if(!renderer){
  // renderer = new THREE.WebGLRenderer({
  //   alpha: true, 
  //   canvas, 
  //   antialias: true,
  //   stencil: false,
  //   depth: true,
  //   powerPreference: "high-performance",
  // });

  renderer = mainRenderer

}




  controls = new OrbitControls(camera, proxy);
  controls.target.set(0, 0, 0);
  controls.update();
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = false;
  controls.enableRotate = true;



  // Setup material
  material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, wireframe: false });

  const randomSurface = getRandomParametricSurface();
  geometry = new ParametricGeometry(parametricFunctions[paraObject], 50, 50);
  geometry.computeBoundsTree();
  new_geo = new THREE.Mesh(geometry, material);
  new_geo.scale.set(paraScale, paraScale, paraScale);
  scene.add(new_geo);


  addBoundingSphere();


  const sceneAssets = {new_geo:new_geo, boundingSphere:boundingSphere}
  

  // Attempt to initialize all components
    resizeRendererToDisplaySize(renderer, composer, camera, width, height);

    // animate();

  return { renderer, scene, camera, controls, sceneAssets };
}




let isAnimating

const toggleAnimation = (sceneData, isAnim) => {
  isAnimating = isAnim
  if (isAnim){
    renderer.logarithmicDepthBuffer = true;
    renderer.depth = true;
    animate(sceneData)
  } else{
    renderer.logarithmicDepthBuffer = false;
    renderer.depth = false;
  }
  renderer.clear()
  renderer.autoClearColor = true;
  renderer.autoClear = true
};




let animatedSceneData
// Animate function
const animate = (sceneData) => {
  if (!isAnimating) return;
  requestAnimationFrame(() => animate(sceneData));


  if (!animatedSceneData || animatedSceneData.id !== sceneData.id) {
    animatedSceneData = sceneData;
  } else if (animatedSceneData.id !== sceneData.id){
    animatedSceneData = sceneData;
  }

  

  // Rotate the geometries
  if (!isRotating) {
    animatedSceneData.sceneAssets.new_geo.rotation.x += 0.0075;
    animatedSceneData.sceneAssets.new_geo.rotation.y += 0.0075;
  }

  animatedSceneData.controls.update();

  animatedSceneData.renderer.render(animatedSceneData.scene, animatedSceneData.camera);
};





// ==================== Mouse Move ====================



let boundingSphere;
let boundingSphereRadius;

// Add this in the initThree function, after creating the new_geo
function addBoundingSphere() {
  const box = new THREE.Box3().setFromObject(new_geo);
  const center = box.getCenter(new THREE.Vector3());
  boundingSphereRadius = box.getBoundingSphere(new THREE.Sphere()).radius * 1; // Make it slightly larger

  const sphereGeometry = new THREE.SphereGeometry(boundingSphereRadius, 4, 4);
  const sphereMaterial = new THREE.MeshBasicMaterial({ 
    // color:'red',
    transparent: true, 
    opacity: 0, 
  });
  boundingSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  boundingSphere.position.copy(center);
  scene.add(boundingSphere);
}




async function onMouseMove(mouse) {
  raycaster.setFromCamera(mouse, camera);

  // Check intersection with bounding sphere
  const intersectsSphere = raycaster.intersectObject(boundingSphere);


      // Check if the controls are rotating
      const currentRotation = new THREE.Vector3(controls.getAzimuthalAngle(), controls.getPolarAngle(), 0);
      if (!currentRotation.equals(lastRotation)) {
        isRotating = true;
        new_geo.material.wireframe = true;
      } else {
        isRotating = false;
        new_geo.material.wireframe = false;
      }
      lastRotation.copy(currentRotation);
  

  if (intersectsSphere.length > 0) {
    new_geo.material.wireframe = true;
  } else {
    if (isMousePress != 'mousedown'){
    new_geo.material.wireframe = false;
    }
  }



}

let isMousePress
async function onMouseUpDown(data){
  isMousePress = data.type
}



async function toggleVisibility(vis) {
  if (vis) {
    scene.children.forEach(child => {
      child.visible = true;
    });
    isAnimating = true;
    animate();
  } else {
    scene.children.forEach(child => {
      child.visible = false;
    });
    isAnimating = false;
  }
}



async function onScroll(data, mouse) {


    onMouseMove(mouse)

}





const specialProps = async (data) => {


};









function getRandomParametricSurface() {
  const surfaces = [
    astroidalEllipsoid,
    pillow,
    sineSurface,
    romanSurface,
    twistedSphere,
    breather,
    bonanJeenerKlein,
    twistedTorus,
    kleinBottle1,
    kleinBottle2
  ];
  
  const randomIndex = Math.floor(Math.random() * surfaces.length);
  return surfaces[randomIndex];
}

export { initThree, onMouseMove, onMouseUpDown, onScroll, toggleVisibility, specialProps, toggleAnimation };
