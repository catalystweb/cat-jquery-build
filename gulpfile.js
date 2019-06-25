var { src, dest } = require('gulp');
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
    return src('src/js/*.js')
        .pipe(concat('app.min.js'))
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

// gulp.task('watch', ['browser-sync'], function () {
//     gulp.watch("src/js/*.js", ['scripts']);
//     gulp.watch("*.html").on('change', browserSync.reload);
// });

gulp.task('run', gulp.parallel('scripts', 'browser-sync'));