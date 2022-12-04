'use strict';

const gulp = require('gulp');
const config = require('./config')();
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const sync = require('browser-sync');

const sass = require('gulp-sass')(require('node-sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const flexBugsFixes = require('postcss-flexbugs-fixes');
const sortMediaQueries = require('postcss-sort-media-queries');

const imagemin = require('gulp-imagemin');
const imageminPngquant  = require('imagemin-pngquant');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const html = () => {
  return gulp.src(`${config.paths.src.html}/*.html`)
    .pipe(plumber())
    .pipe(gulp.dest(config.paths.build.html))
    .pipe(sync.stream());
}

const styles = () => {
  return gulp.src(`${config.paths.src.scss}/entry/*.scss`)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([
      sortMediaQueries({
        sort: 'mobile-first'
      }),
      flexBugsFixes,
      autoprefixer
    ]))
    .pipe(gulp.dest(config.paths.build.css))
    .pipe(sync.stream())
}

const scripts = () => {
  const jsFolderPath = config.paths.src.js;

  return gulp.src(`${jsFolderPath}/*.js`)
    .pipe(plumber({
      errorHandler: false
    }))
    .pipe(webpackStream({
      mode: 'production',
      output: {
        filename: 'main.min.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      performance: {
        hints: false,
        maxAssetSize: 512000,
      },
    }, webpack))
    .pipe(gulp.dest(config.paths.build.js))
    .pipe(sync.stream());
}

function images() {
  return gulp.src(`${config.paths.src.images}/**/*`)
    .pipe(newer(config.paths.build.images))
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 90 }),
      imageminPngquant({ quality: [0.85, 0.9] }),
    ], { verbose: true }))
    .pipe(gulp.dest(config.paths.build.images))
    .pipe(sync.stream());
}

const server = () => {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: config.paths.build.root
    }
  });
}

const watch = () => {
  const srcFolderPath = config.paths.src;

  gulp.watch(`${srcFolderPath.html}/*.html`, gulp.series(html));
  gulp.watch(`${srcFolderPath.scss}/**/*.scss`, gulp.series(styles));
  gulp.watch(`${srcFolderPath.js}/**/**/*`, gulp.series(scripts));
}

exports.default = gulp.parallel(
  html,
  styles,
  scripts,
  watch,
  server
);

exports.build = gulp.parallel(
  html,
  styles,
  images,
  scripts
);

exports.images = images;
