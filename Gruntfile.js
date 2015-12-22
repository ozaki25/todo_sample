module.exports = function (grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    typescript: {
      base: {
        src: ['./ts/app.ts', './ts/backbone/*/*.ts'],
        dest: './ts/todo_sample.js',
        options: {
          target: 'es5',
          sourceMap: true,
          noImplicitAny:true
        }
      }
    },
    coffee: {
      compileWithMaps: {
        options: {
          sourceMap: true
        },
        files: {
          './coffee/todo_sample.js': './coffee/todo_sample.coffee'
        }
      }
    },
    coffeescript_concat: {
      compile: {
        files: {
          './coffee/todo_sample.coffee': ['./coffee/app.coffee', './coffee/backbone/*/*.coffee']
        }
      }
    },
    concat: {
      options: {
        sourceMap: true
      },
      dist: {
        src: ['./js/app.js', './js/backbone/*/*.js'],
        dest: './js/todo_sample.js'
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
      },
      dist: {
        files: {
          './coffee/todo_sample.min.js': './coffee/todo_sample.js'
        },
        options: {
          sourceMap: true,
          sourceMapIn: './coffee/todo_sample.js.map'
        }
      },
      dist: {
        files: {
          './js/todo_sample.min.js': './js/todo_sample.js'
        },
        options: {
          sourceMap: true,
          sourceMapIn: './js/todo_sample.js.map'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeescript-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.registerTask('default', ['typescript', 'coffeescript_concat', 'coffee', 'concat', 'uglify']);
};
