module.exports = function (grunt) {
  // package.jsonを読み込み、pkg変数にキャッシュ
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    typescript: {
      ts: {
        files: {
          './js/backbone/*/*.js': './js/backbone/*/*.ts'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          './js/backbone/collections/todos.min.ts': './js/backbone/collections/todos.ts'
        }
      }
    },
    browserify : {
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  
  grunt.registerTask('default', ['uglify', 'typescript']);
};
