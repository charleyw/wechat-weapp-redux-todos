const gulp = require('gulp');
const watch = require('gulp-watch');
const webpackStream = require('webpack-stream');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const gulpClean = require('gulp-clean');
const webpack = require('webpack');

gulp.task('build-lib', function () {
  return gulp.src('src/libs/index.js')
    .pipe(plumber())
    .pipe(webpackStream( require('./webpack.config.js'), webpack))
    .pipe(rename('index.js'))
    .pipe(gulp.dest('dist/libs'))
});

gulp.task('transform-js', function () {
  return gulp.src(['src/**/*.js', '!src/libs/*'])
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: ["@babel/plugin-proposal-object-rest-spread"]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-other-files', function () {
  return gulp.src(['src/**/*.json', 'src/**/*.wxml', 'src/**/*.wxss', 'src/**/*.svg'])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function (done) {
  gulp.watch('src/libs/*.js', gulp.series('build-lib'));
  gulp.watch(['src/**/*.js', '!src/libs/*'], gulp.series('transform-js'));
  gulp.watch(['src/**/*.json', 'src/**/*.wxml', 'src/**/*.wxss', 'src/images/*.svg'], gulp.series('copy-other-files'))
  done()
});



const clean = function (cb) {
    gulp.src('dist/*', {read: false}).pipe(gulpClean())
    cb()
};
const build = gulp.series(clean, 'build-lib', 'transform-js', 'copy-other-files')
const dev = gulp.series(build, 'watch')
exports.clean = clean
exports.build = build
exports.dev = dev