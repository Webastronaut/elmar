/**
 * + Gruntfile
 * =====================================================================
 */
'use strict'; // ECMAScript 5 strict mode
module.exports = function(grunt) {
    grunt.util.linefeed = '\n'; // Force use of Unix newlines


    /**
      * + Global Project Vars
      * Usage: <%= globalConfig.var %>
      * =====================================================================
      */
    var globalConfig       = {};
    globalConfig.root      = '.';
    globalConfig.htdocs    = globalConfig.root   + '';
    globalConfig.bower     = globalConfig.root   + '/bower_components';
    globalConfig.temp      = globalConfig.htdocs + '/assets-temp';
    globalConfig.assetsDev = globalConfig.htdocs + '/assets-dev';
    globalConfig.assets    = globalConfig.htdocs + '/assets';
    /* = Global Project Vars */




    /**
     * + task and config autoloading
     * https://github.com/firstandthird/load-grunt-config
     * https://github.com/shootaroo/jit-grunt
     * =====================================================================
     */
    require('load-grunt-config')(grunt, {
        // load grunt tasks only if necessary
        jitGrunt: false,
        // if not using jit-grunt, auto-load according to devDependencies
        /*
        loadGruntTasks: {
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        },
        */
        // data passed into <%= foo %>
        data: {
            pkg          : grunt.file.readJSON('package.json'),
            globalConfig : globalConfig
        }
    });
    /* = auto-load grunt task configs */


};
/* = Gruntfile */
