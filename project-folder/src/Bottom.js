import * as THREE from 'three';
import sea from '../assets/bigSea.jpg';

export function createBottom(){
    const textureLoader1 = new THREE.TextureLoader();
    const backgroundTexture = textureLoader1.load(sea); // Replace with your texture path

    // Create the plane for the background (bottom half)
    const halfBackgroundGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight /80, 1);
    const halfBackgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture }); // Light blue color for example
    const halfBackground = new THREE.Mesh(halfBackgroundGeometry, halfBackgroundMaterial);

    halfBackground.position.set(0, -window.innerHeight /  150, -10); // Position slightly behind everything else
   return halfBackground
}