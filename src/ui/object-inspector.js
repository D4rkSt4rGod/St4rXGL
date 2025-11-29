// 객체 검사기 UI 컴포넌트
export class ObjectInspector {
    constructor(core) {
        this.core = core;
        this.isVisible = false;
        this.inspectorElement = null;
        this.selectedObjectId = null;
        this.init();
    }
    
    init() {
        this.createInspector();
        this.setupEventListeners();
    }
    
    createInspector() {
        this.inspectorElement = document.createElement('div');
        this.inspectorElement.className = 'st4rxgl-object-inspector';
        this.inspectorElement.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            width: 280px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 1000;
            display: none;
        `;
        
        this.inspectorElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #FFA500;">객체 검사기</h3>
                <button id="st4rxgl-close-inspector" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">×</button>
            </div>
            
            <div id="no-selection" style="text-align: center; color: #888;">
                객체를 선택해주세요
            </div>
            
            <div id="object-details" style="display: none;">
                <div style="margin-bottom: 10px;">
                    <strong>객체 정보</strong>
                    <div>ID: <span id="obj-id"></span></div>
                    <div>이름: <span id="obj-name"></span></div>
                    <div>타입: <span id="obj-type"></span></div>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <strong>위치</strong>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
                        <input type="number" id="pos-x" placeholder="X" step="0.1" style="width: 100%;">
                        <input type="number" id="pos-y" placeholder="Y" step="0.1" style="width: 100%;">
                        <input type="number" id="pos-z" placeholder="Z" step="0.1" style="width: 100%;">
                    </div>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <strong>회전 (도)</strong>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
                        <input type="number" id="rot-x" placeholder="X" step="1" style="width: 100%;">
                        <input type="number" id="rot-y" placeholder="Y" step="1" style="width: 100%;">
                        <input type="number" id="rot-z" placeholder="Z" step="1" style="width: 100%;">
                    </div>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <strong>크기</strong>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
                        <input type="number" id="scale-x" placeholder="X" step="0.1" style="width: 100%;">
                        <input type="number" id="scale-y" placeholder="Y" step="0.1" style="width: 100%;">
                        <input type="number" id="scale-z" placeholder="Z" step="0.1" style="width: 100%;">
                    </div>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <label>
                        <input type="checkbox" id="obj-visible"> 보이기
                    </label>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                    <button id="apply-changes" style="padding: 8px; background: #27AE60; color: white; border: none; border-radius: 4px; cursor: pointer;">적용</button>
                    <button id="delete-object" style="padding: 8px; background: #E74C3C; color: white; border: none; border-radius: 4px; cursor: pointer;">삭제</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.inspectorElement);
    }
    
    setupEventListeners() {
        // 닫기 버튼
        document.getElementById('st4rxgl-close-inspector').addEventListener('click', () => {
            this.hide();
        });
        
        // 변경사항 적용
        document.getElementById('apply-changes').addEventListener('click', () => {
            this.applyChanges();
        });
        
        // 객체 삭제
        document.getElementById('delete-object').addEventListener('click', () => {
            this.deleteObject();
        });
        
        // 입력 필드 변경 시 자동 적용 (선택사항)
        const inputs = this.inspectorElement.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.applyChanges();
            });
        });
    }
    
    show() {
        this.isVisible = true;
        this.inspectorElement.style.display = 'block';
        this.updateDisplay();
    }
    
    hide() {
        this.isVisible = false;
        this.inspectorElement.style.display = 'none';
    }
    
    selectObject(objectId) {
        this.selectedObjectId = objectId;
        this.updateDisplay();
        
        if (!this.isVisible) {
            this.show();
        }
    }
    
    updateDisplay() {
        const noSelection = document.getElementById('no-selection');
        const objectDetails = document.getElementById('object-details');
        
        if (this.selectedObjectId === null || !this.core) {
            noSelection.style.display = 'block';
            objectDetails.style.display = 'none';
            return;
        }
        
        const obj = this.core.getObject(this.selectedObjectId);
        if (!obj) {
            noSelection.style.display = 'block';
            objectDetails.style.display = 'none';
            return;
        }
        
        noSelection.style.display = 'none';
        objectDetails.style.display = 'block';
        
        // 객체 정보 업데이트
        document.getElementById('obj-id').textContent = obj.id;
        document.getElementById('obj-name').textContent = obj.name;
        document.getElementById('obj-type').textContent = obj.type;
        
        // 위치 업데이트
        document.getElementById('pos-x').value = obj.mesh.position.x.toFixed(2);
        document.getElementById('pos-y').value = obj.mesh.position.y.toFixed(2);
        document.getElementById('pos-z').value = obj.mesh.position.z.toFixed(2);
        
        // 회전 업데이트 (도 단위)
        document.getElementById('rot-x').value = (obj.mesh.rotation.x * 180 / Math.PI).toFixed(1);
        document.getElementById('rot-y').value = (obj.mesh.rotation.y * 180 / Math.PI).toFixed(1);
        document.getElementById('rot-z').value = (obj.mesh.rotation.z * 180 / Math.PI).toFixed(1);
        
        // 크기 업데이트
        document.getElementById('scale-x').value = obj.mesh.scale.x.toFixed(2);
        document.getElementById('scale-y').value = obj.mesh.scale.y.toFixed(2);
        document.getElementById('scale-z').value = obj.mesh.scale.z.toFixed(2);
        
        // 가시성 업데이트
        document.getElementById('obj-visible').checked = obj.visible;
    }
    
    applyChanges() {
        if (this.selectedObjectId === null || !this.core) return;
        
        const obj = this.core.getObject(this.selectedObjectId);
        if (!obj) return;
        
        // 위치 적용
        const posX = parseFloat(document.getElementById('pos-x').value) || 0;
        const posY = parseFloat(document.getElementById('pos-y').value) || 0;
        const posZ = parseFloat(document.getElementById('pos-z').value) || 0;
        obj.mesh.position.set(posX, posY, posZ);
        
        // 회전 적용 (라디안으로 변환)
        const rotX = (parseFloat(document.getElementById('rot-x').value) || 0) * Math.PI / 180;
        const rotY = (parseFloat(document.getElementById('rot-y').value) || 0) * Math.PI / 180;
        const rotZ = (parseFloat(document.getElementById('rot-z').value) || 0) * Math.PI / 180;
        obj.mesh.rotation.set(rotX, rotY, rotZ);
        
        // 크기 적용
        const scaleX = parseFloat(document.getElementById('scale-x').value) || 1;
        const scaleY = parseFloat(document.getElementById('scale-y').value) || 1;
        const scaleZ = parseFloat(document.getElementById('scale-z').value) || 1;
        obj.mesh.scale.set(scaleX, scaleY, scaleZ);
        
        // 가시성 적용
        obj.mesh.visible = document.getElementById('obj-visible').checked;
        obj.visible = obj.mesh.visible;
    }
    
    deleteObject() {
        if (this.selectedObjectId === null || !this.core) return;
        
        this.core.removeObject(this.selectedObjectId);
        this.selectedObjectId = null;
        this.updateDisplay();
        
        // 컨트롤 패널 업데이트 (있는 경우)
        if (window.St4rXGL && window.St4rXGL.controlPanel) {
            window.St4rXGL.controlPanel.updateSceneInfo();
            window.St4rXGL.controlPanel.updateObjectsList();
        }
    }
}