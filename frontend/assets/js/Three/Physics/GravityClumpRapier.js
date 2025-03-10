import { Vector3, Quaternion, Matrix4 } from 'three';
import * as THREE from 'three';
import { World, RigidBodyDesc, ColliderDesc, RigidBodySet, ColliderSet } from '@dimforge/rapier3d-compat';
import RAPIER from '@dimforge/rapier3d-compat';

const frameRate = 120;
let world = null;
let sphereBodies = [];
let desc;
let kinematicBody;
let mousePos;
let animationId;
let isAnimating = false;
let initialAnimation = true

const _vector = new Vector3();
const _position = new Vector3();
const _quaternion = new Quaternion();
const _scale = new Vector3(1, 1, 1);
const _matrix = new Matrix4();

async function RapierPhysics() {
    console.log('RapierPhysics init');

    // Wait for RAPIER to be fully initialized
    await RAPIER.init();

    const gravity = new Vector3(0.0, 0.0, 0.0);
    world = new RAPIER.World(gravity);

    const meshes = [];
    const meshMap = new WeakMap();

    function getShape(geometry) {
        const parameters = geometry.parameters;

        if (geometry.type === 'BoxGeometry') {
            const sx = parameters.width !== undefined ? parameters.width / 2 : 0.5;
            const sy = parameters.height !== undefined ? parameters.height / 2 : 0.5;
            const sz = parameters.depth !== undefined ? parameters.depth / 2 : 0.5;
            return RAPIER.ColliderDesc.cuboid(sx, sy, sz);
        } else if (geometry.type === 'SphereGeometry' || geometry.type === 'IcosahedronGeometry') {
            const radius = parameters.radius !== undefined ? parameters.radius : 1;
            return RAPIER.ColliderDesc.ball(radius);
        }

        console.error('Unsupported geometry type:', geometry.type);
        return null;
    }

    function createBody(position, body_type, quaternion, mass, shape) {
        if (body_type === 'fixed') {
            desc = RAPIER.RigidBodyDesc.fixed().setTranslation(position.x, position.y, position.z);
        } else if (body_type === 'kinematic_position') {
            desc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(position.x, position.y, position.z);
            shape.setActiveCollisionTypes(RAPIER.ActiveCollisionTypes.DEFAULT | RAPIER.ActiveCollisionTypes.KINEMATIC_DYNAMIC);
        } else if (body_type === 'dynamic') {
            desc = RAPIER.RigidBodyDesc.dynamic().setTranslation(position.x, position.y, position.z);
        }

        if (quaternion !== null) {
            desc.setRotation({
                x: quaternion.x,
                y: quaternion.y,
                z: quaternion.z,
                w: quaternion.w,
            });
        }

        const body = world.createRigidBody(desc);

        if (body_type === 'dynamic' || body_type === 'kinematic_position') {
            body.enableCcd(true);
        }

        if (body_type === 'kinematic_position') {
            kinematicBody = body;
        }

        world.createCollider(shape, body);
        return body;
    }

    function createInstancedBody(mesh, body_type, mass, shape, restitution) {
        const array = mesh.instanceMatrix.array;
        const bodies = [];

        for (let i = 0; i < mesh.count; i++) {
            const position = _vector.fromArray(array, i * 16 + 12);
            bodies.push(createBody(position, body_type, null, mass, shape));
        }

        return bodies;
    }

    function addMesh(mesh, body_type = 'dynamic', mass = 1, restitution = 0, friction = 0, linearDamping = 0.65, angularDamping = 0.1) {
        const shape = getShape(mesh.geometry);
        if (shape === null) return;

        shape.setRestitution(restitution);
        shape.setFriction(friction);

        const body = mesh.isInstancedMesh
            ? createInstancedBody(mesh, body_type, mass, shape)
            : createBody(mesh.position, body_type, mesh.quaternion, mass, shape);

        if (mass > 0) {
            meshes.push(mesh);
            meshMap.set(mesh, body);
            if (Array.isArray(body)) {
                sphereBodies.push(...body);
            } else {
                sphereBodies.push(body);
            }
        }
    }

    function setKinematicDynamicCollision(body) {
        const collider = body.collider(0); // Assuming the body has at least one collider
        if (collider) {
            collider.setActiveCollisionTypes(RAPIER.ActiveCollisionTypes.DEFAULT | RAPIER.ActiveCollisionTypes.KINEMATIC_DYNAMIC);
        }
    }

    function addScene(scene) {
        scene.traverse(function (child) {
            if (child.isMesh) {
                const physics = child.userData.physics;
                if (physics) {
                    addMesh(child, physics.body_type, physics.mass, physics.restitution, physics.friction, physics.linearDamping, physics.angularDamping);
                }
            }
        });
    }

    function applyGravitationalForces() {
        const centerThreshold = 2 ** 2;
        const far_threshold = 15 ** 2;
        const forceStrength = 200;
        const low_force_strength = 0;

        for (const body of sphereBodies) {
            if (!body.isDynamic()) continue;

            let dampingFactor = 0.65;
            const position = body.translation();
            const distanceSquared = position.x * position.x + position.y * position.y + position.z * position.z;

            const direction = new RAPIER.Vector3(-position.x, -position.y, -position.z);
            const forceMagnitude = forceStrength / distanceSquared;

            const velocity = body.linvel();
            const dampingForce = new RAPIER.Vector3(
                -velocity.x * dampingFactor,
                -velocity.y * dampingFactor,
                -velocity.z * dampingFactor
            );

            const gravitationalForce = new RAPIER.Vector3(
                direction.x * forceMagnitude,
                direction.y * forceMagnitude,
                direction.z * forceMagnitude
            );

            const totalForce = new RAPIER.Vector3(
                gravitationalForce.x + dampingForce.x,
                gravitationalForce.y + dampingForce.y,
                gravitationalForce.z + dampingForce.z
            );

            const lowTotalForce = new RAPIER.Vector3(
                (gravitationalForce.x + dampingForce.x) * low_force_strength,
                (gravitationalForce.y + dampingForce.y) * low_force_strength,
                (gravitationalForce.z + dampingForce.z) * low_force_strength,
            );

            if (distanceSquared < centerThreshold) {
                const multiply_amount = 0.0005;
                body.resetForces(true);
                body.addForce(lowTotalForce, true);
                body.setLinearDamping(6);
                body.setAngularDamping(6);
                dampingFactor = 5;
            } else if (distanceSquared >= far_threshold) {
                body.resetForces(true);
                body.addForce(totalForce, true);
                body.setLinvel(new RAPIER.Vector3(gravitationalForce.x, gravitationalForce.y, gravitationalForce.z), true);
                body.setAngvel(new RAPIER.Vector3(gravitationalForce.x, gravitationalForce.y, gravitationalForce.z), true);
                dampingFactor = 20; // Damping factor to reduce velocity
            } else {
                body.resetForces(true);
                body.addForce(totalForce, true);
                body.setLinearDamping(5);
                body.setAngularDamping(5);
                dampingFactor = 0;
            }
        }
    }

    function updateKinematicBody(kinematicBody, position) {
        if (position) {
            kinematicBody.setNextKinematicTranslation({
                x: position.mousePosition.x,
                y: position.mousePosition.y,
                z: position.mousePosition.z
            });
        }
    }


    function areAllObjectsStationary() {
        const velocityThreshold = 0.01; // Adjust this value as needed
        for (const body of sphereBodies) {
            if (!body.isDynamic()) continue;
            
            const linVel = body.linvel();
            const angVel = body.angvel();
            
            if (linVel.x**2 + linVel.y**2 + linVel.z**2 > velocityThreshold ||
                angVel.x**2 + angVel.y**2 + angVel.z**2 > velocityThreshold) {
                return false;
            }
        }
        return true;
    }

    

    function mousePosition(position) {
        mousePos = position;
        if (!isAnimating) {
            startAnimation();
        }
    }

    function startAnimation() {
        if (!isAnimating) {
            console.log('Starting animation');
            isAnimating = true;
            animationId = self.setInterval(step, 10 / frameRate);
        }
    }


    function step() {
        applyGravitationalForces();
        world.timestep = 1 / frameRate;
        world.step();

        for (let i = 0, l = meshes.length; i < l; i++) {
            const mesh = meshes[i];

            if (mesh.isInstancedMesh) {
                const array = mesh.instanceMatrix.array;
                const bodies = meshMap.get(mesh);

                for (let j = 0; j < bodies.length; j++) {
                    const body = bodies[j];
                    const position = body.translation();
                    _quaternion.copy(body.rotation());
                    _matrix.compose(position, _quaternion, _scale).toArray(array, j * 16);
                }

                mesh.instanceMatrix.needsUpdate = true;
                mesh.computeBoundingSphere();
            }
        }

        // Update kinematic body (pointer) if it exists
        if (kinematicBody) {
            updateKinematicBody(kinematicBody, mousePos);
        }

        

// Check if all objects are stationary
if (areAllObjectsStationary()) {
    console.log('All objects are stationary. Stopping animation.');
    if(!initialAnimation){
        clearInterval(animationId);
        isAnimating = false;
    }
}
    }

    setTimeout(() => {
        initialAnimation = false
        isAnimating = true;
    }, 300);


    // self.setInterval(step, 10 / frameRate);
    animationId = self.setInterval(step, 10 / frameRate);

    return {
        addScene: addScene,
        addMesh: addMesh,
        mousePosition: mousePosition,
        areAllObjectsStationary: areAllObjectsStationary
    };
}

export default RapierPhysics;
