// Three.js 핵심 관리 클래스
import * as THREE from 'three';

export default class St4rXGLCore {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = new Map();
        this.lights = new Map();
        this.materials = new Map();
        this.objectCounter = 0;
        this.lightCounter = 0;
        this.materialCounter = 0;
        this.isInitialized = false;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.setupThreeJS();
        this.isInitialized = true;
    }
    
    setupThreeJS() {
        try {
            // 씬 생성
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x87CEEB);
            this.scene.fog = new THREE.Fog(0x87CEEB, 10, 50);
            
            // 카메라 설정
            this.camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                1000
            );
            this.camera.position.set(5, 5, 10);
            this.camera.lookAt(0, 0, 0);
            
            // 렌더러 설정
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(800, 600);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.setClearColor(0x000000, 0);
            
            // 기본 조명
            this.setupDefaultLighting();
            
            // 그리드 헬퍼와 축 헬퍼
            this.setupHelpers();
            
            console.log('Three.js setup completed');
        } catch (error) {
            console.error('Error setting up Three.js:', error);
        }
    }
    
    setupDefaultLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        this.lights.set(this.lightCounter++, {
            type: 'ambient',
            light: ambientLight
        });
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(directionalLight);
        this.lights.set(this.lightCounter++, {
            type: 'directional',
            light: directionalLight
        });
    }
    
    setupHelpers() {
        // 그리드 헬퍼
        const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
        this.scene.add(gridHelper);
        
        // 축 헬퍼
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }
    
    // 객체 추가 메서드
    addObject(mesh, name = null, type = 'custom') {
        const id = this.objectCounter++;
        const objectName = name || `${type}_${id}`;
        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        this.objects.set(id, {
            id: id,
            name: objectName,
            mesh: mesh,
            type: type,
            visible: true
        });
        
        this.scene.add(mesh);
        return id;
    }
    
    // 객체 가져오기
    getObject(id) {
        return this.objects.get(id);
    }
    
    // 모든 객체 가져오기
    getAllObjects() {
        return Array.from(this.objects.values());
    }
    
    // 객체 제거
    removeObject(id) {
        const obj = this.objects.get(id);
        if (obj) {
            this.scene.remove(obj.mesh);
            if (obj.mesh.geometry) obj.mesh.geometry.dispose();
            if (obj.mesh.material) {
                if (Array.isArray(obj.mesh.material)) {
                    obj.mesh.material.forEach(material => material.dispose());
                } else {
                    obj.mesh.material.dispose();
                }
            }
            this.objects.delete(id);
            return true;
        }
        return false;
    }
    
    // 애니메이션 루프 시작
    startAnimation() {
        if (this.animationId) return;
        
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.render();
        };
        animate();
    }
    
    // 애니메이션 루프 정지
    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    // 렌더링
    render() {
        if (this.scene && this.camera && this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    // 정리 메서드
    cleanup() {
        this.stopAnimation();
        
        // 객체 정리
        this.objects.forEach((obj, id) => {
            this.scene.remove(obj.mesh);
            if (obj.mesh.geometry) obj.mesh.geometry.dispose();
            if (obj.mesh.material) {
                if (Array.isArray(obj.mesh.material)) {
                    obj.mesh.material.forEach(material => material.dispose());
                } else {
                    obj.mesh.material.dispose();
                }
            }
        });
        this.objects.clear();
        
        // 조명 정리
        this.lights.forEach((lightObj, id) => {
            this.scene.remove(lightObj.light);
            if (lightObj.light.dispose) lightObj.light.dispose();
        });
        this.lights.clear();
        
        // 머티리얼 정리
        this.materials.forEach((material, id) => {
            if (material.dispose) material.dispose();
        });
        this.materials.clear();
        
        this.objectCounter = 0;
        this.lightCounter = 0;
        this.materialCounter = 0;
    }
    
    // 렌더러 DOM 요소 가져오기
    getDOMElement() {
        return this.renderer ? this.renderer.domElement : null;
    }
}