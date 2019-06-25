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
        .pipe(dest('app/js'))
}); 

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port:1350
    });
});

 gulp.task('watch', function(){
    gulp.watch("src/js/*.js", gulp.series(concat));
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/css/*.css").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('run', gulp.parallel('scripts', 'watch', 'browser-sync'));