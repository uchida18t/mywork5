// plugins -----
const { src, dest, watch, series, parallel } = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imageResize = require('gulp-image-resize');
const imageMin = require('gulp-imagemin');
const rename = require('gulp-rename');
const pkg = require('./package.json');
const config = pkg['gulp-config'];
const favicons = config.favicons;
const apples = config.apples;
// -----

function copyFiles() { // ファイルコピー
  return src('./index.html')
    .pipe(dest('./dist'));
}

function jsMinify() { // index.js圧縮
  return src('./jsjs/index.js')
    .pipe(uglify())
    .pipe(dest('./js/'));
}

function favicon(done) { //favicon
  favicons.forEach(favicon => {
    let w = favicon[0];
    let h = favicon[1];
    src('./favicon.png')
      .pipe(imageResize({
        width: w,
        height: h,
        crop: true,
        upscale : false
      }))
      .pipe(imageMin())
      .pipe(rename(`favicon-${w}x${h}.png`))
      .pipe(dest('./'));
  });
  done();
}

function apple(done) { //apple-touch-icon
  apples.forEach(apple => {
    let w = apple[0];
    let h = apple[1];
    src('./apple-touch-icon.png')
      .pipe(imageResize({
        width: w,
        height: h,
        crop: true,
        upscale : false
      }))
      .pipe(imageMin())
      .pipe(rename(`apple-touch-icon-${w}x${h}.png`))
      .pipe(dest('./images/icon/'));
  });
  done();
}

function imgMin() { // 臨時画像圧縮
  return src('./src/top-img2.jpg')
    .pipe(imageMin())
    .pipe(dest('./images/'));
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
exports.favicon = favicon;
exports.apple = apple;
exports.img = imgMin;