var gulp = require('gulp'),
    args = require('yargs').argv,
    del = require('del'),
    path = require('path'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync').create(),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('babelify', function() {
  log('Babelifying and bundling your javascript');
  return browserify('./site/js/index.js') 
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./site/dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Sass/Less ---> CSS');
  return gulp.src('./site/scss/styles.scss')
        .pipe($.plumber({
          errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }}))
        .pipe($.sourcemaps.init())
          .pipe($.sass())
          .pipe($.if(args.verbose, $.print()))
          .pipe($.autoprefixer('last 2 version'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./site/dist/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('serve', ['styles', 'babelify'], function() {
  browserSync.init({
    server: './site/' 
  });
  gulp.watch('./site/scss/**/*.scss', ['styles']);
  gulp.watch('./site/js/**/*.js', ['babelify']);
  gulp.watch('./site/*.html').on('change', browserSync.reload);
});

gulp.task('clean-styles', function() {
  var files = './site/dist' + '*.css';
  clean(files);
});

// Function
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.yellow(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.yellow(msg));
  }
}

function clean(path) {
  log('Cleaning ' + $.util.colors.yellow(path));
  return del(path);
}

gulp.task('default', ['serve']);