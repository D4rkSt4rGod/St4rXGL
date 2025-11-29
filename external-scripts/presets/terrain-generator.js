// 지형 생성기 프리셋
if (typeof St4rXGL !== 'undefined' && St4rXGL.core) {
    console.log('St4rXGL Terrain Generator 프리셋 로드됨');
    
    const TerrainGenerator = {
        // 노이즈 기반 지형 생성
        createNoiseTerrain: function(width = 20, height = 20, segments = 32, maxHeight = 2) {
            const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0x90EE90,
                side: THREE.DoubleSide,
                flatShading: true
            });
            
            const vertices = geometry.attributes.position.array;
            
            // 간단한 노이즈 생성
            for (let i = 0; i < vertices.length; i += 3) {
                const x = vertices[i];
                const z = vertices[i + 2];
                
                // 2D 노이즈 생성 (간단한 파도 패턴)
                const noise = this.simpleNoise(x / 5, z / 5) * maxHeight;
                vertices[i + 1] = noise;
            }
            
            geometry.computeVertexNormals(); // 법선 재계산
            
            const terrain = new THREE.Mesh(geometry, material);
            terrain.rotation.x = -Math.PI / 2;
            terrain.receiveShadow = true;
            terrain.castShadow = true;
            
            const terrainId = St4rXGL.core.addObject(terrain, 'noise_terrain', 'terrain');
            return terrainId;
        },
        
        // 간단한 2D 노이즈 함수
        simpleNoise: function(x, z) {
            return (Math.sin(x * 2) + Math.cos(z * 1.5) + Math.sin(x * 0.5 + z * 0.8)) / 3;
        },
        
        // 산 지형 생성
        createMountain: function(radius = 5, height = 8, segments = 32) {
            const geometry = new THREE.ConeGeometry(radius, height, segments);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0x8B4513,
                flatShading: true
            });
            
            const mountain = new THREE.Mesh(geometry, material);
            mountain.position.y = height / 2;
            mountain.castShadow = true;
            mountain.receiveShadow = true;
            
            const mountainId = St4rXGL.core.addObject(mountain, 'mountain', 'terrain');
            return mountainId;
        },
        
        // 언덕 지형 생성
        createHills: function(count = 10, areaSize = 20, maxHeight = 3) {
            const hills = [];
            
            for (let i = 0; i < count; i++) {
                const x = (Math.random() - 0.5) * areaSize;
                const z = (Math.random() - 0.5) * areaSize;
                const radius = Math.random() * 2 + 1;
                const height = Math.random() * maxHeight + 1;
                
                const hillGeometry = new THREE.ConeGeometry(radius, height, 16);
                const hillMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x7CFC00,
                    flatShading: true
                });
                
                const hill = new THREE.Mesh(hillGeometry, hillMaterial);
                hill.position.set(x, height / 2, z);
                hill.castShadow = true;
                hill.receiveShadow = true;
                
                const hillId = St4rXGL.core.addObject(hill, `hill_${i}`, 'terrain');
                hills.push(hillId);
            }
            
            return hills;
        },
        
        // 강 생성
        createRiver: function(length = 20, width = 1, curvePoints = 5) {
            const points = [];
            
            // 곡선 포인트 생성
            for (let i = 0; i < curvePoints; i++) {
                const x = (i / (curvePoints - 1) - 0.5) * length;
                const z = (Math.random() - 0.5) * 3; // 약간의 곡선
                points.push(new THREE.Vector3(x, 0.1, z));
            }
            
            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeometry = new THREE.TubeGeometry(curve, 20, width / 2, 8, false);
            const tubeMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x1E90FF,
                transparent: true,
                opacity: 0.8
            });
            
            const river = new THREE.Mesh(tubeGeometry, tubeMaterial);
            river.receiveShadow = true;
            
            const riverId = St4rXGL.core.addObject(river, 'river', 'water');
            return riverId;
        },
        
        // 나무 군집 생성
        createForest: function(treeCount = 20, areaSize = 15) {
            const trees = [];
            
            for (let i = 0; i < treeCount; i++) {
                const x = (Math.random() - 0.5) * areaSize;
                const z = (Math.random() - 0.5) * areaSize;
                const scale = Math.random() * 0.5 + 0.5;
                
                // 나무 생성 (간단한 원통+구 조합)
                const trunkGeometry = new THREE.CylinderGeometry(0.1 * scale, 0.15 * scale, 1 * scale, 8);
                const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
                const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
                trunk.position.set(x, 0.5 * scale, z);
                
                const leavesGeometry = new THREE.SphereGeometry(0.4 * scale, 8, 6);
                const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
                const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
                leaves.position.set(x, 1.3 * scale, z);
                
                const trunkId = St4rXGL.core.addObject(trunk, `forest_trunk_${i}`, 'tree');
                const leavesId = St4rXGL.core.addObject(leaves, `forest_leaves_${i}`, 'tree');
                
                trees.push({ trunk: trunkId, leaves: leavesId });
            }
            
            return trees;
        },
        
        // 종합 지형 생성
        createCompleteLandscape: function() {
            console.log('종합 지형 생성 중...');
            
            // 기본 지면
            const groundId = this.createNoiseTerrain(30, 30, 64, 1.5);
            
            // 산 추가
            const mountain1 = this.createMountain(4, 6);
            const mountain2 = this.createMountain(3, 5);
            St4rXGL.objectManager.setPosition(mountain1, -8, 0, -5);
            St4rXGL.objectManager.setPosition(mountain2, 7, 0, 6);
            
            // 언덕 추가
            this.createHills(8, 25, 2);
            
            // 강 추가
            this.createRiver(25, 0.8, 8);
            
            // 숲 추가
            this.createForest(15, 20);
            
            // 환경 설정
            St4rXGL.sceneManager.setBackgroundColor(0x87CEEB);
            
            // 조명 설정
            const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
            sunLight.position.set(10, 10, 5);
            sunLight.castShadow = true;
            St4rXGL.core.scene.add(sunLight);
            
            console.log('종합 지형 생성 완료');
        },
        
        // 텍스처 매핑을 위한 UV 업데이트
        updateTerrainUV: function(terrainId) {
            const obj = St4rXGL.core.getObject(terrainId);
            if (!obj) return;
            
            const geometry = obj.mesh.geometry;
            
            // 간단한 UV 매핑
            const uvs = [];
            const vertices = geometry.attributes.position.array;
            
            for (let i = 0; i < vertices.length; i += 3) {
                const x = vertices[i];
                const z = vertices[i + 2];
                
                // XZ 좌표를 UV로 사용
                uvs.push((x + 10) / 20); // U
                uvs.push((z + 10) / 20); // V
            }
            
            geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        }
    };
    
    // 글로벌 함수로 노출
    window.St4rXGL_TerrainGenerator = TerrainGenerator;
    
    console.log('Terrain Generator 프리셋이 성공적으로 로드되었습니다.');
}