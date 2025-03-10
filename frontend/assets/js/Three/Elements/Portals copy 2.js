import * as THREE from 'three';
import { OrbitControls } from '~~/assets/js/Three/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { resizeRendererToDisplaySize } from '~~/assets/js/Three/HelperFunctions.js';
import { MeshPortalMaterial, ManagePortalScene } from '~~/assets/js/Three/Materials/MeshPortalMaterial';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';   




let composer, controls, scene, camera, renderer, raycaster;
let width, height, canvas_width, canvas_height
const loader = new GLTFLoader();
let aspect
let proxyX


async function initThree(data, proxy) {
    const { canvas, state } = data;
    width = state.width
    height = state.height
    canvas_width = state.canvas_width
    canvas_height = state.canvas_height
    proxyX = proxy

    // Scene setup
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, canvas_width / canvas_height, 0.001, 1000);
    camera.position.set(0, 0, 5);
    raycaster = new THREE.Raycaster();

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        stencil: false,
        depth: true,
         powerPreference: "high-performance",
        precision: "highp"
    });

    

    // Controls
    controls = new OrbitControls(camera, proxy);
    controls.enableDamping = true;
    controls.update();
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.minPolarAngle = 0;      // Restrict vertical rotation
    controls.maxPolarAngle = Math.PI / 2;

    // Create frames
    const frames = [
        { 
            id: '01', 
            name: 'pick\nles', 
            author: 'Omar Faruq Tawsif', 
            bg: 0xe4cdac, 
            position: [-2.5, 0, 0], 
            rotation: [0, 0.5, 0], 
            modelPath: '/portals/cutBoard.glb',
            modelScale: 1.3, 
            modelPosition: [-5, -0.7, -0.5],
            modelRotation: [0, 0.01, 0],
            textPosition: [1.2, 1.1, 0.0085] 
        },
        { 
            id: '02', 
            name: 'tea', 
            author: 'Omar Faruq Tawsif', 
            bg: 0xffffff, 
            position: [0, 0, 0], 
            rotation: [0, 0, 0], 
            modelPath: '/portals/tea.glb', 
            modelScale: 0.8, 
            modelPosition: [0, -1.5, -0.65],
            modelRotation: [0, 160, 0],
            textPosition: [0.8, 1.15, 0.0085] 
        },
        { 
            id: '03', 
            name: 'watermellon', 
            author: 'Omar Faruq Tawsif', 
            bg: 0xd1d1ca, 
            position: [2.5, 0, 0], 
            rotation: [0, -0.5, 0], 
            modelPath: '/portals/watermellon.glb',
            modelScale: 35, 
            modelPosition: [4.5, -0.75, -0.5],
            modelRotation: [0.005, 0.005, 0.005],
            textPosition: [100, 1.15, 0.0085] 
        }
    ];
    await Promise.all(frames.map(createFrame));
    resizeRendererToDisplaySize(renderer, composer, camera, width, height);
    animateOuterPortal();
    return { renderer, composer, scene, camera, controls };
}



