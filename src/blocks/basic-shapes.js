// 기본 도형 블록들
export const blocks = [
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
    },
    {
        // 원기둥 생성 블록
        type: 'st4rxgl_create_cylinder',
        color: '#45B7D1',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '원기둥 생성'
            },
            {
                type: 'Text',
                text: '상단 반지름:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: '하단 반지름:'
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
                text: '색상:'
            },
            {
                type: 'Colour',
                colour: '#0000ff'
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
                    params: ['2']
                },
                null,
                '#0000ff'
            ],
            type: 'st4rxgl_create_cylinder'
        },
        paramsKeyMap: {
            RADIUS_TOP: 2,
            RADIUS_BOTTOM: 4,
            HEIGHT: 6,
            COLOR: 8
        },
        func: function(sprite, script) {
            const radiusTop = script.getNumberValue('RADIUS_TOP', script);
            const radiusBottom = script.getNumberValue('RADIUS_BOTTOM', script);
            const height = script.getNumberValue('HEIGHT', script);
            const color = script.getField('COLOR');
            
            if (window.St4rXGL && window.St4rXGL.objectManager) {
                const objectId = window.St4rXGL.objectManager.createCylinder(radiusTop, radiusBottom, height, color);
                return objectId;
            }
            return -1;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 평면 생성 블록
        type: 'st4rxgl_create_plane',
        color: '#96CEB4',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '평면 생성'
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
                text: '색상:'
            },
            {
                type: 'Colour',
                colour: '#808080'
            }
        ],
        def: {
            params: [
                null,
                null,
                {
                    type: 'number',
                    params: ['10']
                },
                null,
                {
                    type: 'number',
                    params: ['10']
                },
                null,
                '#808080'
            ],
            type: 'st4rxgl_create_plane'
        },
        paramsKeyMap: {
            WIDTH: 2,
            HEIGHT: 4,
            COLOR: 6
        },
        func: function(sprite, script) {
            const width = script.getNumberValue('WIDTH', script);
            const height = script.getNumberValue('HEIGHT', script);
            const color = script.getField('COLOR');
            
            if (window.St4rXGL && window.St4rXGL.objectManager) {
                const objectId = window.St4rXGL.objectManager.createPlane(width, height, color);
                return objectId;
            }
            return -1;
        },
        syntax: { js: [], py: [] }
    }
];