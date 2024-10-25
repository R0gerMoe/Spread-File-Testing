// src/Water.js

import * as THREE from 'three';
import groundT from '../assets/groundT.jpg';


// export function createWater() {
//     const waterGeometry = new THREE.PlaneGeometry(50, 50);
//     const waterMaterial = new THREE.MeshStandardMaterial({ color: 0x1E90FF });
//     const water = new THREE.Mesh(waterGeometry, waterMaterial);
//     water.rotation.x = -Math.PI / 2; // Lay flat
//     water.position.y = 0; // Place at y = 0

//     return water;
// }

export function createTexture (){
    const textureLoader = new THREE.TextureLoader();
    const boxTexture = textureLoader.load(groundT);

    const groundGeometry = new THREE.BoxGeometry(100, 0.5, 1)
    const groundMaterial = new THREE.MeshBasicMaterial({ map: boxTexture});
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    // scene.add(ground);

    ground.position.y =0.5/2;
    ground.position.set(0, -0.5/2, 0);

    return ground;
}