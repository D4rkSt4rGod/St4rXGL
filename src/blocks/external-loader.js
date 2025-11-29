// 외부 로더 블록들
export const blocks = [
    {
        // 외부 스크립트 로드 블록
        type: 'st4rxgl_load_external_script',
        color: '#8A2BE2',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '외부 스크립트 로드:'
            },
            {
                type: 'Dropdown',
                options: [
                    ['기본 3D 씬', 'basic-scene'],
                    ['도시 생성기', 'city-builder'],
                    ['캐릭터 생성기', 'character-creator'],
                    ['지형 생성기', 'terrain-generator'],
                    ['커스텀 URL', 'custom']
                ],
                value: 'basic-scene'
            },
            {
                type: 'TextInput',
                value: 'https://example.com/your-script.js'
            }
        ],
        def: {
            params: [
                null,
                'basic-scene',
                {
                    type: 'text',
                    params: ['https://example.com/your-script.js']
                }
            ],
            type: 'st4rxgl_load_external_script'
        },
        paramsKeyMap: {
            SCRIPT_TYPE: 1,
            CUSTOM_URL: 2
        },
        func: function(sprite, script) {
            const scriptType = script.getField('SCRIPT_TYPE');
            const customUrl = script.getValue('CUSTOM_URL', script);
            
            if (window.St4rXGL && window.St4rXGL.scriptLoader) {
                if (scriptType === 'custom') {
                    return window.St4rXGL.scriptLoader.loadExternalScript(customUrl)
                        .then(() => true)
                        .catch(() => false);
                } else {
                    return window.St4rXGL.scriptLoader.loadPresetScript(scriptType)
                        .then(() => true)
                        .catch(() => false);
                }
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 커스텀 코드 실행 블록
        type: 'st4rxgl_execute_custom_code',
        color: '#7B68EE',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '커스텀 코드 실행:'
            },
            {
                type: 'TextInput',
                value: '// Three.js 코드를 여기에 작성하세요\nconsole.log("Hello St4rXGL!");'
            }
        ],
        def: {
            params: [
                null,
                {
                    type: 'text',
                    params: ['// Three.js 코드를 여기에 작성하세요\nconsole.log("Hello St4rXGL!");']
                }
            ],
            type: 'st4rxgl_execute_custom_code'
        },
        paramsKeyMap: {
            CODE: 1
        },
        func: function(sprite, script) {
            const code = script.getValue('CODE', script);
            
            if (window.St4rXGL && window.St4rXGL.scriptLoader) {
                const success = window.St4rXGL.scriptLoader.executeCustomCode(code);
                return success;
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 배경색 설정 블록
        type: 'st4rxgl_set_background_color',
        color: '#00BFFF',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '배경색 설정:'
            },
            {
                type: 'Colour',
                colour: '#87CEEB'
            }
        ],
        def: {
            params: [
                null,
                '#87CEEB'
            ],
            type: 'st4rxgl_set_background_color'
        },
        paramsKeyMap: {
            COLOR: 1
        },
        func: function(sprite, script) {
            const color = script.getField('COLOR');
            
            if (window.St4rXGL && window.St4rXGL.sceneManager) {
                window.St4rXGL.sceneManager.setBackgroundColor(color);
                return true;
            }
            return false;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 안개 설정 블록
        type: 'st4rxgl_set_fog',
        color: '#4682B4',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '안개 설정'
            },
            {
                type: 'Text',
                text: '색상:'
            },
            {
                type: 'Colour',
                colour: '#87CEEB'
            },
            {
                type: 'Text',
                text: '근거리:'
            },
            {
                type: 'Block',
                accept: 'number'
            },
            {
                type: 'Text',
                text: '원거리:'
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
                '#87CEEB',
                null,
                {
                    type: 'number',
                    params: ['5']
                },
                null,
                {
                    type: 'number',
                    params: ['20']
                }
            ],
            type: 'st4rxgl_set_fog'
        },
        paramsKeyMap: {
            COLOR: 2,
            NEAR: 4,
            FAR: 6
        },
        func: function(sprite, script) {
            const color = script.getField('COLOR');
            const near = script.getNumberValue('NEAR', script);
            const far = script.getNumberValue('FAR', script);
            
            if (window.St4rXGL && window.St4rXGL.sceneManager) {
                window.St4rXGL.sceneManager.setFog(color, near, far);
                return true;
            }
            return false;
        },
        syntax: { js: [], py: [] }
    }
];