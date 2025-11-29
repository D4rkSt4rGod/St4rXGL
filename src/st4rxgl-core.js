// Three.js 핵심 관리 클래스
import * as THREE from 'three';

export default class St4rXGLCore {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = new Map();
        this.objectCounter = 0;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        this.setupThreeJS();
        this.isInitialized = true;
    }
    
    setupThreeJS() {
        // 씬 생성
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        
        // 카메라 설정
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);
        
        // 렌더러 설정
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(800, 600);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // 기본 조명
        this.setupDefaultLighting();
        
        // 그리드 헬퍼
        const gridHelper = new THREE.GridHelper(10, 10);
        this.scene.add(gridHelper);
    }
    
    setupDefaultLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }
    
    // 객체 추가 메서드
    addObject(mesh, name = null) {
        const id = this.objectCounter++;
        const objectName = name || `object_${id}`;
        
        this.objects.set(id, {
            id: id,
            name: objectName,
            mesh: mesh,
            type: 'custom'
        });
        
        this.scene.add(mesh);
        return id;
    }
    
    // 정리 메서드
    cleanup() {
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
        this.objectCounter = 0;
    }
}