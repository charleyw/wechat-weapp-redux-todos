const gulp = require('gulp');
const watch = require('gulp-watch');
const webpackStream = require('webpack-stream');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const webpack = require('webpack');

gulp.task('build-lib', function () {
  return gulp.src('src/libs/index.js')
    .pipe(webpackStream( require('./webpack.config.js'), webpack))
    .pipe(rename('index.js'))
    .pipe(gulp.dest('dist/libs'))
});

gulp.task('transform-js', function () {
  return gulp.src(['src/**/*.js', '!src/libs/index.js'])
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
  gulp.watch(['src/**/*.js', '!src/libs/index.js'], ['transform-js']);
  gulp.watch(['src/**/*.json', 'src/**/*.wxml', 'src/**/*.wxss'], ['copy-other-files'])
});