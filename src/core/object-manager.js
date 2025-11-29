// 객체 관리 모듈
export let core = null;

export function init(coreInstance) {
    core = coreInstance;
}

export function createBox(width = 1, height = 1, depth = 1, color = 0xff0000) {
    if (!core) return -1;
    
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    
    return core.addObject(mesh, 'box', 'box');
}

export function createSphere(radius = 1, color = 0x00ff00) {
    if (!core) return -1;
    
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    
    return core.addObject(mesh, 'sphere', 'sphere');
}

export function createCylinder(radiusTop = 1, radiusBottom = 1, height = 2, color = 0x0000ff) {
    if (!core) return -1;
    
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    
    return core.addObject(mesh, 'cylinder', 'cylinder');
}

export function createPlane(width = 10, height = 10, color = 0x808080) {
    if (!core) return -1;
    
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ 
        color: color,
        side: THREE.DoubleSide 
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    
    return core.addObject(mesh, 'plane', 'plane');
}

export function setPosition(objectId, x, y, z) {
    if (!core) return false;
    
    const obj = core.getObject(objectId);
    if (obj) {
        obj.mesh.position.set(x, y, z);
        return true;
    }
    return false;
}

export function setRotation(objectId, x, y, z) {
    if (!core) return false;
    
    const obj = core.getObject(objectId);
    if (obj) {
        obj.mesh.rotation.set(x, y, z);
        return true;
    }
    return false;
}

export function setScale(objectId, x, y, z) {
    if (!core) return false;
    
    const obj = core.getObject(objectId);
    if (obj) {
        obj.mesh.scale.set(x, y, z);
        return true;
    }
    return false;
}

export function setVisibility(objectId, visible) {
    if (!core) return false;
    
    const obj = core.getObject(objectId);
    if (obj) {
        obj.mesh.visible = visible;
        obj.visible = visible;
        return true;
    }
    return false;
}

export function getObjectInfo(objectId) {
    if (!core) return null;
    
    const obj = core.getObject(objectId);
    if (!obj) return null;
    
    return {
        id: obj.id,
        name: obj.name,
        type: obj.type,
        position: obj.mesh.position.toArray(),
        rotation: obj.mesh.rotation.toArray(),
        scale: obj.mesh.scale.toArray(),
        visible: obj.visible
    };
}