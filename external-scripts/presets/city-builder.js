// 도시 생성기 프리셋
if (typeof St4rXGL !== 'undefined' && St4rXGL.core) {
    console.log('St4rXGL City Builder 프리셋 로드됨');
    
    const CityBuilder = {
        // 건물 생성
        createBuilding: function(width = 2, height = 5, depth = 2, color = 0x888888, x = 0, z = 0) {
            const geometry = new THREE.BoxGeometry(width, height, depth);
            const material = new THREE.MeshStandardMaterial({ 
                color: color,
                metalness: 0.3,
                roughness: 0.7
            });
            const building = new THREE.Mesh(geometry, material);
            building.position.set(x, height / 2, z);
            building.castShadow = true;
            building.receiveShadow = true;
            
            const buildingId = St4rXGL.core.addObject(building, `building_${x}_${z}`, 'building');
            return buildingId;
        },
        
        // 도로 생성
        createRoad: function(length = 10, width = 2, x = 0, z = 0, rotation = 0) {
            const geometry = new THREE.PlaneGeometry(width, length);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                side: THREE.DoubleSide
            });
            const road = new THREE.Mesh(geometry, material);
            road.position.set(x, 0.01, z);
            road.rotation.x = Math.PI / 2;
            road.rotation.y = rotation;
            road.receiveShadow = true;
            
            const roadId = St4rXGL.core.addObject(road, `road_${x}_${z}`, 'road');
            return roadId;
        },
        
        // 나무 생성
        createTree: function(x = 0, z = 0) {
            // 나무 줄기
            const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 1, 8);
            const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.set(x, 0.5, z);
            
            // 나무 잎
            const leavesGeometry = new THREE.SphereGeometry(1, 8, 6);
            const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
            const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
            leaves.position.set(x, 2, z);
            
            const trunkId = St4rXGL.core.addObject(trunk, `tree_trunk_${x}_${z}`, 'tree');
            const leavesId = St4rXGL.core.addObject(leaves, `tree_leaves_${x}_${z}`, 'tree');
            
            return { trunk: trunkId, leaves: leavesId };
        },
        
        // 간단한 도시 생성
        createSimpleCity: function(gridSize = 5, spacing = 4) {
            console.log('간단한 도시 생성 중...');
            
            // 지면 생성
            const groundSize = gridSize * spacing + 10;
            const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
            const groundMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x90EE90,
                side: THREE.DoubleSide
            });
            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = Math.PI / 2;
            ground.receiveShadow = true;
            St4rXGL.core.addObject(ground, 'city_ground', 'ground');
            
            // 건물 생성
            const buildingColors = [0x888888, 0xAAAAAA, 0x666666, 0x777777];
            
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const x = (i - gridSize / 2) * spacing;
                    const z = (j - gridSize / 2) * spacing;
                    
                    // 건물 높이 랜덤
                    const height = Math.random() * 8 + 3;
                    const color = buildingColors[Math.floor(Math.random() * buildingColors.length)];
                    
                    this.createBuilding(2, height, 2, color, x, z);
                    
                    // 가로 도로
                    if (j === 0) {
                        this.createRoad(gridSize * spacing, 1, x, -gridSize * spacing / 2 - 2, 0);
                    }
                    
                    // 세로 도로
                    if (i === 0) {
                        this.createRoad(gridSize * spacing, 1, -gridSize * spacing / 2 - 2, z, Math.PI / 2);
                    }
                }
            }
            
            // 나무 몇 그루 추가
            for (let i = 0; i < 10; i++) {
                const x = (Math.random() - 0.5) * gridSize * spacing;
                const z = (Math.random() - 0.5) * gridSize * spacing;
                this.createTree(x, z);
            }
            
            console.log('도시 생성 완료');
        },
        
        // 야간 조명 설정
        setupNightLighting: function() {
            // 어두운 환경광
            const ambientLight = new THREE.AmbientLight(0x222234, 0.3);
            St4rXGL.core.scene.add(ambientLight);
            
            // 달빛 (방향광)
            const moonLight = new THREE.DirectionalLight(0x4488FF, 0.5);
            moonLight.position.set(-10, 10, -5);
            moonLight.castShadow = true;
            St4rXGL.core.scene.add(moonLight);
            
            // 가로등 효과 (점광)
            for (let i = -10; i <= 10; i += 5) {
                const streetLight = new THREE.PointLight(0xFFF4B3, 0.8, 10, 2);
                streetLight.position.set(i, 3, -8);
                streetLight.castShadow = true;
                St4rXGL.core.scene.add(streetLight);
                
                // 가로등 기둥
                const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 8);
                const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
                const pole = new THREE.Mesh(poleGeometry, poleMaterial);
                pole.position.set(i, 1.5, -8);
                St4rXGL.core.addObject(pole, `street_pole_${i}`, 'pole');
            }
        }
    };
    
    // 글로벌 함수로 노출
    window.St4rXGL_CityBuilder = CityBuilder;
    
    console.log('City Builder 프리셋이 성공적으로 로드되었습니다.');
}