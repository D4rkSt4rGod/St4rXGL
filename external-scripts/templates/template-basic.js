// 기본 템플릿 - St4rXGL 외부 스크립트 템플릿
if (typeof St4rXGL !== 'undefined' && St4rXGL.core) {
    
    // 스크립트 정보
    const scriptInfo = {
        name: '기본 템플릿',
        version: '1.0.0',
        author: 'St4rXGL 사용자',
        description: 'St4rXGL 외부 스크립트 기본 템플릿'
    };
    
    // 주요 함수 정의
    const MyCustomScript = {
        
        // 초기화 함수
        init: function() {
            console.log('사용자 스크립트 초기화: ' + scriptInfo.name);
            
            // 여기에 초기화 코드 작성
            this.createCustomScene();
            this.setupCustomLighting();
        },
        
        // 커스텀 씬 생성
        createCustomScene: function() {
            // 배경색 설정
            St4rXGL.sceneManager.setBackgroundColor(0x001122);
            
            // 지면 생성
            const groundGeometry = new THREE.PlaneGeometry(20, 20);
            const groundMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x00AA00,
                side: THREE.DoubleSide
            });
            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = Math.PI / 2;
            ground.receiveShadow = true;
            St4rXGL.core.addObject(ground, 'custom_ground', 'ground');
        },
        
        // 커스텀 조명 설정
        setupCustomLighting: function() {
            // 주 조명
            const mainLight = new THREE.DirectionalLight(0xFFFFFF, 1);
            mainLight.position.set(5, 10, 5);
            mainLight.castShadow = true;
            St4rXGL.core.scene.add(mainLight);
            
            // 분위기 조명
            const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
            St4rXGL.core.scene.add(ambientLight);
        },
        
        // 예제 객체 생성 함수
        createExampleObject: function(x, y, z) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshStandardMaterial({ color: 0xFF6B6B });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, y, z);
            cube.castShadow = true;
            
            return St4rXGL.core.addObject(cube, 'example_cube', 'custom');
        },
        
        // 애니메이션 함수
        startCustomAnimation: function(objectId) {
            const obj = St4rXGL.core.getObject(objectId);
            if (!obj) return;
            
            const animate = function() {
                requestAnimationFrame(animate);
                obj.mesh.rotation.x += 0.01;
                obj.mesh.rotation.y += 0.01;
            };
            animate();
        },
        
        // 유틸리티 함수들
        utils: {
            // 랜덤 색상 생성
            randomColor: function() {
                return Math.random() * 0xFFFFFF;
            },
            
            // 랜덤 위치 생성
            randomPosition: function(range = 5) {
                return {
                    x: (Math.random() - 0.5) * range * 2,
                    y: Math.random() * range,
                    z: (Math.random() - 0.5) * range * 2
                };
            }
        }
    };
    
    // 스크립트 정보를 글로벌로 노출
    window.MyCustomScript = MyCustomScript;
    window.MyCustomScript.info = scriptInfo;
    
    // 자동 초기화 (옵션)
    // MyCustomScript.init();
    
    console.log('기본 템플릿 스크립트가 로드되었습니다.');
} else {
    console.error('St4rXGL이 로드되지 않았습니다. 이 스크립트는 St4rXGL 확장 프로그램이 필요합니다.');
}