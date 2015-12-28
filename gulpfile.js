var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    // requires browserify and vinyl-source-stream
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    clean = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src('public/*')
    .pipe(clean());
});

// gulp.task('scripts', ['clean-scripts'], function () {
//   gulp.src('app/**/*.js')
//     .pipe(gulp.dest('public'));
// });
//
// gulp.task('default', ['scripts']);

gulp.task('connect', function(){
    connect.server({
        root: 'public',
        port: 4000
    });
});

gulp.task('copy-html', ['clean'], function(){
    return gulp.src('app/**/*.html')
            .pipe(gulp.dest('public'));
});

gulp.task('vendor-js', ['clean'], function(){
    return gulp.src('vendor/**/*.js')
            .pipe(gulp.dest('public/js'));
});


gulp.task('browserify', function(){
    return browserify('app/app.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('public/js'))
});

gulp.task('watch', function() {
    gulp.watch('app/*', ['browserify', 'copy-html', 'vendor-js']);
    // gulp.watch('app/modules', ['copy-html']);
    // gulp.watch('app/**/*.html', ['html']);
});

gulp.task('serve', ['connect',  'browserify', 'copy-html', 'watch', 'vendor-js']);
