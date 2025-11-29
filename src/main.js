// St4rXGL 메인 확장 프로그램
import St4rXGLCore from './core/st4rxgl-core.js';
import * as SceneManager from './core/scene-manager.js';
import * as ObjectManager from './core/object-manager.js';
import * as RenderManager from './core/render-manager.js';
import * as ScriptLoader from './core/script-loader.js';

import * as BasicShapes from './blocks/basic-shapes.js';
import * as Transformations from './blocks/transformations.js';
import * as Materials from './blocks/materials.js';
import * as Lighting from './blocks/lighting.js';
import * as ExternalLoader from './blocks/external-loader.js';
import * as Animation from './blocks/animation.js';

import * as Helpers from './utils/helpers.js';
import * as Constants from './utils/constants.js';

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
    sceneManager: null,
    objectManager: null,
    renderManager: null,
    scriptLoader: null,
    
    // 초기화 함수
    init: function() {
        console.log('St4rXGL 확장 프로그램 초기화 중...');
        
        // 코어 모듈 초기화
        this.core = new St4rXGLCore();
        this.sceneManager = SceneManager;
        this.objectManager = ObjectManager;
        this.renderManager = RenderManager;
        this.scriptLoader = ScriptLoader;
        
        // 모듈 초기화
        this.sceneManager.init(this.core);
        this.objectManager.init(this.core);
        this.renderManager.init(this.core);
        this.scriptLoader.init(this.core);
        
        this.setupEventListeners();
        this.loadDefaultAssets();
        
        console.log('St4rXGL 확장 프로그램이 초기화되었습니다.');
    },
    
    // 이벤트 리스너 설정
    setupEventListeners: function() {
        if (Entry && Entry.addEventListener) {
            Entry.addEventListener('stop', this.onStop.bind(this));
            Entry.addEventListener('play', this.onPlay.bind(this));
        }
        
        // 창 크기 변경 이벤트
        window.addEventListener('resize', this.onWindowResize.bind(this));
    },
    
    // 기본 에셋 로드
    loadDefaultAssets: function() {
        // Three.js 로드
        this.scriptLoader.loadThreeJS()
            .then(() => {
                console.log('Three.js loaded successfully');
                this.core.setupThreeJS();
            })
            .catch((error) => {
                console.error('Failed to load Three.js:', error);
            });
    },
    
    // 실행 시작 시
    onPlay: function() {
        if (this.renderManager) {
            this.renderManager.startRendering();
        }
    },
    
    // 실행 정지 시
    onStop: function() {
        if (this.core) {
            this.core.cleanup();
        }
        if (this.renderManager) {
            this.renderManager.stopRendering();
        }
    },
    
    // 창 크기 변경
    onWindowResize: function() {
        if (this.core && this.core.camera && this.core.renderer) {
            this.core.camera.aspect = window.innerWidth / window.innerHeight;
            this.core.camera.updateProjectionMatrix();
            this.core.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    },
    
    // 블록 정의 통합
    blocks: [
        ...BasicShapes.blocks,
        ...Transformations.blocks,
        ...Materials.blocks,
        ...Lighting.blocks,
        ...ExternalLoader.blocks,
        ...Animation.blocks
    ]
};

// 엔트리에 확장 프로그램 등록
if (typeof Entry !== 'undefined') {
    Entry.register(St4rXGL);
}

// 글로벌 exports
window.St4rXGL = St4rXGL;

export default St4rXGL;