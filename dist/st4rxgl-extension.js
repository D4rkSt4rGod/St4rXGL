// St4rXGL - 엔트리 3D 확장 프로그램
// Version: 1.0.0
// Build: production

(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EntrySt4rXGL = factory());
}(this, (function() { 'use strict';

    // Three.js 핵심 관리 클래스
    class St4rXGLCore {
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

    // 기본 도형 블록들
    const basicShapesBlocks = [
        {
            // 정육면체 생성 블록
            type: 'st4rxgl_create_box',
            color: '#FF6B6B',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Text',
                    text: '정육면체 생성'
                },
                {
                    type: 'Text',
                    text: '너비:'
                },
                {
                    type: 'Block',
                    accept: 'number'
                },
                {
                    type: 'Text',
                    text: '높이:'
                },
                {
                    type: 'Block',
                    accept: 'number'
                },
                {
                    type: 'Text',
                    text: '깊이:'
                },
                {
                    type: 'Block',
                    accept: 'number'
                },
                {
                    type: 'Text',
                    text: '색상:'
                },
                {
                    type: 'Colour',
                    colour: '#ff0000'
                }
            ],
            def: {
                params: [
                    null,
                    null,
                    {
                        type: 'number',
                        params: ['1']
                    },
                    null,
                    {
                        type: 'number',
                        params: ['1']
                    },
                    null,
                    {
                        type: 'number',
                        params: ['1']
                    },
                    null,
                    '#ff0000'
                ],
                type: 'st4rxgl_create_box'
            },
            paramsKeyMap: {
                WIDTH: 2,
                HEIGHT: 4,
                DEPTH: 6,
                COLOR: 8
            },
            func: function(sprite, script) {
                const width = script.getNumberValue('WIDTH', script);
                const height = script.getNumberValue('HEIGHT', script);
                const depth = script.getNumberValue('DEPTH', script);
                const color = script.getField('COLOR');
                
                if (window.St4rXGL && window.St4rXGL.objectManager) {
                    const objectId = window.St4rXGL.objectManager.createBox(width, height, depth, color);
                    return objectId;
                }
                return -1;
            },
            syntax: { js: [], py: [] }
        },
        {
            // 구 생성 블록
            type: 'st4rxgl_create_sphere',
            color: '#4ECDC4',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Text',
                    text: '구 생성'
                },
                {
                    type: 'Text',
                    text: '반지름:'
                },
                {
                    type: 'Block',
                    accept: 'number'
                },
                {
                    type: 'Text',
                    text: '색상:'
                },
                {
                    type: 'Colour',
                    colour: '#00ff00'
                }
            ],
            def: {
                params: [
                    null,
                    null,
                    {
                        type: 'number',
                        params: ['1']
                    },
                    null,
                    '#00ff00'
                ],
                type: 'st4rxgl_create_sphere'
            },
            paramsKeyMap: {
                RADIUS: 2,
                COLOR: 4
            },
            func: function(sprite, script) {
                const radius = script.getNumberValue('RADIUS', script);
                const color = script.getField('COLOR');
                
                if (window.St4rXGL && window.St4rXGL.objectManager) {
                    const objectId = window.St4rXGL.objectManager.createSphere(radius, color);
                    return objectId;
                }
                return -1;
            },
            syntax: { js: [], py: [] }
        }
    ];

    // 변환 블록들
    const transformationsBlocks = [
        {
            // 위치 설정 블록
            type: 'st4rxgl_set_position',
            color: '#FFA500',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Text',
                    text: '객체 ID:'
                },
                {
                    type: 'Block',
                    accept: 'number'
                },
                {
                    type: 'Text',
                    text: 'X:'
                },
                {
                    type: 'Block',
                    accept: 'number'
                },
                {
                    type: 'Text',
                    text: 'Y:'
                },
                {
                    type: 'Block',
                    accept: 'number'
                },
                {
                    type: 'Text',
                    text: 'Z:'
                },
                {
                    type: 'Block',
                    accept: 'number'
                }
            ],
            def: {
                params: [
                    null,
                    {
                        type: 'number',
                        params: ['0']
                    },
                    null,
                    {
                        type: 'number',
                        params: ['0']
                    },
                    null,
                    {
                        type: 'number',
                        params: ['0']
                    },
                    null,
                    {
                        type: 'number',
                        params: ['0']
                    }
                ],
                type: 'st4rxgl_set_position'
            },
            paramsKeyMap: {
                OBJECT_ID: 1,
                X: 3,
                Y: 5,
                Z: 7
            },
            func: function(sprite, script) {
                const objectId = script.getNumberValue('OBJECT_ID', script);
                const x = script.getNumberValue('X', script);
                const y = script.getNumberValue('Y', script);
                const z = script.getNumberValue('Z', script);
                
                if (window.St4rXGL && window.St4rXGL.objectManager) {
                    const success = window.St4rXGL.objectManager.setPosition(objectId, x, y, z);
                    return success;
                }
                return false;
            },
            syntax: { js: [], py: [] }
        }
    ];

    // 애니메이션 블록들
    const animationBlocks = [
        {
            // 애니메이션 시작 블록
            type: 'st4rxgl_start_animation',
            color: '#FF1493',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Text',
                    text: '3D 애니메이션 시작'
                }
            ],
            events: {},
            def: {
                params: [],
                type: 'st4rxgl_start_animation'
            },
            func: function(sprite, script) {
                if (window.St4rXGL && window.St4rXGL.renderManager) {
                    window.St4rXGL.renderManager.startRendering();
                    return true;
                }
                return false;
            },
            syntax: { js: [], py: [] }
        }
    ];

    // 확장 프로그램 메인 객체
    const St4rXGL = {
        name: 'St4rXGL 3D Extension',
        description: 'WebGL과 Three.js를 이용한 3D 작품 제작 확장 프로그램',
        version: '1.0.0',
        author: 'St4rXGL Team',
        category: 'arduino',
        img: './assets/icons/st4rxgl_icon.png',
        
        // 핵심 인스턴스
        core: null,
        
        // 초기화 함수
        init: function() {
            console.log('St4rXGL 확장 프로그램 초기화 중...');
            
            // 코어 모듈 초기화
            this.core = new St4rXGLCore();
            
            // Three.js 로드
            this.loadThreeJS()
                .then(() => {
                    console.log('Three.js loaded successfully');
                    this.core.setupThreeJS();
                })
                .catch((error) => {
                    console.error('Failed to load Three.js:', error);
                });
            
            this.setupEventListeners();
            console.log('St4rXGL 확장 프로그램이 초기화되었습니다.');
        },
        
        // Three.js 로드
        loadThreeJS: function() {
            return new Promise((resolve, reject) => {
                if (window.THREE) {
                    resolve();
                    return;
                }
                
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
                script.onload = () => {
                    console.log('Three.js loaded successfully');
                    resolve();
                };
                script.onerror = () => {
                    console.error('Failed to load Three.js');
                    reject(new Error('Failed to load Three.js'));
                };
                document.head.appendChild(script);
            });
        },
        
        // 이벤트 리스너 설정
        setupEventListeners: function() {
            if (Entry && Entry.addEventListener) {
                Entry.addEventListener('stop', this.onStop.bind(this));
                Entry.addEventListener('play', this.onPlay.bind(this));
            }
        },
        
        // 실행 시작 시
        onPlay: function() {
            if (this.core) {
                this.core.startAnimation();
            }
        },
        
        // 실행 정지 시
        onStop: function() {
            if (this.core) {
                this.core.cleanup();
            }
        },
        
        // 객체 관리 함수들
        objectManager: {
            createBox: function(width = 1, height = 1, depth = 1, color = 0xff0000) {
                if (!window.St4rXGL || !window.St4rXGL.core) return -1;
                
                const geometry = new THREE.BoxGeometry(width, height, depth);
                const material = new THREE.MeshStandardMaterial({ color: color });
                const mesh = new THREE.Mesh(geometry, material);
                
                return window.St4rXGL.core.addObject(mesh, 'box', 'box');
            },
            
            createSphere: function(radius = 1, color = 0x00ff00) {
                if (!window.St4rXGL || !window.St4rXGL.core) return -1;
                
                const geometry = new THREE.SphereGeometry(radius, 32, 32);
                const material = new THREE.MeshStandardMaterial({ color: color });
                const mesh = new THREE.Mesh(geometry, material);
                
                return window.St4rXGL.core.addObject(mesh, 'sphere', 'sphere');
            },
            
            setPosition: function(objectId, x, y, z) {
                if (!window.St4rXGL || !window.St4rXGL.core) return false;
                
                const obj = window.St4rXGL.core.getObject(objectId);
                if (obj) {
                    obj.mesh.position.set(x, y, z);
                    return true;
                }
                return false;
            }
        },
        
        // 렌더링 관리
        renderManager: {
            startRendering: function() {
                if (!window.St4rXGL || !window.St4rXGL.core) return;
                
                window.St4rXGL.core.startAnimation();
                
                // 렌더러를 엔트리 스테이지에 추가
                const stageContainer = document.getElementById('entry-stage');
                if (stageContainer && window.St4rXGL.core.getDOMElement()) {
                    const existingCanvas = stageContainer.querySelector('.st4rxgl-canvas');
                    if (existingCanvas) {
                        existingCanvas.remove();
                    }
                    
                    const canvas = window.St4rXGL.core.getDOMElement();
                    canvas.classList.add('st4rxgl-canvas');
                    canvas.style.position = 'absolute';
                    canvas.style.top = '0';
                    canvas.style.left = '0';
                    canvas.style.zIndex = '10';
                    
                    stageContainer.style.position = 'relative';
                    stageContainer.appendChild(canvas);
                }
            }
        },
        
        // 블록 정의 통합
        blocks: [
            ...basicShapesBlocks,
            ...transformationsBlocks,
            ...animationBlocks
        ]
    };

    // 엔트리에 확장 프로그램 등록
    if (typeof Entry !== 'undefined') {
        Entry.register(St4rXGL);
    }

    // 글로벌 exports
    window.St4rXGL = St4rXGL;

    return St4rXGL;
})));