async function createFrame({ id, name, author, bg, position, rotation, modelPath, modelScale, modelPosition, modelRotation, textPosition }) {
    const group = new THREE.Group();
    group.position.set(...position);
    group.rotation.set(...rotation);

    const width = 2;
    const height = 3.23606797749; // Golden ratio
    aspect = 2 / 3.23606797749;
    const radius = 0.2;








    const rtScene = new THREE.Scene();
    rtScene.background = new THREE.Color('#7dc9e3');


    const rtCamera = new THREE.PerspectiveCamera(35, aspect, 0.001, 1000);
    rtCamera.position.set(0, 0, 0); // Center of the portal
    rtCamera.lookAt(0, 0, 0); 



        // Define the size of the orthographic view
   
        // Create an OrthographicCamera
    //     const rtCamera = new THREE.OrthographicCamera(
    //         -width / 2,   // left
    //         width / 2,    // right
    //         height / 2,   // top
    //         -height / 2,  // bottom
    //         0.1,          // near
    //         10           // far
    //     );
    //   rtCamera.position.set(0, 0, 0)
    //   rtCamera.lookAt(0, 0, 0)

    // controls.target.set(0, 0, -2);




    // Create render target
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);
    renderTarget.texture.minFilter = THREE.LinearFilter;
    renderTarget.texture.magFilter = THREE.LinearFilter;
    renderTarget.texture.generateMipmaps = false;


    // Load font and create text geometry
    let font;
    const loadFont = new Promise((resolve, reject) => {
        const fontLoader = new FontLoader();
        fontLoader.load('/fonts/sf.json', (loadedFont) => {
            font = loadedFont;
            console.log('Font loaded successfully');
            resolve();
        }, undefined, reject);
    });
    

        // After font is loaded
        loadFont.then(() => {
            // Create text geometry for the portal name
            const textGeometry = new TextGeometry(name, {
                font: font,
                size: 0.2, // Adjust text size as needed
                depth: 0.008, // Adjust text thickness
                curveSegments: 12,
            });

            // Debug: Check geometry bounding box
            const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(textGeometry));
            console.log('Text geometry bounding box:', boundingBox);
            const textWidth = boundingBox.max.x - boundingBox.min.x;

            // Position and scale text (adjust as needed)
            textGeometry.center(); // Center the geometry

            // Create a mesh with a red material
            const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: "#fff" }));
            textMesh.scale.set(1, 1, 1);

             // Set position and rotation to match the portal
            // textMesh.position.set(...position);
            // textMesh.position.z += 0.0085
            // textMesh.position.x -=0
            // textMesh.position.y += 1.15
            // textMesh.rotation.set(...rotation);

            console.log("textPosition", textPosition)
    // Apply transformations considering portal's rotation
    const groupRotation = new THREE.Euler(...rotation); 
    const offset = new THREE.Vector3(-textWidth / textPosition[0], textPosition[1], textPosition[2] ).applyEuler(groupRotation);


             //Combine the positions and offset the mesh
    textMesh.position.set(...position).add(offset);

    // If portals are rotated on the Y-axis, adjust for that
    textMesh.rotation.copy(groupRotation);  // Copy rotation from the group


            // Add the text to the scene
            scene.add(textMesh);

            // Render the scene (ensure you have a render function and camera)
            renderer.render(rtScene, camera);
        }).catch((error) => {
            console.error('Error loading font:', error);
        });
    


    // Load model into render target scene
    await new Promise((resolve) => {
        loader.load(modelPath, (gltf) => {

            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.transparent = true;
                    child.material.alphaTest = 0.5; // Adjust this value as needed
                    child.material.side = THREE.DoubleSide;
                }
            });

            gltf.scene.scale.setScalar(modelScale);
            gltf.scene.position.set(...modelPosition);
            gltf.scene.rotation.set(...modelRotation);  
            rtScene.add(gltf.scene);
            resolve();
        });
    });


    
        const geometry = new THREE.PlaneGeometry(width, height);
        
        


