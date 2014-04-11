var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var stylish = require('jshint-stylish');

var paths = {

  coffee: {
    src: 'src/coffee/*.coffee',
    dest: 'src/js/'
  },

  nodeJS:{
    src: [
      'server/src/*.coffee'
    ],
    dest: 'server/dist/',
    main: 'server/dist/server.js',
    jsHint: [
      'server/src/server.js',
      'server/src/**/*.js'
    ]
  },

  scripts: {
    src: [
      'src/components/atomic/dist/atomic.js',
      'src/js/app.js'
    ],
    fullDir: 'dist/moonrider.js',
    dir: 'dist',
    dest: 'moonrider.js',
    jsHint: [
      'src/js/app.js',
      'src/js/**/*.js'
    ]
  },

  watch: {
    js: [
      'src/js/app.js',
      'src/js/**/*.js'
    ],
    nodeJS: [
      'server/src/server.coffee'
    ],
    coffee: [
      'src/coffee/app.coffee',
      'src/coffee/**/*.coffee'
    ]
  }
};


/**
 * Coffee tasks
 */
gulp.task('coffee', function () {
  gulp.src(paths.watch.coffee)
    .pipe(watch(function (files) {
      gulp.src(paths.coffee.src)
        .pipe(coffee({
          bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest(paths.coffee.dest));
    }));
});

/**
 * Javascript tasks
 */
gulp.task('js', function () {
  gulp.src(paths.watch.js)
    .pipe(watch(function (files) {
      gulp.src(paths.scripts.src)
        .pipe(concat(paths.scripts.dest))
        .pipe(gulp.dest(paths.scripts.dir));

      gulp.src(paths.scripts.fullDir)
        .pipe(uglify({outSourceMap: false}))
        .pipe(concat("moonrider.min.js"))
        .pipe(gulp.dest(paths.scripts.dir));
    }));
});

/**
 * Javascript tasks
 */
gulp.task('node-js', function () {
  gulp.src(paths.watch.nodeJS)
    .pipe(watch(function (files) {
      gulp.src(paths.nodeJS.src)
        .pipe(coffee({
          bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest(paths.nodeJS.dest));
    }));
});

gulp.task('node-development', function () {
  nodemon({ script: paths.nodeJS.main, ext: 'html js', ignore: ['ignored.js'] })
    .on('change', function(){
      // Maybe lint ?
    })
    .on('restart', function () {
      console.log('restarted!')
    })
})

/**
 * Javascript one time tasks
 */
gulp.task('js-one-time', function () {
  gulp.src(paths.scripts.src)
    .pipe(concat(paths.scripts.dest))
    .pipe(gulp.dest(paths.scripts.dir));

  gulp.src(paths.scripts.fullDir)
    .pipe(uglify({outSourceMap: false}))
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(paths.scripts.dir));
});

/**
 * JSHint task
 */
gulp.task('lint', function () {
  gulp.src(paths.scripts.jsHint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['coffee', 'js', 'node-js']);

gulp.task('node-dev', ['node-development']);

gulp.task('jshint', ['lint']);

gulp.task('prod', ['js-one-time', 'lint']);