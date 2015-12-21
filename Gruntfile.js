module.exports = function (grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    typescript: {
      base: {
        src: ['./ts/*.app', './ts/*/*/*.ts'],
        dest: './ts/todo_sample.js',
        options: {
          target: 'es5',
          sourceMap: true
        }
      }
    },
    uglify: {
      dist: {
        files: {
          './ts/todo_sample.min.js': './ts/todo_sample.js'
        },
        options: {
          sourceMap: true,
          sourceMapIn: './ts/todo_sample.js.map'
        }
      }
    },
    coffee: {
      compile: {
        files: {
          './coffee/todo_sample.js': ['./coffee/*.coffee', './coffee/*/*/*.coffee']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  
  grunt.registerTask('default', ['uglify']);
};
