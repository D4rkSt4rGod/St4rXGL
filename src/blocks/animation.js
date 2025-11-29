// 애니메이션 블록들
export const blocks = [
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
    },
    {
        // 객체 회전 애니메이션 블록
        type: 'st4rxgl_animate_rotation',
        color: '#C71585',
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
                text: 'X 속도:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: 'Y 속도:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: 'Z 속도:'
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
                    params: ['1']
                },
                null,
                {
                    type: 'number',
                    params: ['0']
                }
            ],
            type: 'st4rxgl_animate_rotation'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            X_SPEED: 3,
            Y_SPEED: 5,
            Z_SPEED: 7
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const xSpeed = script.getNumberValue('X_SPEED', script);
            const ySpeed = script.getNumberValue('Y_SPEED', script);
            const zSpeed = script.getNumberValue('Z_SPEED', script);
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const obj = window.St4rXGL.core.getObject(objectId);
                if (obj) {
                    // 애니메이션 함수 등록
                    const animate = () => {
                        obj.mesh.rotation.x += xSpeed * 0.01;
                        obj.mesh.rotation.y += ySpeed * 0.01;
                        obj.mesh.rotation.z += zSpeed * 0.01;
                    };
                    
                    // 애니메이션 루프에 추가 (간단한 구현)
                    if (!window.St4rXGL.animationCallbacks) {
                        window.St4rXGL.animationCallbacks = [];
                    }
                    window.St4rXGL.animationCallbacks.push(animate);
                    
                    return true;
                }
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 객체 이동 애니메이션 블록
        type: 'st4rxgl_animate_movement',
        color: '#DB7093',
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
                text: 'X 이동:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: 'Y 이동:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: 'Z 이동:'
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
            type: 'st4rxgl_animate_movement'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            X_MOVE: 3,
            Y_MOVE: 5,
            Z_MOVE: 7
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const xMove = script.getNumberValue('X_MOVE', script);
            const yMove = script.getNumberValue('Y_MOVE', script);
            const zMove = script.getNumberValue('Z_MOVE', script);
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const obj = window.St4rXGL.core.getObject(objectId);
                if (obj) {
                    const animate = () => {
                        obj.mesh.position.x += xMove * 0.01;
                        obj.mesh.position.y += yMove * 0.01;
                        obj.mesh.position.z += zMove * 0.01;
                    };
                    
                    if (!window.St4rXGL.animationCallbacks) {
                        window.St4rXGL.animationCallbacks = [];
                    }
                    window.St4rXGL.animationCallbacks.push(animate);
                    
                    return true;
                }
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 카메라 위치 설정 블록
        type: 'st4rxgl_set_camera_position',
        color: '#FF69B4',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '카메라 위치'
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
                null,
                {
                    type: 'number',
                    params: ['5']
                },
                null,
                {
                    type: 'number',
                    params: ['5']
                },
                null,
                {
                    type: 'number',
                    params: ['10']
                }
            ],
            type: 'st4rxgl_set_camera_position'
        },
        paramsKeyMap: {
            X: 2,
            Y: 4,
            Z: 6
        },
        func: function(sprite, script) {
            const x = script.getNumberValue('X', script);
            const y = script.getNumberValue('Y', script);
            const z = script.getNumberValue('Z', script);
            
            if (window.St4rXGL && window.St4rXGL.core && window.St4rXGL.core.camera) {
                window.St4rXGL.core.camera.position.set(x, y, z);
                return true;
            }
            return false;
        },
        syntax: { js: [], py: [] }
    }
];