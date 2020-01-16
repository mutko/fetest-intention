var gulp = require("gulp");
var { watch, series, parallel } = require("gulp");

// styles
var sass = require("gulp-sass");
var prefix = require("gulp-autoprefixer");
var minifyCss = require("gulp-cssnano");
var rename = require("gulp-rename");

// scripts
var babel = require("gulp-babel");
var minifyJs = require("gulp-terser");

// images
var imagemin = require("gulp-imagemin");
var newer = require("gulp-changed");

// BrowserSync
var browserSync = require("browser-sync");

var paths = {
  input: "src/",
  output: "dist/",
  reload: "./dist/"
};

var copy = function(done) {
  gulp.src("./src/*.html").pipe(gulp.dest("dist/"));
  gulp.src("./src/asset/font/**/*").pipe(gulp.dest("dist/asset/font"));
  gulp.src("./src/js/vendor/**/*").pipe(gulp.dest("dist/js/vendor/"));

  done();
};

var style = function(done) {
  gulp
    .src("src/styles/style.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
        sourceComments: true
      }).on("error", sass.logError)
    )
    .pipe(
      prefix({
        overrideBrowserslist: ["last 2 version", "> 1%"],
        cascade: true,
        remove: true
      })
    )
    .pipe(
      minifyCss({
        zindex: false,
        discardComments: {
          removeAll: true
        }
      })
    )
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/styles"));
  done();
};

var script = function(done) {
  gulp
    .src("src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(minifyJs())
    .pipe(gulp.dest("dist/js"));
  done();
};

var image = function(done) {
  gulp
    .src("src/asset/img/**/*")
    .pipe(newer("dist/asset/img"))
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 6 })
      ])
    )
    .pipe(gulp.dest("dist/asset/img"));
  done();
};

// Watch for changes to the src directory
var startServer = function(done) {
  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  });

  // Signal completion
  done();
};

// Reload the browser when files change
var reloadBrowser = function(done) {
  browserSync.reload();
  done();
};

// Watch for changes
var watchSource = function(done) {
  watch("src/**/*", series(exports.default, reloadBrowser));
  // watch("src/*.html", series(exports.default, reloadBrowser));
  done();
};

// Default task
exports.default = series(parallel(style, script, image, copy));

// Watch and reload
exports.watch = series(exports.default, startServer, watchSource);
