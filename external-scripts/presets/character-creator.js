// 캐릭터 생성기 프리셋
if (typeof St4rXGL !== 'undefined' && St4rXGL.core) {
    console.log('St4rXGL Character Creator 프리셋 로드됨');
    
    const CharacterCreator = {
        // 간단한 인간형 캐릭터 생성
        createHumanoid: function(x = 0, y = 0, z = 0, scale = 1) {
            const parts = {};
            
            // 몸통
            const bodyGeometry = new THREE.CylinderGeometry(0.8 * scale, 0.6 * scale, 2 * scale, 8);
            const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.position.set(x, y + 1 * scale, z);
            parts.body = St4rXGL.core.addObject(body, 'character_body', 'character');
            
            // 머리
            const headGeometry = new THREE.SphereGeometry(0.6 * scale, 16, 16);
            const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFFDBAC });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.set(x, y + 2.2 * scale, z);
            parts.head = St4rXGL.core.addObject(head, 'character_head', 'character');
            
            // 팔
            const armGeometry = new THREE.CylinderGeometry(0.2 * scale, 0.2 * scale, 1.2 * scale, 8);
            const armMaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF });
            
            // 왼팔
            const leftArm = new THREE.Mesh(armGeometry, armMaterial);
            leftArm.position.set(x - 0.8 * scale, y + 1 * scale, z);
            leftArm.rotation.z = Math.PI / 2;
            parts.leftArm = St4rXGL.core.addObject(leftArm, 'character_left_arm', 'character');
            
            // 오른팔
            const rightArm = new THREE.Mesh(armGeometry, armMaterial);
            rightArm.position.set(x + 0.8 * scale, y + 1 * scale, z);
            rightArm.rotation.z = -Math.PI / 2;
            parts.rightArm = St4rXGL.core.addObject(rightArm, 'character_right_arm', 'character');
            
            // 다리
            const legGeometry = new THREE.CylinderGeometry(0.25 * scale, 0.25 * scale, 1.5 * scale, 8);
            const legMaterial = new THREE.MeshStandardMaterial({ color: 0x000080 });
            
            // 왼다리
            const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
            leftLeg.position.set(x - 0.3 * scale, y - 0.8 * scale, z);
            parts.leftLeg = St4rXGL.core.addObject(leftLeg, 'character_left_leg', 'character');
            
            // 오른다리
            const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
            rightLeg.position.set(x + 0.3 * scale, y - 0.8 * scale, z);
            parts.rightLeg = St4rXGL.core.addObject(rightLeg, 'character_right_leg', 'character');
            
            return parts;
        },
        
        // 로봇 캐릭터 생성
        createRobot: function(x = 0, y = 0, z = 0, scale = 1) {
            const parts = {};
            
            // 몸통 (상자)
            const bodyGeometry = new THREE.BoxGeometry(1.5 * scale, 2 * scale, 0.8 * scale);
            const bodyMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xCCCCCC,
                metalness: 0.8,
                roughness: 0.2
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.position.set(x, y + 1 * scale, z);
            parts.body = St4rXGL.core.addObject(body, 'robot_body', 'robot');
            
            // 머리 (상자)
            const headGeometry = new THREE.BoxGeometry(1 * scale, 1 * scale, 1 * scale);
            const headMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x888888,
                metalness: 0.7,
                roughness: 0.3
            });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.set(x, y + 2.5 * scale, z);
            parts.head = St4rXGL.core.addObject(head, 'robot_head', 'robot');
            
            // 눈 (두 개의 작은 구)
            const eyeGeometry = new THREE.SphereGeometry(0.1 * scale, 8, 8);
            const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
            
            const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
            leftEye.position.set(x - 0.3 * scale, y + 2.7 * scale, z + 0.5 * scale);
            parts.leftEye = St4rXGL.core.addObject(leftEye, 'robot_left_eye', 'robot');
            
            const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
            rightEye.position.set(x + 0.3 * scale, y + 2.7 * scale, z + 0.5 * scale);
            parts.rightEye = St4rXGL.core.addObject(rightEye, 'robot_right_eye', 'robot');
            
            // 팔 (원기둥)
            const armGeometry = new THREE.CylinderGeometry(0.15 * scale, 0.15 * scale, 1.5 * scale, 8);
            const armMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xAAAAAA,
                metalness: 0.8,
                roughness: 0.2
            });
            
            // 왼팔
            const leftArm = new THREE.Mesh(armGeometry, armMaterial);
            leftArm.position.set(x - 1 * scale, y + 1 * scale, z);
            leftArm.rotation.z = Math.PI / 2;
            parts.leftArm = St4rXGL.core.addObject(leftArm, 'robot_left_arm', 'robot');
            
            // 오른팔
            const rightArm = new THREE.Mesh(armGeometry, armMaterial);
            rightArm.position.set(x + 1 * scale, y + 1 * scale, z);
            rightArm.rotation.z = -Math.PI / 2;
            parts.rightArm = St4rXGL.core.addObject(rightArm, 'robot_right_arm', 'robot');
            
            // 다리 (원기둥)
            const legGeometry = new THREE.CylinderGeometry(0.2 * scale, 0.2 * scale, 1.8 * scale, 8);
            const legMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x666666,
                metalness: 0.8,
                roughness: 0.2
            });
            
            // 왼다리
            const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
            leftLeg.position.set(x - 0.4 * scale, y - 0.9 * scale, z);
            parts.leftLeg = St4rXGL.core.addObject(leftLeg, 'robot_left_leg', 'robot');
            
            // 오른다리
            const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
            rightLeg.position.set(x + 0.4 * scale, y - 0.9 * scale, z);
            parts.rightLeg = St4rXGL.core.addObject(rightLeg, 'robot_right_leg', 'robot');
            
            return parts;
        },
        
        // 동물 캐릭터 생성 (고양이)
        createCat: function(x = 0, y = 0, z = 0, scale = 1) {
            const parts = {};
            
            // 몸통
            const bodyGeometry = new THREE.SphereGeometry(0.8 * scale, 16, 16);
            const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.scale.set(1.5, 0.8, 0.6);
            body.position.set(x, y + 0.4 * scale, z);
            parts.body = St4rXGL.core.addObject(body, 'cat_body', 'animal');
            
            // 머리
            const headGeometry = new THREE.SphereGeometry(0.5 * scale, 16, 16);
            const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.set(x, y + 0.8 * scale, z + 0.6 * scale);
            parts.head = St4rXGL.core.addObject(head, 'cat_head', 'animal');
            
            // 귀 (두 개의 삼각형)
            const earGeometry = new THREE.ConeGeometry(0.2 * scale, 0.4 * scale, 4);
            const earMaterial = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
            
            const leftEar = new THREE.Mesh(earGeometry, earMaterial);
            leftEar.position.set(x - 0.3 * scale, y + 1.1 * scale, z + 0.6 * scale);
            leftEar.rotation.x = Math.PI / 6;
            parts.leftEar = St4rXGL.core.addObject(leftEar, 'cat_left_ear', 'animal');
            
            const rightEar = new THREE.Mesh(earGeometry, earMaterial);
            rightEar.position.set(x + 0.3 * scale, y + 1.1 * scale, z + 0.6 * scale);
            rightEar.rotation.x = Math.PI / 6;
            parts.rightEar = St4rXGL.core.addObject(rightEar, 'cat_right_ear', 'animal');
            
            // 다리 (네 개의 원기둥)
            const legGeometry = new THREE.CylinderGeometry(0.1 * scale, 0.1 * scale, 0.4 * scale, 8);
            const legMaterial = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
            
            const positions = [
                [x - 0.4 * scale, y, z + 0.3 * scale], // 앞왼
                [x + 0.4 * scale, y, z + 0.3 * scale], // 앞오
                [x - 0.3 * scale, y, z - 0.3 * scale], // 뒤왼
                [x + 0.3 * scale, y, z - 0.3 * scale]  // 뒤오
            ];
            
            positions.forEach((pos, index) => {
                const leg = new THREE.Mesh(legGeometry, legMaterial);
                leg.position.set(pos[0], pos[1], pos[2]);
                parts[`leg${index + 1}`] = St4rXGL.core.addObject(leg, `cat_leg_${index + 1}`, 'animal');
            });
            
            // 꼬리
            const tailGeometry = new THREE.CylinderGeometry(0.08 * scale, 0.05 * scale, 1 * scale, 8);
            const tailMaterial = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
            const tail = new THREE.Mesh(tailGeometry, tailMaterial);
            tail.position.set(x, y + 0.2 * scale, z - 0.8 * scale);
            tail.rotation.x = Math.PI / 3;
            parts.tail = St4rXGL.core.addObject(tail, 'cat_tail', 'animal');
            
            return parts;
        },
        
        // 캐릭터 애니메이션
        animateCharacter: function(characterParts, animationType = 'idle') {
            if (!window.St4rXGL.characterAnimations) {
                window.St4rXGL.characterAnimations = [];
            }
            
            const animation = {
                parts: characterParts,
                type: animationType,
                time: 0,
                update: function(deltaTime) {
                    this.time += deltaTime;
                    
                    switch(this.type) {
                        case 'walk':
                            this.walkAnimation(deltaTime);
                            break;
                        case 'jump':
                            this.jumpAnimation(deltaTime);
                            break;
                        case 'idle':
                        default:
                            this.idleAnimation(deltaTime);
                            break;
                    }
                },
                
                idleAnimation: function(deltaTime) {
                    // 기본 호흡 애니메이션
                    const breath = Math.sin(this.time * 2) * 0.02;
                    
                    if (this.parts.body) {
                        const body = St4rXGL.core.getObject(this.parts.body);
                        if (body) {
                            body.mesh.scale.y = 1 + breath;
                        }
                    }
                },
                
                walkAnimation: function(deltaTime) {
                    // 걷기 애니메이션
                    const legSwing = Math.sin(this.time * 8) * 0.3;
                    const armSwing = Math.sin(this.time * 8 + Math.PI) * 0.3;
                    
                    // 팔 흔들기
                    if (this.parts.leftArm) {
                        const leftArm = St4rXGL.core.getObject(this.parts.leftArm);
                        if (leftArm) leftArm.mesh.rotation.x = armSwing;
                    }
                    if (this.parts.rightArm) {
                        const rightArm = St4rXGL.core.getObject(this.parts.rightArm);
                        if (rightArm) rightArm.mesh.rotation.x = -armSwing;
                    }
                    
                    // 다리 흔들기
                    if (this.parts.leftLeg) {
                        const leftLeg = St4rXGL.core.getObject(this.parts.leftLeg);
                        if (leftLeg) leftLeg.mesh.rotation.x = -legSwing;
                    }
                    if (this.parts.rightLeg) {
                        const rightLeg = St4rXGL.core.getObject(this.parts.rightLeg);
                        if (rightLeg) rightLeg.mesh.rotation.x = legSwing;
                    }
                },
                
                jumpAnimation: function(deltaTime) {
                    // 점프 애니메이션
                    const jump = Math.sin(this.time * 4) * 0.5;
                    
                    if (this.parts.body) {
                        const body = St4rXGL.core.getObject(this.parts.body);
                        if (body) {
                            body.mesh.position.y = jump;
                        }
                    }
                }
            };
            
            window.St4rXGL.characterAnimations.push(animation);
            return animation;
        }
    };
    
    // 글로벌 함수로 노출
    window.St4rXGL_CharacterCreator = CharacterCreator;
    
    console.log('Character Creator 프리셋이 성공적으로 로드되었습니다.');
}