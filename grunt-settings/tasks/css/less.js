module.exports = function(SETTINGS) {

    var modifyVarsDev, modifyVarsProd;

    modifyVarsDev = {
        isWordpress         : SETTINGS.isWordpress,
        isDebug             : SETTINGS.isDebug,
    };
    modifyVarsProd = JSON.parse(JSON.stringify(modifyVarsDev));
    modifyVarsProd.version = 'prod';
    modifyVarsDev.version = 'dev';
    
    return {

        options: {
            javascriptEnabled: true,
            modifyVars: modifyVarsDev,
        },

        /**
         * Development version
         */

        dev_style_grid: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/css/grid.css.map`,
                sourceMapURL: 'grid.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/style/grid.less`,
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
            src: `src/style/base.less`,
            dest: `${SETTINGS.pathToDev}/css/base.css`,
        },

        dev_style_utilities: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/${SETTINGS.pathToCSS}/utilities.css.map`,
                sourceMapURL: 'utilities.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/style/utilities.less`,
            dest: `${SETTINGS.pathToDev}/${SETTINGS.pathToCSS}/utilities.css`,
        },

        dev_style_main: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/${SETTINGS.pathToCSS}/${SETTINGS.pathToMainCSS}/style.dev.css.map`,
                sourceMapURL: 'style.dev.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
                modifyVars: modifyVarsDev,
            },
            src: `src/style/style.less`,
            dest: `${SETTINGS.pathToDev}/${SETTINGS.pathToCSS}/${SETTINGS.pathToMainCSS}/style.dev.css`,
        },

        /**
         * Productive version
         */

        prod_style_grid: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/style/grid.less`,
            dest: `${SETTINGS.pathToProd}/css/grid.prod.css`,
        },

        prod_style_base: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/style/base.less`,
            dest: `${SETTINGS.pathToProd}/css/base.prod.css`,
        },

        prod_style_utilities: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/style/utilities.less`,
            dest: `${SETTINGS.pathToProd}/css/utilities.prod.css`,
        },

        prod: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/style/style.less`,
            dest: `${SETTINGS.pathToMainCSS}/style.prod.css`,
        },

    };
};