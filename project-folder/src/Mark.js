import * as THREE from 'three';

function createTextCanvas(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '20px Arial';
    
    const textWidth = context.measureText(text).width;
    canvas.width = textWidth + 20; // Add padding to ensure there's enough space for centering
    canvas.height = 30;

    // Center the text in the canvas
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'black';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas;
}

export function createMeterMarks(scene) {
    const markMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const markGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -0.1, 0),
        new THREE.Vector3(0, 0.1, 0)
    ]);

    // Create marks and labels
    for (let i = -20; i <= 20; i++) {
        // Create vertical mark
        const markLine = new THREE.Line(markGeometry, markMaterial);
        markLine.position.set(i, 0, 0);
        scene.add(markLine); // Add each mark to the scene

        // Create number sprite
        const numberTexture = new THREE.CanvasTexture(createTextCanvas(i.toString()));
        const numberMaterial = new THREE.SpriteMaterial({ map: numberTexture });
        const numberSprite = new THREE.Sprite(numberMaterial);

        numberSprite.position.set(i, -0.7, 0); // Position below the mark (adjusted for larger numbers)
        numberSprite.scale.set(1.5, 0.8, 1); // Set scaling to match the size of the label
        numberSprite.renderOrder = 1;
        scene.add(numberSprite); // Add the number sprite to the scene
    }
}

// Example Usage:
// Assuming `scene` is your THREE.Scene() instance, you can call this function like so:
// createMeterMarks(scene);
