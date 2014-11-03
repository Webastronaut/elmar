/**
 * + Task Config: Uglify
 * https://github.com/gruntjs/grunt-contrib-uglify
 * =====================================================================
 */
module.exports = {

    // overall options
    options: {
        sourceMap: true,
        preserveComments: false
    },

    // main scripts
    main: {
        files: [{
            src: [
                '<%= globalConfig.assetsDev %>/js/vendor/jquery-ui/jquery-ui.js',
                '<%= globalConfig.assetsDev %>/js/vendor/jquery-store/json2.js',
                '<%= globalConfig.assetsDev %>/js/vendor/jquery-store/jquery.store.js',
                '<%= globalConfig.assetsDev %>/js/timemachine.js'
            ],
            dest: '<%= globalConfig.assets %>/js/main.min.js'
        }]
    }

};
/* = Task Config: Uglify */
