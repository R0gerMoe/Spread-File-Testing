// // cube.js
// import * as THREE from 'three';
// import * as CANNON from 'cannon-es';

// export function initCube(scene, world) {
//     const cubeSize = 1;
//     const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
//     const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
//     const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
//     scene.add(cubeMesh);
//     cubeMesh.position.set(0, 0, 0);

//     // Initialize cube physics body
//     const cubeBody = new CANNON.Body({
//         mass: 1,
//         position: new CANNON.Vec3(0, 0.5, 0), // Position the cube body exactly at 1 meter
//     });
//     cubeBody.addShape(new CANNON.Box(new CANNON.Vec3(cubeSize / 2, cubeSize / 2, cubeSize / 2))); // Add shape to the body
//     world.addBody(cubeBody);

//     return { cubeMesh, cubeBody };
// }

// export function updateCube(cubeMesh, cubeBody) {
//     // Synchronize mesh position with the physics body
//     cubeMesh.position.copy(cubeBody.position);
//     cubeMesh.quaternion.copy(cubeBody.quaternion);
// }

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function createCube(scene, world) {
    const cubeSize = 1;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cubeMesh);

    // Create cube physics body using Cannon.js
    const cubeBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 0.5, 0),
    });
    cubeBody.addShape(new CANNON.Box(new CANNON.Vec3(cubeSize / 2, cubeSize / 2, cubeSize / 2)));
    world.addBody(cubeBody);

    return { cubeMesh, cubeBody };
}

export function resetCube(cubeBody, cubeMesh) {
    cubeBody.position.set(0, 0.5, 0); // Reset cube position
    cubeBody.velocity.set(0, 0, 0); // Reset velocity
    cubeMesh.position.copy(cubeBody.position); // Update Three.js mesh position
}
