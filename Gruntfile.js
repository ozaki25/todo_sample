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
          './js/backbone/views/app_view.min.ts': './js/backbone/views/app_view.ts'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  
  grunt.registerTask('default', ['uglify', 'typescript']);
};
