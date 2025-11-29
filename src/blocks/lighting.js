// 조명 블록들
export const blocks = [
    {
        // 환경광 추가 블록
        type: 'st4rxgl_add_ambient_light',
        color: '#F9CA24',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '환경광 추가'
            },
            {
                type: 'Text',
                text: '색상:'
            },
            {
                type: 'Colour',
                colour: '#ffffff'
            },
            {
                type: 'Text',
                text: '강도:'
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
                '#ffffff',
                null,
                {
                    type: 'number',
                    params: ['0.5']
                }
            ],
            type: 'st4rxgl_add_ambient_light'
        },
        paramsKeyMap: {
            COLOR: 2,
            INTENSITY: 4
        },
        func: function(sprite, script) {
            const color = script.getField('COLOR');
            const intensity = script.getNumberValue('INTENSITY', script);
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const ambientLight = new THREE.AmbientLight(color, intensity);
                window.St4rXGL.core.scene.add(ambientLight);
                
                const lightId = window.St4rXGL.core.lightCounter++;
                window.St4rXGL.core.lights.set(lightId, {
                    type: 'ambient',
                    light: ambientLight
                });
                
                return lightId;
            }
            return -1;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 방향광 추가 블록
        type: 'st4rxgl_add_directional_light',
        color: '#F0932B',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '방향광 추가'
            },
            {
                type: 'Text',
                text: '색상:'
            },
            {
                type: 'Colour',
                colour: '#ffffff'
            },
            {
                type: 'Text',
                text: '강도:'
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
                null,
                '#ffffff',
                null,
                {
                    type: 'number',
                    params: ['1']
                },
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
                {
                    type: 'number',
                    params: ['5']
                }
            ],
            type: 'st4rxgl_add_directional_light'
        },
        paramsKeyMap: {
            COLOR: 2,
            INTENSITY: 4,
            X: 6,
            Y: 8,
            Z: 10
        },
        func: function(sprite, script) {
            const color = script.getField('COLOR');
            const intensity = script.getNumberValue('INTENSITY', script);
            const x = script.getNumberValue('X', script);
            const y = script.getNumberValue('Y', script);
            const z = script.getNumberValue('Z', script);
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const directionalLight = new THREE.DirectionalLight(color, intensity);
                directionalLight.position.set(x, y, z);
                directionalLight.castShadow = true;
                window.St4rXGL.core.scene.add(directionalLight);
                
                const lightId = window.St4rXGL.core.lightCounter++;
                window.St4rXGL.core.lights.set(lightId, {
                    type: 'directional',
                    light: directionalLight
                });
                
                return lightId;
            }
            return -1;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 점광 추가 블록
        type: 'st4rxgl_add_point_light',
        color: '#EB4D4B',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '점광 추가'
            },
            {
                type: 'Text',
                text: '색상:'
            },
            {
                type: 'Colour',
                colour: '#ffffff'
            },
            {
                type: 'Text',
                text: '강도:'
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
                null,
                '#ffffff',
                null,
                {
                    type: 'number',
                    params: ['1']
                },
                null,
                {
                    type: 'number',
                    params: ['0']
                },
                null,
                {
                    type: 'number',
                    params: ['5']
                },
                null,
                {
                    type: 'number',
                    params: ['0']
                }
            ],
            type: 'st4rxgl_add_point_light'
        },
        paramsKeyMap: {
            COLOR: 2,
            INTENSITY: 4,
            X: 6,
            Y: 8,
            Z: 10
        },
        func: function(sprite, script) {
            const color = script.getField('COLOR');
            const intensity = script.getNumberValue('INTENSITY', script);
            const x = script.getNumberValue('X', script);
            const y = script.getNumberValue('Y', script);
            const z = script.getNumberValue('Z', script);
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const pointLight = new THREE.PointLight(color, intensity, 100, 2);
                pointLight.position.set(x, y, z);
                pointLight.castShadow = true;
                window.St4rXGL.core.scene.add(pointLight);
                
                const lightId = window.St4rXGL.core.lightCounter++;
                window.St4rXGL.core.lights.set(lightId, {
                    type: 'point',
                    light: pointLight
                });
                
                return lightId;
            }
            return -1;
        },
        syntax: { js: [], py: [] }
    },
    {
        // 조명 제거 블록
        type: 'st4rxgl_remove_light',
        color: '#6D214F',
        skeleton: 'basic',
        statements: [],
        params: [
            {
                type: 'Text',
                text: '조명 제거 ID:'
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
                }
            ],
            type: 'st4rxgl_remove_light'
        },
        paramsKeyMap: {
            LIGHT_ID: 1
        },
        func: function(sprite, script) {
            const lightId = script.getNumberValue('LIGHT_ID', script);
            
            if (window.St4rXGL && window.St4rXGL.core) {
                const lightObj = window.St4rXGL.core.lights.get(lightId);
                if (lightObj) {
                    window.St4rXGL.core.scene.remove(lightObj.light);
                    if (lightObj.light.dispose) lightObj.light.dispose();
                    window.St4rXGL.core.lights.delete(lightId);
                    return true;
                }
            }
            return false;
        },
        syntax: { js: [], py: [] }
    }
];