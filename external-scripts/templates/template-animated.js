// 애니메이션 템플릿 - 움직이는 객체들을 위한 템플릿
if (typeof St4rXGL !== 'undefined' && St4rXGL.core) {
    
    const AnimatedScene = {
        // 애니메이션 객체들을 저장할 배열
        animatedObjects: [],
        
        // 초기화 함수
        init: function() {
            console.log('애니메이션 템플릿 초기화');
            
            this.createAnimatedScene();
            this.startMainAnimationLoop();
        },
        
        // 애니메이션 씬 생성
        createAnimatedScene: function() {
            // 배경 설정
            St4rXGL.sceneManager.setBackgroundColor(0x000033);
            
            // 회전하는 큐브 생성
            this.createRotatingCube(0, 2, 0);
            
            // 떠다니는 구들 생성
            for (let i = 0; i < 5; i++) {
                this.createFloatingSphere(i * 2 - 4, 0, 0);
            }
            
            // 파동 평면 생성
            this.createWavePlane(0, -1, 0);
        },
        
        // 회전하는 큐브 생성
        createRotatingCube: function(x, y, z) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0xFF6B6B,
                metalness: 0.3,
                roughness: 0.4
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, y, z);
            cube.castShadow = true;
            
            const cubeId = St4rXGL.core.addObject(cube, 'rotating_cube', 'animated');
            
            // 애니메이션 객체에 추가
            this.animatedObjects.push({
                id: cubeId,
                type: 'rotation',
                speed: 0.02,
                update: function(obj) {
                    obj.mesh.rotation.x += this.speed;
                    obj.mesh.rotation.y += this.speed;
                }
            });
            
            return cubeId;
        },
        
        // 떠다니는 구 생성
        createFloatingSphere: function(x, y, z) {
            const geometry = new THREE.SphereGeometry(0.5, 16, 16);
            const material = new THREE.MeshStandardMaterial({ 
                color: Math.random() * 0xFFFFFF,
                metalness: 0.7,
                roughness: 0.2
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(x, y, z);
            sphere.castShadow = true;
            
            const sphereId = St4rXGL.core.addObject(sphere, 'floating_sphere', 'animated');
            
            // 떠다니는 애니메이션
            this.animatedObjects.push({
                id: sphereId,
                type: 'floating',
                time: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01,
                height: Math.random() * 1 + 0.5,
                update: function(obj, deltaTime) {
                    this.time += this.speed;
                    obj.mesh.position.y = Math.sin(this.time) * this.height + 2;
                    obj.mesh.rotation.y += 0.01;
                }
            });
            
            return sphereId;
        },
        
        // 파동 평면 생성
        createWavePlane: function(x, y, z) {
            const segments = 32;
            const geometry = new THREE.PlaneGeometry(10, 10, segments, segments);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0x4ECDC4,
                side: THREE.DoubleSide,
                flatShading: true
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.rotation.x = -Math.PI / 2;
            plane.position.set(x, y, z);
            plane.receiveShadow = true;
            
            const planeId = St4rXGL.core.addObject(plane, 'wave_plane', 'animated');
            
            // 파동 애니메이션을 위한 원본 vertices 저장
            const originalVertices = geometry.attributes.position.array.slice();
            
            this.animatedObjects.push({
                id: planeId,
                type: 'wave',
                time: 0,
                vertices: originalVertices,
                update: function(obj, deltaTime) {
                    this.time += deltaTime;
                    
                    const positions = obj.mesh.geometry.attributes.position;
                    const count = positions.count;
                    
                    for (let i = 0; i < count; i++) {
                        const ix = i * 3;
                        const x = this.vertices[ix];
                        const z = this.vertices[ix + 2];
                        
                        // 파동 효과
                        positions.array[ix + 1] = Math.sin(x * 2 + this.time * 2) * 0.3 + 
                                                 Math.cos(z * 1.5 + this.time * 1.5) * 0.2;
                    }
                    
                    positions.needsUpdate = true;
                    obj.mesh.geometry.computeVertexNormals();
                }
            });
            
            return planeId;
        },
        
        // 주 애니메이션 루프 시작
        startMainAnimationLoop: function() {
            let lastTime = 0;
            
            const animate = (currentTime) => {
                const deltaTime = (currentTime - lastTime) * 0.001; // 초 단위
                lastTime = currentTime;
                
                // 모든 애니메이션 객체 업데이트
                this.animatedObjects.forEach(animObj => {
                    const obj = St4rXGL.core.getObject(animObj.id);
                    if (obj && animObj.update) {
                        animObj.update(obj, deltaTime);
                    }
                });
                
                requestAnimationFrame(animate);
            };
            
            animate(0);
        },
        
        // 새로운 애니메이션 객체 추가
        addAnimatedObject: function(objectId, animationConfig) {
            this.animatedObjects.push({
                id: objectId,
                ...animationConfig
            });
        },
        
        // 애니메이션 객체 제거
        removeAnimatedObject: function(objectId) {
            this.animatedObjects = this.animatedObjects.filter(obj => obj.id !== objectId);
        },
        
        // 모든 애니메이션 정지
        stopAllAnimations: function() {
            this.animatedObjects = [];
        }
    };
    
    // 글로벌로 노출
    window.AnimatedScene = AnimatedScene;
    
    // 자동 초기화 (옵션)
    // AnimatedScene.init();
    
    console.log('애니메이션 템플릿이 로드되었습니다.');
}