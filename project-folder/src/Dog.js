import *as THREE from 'three'

 export function createDog(x, y, z) {
    const group = new THREE.Group(); // Group to hold all parts of the dog

    // Body of the Dog (BoxGeometry)
    const bodyGeometry = new THREE.BoxGeometry(3, 1, 1);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Head of the Dog (BoxGeometry)
    const headGeometry = new THREE.BoxGeometry(1, 1, 1);
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(2, 0.5, 0); // Slightly in front of the body
    group.add(head);

    // Legs (CylinderGeometry)
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
    const legMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });

    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(1, -0.5, 0.5); // Front right
    group.add(leg1);

    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg2.position.set(1, -0.5, -0.5); // Front left
    group.add(leg2);

    const leg3 = new THREE.Mesh(legGeometry, legMaterial);
    leg3.position.set(-1, -0.5, 0.5); // Back right
    group.add(leg3);

    const leg4 = new THREE.Mesh(legGeometry, legMaterial);
    leg4.position.set(-1, -0.5, -0.5); // Back left
    group.add(leg4);

    // Tail (CylinderGeometry)
    const tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
    const tailMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-1.5, 0, 0); // Positioned at the back
    tail.rotation.z = Math.PI / 4; // Rotate tail upwards
    group.add(tail);

    // Position the entire group
    group.position.set(x, y, z);

    // Add the dog group to the scene
    // scene.add(group);

    return group; // Return the dog group so we can manipulate it later
}