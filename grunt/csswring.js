/**
 * + Task Config: CSS Wring
 * https://github.com/princed/grunt-csswring
 * =====================================================================
 */
module.exports = {

    // overall options
    options: {
        map:           true,
        preserveHacks: true
    },

    // main styles
    main: {
        src:  '<%= globalConfig.assets %>/css/main.css',
        dest: '<%= globalConfig.assets %>/css/main.min.css'
    }

};
/* = Task Config: CSS Wring */
