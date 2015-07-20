'use strict';

/**
 * Dependencies
 */
var gulp = require('gulp');
var sass = require('gulp-sass');


/**
 * Directories
 */
var src = {
    sass: 'src/assets/sass',
    css: 'src/assets/css',
    js: 'public/js/'
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
gulp.task('sass', function() {
    return gulp.src(src.sass + 'main.scss')
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .on('error', handleError)
        .on('end', sassCompileCallback)
    ;
});

gulp.task('watch', function() {
    return gulp.watch(src.sass + '**/*.scss', ['sass'])
        .on('change', watcherCallback)
        .on('error', handleError)
    ;
});
