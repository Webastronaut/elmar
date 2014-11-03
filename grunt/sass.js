/**
 * + Task Config: SASS
 * https://github.com/gruntjs/grunt-contrib-sass
 * =====================================================================
 */
module.exports = {

    // overall options
    options : {
        precision: 10,
        trace: false,
        //sourcemap: 'auto',
        unixNewlines: true,
        cacheLocation: '<%= globalConfig.root %>/.sass-cache',
        require: [
            '<%= globalConfig.root %>/.sass-extensions/inline-image.rb'
        ]
    },

    // main styles
    main: {
        files: [{
            src: '<%= globalConfig.assetsDev %>/styles/main.scss',
            dest: '<%= globalConfig.assets %>/css/main.css'
        }]
    }

};
/* = Task Config: SASS */
