// 인터랙티브 템플릿 - 사용자 상호작용을 위한 템플릿
if (typeof St4rXGL !== 'undefined' && St4rXGL.core) {
    
    const InteractiveScene = {
        // 인터랙티브 객체들
        interactiveObjects: new Map(),
        raycaster: null,
        mouse: null,
        selectedObject: null,
        
        // 초기화 함수
        init: function() {
            console.log('인터랙티브 템플릿 초기화');
            
            this.setupInteraction();
            this.createInteractiveScene();
            this.setupEventListeners();
        },
        
        // 인터랙션 설정
        setupInteraction: function() {
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
        },
        
        // 인터랙티브 씬 생성
        createInteractiveScene: function() {
            // 배경 설정
            St4rXGL.sceneManager.setBackgroundColor(0x222222);
            
            // 인터랙티브 큐브들 생성
            const colors = [0xFF6B6B, 0x4ECDC4, 0x45B7D1, 0x96CEB4, 0xFFEAA7];
            
            colors.forEach((color, index) => {
                const cube = this.createInteractiveCube(
                    (index - 2) * 2.5, 
                    1, 
                    0, 
                    color,
                    `cube_${index}`
                );
                
                // 인터랙티브 객체로 등록
                this.interactiveObjects.set(cube.id, {
                    type: 'cube',
                    originalColor: color,
                    hoverColor: 0xFFFFFF,
                    onClick: this.onCubeClick.bind(this)
                });
            });
            
            // 회전 플랫폼 생성
            const platform = this.createRotatingPlatform(0, -1, 0);
            this.interactiveObjects.set(platform.id, {
                type: 'platform',
                isRotating: true,
                rotationSpeed: 0.01
            });
        },
        
        // 인터랙티브 큐브 생성
        createInteractiveCube: function(x, y, z, color, name) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshStandardMaterial({ 
                color: color,
                metalness: 0.3,
                roughness: 0.4
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, y, z);
            cube.castShadow = true;
            
            return St4rXGL.core.addObject(cube, name, 'interactive');
        },
        
        // 회전 플랫폼 생성
        createRotatingPlatform: function(x, y, z) {
            const geometry = new THREE.CylinderGeometry(8, 8, 0.5, 32);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0x888888,
                metalness: 0.2,
                roughness: 0.8
            });
            const platform = new THREE.Mesh(geometry, material);
            platform.position.set(x, y, z);
            platform.receiveShadow = true;
            
            return St4rXGL.core.addObject(platform, 'rotating_platform', 'platform');
        },
        
        // 이벤트 리스너 설정
        setupEventListeners: function() {
            const canvas = St4rXGL.core.getDOMElement();
            if (!canvas) return;
            
            // 마우스 이동 이벤트
            canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            
            // 클릭 이벤트
            canvas.addEventListener('click', this.onClick.bind(this));
            
            // 키보드 이벤트
            document.addEventListener('keydown', this.onKeyDown.bind(this));
        },
        
        // 마우스 이동 처리
        onMouseMove: function(event) {
            const canvas = St4rXGL.core.getDOMElement();
            if (!canvas) return;
            
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / canvas.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / canvas.height) * 2 + 1;
            
            this.checkIntersections();
        },
        
        // 클릭 처리
        onClick: function(event) {
            this.raycaster.setFromCamera(this.mouse, St4rXGL.core.camera);
            
            const objects = Array.from(St4rXGL.core.objects.values()).map(obj => obj.mesh);
            const intersects = this.raycaster.intersectObjects(objects);
            
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                const objectId = this.findObjectIdByMesh(clickedObject);
                
                if (objectId !== null) {
                    const interactiveObj = this.interactiveObjects.get(objectId);
                    if (interactiveObj && interactiveObj.onClick) {
                        interactiveObj.onClick(objectId, clickedObject);
                    }
                }
            }
        },
        
        // 키 입력 처리
        onKeyDown: function(event) {
            if (!this.selectedObject) return;
            
            const obj = St4rXGL.core.getObject(this.selectedObject);
            if (!obj) return;
            
            const moveDistance = 0.5;
            const rotateAngle = Math.PI / 8;
            
            switch(event.key) {
                case 'ArrowUp':
                    obj.mesh.position.z -= moveDistance;
                    break;
                case 'ArrowDown':
                    obj.mesh.position.z += moveDistance;
                    break;
                case 'ArrowLeft':
                    obj.mesh.position.x -= moveDistance;
                    break;
                case 'ArrowRight':
                    obj.mesh.position.x += moveDistance;
                    break;
                case ' ':
                    obj.mesh.position.y += moveDistance;
                    break;
                case 'r':
                    obj.mesh.rotation.y += rotateAngle;
                    break;
                case 'R':
                    obj.mesh.rotation.y -= rotateAngle;
                    break;
            }
        },
        
        // 교차점 검사
        checkIntersections: function() {
            this.raycaster.setFromCamera(this.mouse, St4rXGL.core.camera);
            
            const objects = Array.from(St4rXGL.core.objects.values()).map(obj => obj.mesh);
            const intersects = this.raycaster.intersectObjects(objects);
            
            // 모든 객체의 원래 색상으로 복원
            this.interactiveObjects.forEach((config, objectId) => {
                const obj = St4rXGL.core.getObject(objectId);
                if (obj && obj.mesh.material) {
                    obj.mesh.material.color.setHex(config.originalColor);
                }
            });
            
            // 호버 효과 적용
            if (intersects.length > 0) {
                const hoveredObject = intersects[0].object;
                const objectId = this.findObjectIdByMesh(hoveredObject);
                
                if (objectId !== null) {
                    const interactiveObj = this.interactiveObjects.get(objectId);
                    if (interactiveObj && interactiveObj.hoverColor) {
                        hoveredObject.material.color.setHex(interactiveObj.hoverColor);
                    }
                    
                    // 캔버스 스타일 변경
                    const canvas = St4rXGL.core.getDOMElement();
                    if (canvas) {
                        canvas.style.cursor = 'pointer';
                    }
                }
            } else {
                // 캔버스 스타일 복원
                const canvas = St4rXGL.core.getDOMElement();
                if (canvas) {
                    canvas.style.cursor = 'default';
                }
            }
        },
        
        // 큐브 클릭 처리
        onCubeClick: function(objectId, mesh) {
            console.log('큐브 클릭:', objectId);
            
            // 선택된 객체 표시
            this.selectedObject = objectId;
            
            // 점프 애니메이션
            this.animateJump(objectId);
            
            // 색상 변경
            this.changeColor(objectId);
        },
        
        // 점프 애니메이션
        animateJump: function(objectId) {
            const obj = St4rXGL.core.getObject(objectId);
            if (!obj) return;
            
            const startY = obj.mesh.position.y;
            const jumpHeight = 2;
            const duration = 500; // ms
            
            let startTime = null;
            
            const jump = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // 포물선 운동
                const jumpProgress = 4 * progress * (1 - progress);
                obj.mesh.position.y = startY + jumpHeight * jumpProgress;
                
                if (progress < 1) {
                    requestAnimationFrame(jump);
                } else {
                    obj.mesh.position.y = startY;
                }
            };
            
            requestAnimationFrame(jump);
        },
        
        // 색상 변경
        changeColor: function(objectId) {
            const obj = St4rXGL.core.getObject(objectId);
            const interactiveObj = this.interactiveObjects.get(objectId);
            
            if (obj && interactiveObj) {
                // 랜덤 색상 생성
                const newColor = Math.random() * 0xFFFFFF;
                obj.mesh.material.color.setHex(newColor);
                interactiveObj.originalColor = newColor;
            }
        },
        
        // 메시로부터 객체 ID 찾기
        findObjectIdByMesh: function(mesh) {
            for (let [id, obj] of St4rXGL.core.objects) {
                if (obj.mesh === mesh) {
                    return id;
                }
            }
            return null;
        },
        
        // 애니메이션 루프
        startAnimationLoop: function() {
            const animate = () => {
                requestAnimationFrame(animate);
                
                // 회전 플랫폼 애니메이션
                this.interactiveObjects.forEach((config, objectId) => {
                    if (config.type === 'platform' && config.isRotating) {
                        const obj = St4rXGL.core.getObject(objectId);
                        if (obj) {
                            obj.mesh.rotation.y += config.rotationSpeed;
                        }
                    }
                });
            };
            
            animate();
        },
        
        // 인터랙티브 객체 추가
        addInteractiveObject: function(objectId, config) {
            this.interactiveObjects.set(objectId, config);
        },
        
        // 선택된 객체 정보 가져오기
        getSelectedObjectInfo: function() {
            if (!this.selectedObject) return null;
            
            const obj = St4rXGL.core.getObject(this.selectedObject);
            if (!obj) return null;
            
            return {
                id: obj.id,
                name: obj.name,
                type: obj.type,
                position: obj.mesh.position.toArray(),
                rotation: obj.mesh.rotation.toArray()
            };
        }
    };
    
    // 글로벌로 노출
    window.InteractiveScene = InteractiveScene;
    
    // 자동 초기화 (옵션)
    // InteractiveScene.init();
    // InteractiveScene.startAnimationLoop();
    
    console.log('인터랙티브 템플릿이 로드되었습니다.');
}