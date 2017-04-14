const gulp = require('gulp');
const watch = require('gulp-watch');
const webpackStream = require('webpack-stream');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
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
      presets: ['es2015'],
      plugins: ["transform-object-rest-spread"]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-other-files', function () {
  return gulp.src(['src/**/*.json', 'src/**/*.wxml', 'src/**/*.wxss'])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/libs/index.js', ['build-lib']);
  gulp.watch(['src/**/*.js', '!src/libs/*'], ['transform-js']);
  gulp.watch(['src/**/*.json', 'src/**/*.wxml', 'src/**/*.wxss'], ['copy-other-files'])
});

gulp.task('clean', function () {
  return gulp.src('dist/*', {read: false}).pipe(clean());
});

gulp.task('build', function () {
  return runSequence('clean', ['build-lib', 'transform-js', 'copy-other-files'])
});