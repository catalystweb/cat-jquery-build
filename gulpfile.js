var { src, dest } = require('gulp');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var sass = require('gulp-sass');
var minify = require("gulp-clean-css");
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
    return src('src/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
}); 

gulp.task('themes', function() {
    return src([
            'src/css/themes/*.css',
        ])
      .pipe(minify())
      .pipe(dest('app/css'));
});

gulp.task('scss', function() {
    return src([
            'src/css/other/*.scss',
        ])
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('app.min.css'))
      .pipe(minify())
      .pipe(dest('app/css'));
});

gulp.task('html', function() {
    return src('*.html')
      .pipe(concat('app.html'))
      .pipe(dest('app/'));
});

gulp.task('watch', function(){
    gulp.watch("src/js/*.js", gulp.parallel('scripts'));
    gulp.watch(["src/css/themes/*.css"], gulp.parallel('themes'));
    gulp.watch(["src/css/other/*.scss"], gulp.parallel('scss'));
    gulp.watch("*.html", gulp.parallel('html'));
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/css/themes/*.css").on('change', browserSync.reload);
    gulp.watch("src/css/other/*.scss").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app",
            index: "app.html"
        },   
        callbacks: {
            ready: function(err, bs) {
                console.log("----------------------------------");
                console.log("[\x1b[31m v0.2 Catalyst App \x1b[37m] \- \x1b[32mdeveloped by Daniel Kandilas");
                console.log("----------------------------------");
            }
        },
        port:1350,
        ui: false
    });
});
gulp.task('run', gulp.parallel('scripts', 'themes', 'scss', 'html', 'watch','browser-sync'));