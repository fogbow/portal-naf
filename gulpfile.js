'use strict';

var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  bower = require('gulp-bower'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del');

var paths = {
  dist: './dist',
  sass: './src/scss',
  bower: './bower_components',
  scripts: './src/js'
}

var showErrorMsg = function(error) {
  return "Error: " + error.message;
}

gulp.task('install', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerPath)) ;
});

gulp.task('clean', function() {
  return del([paths.dist]);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass+'/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError))
    .pipe(gulp.dest(paths.dist+'/assets/css'));
});

gulp.task('scripts', ['clean'], function () {
  return gulp.src(paths.scripts+'/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist+'/assets/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);
