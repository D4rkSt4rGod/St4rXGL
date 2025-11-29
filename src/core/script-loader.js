// 외부 스크립트 로더 모듈
export let core = null;
const loadedScripts = new Set();

export function init(coreInstance) {
    core = coreInstance;
}

export function loadThreeJS() {
    return new Promise((resolve, reject) => {
        // Three.js가 이미 로드되었는지 확인
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
}

export function loadExternalScript(url) {
    return new Promise((resolve, reject) => {
        if (loadedScripts.has(url)) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            loadedScripts.add(url);
            console.log(`External script loaded: ${url}`);
            resolve();
        };
        script.onerror = () => {
            console.error(`Failed to load external script: ${url}`);
            reject(new Error(`Failed to load external script: ${url}`));
        };
        document.head.appendChild(script);
    });
}

export function loadPresetScript(presetName) {
    const presetPaths = {
        'basic-scene': './external-scripts/presets/basic-scene.js',
        'city-builder': './external-scripts/presets/city-builder.js',
        'character-creator': './external-scripts/presets/character-creator.js',
        'terrain-generator': './external-scripts/presets/terrain-generator.js'
    };
    
    const path = presetPaths[presetName];
    if (!path) {
        return Promise.reject(new Error(`Unknown preset: ${presetName}`));
    }
    
    return loadExternalScript(path);
}

export function executeCustomCode(code) {
    try {
        // 안전한 코드 실행을 위해 함수로 래핑
        const func = new Function('THREE', 'St4rXGL', 'core', code);
        func(THREE, window.St4rXGL, core);
        return true;
    } catch (error) {
        console.error('Error executing custom code:', error);
        return false;
    }
}

export function getLoadedScripts() {
    return Array.from(loadedScripts);
}

export function clearLoadedScripts() {
    loadedScripts.clear();
}