module.exports = function(SETTINGS) {

    var modifyVarsDev, modifyVarsProd;

    modifyVarsDev = JSON.parse(JSON.stringify(SETTINGS));
    modifyVarsProd = JSON.parse(JSON.stringify(SETTINGS));

    modifyVarsDev.version = 'dev';
    modifyVarsProd.version = 'prod';

    return {

        options: {
            javascriptEnabled: true,
            modifyVars: modifyVarsDev
        },

        /**
         * Development version
         */

        dev_style_main: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToMainCSS}/style.dev.css.map`,
                sourceMapURL: 'style.dev.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/style.less`,
            dest: `${SETTINGS.pathToMainCSS}/style.dev.css`,
        },

        dev_style_grid: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/css/grid.css.map`,
                sourceMapURL: 'grid.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/grid.less`,
            dest: `${SETTINGS.pathToDev}/css/grid.css`,
        },

        dev_style_base: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/css/base.css.map`,
                sourceMapURL: 'base.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/base.less`,
            dest: `${SETTINGS.pathToDev}/css/base.css`,
        },

        dev_style_utilities: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/css/utilities.css.map`,
                sourceMapURL: 'utilities.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/utilities.less`,
            dest: `${SETTINGS.pathToDev}/css/utilities.css`,
        },

        /**
         * Productive version
         */

        prod: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/less/style.less`,
            dest: `${SETTINGS.pathToMainCSS}/style.prod.css`,
        },

    };
};