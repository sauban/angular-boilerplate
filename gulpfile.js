var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    // requires browserify and vinyl-source-stream
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    clean = require('gulp-clean'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber');

gulp.task('clean', function () {
  return gulp.src('dist/*')
    .pipe(clean());
});

// gulp.task('scripts', ['clean-scripts'], function () {
//   gulp.src('app/**/*.js')
//     .pipe(gulp.dest('dist'));
// });
//
// gulp.task('default', ['scripts']);

gulp.task('connect', function(){
    connect.server({
        root: 'dist',
        port: 4000
    });
});

gulp.task('copy-html', ['clean'], function(){
    return gulp.src('app/**/*.html')
            .pipe(gulp.dest('dist'));
});

gulp.task('vendor', ['clean'], function(){
    return gulp.src('vendor/**/*')
            .pipe(gulp.dest('dist/assets'));
});

gulp.task('style', ['clean'], function(){
    return gulp.src('app/styles/**/*.css')
        .pipe(plumber())
        .pipe(rename('main.css'))
		.pipe(gulp.dest('dist/css'))
});

gulp.task('style-less', ['clean'], function(){
    return gulp.src('vendor/less/app.style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(rename('main.style.css'))
		.pipe(gulp.dest('dist/css'))
});

gulp.task('browserify', function(){
    return browserify('app/app.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('logger', function(){
    console.log('===== A file changed ======== restarting server now ====');
});

gulp.task('watch', function() {
    gulp.watch(['app/**/*', 'vendor/**/*'], ['logger', 'browserify', 'copy-html', 'vendor', 'style' , 'style-less']);
    // gulp.watch('app/modules', ['copy-html']);
    // gulp.watch('app/**/*.html', ['html']);
});

gulp.task('serve', ['connect',  'browserify', 'copy-html', 'style', 'watch', 'vendor', 'style-less']);
