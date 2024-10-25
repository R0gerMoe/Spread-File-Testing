import * as THREE from 'three';
// panControls.js
export function setupPanControls(camera) {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    // Mouse down event
    window.addEventListener('mousedown', (event) => {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });

    // Mouse move event
    window.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y,
            };

            // Update camera position based on mouse movement
            camera.left -= deltaMove.x * 0.01; // Horizontal panning
            camera.right -= deltaMove.x * 0.01;
            // camera.top += deltaMove.y * 0.01; // Uncomment to enable vertical panning
            // camera.bottom += deltaMove.y * 0.01;

            camera.updateProjectionMatrix();

            previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    });

    // Mouse up event
    window.addEventListener('mouseup', () => {
        isDragging = false; // Stop dragging
    });

    // Mouse leave event (to handle when mouse leaves the window)
    window.addEventListener('mouseleave', () => {
        isDragging = false; // Stop dragging
    });
}
