/**
 * + Task Config: Copy
 * https://github.com/gruntjs/grunt-contrib-copy
 * =====================================================================
 */
module.exports = {

    // local jquery alternative
    /* @TODO: Remove old jQuery 1.7 with 2.1
    jquery: {
        expand:  true,
        src:     '<%= globalConfig.bower %>/jquery/dist/*',
        dest:    '<%= globalConfig.assets %>/js/vendor/jquery/',
        flatten: true
    },*/
    jqueryUI: {
        expand:  true,
        src:     '<%= globalConfig.bower %>/jquery-ui/jquery-ui.js',
        dest:    '<%= globalConfig.assetsDev %>/js/vendor/jquery-ui/',
        flatten: true
    },
    jqueryStore: {
        expand:  true,
        src:     '<%= globalConfig.bower %>/jQuery-store/preview/*.js',
        dest:    '<%= globalConfig.assetsDev %>/js/vendor/jquery-store/',
        flatten: true
    }

};
/* = Task Config: Copy dependency files */