// Create a shader material using the defined shaders

    const shaderMat = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: renderTarget.texture },
          resolution: { value: new THREE.Vector2(1024, 1024) },
          cornerRadius: { value: 0.09 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vUv = uv;
          }
        `,
        fragmentShader: `
        uniform sampler2D map;
        uniform vec2 resolution;
        uniform float cornerRadius;
        varying vec2 vUv;
    
        void main() {
          // Calculate aspect ratio and scale the UVs accordingly
          float aspectRatio = resolution.x / resolution.y;
          vec2 uvAdjusted = vUv * vec2(aspectRatio, 1.0);
      
          // Calculate the distance from the center, adjusting for aspect ratio
          vec2 center = vec2(0.5 * aspectRatio, 0.5);
          vec2 dist = abs(uvAdjusted - center);
      
          // Adjust the radius for aspect ratio
          float adjustedRadius = cornerRadius / max(aspectRatio, 1.0);
      
          // Determine if the fragment is within the rounded corner region
          float cornerMask = smoothstep(adjustedRadius - 0.01, adjustedRadius, length(max(dist - vec2(0.5 * aspectRatio - adjustedRadius, 0.5 - adjustedRadius), 0.0)));
      
          // Sample the map texture
          vec4 texColor = texture2D(map, vUv);
      
          // Apply corner mask to alpha
          texColor.a *= (1.0 - cornerMask);
      
          // Output the final color
          gl_FragColor = texColor;
      
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }
        `,
        side: THREE.DoubleSide, // Render both sides of the material
        transparent: true, // Enable transparency
    });
















    

        const mesh = new THREE.Mesh(geometry, shaderMat);
        group.add(mesh);
    

        


    scene.add(group);

    // Store render target info and additional portal data for animation
    mesh.userData.renderTarget = { target: renderTarget, scene: rtScene, camera: rtCamera };
    mesh.userData.portalData = {
        bottomLeftCorner: new THREE.Vector3(-width / 2, -height / 2, 0),
        bottomRightCorner: new THREE.Vector3(width / 2, -height / 2, 0),
        topLeftCorner: new THREE.Vector3(-width / 2, height / 2, 0),
        reflectedPosition: new THREE.Vector3()
    };

    mesh.userData.name = {name:name}

    console.log('SCENE UPLOADED: ', name);
}




function renderPortal(portalMesh) {
    const { target, scene: rtScene, camera: rtCamera } = portalMesh.userData.renderTarget;
    const { reflectedPosition } = portalMesh.userData.portalData;

    // Calculate reflected camera position
    portalMesh.worldToLocal(reflectedPosition.copy(camera.position));
    reflectedPosition.x *= -0.3;
    reflectedPosition.y *= -0.5;
    reflectedPosition.z *= -0.9;
    portalMesh.localToWorld(reflectedPosition);
    rtCamera.position.copy(reflectedPosition);

    // Update rtCamera position and rotation
    rtCamera.position.copy(reflectedPosition);
    rtCamera.quaternion.copy(camera.quaternion);
    rtCamera.rotateY(Math.PI); // Rotate 180 degrees to look back through the portal

    const isLookingFromBack = reflectedPosition.z < 0; // Example condition
    const isLookingAbove = reflectedPosition.y > 2; // Example condition
    const scaleFactorBack = isLookingFromBack ? 1 : 2; // Adjust scale factor as needed
    const scaleFactorAbove = isLookingAbove ? 12.5 : 1; 
    const scaleFactorTotal = scaleFactorBack * reflectedPosition.y

          // // Apply the scale factor to the entire rtScene
            // rtScene.scale.set(scaleFactorBack, scaleFactorBack, scaleFactorBack);

    // Ensure the aspect ratio is correct
    rtCamera.aspect = 2 / 3.23606797749; 
    rtCamera.updateProjectionMatrix();
    rtCamera.position.copy(reflectedPosition).add(new THREE.Vector3(0, 0, 0));

    // Disable frustum culling for the render target scene
    // rtScene.traverse((object) => {
    //     object.frustumCulled = false;
    //     if (object.isMesh) {
    //         object.scale.set(scaleFactorBack, scaleFactorBack, scaleFactorBack);
    //     }
    // });

    rtScene.scale.set(scaleFactorBack, scaleFactorBack, scaleFactorBack);

    // Save current render state
    const currentRenderTarget = renderer.getRenderTarget();
    const currentShadowMapEnabled = renderer.shadowMap.enabled;

    // Disable shadows for the render target rendering
    renderer.shadowMap.enabled = false;

    // Set the render target and clear it
    renderer.setRenderTarget(target);
    renderer.setClearColor(0x000000, 0); // Clear with transparent background if needed
    renderer.clear(true, true, true); // Clear color, depth, and stencil buffers

    // Render the scene into the render target
    renderer.render(rtScene, rtCamera);

    // Restore renderer state
    renderer.setRenderTarget(currentRenderTarget);
    renderer.shadowMap.enabled = currentShadowMapEnabled;
}






function enterPortal(portalMesh) {
    const { target, scene: rtScene, camera: rtCamera } = portalMesh.userData.renderTarget;

    // Disable controls during transition
    controls.enabled = false;

    // Store the original scene and camera properties
    const originalScene = scene;
    const originalFOV = camera.fov;
    const targetFOV = originalFOV * 0.9; // Subtle zoom: reduce FOV by 10%

    // Set up animation parameters
    const animationDuration2 = 800; // 2 seconds
    const startTime = Date.now();

    // Create render targets for blending
    const renderTarget1 = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
    });
    const renderTarget2 = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
    });

    // Create a full-screen quad for blending
    const blendMaterial = new THREE.ShaderMaterial({
        uniforms: {
            tDiffuse1: { value: null },
            tDiffuse2: { value: null },
            mixRatio: { value: 0.0 }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D tDiffuse1;
            uniform sampler2D tDiffuse2;
            uniform float mixRatio;
            varying vec2 vUv;

            void main() {
                vec4 texel1 = texture2D(tDiffuse1, vUv);
                vec4 texel2 = texture2D(tDiffuse2, vUv);
                gl_FragColor = mix(texel1, texel2, mixRatio);
            }
        `
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blendMaterial);
    const blendScene = new THREE.Scene();
    blendScene.add(quad);



    // Animation function
    function animateTransition() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration2, 1);

        // Update FOV for zoom effect
        // camera.fov = THREE.MathUtils.lerp(originalFOV, targetFOV, progress);
        // camera.updateProjectionMatrix();

        // Update the controls
        controls.update();

        // Render original scene to render target 1
        renderer.setRenderTarget(renderTarget1);
        renderer.render(scene, camera);

        // Render portal scene to render target 2
        renderer.setRenderTarget(renderTarget2);
        renderer.render(rtScene, camera); // Use the same camera for both scenes

        // Blend the two render targets
        blendMaterial.uniforms.tDiffuse1.value = renderTarget1.texture;
        blendMaterial.uniforms.tDiffuse2.value = renderTarget2.texture;
        blendMaterial.uniforms.mixRatio.value = progress;

        // Render the blended result to the screen
        renderer.setRenderTarget(null);

        // renderer.render(blendScene, new THREE.PerspectiveCamera(75, aspect, 0.01, 1000));
        renderer.render(blendScene, new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1));

        if (progress < 1) {
            requestAnimationFrame(animateTransition);
            camera.position.set(0,2.5,2.5); // Set position like this
            camera.lookAt(new THREE.Vector3(10,0,0)); // Set look at coordinate like this
            
        } else {
            // Transition complete
            scene = rtScene;
            controls.enabled = true;

            // camera = rtCamera
            camera.position.set(0,2.5,2.5); // Set position like this
            camera.lookAt(new THREE.Vector3(10,0,0)); // Set look at coordinate like this
            

            // rtScene.traverse((object) => {
            //     object.frustumCulled = true;
            //     if (object.isMesh) {
            //         object.scale.set(1, 1, 1);
            //     }
            // });

            scene.scale.set(1, 1, 1);




            // Clean up
            renderTarget1.dispose();
            renderTarget2.dispose();
            blendMaterial.dispose();
            quad.geometry.dispose();
            blendScene.remove(quad);

            // Clean up original scene
            originalScene.traverse((object) => {
                if (object.isMesh) {
                    object.geometry.dispose();
                    object.material.dispose();
                }
            });
        }
    }

    // Start the animation
    animateTransition();
}







