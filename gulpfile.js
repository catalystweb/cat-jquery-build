var { src, dest, parallel } = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

function js() {
  return src('src/js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
}

exports.js = js;
exports.default = parallel(js);