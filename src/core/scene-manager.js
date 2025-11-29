// 씬 관리 모듈
export let core = null;

export function init(coreInstance) {
    core = coreInstance;
}

export function setBackgroundColor(color) {
    if (core && core.scene) {
        core.scene.background = new THREE.Color(color);
    }
}

export function setFog(color, near, far) {
    if (core && core.scene) {
        core.scene.fog = new THREE.Fog(color, near, far);
    }
}

export function clearFog() {
    if (core && core.scene) {
        core.scene.fog = null;
    }
}

export function addSkybox(images) {
    if (!core || !core.scene) return;
    
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        images.right, images.left,
        images.top, images.bottom,
        images.front, images.back
    ]);
    
    core.scene.background = texture;
}

export function getSceneInfo() {
    if (!core) return null;
    
    return {
        objectCount: core.objects.size,
        lightCount: core.lights.size,
        materialCount: core.materials.size,
        childrenCount: core.scene ? core.scene.children.length : 0
    };
}

export function resetScene() {
    if (!core) return;
    
    // 모든 객체 제거
    core.objects.forEach((obj, id) => {
        core.removeObject(id);
    });
    
    // 기본 조명 다시 설정
    core.setupDefaultLighting();
    core.setupHelpers();
}