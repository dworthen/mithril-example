var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  stripDebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './public/'
    }
  });
});

gulp.task('jshint', function() {
  gulp.src(__dirname + '/src/js/*')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  var src = __dirname + '/src/js/';
  return gulp.src([src + 'mithril.js', src + '*.js'])
    .pipe(concat('script.js'))
    // .pipe(stripDebug())
    // .pipe(uglify())
    .pipe(gulp.dest(__dirname + '/public/js/'));
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch(__dirname + '/src/js/*', ['scripts', browserSync.reload]);
});
