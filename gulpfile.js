'use strict';

var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  bower = require('gulp-bower');

var config = {
  distPath: './dist',
  sassPath: './src/scss',
  bowerPath: './bower_components'
}

var showErrorMsg = function(error) {
  return "Error: " + error.message;
}

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('install', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerPath)) ;
});

gulp.task('sass', function () {
  return gulp.src(config.sassPath+'/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError))
    .pipe(gulp.dest(config.distPath+'/assets/css'));
});
