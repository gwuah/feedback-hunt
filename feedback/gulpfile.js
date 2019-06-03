"use strict";

var gulp = require("gulp"),
  connect = require("gulp-connect"),
  sass = require("gulp-sass"),
  htmlmin = require("gulp-htmlmin"),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  imagemin = require("gulp-imagemin"),
  uglify = require("gulp-uglify"),
  pump = require("pump"),
  jshint = require("gulp-jshint");

var path = {
  html: {
    src: "./index.html",
    views: "./views/*.html",
    viewsbuild: "./public/views",
    build: "./public/"
  },
  sass: {
    src: "./src/css/main.scss",
    watch: "./src/css/*.scss",
    dev: "./src/css/",
    css: "./src/css/main.css",
    build: "./public/src/css/"
  },
  js: {
    watch: "./src/js/*.js",
    build: "./public/src/js/"
  },
  img: {
    src: "./src/img/*",
    build: "./public/src/img/"
  },
  fonts: {
    src: "./src/fonts/*",
    build: "./public/src/fonts/"
  }
};

// Basic server on port:2018
gulp.task("server", function() {
  connect.server({
    livereload: true,
    port: 2018
  });
});

// HTML loader
gulp.task("html", function() {
  return gulp.src(path.html.src).pipe(connect.reload());
});

// HTML auto reloader
gulp.task("html:watch", function() {
  gulp.watch(path.html.src, ["html"]);
});

// Views loader
gulp.task("views:watch", function() {
  gulp.watch(path.html.views, ["html"]);
});

// eslint & jshint for js files
gulp.task("js"),
  function() {
    return gulp
      .src(path.js.watch)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(jshint.reporter("fail"))
      .pipe(connect.reload());
  };

// watch js files with eslint jshint on
gulp.task("js:watch", function() {
  gulp.watch(path.js.watch, ["js"]);
});

// sass compiler
gulp.task("sass", function() {
  return gulp
    .src(path.sass.watch)
    .pipe(sass({}).on("error", sass.logError))
    .pipe(gulp.dest(path.sass.dev))
    .pipe(connect.reload());
});

// sass watcher
gulp.task("sass:watch", function() {
  gulp.watch(path.sass.watch, ["sass"]);
});

gulp.task("dev", [
  "sass",
  "js",
  "js:watch",
  "html:watch",
  "views:watch",
  "sass:watch",
  "server"
]);

// Build config

// build index.html file
gulp.task("index", function() {
  return gulp
    .src(path.html.src)
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(path.html.build));
});

gulp.task("views", function() {
  return gulp
    .src(path.html.views)
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(path.html.viewsbuild));
});

gulp.task("css", function() {
  return gulp
    .src(path.sass.css)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest(path.sass.build));
});

gulp.task("image", function() {
  return gulp
    .src(path.img.src)
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: true
            },
            {
              cleanupIDs: false
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(path.img.build));
});

gulp.task("js-build", function(cb) {
  pump([gulp.src(path.js.watch), uglify(), gulp.dest(path.js.build)], cb);
});

gulp.task("fonts", function() {
  gulp.src(path.fonts.src).pipe(gulp.dest(path.fonts.build));
});

gulp.task("build", ["index", "views", "css", "image", "js-build", "fonts"]);
