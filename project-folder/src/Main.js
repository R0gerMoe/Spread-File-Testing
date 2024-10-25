import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import * as dat from 'dat.gui';

import { createTexture } from './Texture.js'; // Import Texture module
import { createDog } from './Dog.js';
import {createBottom} from'./Bottom.js'
import { createMeterMarks } from './Mark.js';
import { onMouseWheel } from './Zoom.js';
import { setupPanControls } from './Drag.js' // Import the panning controls

// WebGL Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -100,
    window.innerWidth / 100,
    window.innerHeight / 100,
    window.innerHeight / -100,
    1, 1000
);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);
scene.background = new THREE.Color(0x87ceeb);

// Grid or Graph
const size = 20;
const divisions = 20;
const gridHelper = new THREE.GridHelper(size, divisions, 0x888888, 0x888888);
gridHelper.rotation.x = Math.PI / 2; // Rotate to lie flat on the XY plane
// scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);


// ==========================================================================================
// ==========================================================================================

// Adding Texture
const texture = createTexture(); // Passing the texture images as arguments
scene.add(texture);

// Dog
const dog = createDog(0,0,0);
dog.scale.set(0.5,0.5,0.5)
dog.position.set(0,0.5,1)
// scene.add(dog)

// Add Bottom Texture
const halfBackground = createBottom();
scene.add(halfBackground)

// const marks = createMeterMarks()
// scene.add(marks)

// Add MeterMarker
createMeterMarks(scene)

// Add the event listener
window.addEventListener('wheel', (event) => onMouseWheel(event, camera), false);

// Setup panning controls for the camera
setupPanControls(camera);


// ==========================================================================================
// ==========================================================================================

// Set up Cannon.js physics world
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // No default gravity

// Add lights (optional in 2D, but kept for visibility)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Create Object
// Create a cube
const cubeSize = 1;
const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff , depthTest:false});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Initialize cube body at the correct position (1 meter away from the y-axis)
const cubeBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 0.5, 0), // Position the cube body exactly at 1 meter
});
cubeBody.addShape(new CANNON.Box(new CANNON.Vec3(cubeSize / 2, cubeSize / 2, cubeSize / 2))); // Add shape to the body
world.addBody(cubeBody);

// Refresh function to reset cube
function resetCube() {
    // Reset cube position to exactly 1 meter on the x-axis
    cubeBody.position.set(0, 0.5, 0); 
    cubeBody.velocity.set(0, 0, 0); // Reset velocity to 0
    cubeMesh.position.copy(cubeBody.position); // Update Three.js mesh position
}

// Box position control
const positionSettings = {
    x: cubeBody.position.x,
};


// GUI Setup
const gui = new dat.GUI();

// Create folders for GUI groups
const positionFolder = gui.addFolder('Position & Velocity');
const actionFolder = gui.addFolder('Actions');
// Open the folders by default
positionFolder.open();
actionFolder.open();


// Cube settings for GUI
const cubeSettings = {
    color: cubeMesh.material.color.getHex(),
    axis: 'x', // Control axis: 'x' or 'y'
    velocity: 1, // Control velocity
    paused: false,
    distance: 0, // Added distance tracking
  
    startMoving: () => {
        // Reset position to 1 meter on x-axis, which aligns with the label
        cubeBody.position.set(-0.5, 0.5, 0);
        cubeSettings.distance = 0; // Reset distance
        setCubeVelocity();
        cubeSettings.paused = false;
    },
    togglePause: () => {
        cubeSettings.paused = !cubeSettings.paused;
        if (cubeSettings.paused) {
            cubeBody.velocity.set(0, 0, 0); // Stop the cube
        } else {
            setCubeVelocity(); // Reset velocity on resume
        }
    },
};

// Set cube velocity based on axis
function setCubeVelocity() {
    if (cubeSettings.axis === 'x') {
        cubeBody.velocity.set(cubeSettings.velocity, 0, 0);
    } else {
        cubeBody.velocity.set(0, cubeSettings.velocity, 0);
    }
}
// Create position controls in the GUI
    positionFolder.add(positionSettings, 'x', -10, 10).step(0.1).name('Position X').onChange((value) => {
        cubeBody.position.x = value; // Update the physics body position
        cubeMesh.position.x = value; // Update the mesh position
    });
// gui.add(cubeSettings, 'moveY', 0, 10).name('Position Y').onChange((value) => {
//     cubeBody.position.y = value; // Update the physics body position
//     cubeMesh.position.y = value; // Update the mesh position
// });

// Add GUI controls


    positionFolder.add(cubeSettings, 'axis', ['x', 'y']).name('Move Axis').onChange(() => {
        cubeBody.velocity.set(0, 0, 0); // Stop cube to change direction
        if (!cubeSettings.paused) {
            setCubeVelocity(); // Set velocity based on new axis
        }
    });
    positionFolder.add(cubeSettings, 'velocity', -20, 20).name('Velocity').step(0.1).onChange((value) => {
        cubeBody.velocity.set(0, 0, 0); // Stop the cube
        if (!cubeSettings.paused) {
            setCubeVelocity(); // Set velocity based on selected axis and new value
        }
    });
    positionFolder.add(cubeSettings, 'distance').name('Distance Traveled').listen(); // Add distance display to GUI

    actionFolder.addColor(cubeSettings, 'color').onChange((value) => {
        cubeMesh.material.color.set(value); // Update cube color
    });

    actionFolder.add(cubeSettings, 'startMoving').name('Start Moving');
    actionFolder.add(cubeSettings, 'togglePause').name('Pause/Resume');
    actionFolder.add({ Reset: resetCube }, 'Reset').name('Reset Cube');

    positionFolder.domElement.style.position = 'fixed'; // Use fixed positioning
    positionFolder.domElement.style.top = '80%'; // Position 50% from the top of the screen
    positionFolder.domElement.style.left = '40%'; // Position it slightly left of center
    positionFolder.domElement.style.transform = 'translate(-50%, -50%)'; // Center it correctly
    positionFolder.domElement.style.zIndex = 10; // Ensure it stays above other elements

    // Move the Actions folder to the middle-right
    actionFolder.domElement.style.position = 'fixed'; // Use fixed positioning
    actionFolder.domElement.style.top = '80%'; // Position 50% from the top of the screen
    actionFolder.domElement.style.left = '60%'; // Position it slightly right of center
    actionFolder.domElement.style.transform = 'translate(-50%, -50%)'; // Center it correctly
    actionFolder.domElement.style.zIndex = 10; // Ensure it stays above other elements




// ==========================================================================================
// ==========================================================================================
const distanceDisplay = document.getElementById('distance-display'); // Select the distance display element

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update the physics world
    if (!cubeSettings.paused) {
        world.fixedStep();
    }

    cubeMesh.position.copy(cubeBody.position);
    cubeMesh.quaternion.copy(cubeBody.quaternion);

    // Update distance traveled
    cubeSettings.distance = Math.abs(cubeBody.position.x) + Math.abs(cubeBody.position.y); // Use the length for 2D distance
    cubeSettings.distance = parseFloat(cubeSettings.distance.toFixed(2)); // Ensure two decimal precision

    // Update the HTML distance display
    if (distanceDisplay) {
        distanceDisplay.innerText = `Distance traveled: ${cubeSettings.distance.toFixed(2)}`; // Display distance in the HTML element
    }
    

    renderer.render(scene, camera);
}
animate();
// Handle window resize
window.addEventListener('resize', () => {
    camera.left = window.innerWidth / -200;
    camera.right = window.innerWidth / 200;
    camera.top = window.innerHeight / 200;
    camera.bottom = window.innerHeight / -200;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
