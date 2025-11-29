// 상수 정의
export const SHAPE_TYPES = {
    BOX: 'box',
    SPHERE: 'sphere',
    CYLINDER: 'cylinder',
    CONE: 'cone',
    PLANE: 'plane',
    TORUS: 'torus'
};

export const LIGHT_TYPES = {
    AMBIENT: 'ambient',
    DIRECTIONAL: 'directional',
    POINT: 'point',
    SPOT: 'spot'
};

export const MATERIAL_TYPES = {
    BASIC: 'basic',
    STANDARD: 'standard',
    PHONG: 'phong',
    LAMBERT: 'lambert'
};

export const PRESET_SCRIPTS = {
    'basic-scene': '기본 3D 씬',
    'city-builder': '도시 생성기',
    'character-creator': '캐릭터 생성기',
    'terrain-generator': '지형 생성기'
};

export const DEFAULT_COLORS = {
    RED: 0xff0000,
    GREEN: 0x00ff00,
    BLUE: 0x0000ff,
    WHITE: 0xffffff,
    BLACK: 0x000000,
    GRAY: 0x808080,
    YELLOW: 0xffff00,
    CYAN: 0x00ffff,
    MAGENTA: 0xff00ff
};

export const ERROR_MESSAGES = {
    INVALID_OBJECT_ID: '유효하지 않은 객체 ID입니다.',
    OBJECT_NOT_FOUND: '객체를 찾을 수 없습니다.',
    INVALID_POSITION: '유효하지 않은 위치 값입니다.',
    INVALID_COLOR: '유효하지 않은 색상 값입니다.',
    SCRIPT_LOAD_FAILED: '스크립트 로드에 실패했습니다.',
    THREEJS_NOT_LOADED: 'Three.js가 로드되지 않았습니다.'
};

export const SUCCESS_MESSAGES = {
    OBJECT_CREATED: '객체가 생성되었습니다.',
    OBJECT_UPDATED: '객체가 업데이트되었습니다.',
    OBJECT_DELETED: '객체가 삭제되었습니다.',
    SCRIPT_LOADED: '스크립트가 로드되었습니다.',
    ANIMATION_STARTED: '애니메이션이 시작되었습니다.'
};