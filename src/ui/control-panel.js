// 제어판 UI 컴포넌트
export class ControlPanel {
    constructor(core) {
        this.core = core;
        this.isVisible = false;
        this.panelElement = null;
        this.init();
    }
    
    init() {
        this.createPanel();
        this.setupEventListeners();
    }
    
    createPanel() {
        this.panelElement = document.createElement('div');
        this.panelElement.className = 'st4rxgl-control-panel';
        this.panelElement.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 300px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 1000;
            display: none;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        this.panelElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #8A2BE2;">St4rXGL 제어판</h3>
                <button id="st4rxgl-close-panel" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">×</button>
            </div>
            
            <div class="panel-section">
                <h4 style="margin: 10px 0 5px 0; color: #FF6B6B;">씬 정보</h4>
                <div id="scene-info">
                    <div>객체 수: <span id="object-count">0</span></div>
                    <div>조명 수: <span id="light-count">0</span></div>
                </div>
            </div>
            
            <div class="panel-section">
                <h4 style="margin: 10px 0 5px 0; color: #4ECDC4;">빠른 작업</h4>
                <button id="reset-scene" style="width: 100%; padding: 8px; margin: 2px 0; background: #E74C3C; color: white; border: none; border-radius: 4px; cursor: pointer;">씬 리셋</button>
                <button id="take-screenshot" style="width: 100%; padding: 8px; margin: 2px 0; background: #3498DB; color: white; border: none; border-radius: 4px; cursor: pointer;">스크린샷</button>
            </div>
            
            <div class="panel-section">
                <h4 style="margin: 10px 0 5px 0; color: #45B7D1;">객체 관리</h4>
                <div id="objects-list" style="max-height: 150px; overflow-y: auto; border: 1px solid #444; padding: 5px; border-radius: 4px;">
                    <!-- 객체 목록이 여기에 동적으로 추가됨 -->
                </div>
            </div>
            
            <div class="panel-section">
                <h4 style="margin: 10px 0 5px 0; color: #FFA500;">환경 설정</h4>
                <div style="margin: 5px 0;">
                    <label>배경색: </label>
                    <input type="color" id="bg-color" value="#87CEEB" style="vertical-align: middle;">
                </div>
                <div style="margin: 5px 0;">
                    <label>안개: </label>
                    <input type="checkbox" id="fog-toggle">
                </div>
            </div>
        `;
        
        document.body.appendChild(this.panelElement);
    }
    
    setupEventListeners() {
        // 닫기 버튼
        document.getElementById('st4rxgl-close-panel').addEventListener('click', () => {
            this.hide();
        });
        
        // 씬 리셋
        document.getElementById('reset-scene').addEventListener('click', () => {
            if (this.core) {
                this.core.cleanup();
                this.core.setupThreeJS();
                this.updateSceneInfo();
            }
        });
        
        // 스크린샷
        document.getElementById('take-screenshot').addEventListener('click', () => {
            this.takeScreenshot();
        });
        
        // 배경색 변경
        document.getElementById('bg-color').addEventListener('change', (e) => {
            if (this.core && this.core.scene) {
                this.core.scene.background = new THREE.Color(e.target.value);
            }
        });
        
        // 안개 토글
        document.getElementById('fog-toggle').addEventListener('change', (e) => {
            if (this.core && this.core.scene) {
                if (e.target.checked) {
                    this.core.scene.fog = new THREE.Fog(0x87CEEB, 5, 20);
                } else {
                    this.core.scene.fog = null;
                }
            }
        });
    }
    
    show() {
        this.isVisible = true;
        this.panelElement.style.display = 'block';
        this.updateSceneInfo();
        this.updateObjectsList();
    }
    
    hide() {
        this.isVisible = false;
        this.panelElement.style.display = 'none';
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    updateSceneInfo() {
        if (!this.core) return;
        
        const objectCount = document.getElementById('object-count');
        const lightCount = document.getElementById('light-count');
        
        if (objectCount) objectCount.textContent = this.core.objects.size;
        if (lightCount) lightCount.textContent = this.core.lights.size;
    }
    
    updateObjectsList() {
        if (!this.core) return;
        
        const objectsList = document.getElementById('objects-list');
        if (!objectsList) return;
        
        objectsList.innerHTML = '';
        
        this.core.objects.forEach((obj, id) => {
            const item = document.createElement('div');
            item.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 3px;
                border-bottom: 1px solid #333;
                font-size: 11px;
            `;
            
            item.innerHTML = `
                <span>${obj.name} (${id})</span>
                <button data-id="${id}" style="background: #E74C3C; color: white; border: none; border-radius: 3px; padding: 2px 6px; font-size: 10px; cursor: pointer;">삭제</button>
            `;
            
            // 삭제 버튼 이벤트
            const deleteBtn = item.querySelector('button');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const objectId = parseInt(e.target.getAttribute('data-id'));
                this.core.removeObject(objectId);
                this.updateSceneInfo();
                this.updateObjectsList();
            });
            
            objectsList.appendChild(item);
        });
        
        if (this.core.objects.size === 0) {
            objectsList.innerHTML = '<div style="text-align: center; color: #888;">객체가 없습니다</div>';
        }
    }
    
    takeScreenshot() {
        if (!this.core || !this.core.renderer) return;
        
        this.core.renderer.render(this.core.scene, this.core.camera);
        const dataURL = this.core.renderer.domElement.toDataURL('image/png');
        
        // 다운로드 링크 생성
        const link = document.createElement('a');
        link.download = `st4rxgl-screenshot-${new Date().getTime()}.png`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}