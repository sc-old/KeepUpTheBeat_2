import * as THREE from "three";
import { getBody, getMouseBall } from "~~/assets/js/Three/Physics/GravityGetBodies.js";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
console.log("Loaded")
self.onmessage = function (e) {
    const data = e.data;
    if (data.type === 'init') {
        init(width = data.width, height = data.height);
        console.log("Loaded")
    }
    if (data.type === 'mousemove') {
        handleMouseMove(data);
    }
    
}

function init(width, height) {
    const w = width;
    const h = height;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.body.appendChild(renderer.domElement);

    let mousePos = new THREE.Vector2();

    RAPIER.init().then(() => {
        const gravity = { x: 0.0, y: 0, z: 0.0 };
        const world = new RAPIER.World(gravity);

        // post-processing
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
        bloomPass.threshold = 0.005;
        bloomPass.strength = 2.0;
        bloomPass.radius = 10;
        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        const numBodies = 100;
        const bodies = [];
        for (let i = 0; i < numBodies; i++) {
            const body = getBody(RAPIER, world);
            bodies.push(body);
            scene.add(body.mesh);
        }

        const mouseBall = getMouseBall(RAPIER, world);
        scene.add(mouseBall.mesh);

        const hemiLight = new THREE.HemisphereLight(0x00bbff, 0xaa00ff);
        hemiLight.intensity = 0.2;
        scene.add(hemiLight);

        animate();
    });
}

function animate() {
    requestAnimationFrame(animate);
    world.step();
    mouseBall.update(mousePos);
    bodies.forEach(b => b.update());
    composer.render(scene, camera);
    // controls.update();
}



function handleWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

// mouse move handler
function handleMouseMove (evt) {
    mousePos.x = (evt.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(evt.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', handleMouseMove, false);