import * as THREE from 'three';
import { OrbitControls } from '~~/assets/js/Three/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { resizeRendererToDisplaySize } from '~~/assets/js/Three/HelperFunctions.js';

let composer, controls, scene, camera, renderer, raycaster;
let width, height, canvas_width, canvas_height
const loader = new GLTFLoader();


async function initThree(data, proxy) {
    const { canvas, state } = data;
    width = state.width
    height = state.height
    canvas_width = state.canvas_width
    canvas_height = state.canvas_height

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, canvas_width / canvas_height, 0.01, 1000);
    camera.position.set(0, 0, 5);
    raycaster = new THREE.Raycaster();

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        stencil: false,
        depth: false,
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
        { id: '01', name: 'pick\nles', author: 'Omar Faruq Tawsif', bg: 0xe4cdac, position: [-2.5, 0, 0], rotation: [0, 0.5, 0], modelPath: '/portals/cutBoard.glb',
             modelScale: 1.3, modelPosition: [-5, -0.7, -0.5] },
        { id: '02', name: 'tea', author: 'Omar Faruq Tawsif', bg: 0xffffff, position: [0, 0, 0], rotation: [0, 0, 0], modelPath: '/portals/tea.glb', 
            modelScale: 0.5, modelPosition: [0, -1, -0.5] },
        { id: '03', name: 'still', author: 'Omar Faruq Tawsif', bg: 0xd1d1ca, position: [2.5, 0, 0], rotation: [0, -0.5, 0], modelPath: '/portals/watermellon.glb',
             modelScale: 35, modelPosition: [4.5, -0.75, -0.5] }
    ];

    await Promise.all(frames.map(createFrame));
    resizeRendererToDisplaySize(renderer, composer, camera, width, height);
    animate();
    return { renderer, composer, scene, camera, controls };
}



async function createFrame({ id, name, author, bg, position, rotation, modelPath, modelScale, modelPosition }) {
    const group = new THREE.Group();
    group.position.set(...position);
    group.rotation.set(...rotation);

    const width = 2;
    const height = 3.23606797749; // Golden ratio
    const aspect = 2 / 3.23606797749;
    const radius = 0.2;



    // Create render target
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);
    renderTarget.texture.minFilter = THREE.LinearFilter;
    renderTarget.texture.magFilter = THREE.LinearFilter;
    renderTarget.texture.generateMipmaps = false;



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


    


    // Load model into render target scene
    await new Promise((resolve) => {
        loader.load(modelPath, (gltf) => {
            gltf.scene.scale.setScalar(modelScale);
            gltf.scene.position.set(...modelPosition);
            rtScene.add(gltf.scene);
            resolve();
        });
    });


    
        const geometry = new THREE.PlaneGeometry(width, height); 
    
// Create the shader material
const materialx = new THREE.ShaderMaterial({
    uniforms: {
        texture1: { value: renderTarget.texture }, // The texture to apply
        radius: { value: 0.2 }, // Radius for the effect
        opacity: { value: 1.0 }, // Opacity of the material
        exposure: { value: 1.0 }, // Exposure level for tone mapping
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D texture1;
        uniform float radius;
        uniform float opacity;
        uniform float exposure;
        varying vec2 vUv;

        vec3 ACESFilmicToneMapping(vec3 color) {
            color *= exposure / 0.9;
            color = clamp(color, vec3(0.0), vec3(1.0));
            color = (color * (color * 2.91 + 0.1)) / (color * (color * 2.43 + 0.39) + 0.14);
            return clamp(color, vec3(0.0), vec3(1.0));
        }

        void main() {
            vec2 center = vec2(0.5); // Center of the effect
            vec2 dist = abs(vUv - center);
            float smoothRadius = radius * 0.5;

            // Determine if the fragment is within the rounded corner region
            float cornerMask = smoothstep(smoothRadius, smoothRadius, length(max(dist - center + smoothRadius, 0.0)));

            // Get the texture color
            vec4 texColor = texture2D(texture1, vUv);

            // Apply the corner mask only to the alpha channel
            texColor.a *= (1.0 - cornerMask) * opacity;

            // Apply tone mapping
            texColor.rgb = ACESFilmicToneMapping(texColor.rgb);

            // Output the final color
            gl_FragColor = texColor;
        }
    `,
    side: THREE.DoubleSide, // Render both sides of the material
    transparent: true, // Enable transparency
});

// Set the renderer's output encoding
renderer.outputEncoding = THREE.sRGBEncoding; // Use sRGB encoding for accurate color display

// Add the material to a mesh (example usage)
// const geometry = new THREE.PlaneGeometry(1, 1);
// const mesh = new THREE.Mesh(geometry, materialx);
// scene.add(mesh);
    
        // Create material using render target as texture
        // const material = new THREE.MeshBasicMaterial({
        //     map: renderTarget.texture,
        //     side: THREE.DoubleSide
        // });
    
        const mesh = new THREE.Mesh(geometry, materialx);
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
    rtScene.traverse((object) => {
        object.frustumCulled = false;
        if (object.isMesh) {
            object.scale.set(scaleFactorBack, scaleFactorBack, scaleFactorBack);
        }
    });

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
    const animationDuration = 1000; // 2 seconds
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

       // Ensure the camera faces the portal
   const portalPosition = new THREE.Vector3();
   portalMesh.getWorldPosition(portalPosition);
   const cameraPosition = camera.position.clone();

   // Compute the direction to look at the portal
   const direction = portalPosition.sub(cameraPosition).normalize();
   const up = new THREE.Vector3(0, 1, 0); // Up direction in world space

   // Set the camera's target position
   const targetPosition = portalPosition.clone();

   // Create a look-at matrix
   const lookAtMatrix = new THREE.Matrix4().lookAt(cameraPosition, targetPosition, up);
   camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
   camera.rotation.setFromRotationMatrix(lookAtMatrix);
   camera.updateProjectionMatrix();

   

    // Animation function
    function animateTransition() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        // Update FOV for zoom effect
        camera.fov = THREE.MathUtils.lerp(originalFOV, targetFOV, progress);
        camera.updateProjectionMatrix();

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
        renderer.render(blendScene, new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1));

        if (progress < 1) {
            requestAnimationFrame(animateTransition);
        } else {
            // Transition complete
            scene = rtScene;
            controls.enabled = true;

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





function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Render each frame's render target
    scene.traverse((object) => {
        if (object.isMesh && object.userData.renderTarget) {
            renderPortal(object);
        }
    });

    // Render main scene
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
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
            if (lastIntersectedPortal !== intersectedObject) {
                lastIntersectedPortal = intersectedObject;
                enterPortal(intersectedObject);
            }
        } else {
            lastIntersectedPortal = null;
        }
    } else {
        lastIntersectedPortal = null;
    }
}





function specialProps(data) {
    // todo: Implement special properties functionality
}

export { initThree, onMouseMove, specialProps };
