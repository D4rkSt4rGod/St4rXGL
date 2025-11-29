// 기본 3D 씬 프리셋
if (typeof St4rXGL !== 'undefined' && St4rXGL.core) {
    console.log('St4rXGL Basic Scene 프리셋 로드됨');
    
    // 기본 지형 생성
    const createGround = function(size = 20, color = 0x00ff00) {
        const geometry = new THREE.PlaneGeometry(size, size);
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            side: THREE.DoubleSide 
        });
        const ground = new THREE.Mesh(geometry, material);
        ground.rotation.x = Math.PI / 2;
        ground.receiveShadow = true;
        
        const groundId = St4rXGL.core.addObject(ground, 'ground', 'plane');
        return groundId;
    };
    
    // 기본 조명 설정
    const setupBasicLighting = function() {
        // 환경광
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        St4rXGL.core.scene.add(ambientLight);
        
        // 주 조명
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        St4rXGL.core.scene.add(directionalLight);
        
        // 보조 조명
        const pointLight = new THREE.PointLight(0xff4000, 0.5, 100);
        pointLight.position.set(-5, 3, 0);
        St4rXGL.core.scene.add(pointLight);
    };
    
    // 예제 객체 생성
    const createExampleObjects = function() {
        // 상자
        const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
        const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.set(-3, 1, 0);
        box.castShadow = true;
        St4rXGL.core.addObject(box, 'example_box', 'box');
        
        // 구
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x4ecdc4 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(0, 1, 0);
        sphere.castShadow = true;
        St4rXGL.core.addObject(sphere, 'example_sphere', 'sphere');
        
        // 원기둥
        const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
        const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x45b7d1 });
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.set(3, 1, 0);
        cylinder.castShadow = true;
        St4rXGL.core.addObject(cylinder, 'example_cylinder', 'cylinder');
    };
    
    // 자동 실행 함수
    const initializeBasicScene = function() {
        console.log('기본 3D 씬 초기화 중...');
        
        // 지형 생성
        createGround();
        
        // 조명 설정
        setupBasicLighting();
        
        // 예제 객체 생성
        createExampleObjects();
        
        // 카메라 위치 조정
        if (St4rXGL.core.camera) {
            St4rXGL.core.camera.position.set(8, 6, 8);
            St4rXGL.core.camera.lookAt(0, 0, 0);
        }
        
        console.log('기본 3D 씬 초기화 완료');
    };
    
    // 글로벌 함수로 노출
    window.St4rXGL_BasicScene = {
        createGround: createGround,
        setupBasicLighting: setupBasicLighting,
        createExampleObjects: createExampleObjects,
        initialize: initializeBasicScene
    };
    
    // 자동 초기화 (옵션)
    // initializeBasicScene();
}