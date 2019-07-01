var { src, dest } = require('gulp');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var minify = require("gulp-clean-css");
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
    return src('src/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/'))
}); 

gulp.task('watch', function(){
    gulp.watch("src/js/*.js", gulp.parallel('scripts'));
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/css/*.css").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
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
gulp.task('run', gulp.parallel('scripts', 'watch', 'browser-sync'));