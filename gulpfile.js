const { src, dest, watch, series, parallel } = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');

function copyFiles() { // ファイルコピー
  return src('./index.html')
    .pipe(dest('./dist'));
}

function jsMinify() { // index.js圧縮
  return src('./jsjs/index.js')
    .pipe(uglify())
    .pipe(dest('./js/'));
}

function styles() { // Sassコンパイル
  return src('./scss/**/*.scss')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
    .pipe(sass())
    .pipe(autoPrefixer({
      cascade: false
    }))
    .pipe(cleanCss())
    .pipe(dest('./css'));
}

function serve(done) { // ブラウザ
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  done()
}

function bsReload(done) {
  browserSync.reload();
  done();
}

function taskWatch() { // 監視自動タスク
  watch('./jsjs/index.js', jsMinify);
  watch('./scss/**/*.scss', styles);
  watch('./**/*.html', bsReload);
  watch('./css/**/*.css', bsReload);
  watch('./js/**/*.js', bsReload);
}

const start = series(parallel(jsMinify, styles, serve, taskWatch));
exports.copyFiles = copyFiles;
exports.jsMinify = jsMinify;
exports.sass = styles;
exports.bs = serve;
exports.start = start;