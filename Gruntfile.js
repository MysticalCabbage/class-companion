module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    firebaseConfig: grunt.file.readJSON('firebaseConfig.json'),

      jshint: {
        all: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js'],
        options: {
          force: 'true',
          jshintrc: '.jshintrc',
          ignores: [
            'client/lib/**/*.js',
            'node_modules/**/*.js',
          ]
        }
      },

      "bower-install-simple": {
        options: {
          directory: 'client/lib'
        }
      },

      watch: {
        scripts: {
          files: [
            '**/*.js',
            './*.js',
          ],
          tasks: [
            'jshint',
          ]
        },
      },

      concurrent: {
        dev: {
          tasks: ['nodemon', 'watch'],
          options: {
            logConcurrentOutput: true
          }
        }
      },

      nodemon: {
        dev: {
          script: 'index.js'
        }
      },

      firebase: {
        options: {
          reference: '<%= firebaseConfig.ref %>',
          token: '<%= firebaseConfig.token %>'
        },
        load: {
          files: [
            { src: './mysticalCabbageDb.json' }
          ]
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-install-simple');  
  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-firebase');

  // Default task(s).

  grunt.registerTask('mon', ['jshint', 'concurrent']);

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('install', ['npm-install', 'bower-install-simple']);

  grunt.registerTask('test', []);



};