const { src, dest, parallel } = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');

function html() {
  return src('src/*.html')
    .pipe(pug())
    .pipe(dest('app/html'))
}

function css() {
  return src('src/css/*.css')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('app/css'))
}

function js() {
  return src('src/js/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('app/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);