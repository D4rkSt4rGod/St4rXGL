// Three.js 래퍼 - Three.js 기능을 쉽게 사용할 수 있게 해주는 래퍼 함수들
if (typeof THREE !== 'undefined') {
    
    const ThreeJSWrapper = {
        // Geometry 생성 래퍼
        createGeometry: {
            box: function(width = 1, height = 1, depth = 1) {
                return new THREE.BoxGeometry(width, height, depth);
            },
            
            sphere: function(radius = 1, widthSegments = 32, heightSegments = 32) {
                return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
            },
            
            cylinder: function(radiusTop = 1, radiusBottom = 1, height = 2, radialSegments = 32) {
                return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
            },
            
            plane: function(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
                return new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
            },
            
            cone: function(radius = 1, height = 2, radialSegments = 32) {
                return new THREE.ConeGeometry(radius, height, radialSegments);
            },
            
            torus: function(radius = 1, tube = 0.4, radialSegments = 12, tubularSegments = 48) {
                return new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
            }
        },
        
        // Material 생성 래퍼
        createMaterial: {
            basic: function(options = {}) {
                return new THREE.MeshBasicMaterial({
                    color: options.color || 0xFFFFFF,
                    transparent: options.transparent || false,
                    opacity: options.opacity || 1,
                    wireframe: options.wireframe || false
                });
            },
            
            standard: function(options = {}) {
                return new THREE.MeshStandardMaterial({
                    color: options.color || 0xFFFFFF,
                    metalness: options.metalness || 0,
                    roughness: options.roughness || 1,
                    transparent: options.transparent || false,
                    opacity: options.opacity || 1,
                    wireframe: options.wireframe || false
                });
            },
            
            phong: function(options = {}) {
                return new THREE.MeshPhongMaterial({
                    color: options.color || 0xFFFFFF,
                    shininess: options.shininess || 30,
                    transparent: options.transparent || false,
                    opacity: options.opacity || 1,
                    wireframe: options.wireframe || false
                });
            },
            
            lambert: function(options = {}) {
                return new THREE.MeshLambertMaterial({
                    color: options.color || 0xFFFFFF,
                    transparent: options.transparent || false,
                    opacity: options.opacity || 1,
                    wireframe: options.wireframe || false
                });
            }
        },
        
        // Light 생성 래퍼
        createLight: {
            ambient: function(color = 0x404040, intensity = 1) {
                return new THREE.AmbientLight(color, intensity);
            },
            
            directional: function(color = 0xFFFFFF, intensity = 1) {
                return new THREE.DirectionalLight(color, intensity);
            },
            
            point: function(color = 0xFFFFFF, intensity = 1, distance = 0, decay = 1) {
                return new THREE.PointLight(color, intensity, distance, decay);
            },
            
            spot: function(color = 0xFFFFFF, intensity = 1, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1) {
                return new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
            }
        },
        
        // Mesh 생성 헬퍼
        createMesh: function(geometry, material, name = '') {
            const mesh = new THREE.Mesh(geometry, material);
            if (name) mesh.name = name;
            return mesh;
        },
        
        // 그룹 생성 헬퍼
        createGroup: function(name = '') {
            const group = new THREE.Group();
            if (name) group.name = name;
            return group;
        },
        
        // 색상 유틸리티
        color: {
            // HEX 문자열을 THREE.Color로 변환
            fromHex: function(hex) {
                return new THREE.Color(hex);
            },
            
            // RGB 값을 THREE.Color로 변환
            fromRGB: function(r, g, b) {
                return new THREE.Color(r / 255, g / 255, b / 255);
            },
            
            // HSL 값을 THREE.Color로 변환
            fromHSL: function(h, s, l) {
                const color = new THREE.Color();
                color.setHSL(h, s, l);
                return color;
            },
            
            // 랜덤 색상 생성
            random: function() {
                return new THREE.Color(Math.random(), Math.random(), Math.random());
            }
        },
        
        // 변환 유틸리티
        transform: {
            // 위치 설정
            setPosition: function(object, x, y, z) {
                object.position.set(x, y, z);
            },
            
            // 회전 설정 (도 단위)
            setRotationDeg: function(object, x, y, z) {
                object.rotation.set(
                    x * Math.PI / 180,
                    y * Math.PI / 180,
                    z * Math.PI / 180
                );
            },
            
            // 크기 설정
            setScale: function(object, x, y, z) {
                object.scale.set(x, y, z);
            },
            
            // 객체를 특정 지점을 바라보도록 설정
            lookAt: function(object, targetX, targetY, targetZ) {
                object.lookAt(targetX, targetY, targetZ);
            }
        },
        
        // 애니메이션 유틸리티
        animation: {
            // 간단한 회전 애니메이션
            createRotationAnimation: function(object, speedX = 0, speedY = 0.01, speedZ = 0) {
                return function(deltaTime) {
                    object.rotation.x += speedX * deltaTime;
                    object.rotation.y += speedY * deltaTime;
                    object.rotation.z += speedZ * deltaTime;
                };
            },
            
            // 떠다니는 애니메이션
            createFloatingAnimation: function(object, amplitude = 0.5, speed = 1) {
                let time = 0;
                const startY = object.position.y;
                
                return function(deltaTime) {
                    time += deltaTime * speed;
                    object.position.y = startY + Math.sin(time) * amplitude;
                };
            },
            
            // 펄스 애니메이션 (크기 변화)
            createPulseAnimation: function(object, minScale = 0.8, maxScale = 1.2, speed = 1) {
                let time = 0;
                const originalScale = object.scale.clone();
                
                return function(deltaTime) {
                    time += deltaTime * speed;
                    const scale = minScale + (maxScale - minScale) * (Math.sin(time) + 1) / 2;
                    object.scale.copy(originalScale).multiplyScalar(scale);
                };
            }
        },
        
        // 수학 유틸리티
        math: {
            // 두 점 사이의 거리
            distance: function(x1, y1, z1, x2, y2, z2) {
                return Math.sqrt(
                    Math.pow(x2 - x1, 2) + 
                    Math.pow(y2 - y1, 2) + 
                    Math.pow(z2 - z1, 2)
                );
            },
            
            // 선형 보간
            lerp: function(start, end, factor) {
                return start + (end - start) * factor;
            },
            
            // 각도 제한
            clampAngle: function(angle) {
                while (angle > Math.PI) angle -= Math.PI * 2;
                while (angle < -Math.PI) angle += Math.PI * 2;
                return angle;
            },
            
            // 랜덤 범위
            randomRange: function(min, max) {
                return Math.random() * (max - min) + min;
            }
        }
    };
    
    // 글로벌로 노출
    window.ThreeJSWrapper = ThreeJSWrapper;
    
    console.log('Three.js Wrapper가 로드되었습니다.');
} else {
    console.error('Three.js가 로드되지 않았습니다. Three.js Wrapper를 사용할 수 없습니다.');
}