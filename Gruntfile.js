module.exports = function (grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    typescript: {
      ts: {
        files: {
          //'./ts/todo_sample.js': ['./ts/backbone/*/*.ts', './ts/*/ts']
        }
      }
    },
    uglify: {
      dist: {
        files: {
          './ts/todo_sample.min.js': './ts/todo_sample.js'
        }
      }
    },
    browserify : {
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  
  grunt.registerTask('default', ['typescript', 'uglify']);
};
