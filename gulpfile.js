'use strict';

var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  bower = require('gulp-bower'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  inject = require('gulp-inject'),
  browserSync = require('browser-sync').create();

var paths = {
  src: './src',
  dist: './dist',
  sass: './src/scss',
  bower: './bower_components'
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

gulp.task('sass', function() {
  return gulp.src(paths.sass+'/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError))
    .pipe(gulp.dest(paths.src+'/css'));
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: paths.src
        }
    });
    gulp.watch(paths.sass+'/*.scss', ['sass']);
    gulp.watch([paths.src+"/*.html", paths.src+'css/*.css']).on('change', browserSync.reload);
});

gulp.task('build', function() {
  var vendor = gulp.src([
        paths.bower+'/jquery/dist/jquery.min.js',
        paths.bower+'/bootstrap-sass/assets/javascripts/bootstrap.min.js'])
    .pipe(gulp.dest(paths.src+'/js'));
  var target = gulp.src(paths.src+'/index.html');
  var sources = gulp.src([
    paths.bower+'/jquery/dist/jquery.min.js',
    paths.bower+'/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    paths.src+'/js/*.js',
    paths.src+'/css/*.css'], {read: false, relative: false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest(paths.src));
});

gulp.task('dist-scripts', function() {
  return gulp.src(paths.src+'/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist+'/assets/js'));
});

gulp.task('dist-scripts-vendor', function() {
  return gulp.src([
        paths.bower+'/jquery/dist/jquery.min.js',
        paths.bower+'/bootstrap-sass/assets/javascripts/bootstrap.min.js'])
    .pipe(gulp.dest(paths.dist+'/assets/js'));
});

gulp.task('dist-css', function() {
  return gulp.src(paths.src+'/css/*.css')
    .pipe(gulp.dest(paths.dist+'/assets/css'));
});

gulp.task('dist', ['sass', 'dist-scripts', 'dist-scripts-vendor', 'dist-css'], function() {
  return gulp.src(paths.src+'/index.html')
      .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass+'/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);
