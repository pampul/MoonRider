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
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var concatCSS = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');

var paths = {

  coffee: {
    src: 'client/src/coffee/*.coffee',
    dest: 'client/src/js/'
  },
  coffeeApp: {
    src: 'app/src/coffee/*.coffee',
    dest: 'app/src/js/'
  },

  nodeJS:{
    src: [
      'server/src/*.coffee',
      'server/src/**/*.coffee'
    ],
    dest: 'server/dist/',
    main: 'server/dist/server.js',
    jsHint: [
      'server/dist/server.js',
      'server/dist/**/*.js'
    ]
  },

  scripts: {
    src: [
      'client/src/components/atomic/dist/atomic.js',
      'client/src/js/app.js'
    ],
    fullDir: 'client/dist/moonrider.js',
    dir: 'client/dist',
    dest: 'moonrider.js',
    jsHint: [
      'client/src/js/app.js',
      'client/src/js/**/*.js'
    ]
  },

  scriptsApp: {
    src: [
      'app/src/js/app.js'
    ],
    fullDir: 'app/public/assets/js/scripts.js',
    dir: 'app/public/assets/js',
    dest: 'scripts.js',
    jsHint: [
      'app/src/js/app.js',
      'app/src/js/**/*.js'
    ]
  },

  images: {
    src: 'app/assets/img/**/*',
    dest: 'app/assets/img'
  },

  scss: {
    src: [
      'app/src/scss/style.scss',
    ],
    dest: 'app/public/assets/components/css',
    finalDest: 'app/public/assets/css'
  },

  watch: {
    js: [
      'client/src/js/app.js',
      'client/src/js/**/*.js'
    ],
    jsApp: [
      'app/src/js/app.js',
      'app/src/js/**/*.js'
    ],
    nodeJS: [
      'server/src/server.coffee',
      'server/src/**/*.coffee'
    ],
    coffee: [
      'client/src/coffee/app.coffee',
      'client/src/coffee/**/*.coffee'
    ],
    coffeeApp: [
      'app/src/coffee/app.coffee',
      'app/src/coffee/**/*.coffee'
    ],
    styles: [
      'app/src/scss/style.scss',
      'app/src/scss/**/*.scss'
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
 * Coffee tasks
 */
gulp.task('coffee-app', function () {
  gulp.src(paths.watch.coffeeApp)
    .pipe(watch(function (files) {
      gulp.src(paths.coffeeApp.src)
        .pipe(coffee({
          bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest(paths.coffeeApp.dest));
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
gulp.task('js-app', function () {
  gulp.src(paths.watch.jsApp)
    .pipe(watch(function (files) {
      gulp.src(paths.scriptsApp.src)
        .pipe(concat(paths.scriptsApp.dest))
        .pipe(gulp.dest(paths.scriptsApp.dir));

      gulp.src(paths.scriptsApp.fullDir)
        .pipe(uglify({outSourceMap: false}))
        .pipe(concat("scripts.min.js"))
        .pipe(gulp.dest(paths.scriptsApp.dir));
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
 * Stylesheets tasks
 */
gulp.task('styles', function () {
  gulp.src(paths.watch.styles)
    .pipe(watch(function (files) {
      gulp.src(paths.scss.src).pipe(sass())
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(concatCSS("styles.css"))
        .pipe(gulp.dest(paths.scss.finalDest))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.scss.finalDest));
    }));

});

/**
 * Stylesheets one time task
 */
gulp.task('styles-one-time', function () {
  return gulp.src(paths.scss.src).pipe(sass())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.scss.dest));
});

/**
 * Imagemin task
 */
gulp.task('images', function () {
  return gulp.src(paths.images.src)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.images.dest));
});

/**
 * JSHint task
 */
gulp.task('lint', function () {
  gulp.src(paths.scripts.jsHint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
gulp.task('lint-app', function () {
  gulp.src(paths.scriptsApp.jsHint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
gulp.task('lint-server', function () {
  gulp.src(paths.nodeJS.jsHint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['coffee', 'coffee-app', 'js', 'js-app', 'node-js', 'styles']);

gulp.task('node-dev', ['node-development']);

gulp.task('jshint', ['lint', 'lint-app', 'lint-server']);

gulp.task('prod', ['js-one-time', 'styles-one-time', 'images', 'lint']);