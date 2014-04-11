var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var stylish = require('jshint-stylish');

var paths = {

  coffee: {
    src: 'src/coffee/*.coffee',
    dest: 'src/js/'
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

gulp.task('default', ['coffee', 'js']);

gulp.task('jshint', ['lint']);

gulp.task('prod', ['js-one-time', 'lint']);