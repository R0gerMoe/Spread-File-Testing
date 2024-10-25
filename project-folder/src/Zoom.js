import *as THREE from 'three'

export function onMouseWheel(event , camera) {
    event.preventDefault();

    const zoomAmount = 0.1; // Smaller step for smoother zoom
    let minZoom = 1;         // Minimum zoom level
    let maxZoom = 30;        // Maximum zoom level

    // Calculate zoom factor based on scroll direction
    let zoomFactor = event.deltaY < 0 ? 1 - zoomAmount : 1 + zoomAmount;

    // Get the current zoom level
    let currentZoom = Math.abs(camera.right - camera.left);

    // Ensure zoom stays within bounds
    if ((currentZoom > minZoom || event.deltaY > 0) && (currentZoom < maxZoom || event.deltaY < 0)) {
        camera.left *= zoomFactor;
        camera.right *= zoomFactor;
        camera.top *= zoomFactor;
        camera.bottom *= zoomFactor;
        camera.updateProjectionMatrix();
    }
}
// window.addEventListener('wheel', onMouseWheel, false);
