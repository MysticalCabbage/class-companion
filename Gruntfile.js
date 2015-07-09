module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
      jshint: {
        all: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js'],
        options: {
          force: 'true',
          jshintrc: '.jshintrc',
          ignores: [
            'client/assets/**/*.js',
            'node_modules/**/*.js',
            '**/node_modules/**/*.js',
            'bower_components/**/*.js',
            '**/bower_components/**/*.js',
            'test/testData.js'
          ]
        }
      },
      "bower-install-simple": {
        options: {
          directory: 'client/lib'
        }
      },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-install-simple');  
  grunt.loadNpmTasks('grunt-npm-install');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('install', ['bower-install-simple', 'grunt-npm-install']);

};