// // gui.js
// import * as dat from 'dat.gui';

// export function initGUI(cubeMesh, cubeBody) {
//     const gui = new dat.GUI();

//     const cubeSettings = {
//         color: cubeMesh.material.color.getHex(),
//         axis: 'x',
//         velocity: 1,
//         paused: false,
//         distance: 0,
//         startMoving: () => {
//             cubeBody.position.set(-0.5, 0.5, 0);
//             cubeSettings.distance = 0;
//             setCubeVelocity();
//             cubeSettings.paused = false;
//         },
//         togglePause: () => {
//             cubeSettings.paused = !cubeSettings.paused;
//             if (cubeSettings.paused) {
//                 cubeBody.velocity.set(0, 0, 0);
//             } else {
//                 setCubeVelocity();
//             }
//         },
//     };

//     function setCubeVelocity() {
//         if (cubeSettings.axis === 'x') {
//             cubeBody.velocity.set(cubeSettings.velocity, 0, 0);
//         } else {
//             cubeBody.velocity.set(0, cubeSettings.velocity, 0);
//         }
//     }

//     // Add controls to GUI
//     const positionFolder = gui.addFolder('Position & Velocity');
//     // const actionFolder = gui.addFolder('Actions');
// // Open the folders by default
//     positionFolder.open();
//     actionFolder.open();

//     positionFolder.add(cubeBody.position, 'x', -10, 10).step(0.1).name('Position X');
//     positionFolder.add(cubeSettings, 'axis', ['x', 'y']).name('Move Axis').onChange(() => {
//         cubeBody.velocity.set(0, 0, 0);
//         if (!cubeSettings.paused) {
//             setCubeVelocity();
//         }
//     });
//     positionFolder.add(cubeSettings, 'velocity', -20, 20).name('Velocity').step(0.1);
//     positionFolder.add(cubeSettings, 'distance').name('Distance Traveled').listen();

//     const actionFolder = gui.addFolder('Actions');
//     actionFolder.addColor(cubeSettings, 'color').onChange((value) => {
//         cubeMesh.material.color.set(value);
//     });
//     actionFolder.add(cubeSettings, 'startMoving').name('Start Moving');
//     actionFolder.add(cubeSettings, 'togglePause').name('Pause/Resume');
//     actionFolder.add({ Reset: resetCube }, 'Reset').name('Reset Cube');

//     function resetCube() {
//         cubeBody.position.set(0, 0.5, 0);
//         cubeBody.velocity.set(0, 0, 0);
//         cubeMesh.position.copy(cubeBody.position);
//     }
// }

// modules/CubeSettings.js
import * as dat from 'dat.gui';

export function setupGUI(cubeMesh, cubeBody, resetCubeFunc) {
    const gui = new dat.GUI();
    const cubeSettings = {
        color: cubeMesh.material.color.getHex(),
        axis: 'x', // Control axis: 'x' or 'y'
        velocity: 1, // Control velocity
        paused: false,
        distance: 0, // Track distance traveled

        startMoving: () => {
            cubeBody.position.set(-0.5, 0.5, 0); // Reset position
            cubeSettings.distance = 0; // Reset distance
            setCubeVelocity();
            cubeSettings.paused = false;
        },
        togglePause: () => {
            cubeSettings.paused = !cubeSettings.paused;
            if (cubeSettings.paused) {
                cubeBody.velocity.set(0, 0, 0); // Stop the cube
            } else {
                setCubeVelocity(); // Resume movement
            }
        },
    };

    function setCubeVelocity() {
        if (cubeSettings.axis === 'x') {
            cubeBody.velocity.set(cubeSettings.velocity, 0, 0);
        } else {
            cubeBody.velocity.set(0, cubeSettings.velocity, 0);
        }
    }

    // Add GUI controls
    const positionFolder = gui.addFolder('Position & Velocity');
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
    positionFolder.add(cubeSettings, 'distance').name('Distance Traveled').listen(); // Distance display in GUI

    const actionFolder = gui.addFolder('Actions');
    actionFolder.addColor(cubeSettings, 'color').onChange((value) => {
        cubeMesh.material.color.set(value); // Update cube color
    });
    actionFolder.add(cubeSettings, 'startMoving').name('Start Moving');
    actionFolder.add(cubeSettings, 'togglePause').name('Pause/Resume');
    actionFolder.add({ reset: () => resetCubeFunc(cubeBody, cubeMesh) }, 'reset').name('Reset Cube');

    return gui;
}
