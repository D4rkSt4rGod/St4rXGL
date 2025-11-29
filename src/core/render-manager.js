// 렌더링 관리 모듈
export let core = null;

export function init(coreInstance) {
    core = coreInstance;
}

export function startRendering() {
    if (!core) return;
    
    core.startAnimation();
    
    // 렌더러를 엔트리 스테이지에 추가
    const stageContainer = document.getElementById('entry-stage');
    if (stageContainer && core.getDOMElement()) {
        const existingCanvas = stageContainer.querySelector('.st4rxgl-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        
        const canvas = core.getDOMElement();
        canvas.classList.add('st4rxgl-canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '10';
        
        stageContainer.style.position = 'relative';
        stageContainer.appendChild(canvas);
    }
}

export function stopRendering() {
    if (!core) return;
    
    core.stopAnimation();
    
    // 캔버스 제거
    const stageContainer = document.getElementById('entry-stage');
    if (stageContainer) {
        const canvas = stageContainer.querySelector('.st4rxgl-canvas');
        if (canvas) {
            canvas.remove();
        }
    }
}

export function setSize(width, height) {
    if (!core || !core.camera || !core.renderer) return;
    
    core.camera.aspect = width / height;
    core.camera.updateProjectionMatrix();
    core.renderer.setSize(width, height);
}

export function setPixelRatio(ratio) {
    if (!core || !core.renderer) return;
    
    core.renderer.setPixelRatio(ratio);
}

export function takeScreenshot() {
    if (!core || !core.renderer) return null;
    
    core.renderer.render(core.scene, core.camera);
    return core.renderer.domElement.toDataURL('image/png');
}