let isAnimatingClick = false;
let animationDuration = 2.5; // seconds
let targetCameraPosition = new THREE.Vector3();
let targetLookAt = new THREE.Vector3();
let startTime;
let initialCameraPosition = null;
let initialLookAt = null;
let initialQuaternion = null

let lerpCenter = false
let autoR = true

const animateOuterPortal = () => {
  requestAnimationFrame(animateOuterPortal);

  if (isAnimatingClick) {
    const elapsedTime = (performance.now() - startTime) / 1000;
    const t = Math.min(elapsedTime / animationDuration, 1);
    const easedT = easeInOutCubic(t);



    if (!lerpCenter){
        // camera.position.lerpVectors(initialCameraPosition, new THREE.Vector3(0, 0, 4), easedT);
        const startTargetX = camera.position.clone();
        camera.position.lerpVectors(startTargetX, new THREE.Vector3(startTargetX.x, 0, startTargetX.z), 0.25);
        if (autoR){
        if (startTargetX.x > 1 || startTargetX.x < -1){
            controls.autoRotate = true;
            controls.autoRotateSpeed = 80;
            controls.enableDamping = false;
        } else{
            if (startTargetX.z > 0){
            autoR = false
            }
        }
    } else{
        controls.autoRotate = false;
        controls.enableDamping = true;
        autoR = false
        lerpCenter = true
    }
        if (t >= 0.3) {
            lerpCenter = true
            controls.autoRotate = false;
            controls.enableDamping = true;
        }
    } else {
        // Interpolate position
        camera.position.lerpVectors(camera.position.clone(), targetCameraPosition, easedT);
        const interpolationFactor = Math.min(elapsedTime / 0.85, 1);
        controls.target.lerpVectors(new THREE.Vector3(0, 0, 0), targetLookAt.clone(), interpolationFactor);
    }



    if (t >= 1) {
      isAnimatingClick = false;
      console.log("Animation completed.");
      camera.position.set(0,2.5,2.5); // Set position like this
      camera.lookAt(new THREE.Vector3(10,0,0)); // Set look at coordinate like this
      

    }
  }

  controls.update();
//   portalMaterials.forEach(material => material.update(renderer));

    // Render each frame's render target
    scene.traverse((object) => {
        if (object.isMesh && object.userData.renderTarget) {
            renderPortal(object);
        }
    });

  renderer.render(scene, camera);
};



