'use strict';

/**
 * Dependencies
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var wrapUMD = require('gulp-wrap-umd');
var sourcemaps = require('gulp-sourcemaps');


/**
 * Directories
 */
var src = {
    sass: 'src/assets/sass',
    css: 'src/assets/css',
    js: 'src/app/'
};


/**
 * Callbacks
 */
function watcherCallback(changedFile) {
    console.log('\n Change saved...', changedFile.path, '\n');
}

function sassCompileCallback(arg) {
    console.log('\n SASS compilation complete. \n');
}

function handleError(err) {
    console.log('\n SASS Error: \n', err.toString());
    this.emit('end');
}


/**
 * Tasks
 */
gulp.task('sass', function () {
  return gulp.src(src.sass + '/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(src.css))
    .on('error', handleError)
    .on('end', sassCompileCallback)
  ;
});

gulp.task('watch', function () {
  return gulp.watch(src.sass + '/**/*.scss', ['sass'])
    .on('change', watcherCallback)
    .on('error', handleError)
  ;
});

gulp.task('umd', function () {
  gulp.src([src.js + 'vendor/THREEOrbitControls/index.js'])
    .pipe(wrapUMD({
      namespace: 'THREE.OrbitControls'
    }))
    .pipe(gulp.dest(src.js + 'vendor/THREEOrbitControls/umd'))
  ;
});
