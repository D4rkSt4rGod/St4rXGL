// 변환 블록들
export const blocks = [
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
    },
    {
        // 회전 설정 블록
        type: 'st4rxgl_set_rotation',
        color: '#9B59B6',
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
                text: 'X 각도:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: 'Y 각도:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: 'Z 각도:'
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
            type: 'st4rxgl_set_rotation'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            X_ANGLE: 3,
            Y_ANGLE: 5,
            Z_ANGLE: 7
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const xAngle = script.getNumberValue('X_ANGLE', script) * Math.PI / 180;
            const yAngle = script.getNumberValue('Y_ANGLE', script) * Math.PI / 180;
            const zAngle = script.getNumberValue('Z_ANGLE', script) * Math.PI / 180;
            
            if (window.St4rXGL && window.St4rXGL.objectManager) {
                const success = window.St4rXGL.objectManager.setRotation(objectId, xAngle, yAngle, zAngle);
                return success;
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 크기 설정 블록
        type: 'st4rxgl_set_scale',
        color: '#E74C3C',
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
                text: 'X 크기:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: 'Y 크기:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: 'Z 크기:'
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
                }
            ],
            type: 'st4rxgl_set_scale'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            X_SCALE: 3,
            Y_SCALE: 5,
            Z_SCALE: 7
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const xScale = script.getNumberValue('X_SCALE', script);
            const yScale = script.getNumberValue('Y_SCALE', script);
            const zScale = script.getNumberValue('Z_SCALE', script);
            
            if (window.St4rXGL && window.St4rXGL.objectManager) {
                const success = window.St4rXGL.objectManager.setScale(objectId, xScale, yScale, zScale);
                return success;
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 가시성 설정 블록
        type: 'st4rxgl_set_visibility',
        color: '#3498DB',
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
                type: 'Dropdown',
                options: [
                    ['보이기', 'true'],
                    ['숨기기', 'false']
                ],
                value: 'true'
            }
        ],
        def: {
            params: [
                null,
                {
                    type: 'number',
                    params: ['0']
                },
                'true'
            ],
            type: 'st4rxgl_set_visibility'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            VISIBLE: 2
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const visible = script.getField('VISIBLE') === 'true';
            
            if (window.St4rXGL && window.St4rXGL.objectManager) {
                const success = window.St4rXGL.objectManager.setVisibility(objectId, visible);
                return success;
            }
            return false;
        },
        syntax: { js: [], py: [] }
    }
];