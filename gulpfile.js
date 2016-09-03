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
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    fs = require('fs'),
    json = JSON.parse(fs.readFileSync('./package.json'));

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

gulp.task('copy-fonts', ['clean'], function(){
    return gulp.src('app/style/fonts/**/*')
            .pipe(gulp.dest('dist/fonts'));
});



gulp.task('link-files', ['copy-fonts', 'copy-html', 'vendorjs', 'vendorcss', 'appjsfiles'], function () {
  var target = gulp.src('dist/index.html');
  var sources = gulp.src(['dist/**/*.js', 'dist/**/*.css'], {read: false});

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('vendorjs', ['clean'], function(){
    return gulp.src(['vendor/jquery/jquery.min.js', 'vendor/bootstrap/bootstrap.js', 'vendor/angular/angular.js', 'vendor/**/*.js'])
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest('dist/assets'));
});

gulp.task('vendorcss', ['clean'], function(){
    return gulp.src('vendor/**/*.css')
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest('dist/assets'));
});

gulp.task('appjsfiles', ['clean'], function(){
    return gulp.src(['app/filters/*.js', 'app/services/*.js', 'app/directives/*.js', 'app/modules/**/*.js', 'app/app.js'])
            .pipe(concat(json.name.toLowerCase() + '.js'))
            .pipe(gulp.dest('dist/js'));
});

gulp.task('style', ['clean'], function(){
    return gulp.src('app/style/**/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(rename(json.name.toLowerCase() + '.css'))
		.pipe(gulp.dest('dist/css'))
});

gulp.task('style', ['clean'], function(){
    return gulp.src('app/style/**/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(rename(json.name.toLowerCase() + '.css'))
		    .pipe(gulp.dest('dist/css'))
});

gulp.task('style-less', ['clean'], function(){
    return gulp.src('vendor/less/app.style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(rename('main.style.css'))
		.pipe(gulp.dest('dist/css'))
});

// gulp.task('browserify', function(){
//     return browserify('app/app.js')
//         .bundle()
//         .pipe(source('main.js'))
//         .pipe(gulp.dest('dist/js'))
// });

gulp.task('browserify', function(){
    // create new bundle
  var b = browserify();
  b.add('app/app.js');
  // start bundling
  return b.bundle()
    .on('error', function(err){
        console.log(err);
      this.emit('end');
    })
    .pipe(source('main.js'))
    // pipe other plugin here if you want
    .pipe(gulp.dest('dist/js'));
});

gulp.task('logger', function(){
    console.log('===== A file changed ======== restarting server now ====');
});

gulp.task('watch', function() {
    gulp.watch(['app/**/*', 'vendor/**/*'], ['logger', 'style' , 'style-less', 'link-files']);
    // gulp.watch('app/modules', ['copy-html']);
    // gulp.watch('app/**/*.html', ['html']);
});

gulp.task('serve', ['connect', 'style', 'watch', 'style-less', 'link-files']);
