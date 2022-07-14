const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");

function buildStyles() {
  return (
    src("src/Sass/**/*.scss")
      .pipe(sass())
      // .pipe(purgecss({ content: ["*.html"] }))
      .pipe(dest("src/assets/css"))
  );
}

function watchTask() {
  watch(["src/SASS/**/*.scss", "src/**/*.scss", "*.html"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
