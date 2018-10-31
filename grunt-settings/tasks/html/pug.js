module.exports = function(SETTINGS){
    
    var modifyVarsDev, modifyVarsProd;

    modifyVarsDev = JSON.parse(JSON.stringify(SETTINGS));
    modifyVarsProd = JSON.parse(JSON.stringify(SETTINGS));

    modifyVarsDev.version = 'dev';
    modifyVarsProd.version = 'prod';

    return {

        dev: {
            files: [{
                expand: true,
                cwd: 'src/template/',
                src: ['**/*.pug'],
                dest: `${SETTINGS.pathToDev}/`,
                ext: '.html'
            }],
            options: {
                data: modifyVarsDev,
                filters: {
                    pageName: function(block) {
                        return block;
                    },
                }
            }
        },

        prod: {
            files: [{
                expand: true,
                cwd: 'src/template/',
                src: ['**/*.pug', '!includes/**'],
                dest: `${SETTINGS.pathToProd}/`,
                ext: '.html'
            }],
            options: {
                data: modifyVarsProd,
                filters: {
                    pageName: function(block) {
                        return block;
                    },
                }
            }
        },

        // Debug
        debug: {
            files: [{
                expand: true,
                cwd: 'src/debug/',
                src: ['**/*.pug'],
                dest: `${SETTINGS.pathToDev}/debug/`,
                ext: '.html'
            }],
            options: {
                data: modifyVarsDev,
                filters: {
                    pageName: function(block) {
                        return block;
                    },
                }
            }
        },

    };
    
};