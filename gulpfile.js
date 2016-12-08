var gulp = require("gulp"),
    $ = require("gulp-load-plugins")(),
    browserify = require("browserify")
    babelify = require("babelify"),
    watchify = require("watchify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer");

gulp.task("dev:scripts", () => {
  const bundler = browserify("./src/scripts/application.js",
      {
        debug: true
      });

  bundler.transform(babelify);

  return bundler.bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer()) //optional
    .pipe(gulp.dest("./public/build"));
});

gulp.task("dev:styles", () => {
    return gulp
        .src("./src/styles/site.less")
        .pipe($.less())
        .pipe(gulp.dest("./public/styles"));
});

gulp.task("dev", gulp.parallel("dev:scripts",
    "dev:styles"));

gulp.task("dev:watch", gulp.series(
    "dev",
    () => {
        gulp.watch("./src/styles/**/*.less",
            gulp.series("dev:styles"));
            
        gulp.watch("./src/scripts/**/*.js",
            gulp.series("dev:scripts"));
    }
));
