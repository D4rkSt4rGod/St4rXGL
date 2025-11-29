// 재질 블록들
export const blocks = [
    {
        // 색상 변경 블록
        type: 'st4rxgl_set_color',
        color: '#FF4757',
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
                {
                    type: 'number',
                    params: ['0']
                },
                null,
                '#ff0000'
            ],
            type: 'st4rxgl_set_color'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            COLOR: 3
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const color = script.getField('COLOR');
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const obj = window.St4rXGL.core.getObject(objectId);
                if (obj && obj.mesh.material) {
                    obj.mesh.material.color = new THREE.Color(color);
                    return true;
                }
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 투명도 설정 블록
        type: 'st4rxgl_set_opacity',
        color: '#5352ED',
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
                text: '투명도:'
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
                }
            ],
            type: 'st4rxgl_set_opacity'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            OPACITY: 3
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const opacity = Math.max(0, Math.min(1, script.getNumberValue('OPACITY', script)));
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const obj = window.St4rXGL.core.getObject(objectId);
                if (obj && obj.mesh.material) {
                    obj.mesh.material.transparent = true;
                    obj.mesh.material.opacity = opacity;
                    return true;
                }
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 금속성 설정 블록
        type: 'st4rxgl_set_metalness',
        color: '#FFA502',
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
                text: '금속성:'
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
                    params: ['0.5']
                }
            ],
            type: 'st4rxgl_set_metalness'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            METALNESS: 3
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const metalness = Math.max(0, Math.min(1, script.getNumberValue('METALNESS', script)));
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const obj = window.St4rXGL.core.getObject(objectId);
                if (obj && obj.mesh.material) {
                    obj.mesh.material.metalness = metalness;
                    return true;
                }
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 거칠기 설정 블록
        type: 'st4rxgl_set_roughness',
        color: '#2ED573',
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
                text: '거칠기:'
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
                    params: ['0.5']
                }
            ],
            type: 'st4rxgl_set_roughness'
        },
        paramsKeyMap: {
            OBJECT_ID: 1,
            ROUGHNESS: 3
        },
        func: function(sprite, script) {
            const objectId = script.getNumberValue('OBJECT_ID', script);
            const roughness = Math.max(0, Math.min(1, script.getNumberValue('ROUGHNESS', script)));
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const obj = window.St4rXGL.core.getObject(objectId);
                if (obj && obj.mesh.material) {
                    obj.mesh.material.roughness = roughness;
                    return true;
                }
            }
            return false;
        },
        syntax: { js: [], py: [] }
    }
];