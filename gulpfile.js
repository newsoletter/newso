// const gulp = require("gulp");
const purge = require("gulp-css-purge");
const cleancss = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const autoprefixers = require("autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass"));
const { src, dest, series, watch } = require("gulp");

const paths = {
  css: {
    src: "./assets/css/*.scss",
    sass: "./_sass/*.scss",
    dest: "./assets/deploy-css",
  },
};

const options = {
  scss: {
    outputStyle: "expanded",
    sourceComments: false,
  },
};

function css() {
  return src(paths.css.src, { sourcemaps: true })
    .pipe(sass(options.scss).on("error", sass.logError))
    .pipe(postcss([autoprefixers()]))
    .pipe(gcmq())
    .pipe(
      purge({
        trim: true,
        shorten: true,
        verbose: true,
      })
    )
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 }, 2: { removeDuplicateRules: true } },
      })
    )
    .pipe(dest(paths.css.dest, { sourcemaps: true }));
}

exports.default = series(css);

exports.watch = function () {
  watch([paths.css.src, paths.css.sass], css);
};
