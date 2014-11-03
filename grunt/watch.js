/**
 * + Task Config: Watch
 * https://github.com/gruntjs/grunt-contrib-watch
 * =====================================================================
 */
module.exports = {

    // overall options
    options: {
        livereload: true,
        event: [
            'added',
            'deleted',
            'changed'
        ]
    },

    // json files
    json: {
        files: [
            'package.json'
        ],
        tasks: [
            'build-json'
        ]
    },

    // gruntfile and task configs
    grunt: {
        options: {
            reload: true
        },
        files: [
            'Gruntfile.js',
            'grunt/*.js',
            'grunt/*.yml'
        ],
        tasks: [
            'jshint:grunt'
        ]
    },

    // main styles
    main_styles: {
        files: [
            '<%= globalConfig.assetsDev %>/styles/*.scss',
            '<%= globalConfig.assetsDev %>/styles/**/*.scss'
        ],
        tasks: [
            'build-css'
        ]
    },

    // main scripts
    main_scripts: {
        files: [
            '<%= globalConfig.assetsDev %>/js/*.js',
            '<%= globalConfig.assetsDev %>/js/**/*.js'
        ],
        tasks: [
            'build-js-lazy'
        ]
    }

};
/* = Task Config: Watch */
