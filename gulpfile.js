var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./client/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./client/www/style/'));
});

gulp.task('watch', function () {
  watch('**/*.less', function () {
    gulp.start('less');
  });
});