function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}










let mousePosition = new THREE.Vector3();
let planeNormal = new THREE.Vector3(0, 0, 1);
let plane = new THREE.Plane(planeNormal, 0);

let lastIntersectedPortal = null;

function onMouseMove(mouse) {

  
    // Convert mouse coordinates to 3D space
    mousePosition.set(mouse.x, mouse.y, 0.5);
    mousePosition.unproject(camera);

    // Calculate the intersection of the mouse ray with a plane at z=0
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, mousePosition);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData.renderTarget) {
            // We've intersected with a portal
            
            // Check if it's a new portal
            // if (lastIntersectedPortal !== intersectedObject) {
            //     lastIntersectedPortal = intersectedObject;
 
            // }
        } else {
            lastIntersectedPortal = null;
        }
    } else {
        lastIntersectedPortal = null;
    }
}


let clickPosition = new THREE.Vector3();
function onDoubleClick(click){

    console.log('clickedIt', click)
     // Convert click coordinates to 3D space
     clickPosition.set(click.x, click.y, 0.5);
     clickPosition.unproject(camera);
 
     // Calculate the intersection of the click ray with a plane at z=0
     raycaster.setFromCamera(click, camera);
     raycaster.ray.intersectPlane(plane, clickPosition);
 
     const intersects = raycaster.intersectObjects(scene.children, true);
     console.log(' intersects', intersects)
     if (intersects.length > 0) {
         const intersectedObject = intersects[0].object;
         if (intersectedObject.userData.renderTarget) {
                console.log('intersected Object', intersectedObject)
                 handleDoubleClick(intersectedObject);

         } 
}
}







const handleDoubleClick = (portalMesh) => {
    // const portalMesh = portalMeshes[index];
    // const portalPosition = portalMesh.position.clone();
    // const portalRotation = portalMesh.rotation.clone();

    const portalPosition = portalMesh.parent.position.clone();
    const portalRotation = portalMesh.parent.rotation.clone();

    console.log('portalPosition', portalPosition)
    
    
    // Calculate the normal vector based on the portal's rotation
    const portalNormal = new THREE.Vector3(0, 0, 1).applyEuler(portalRotation);
  
    // Set target camera position
    targetCameraPosition = portalPosition.clone().add(portalNormal.multiplyScalar(0.1));
    targetLookAt = portalPosition.clone();
  
    startTime = performance.now();
    isAnimatingClick = true;
    initialCameraPosition = camera.position.clone();
    initialQuaternion = camera.quaternion.clone();
  
    setTimeout(() => {
        enterPortal(portalMesh);
    }, (animationDuration * 1000 ) / 1.8);
   
  
  };
  
  
  

  


function specialProps(data) {
    // todo: Implement special properties functionality
}

export { initThree, onMouseMove, specialProps, onDoubleClick };
