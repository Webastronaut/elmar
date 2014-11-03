/**
 * + Task Config: JSHint
 * https://github.com/gruntjs/grunt-contrib-jshint
 * =====================================================================
 */
module.exports = {

    // overall options
    options: {
        indent:    4,
        quotmark: 'single'
    },

    // main scripts
    main: {
        src: '<%= globalConfig.assetsDev %>/js/timemachine.js'
    },

    // gruntfile, task configs
    grunt: {
        src: [
            '<%= globalConfig.root %>Gruntfile.js',
            '<%= globalConfig.root %>grunt/*.js'
        ]
    }

};
/* = Task Config: JSHint */
