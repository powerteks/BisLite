var gulp = require("gulp"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    bserver = require("browser-sync").create();

    gulp.task("style", function() {
      gulp.src("sass/main.scss")
          .pipe(plumber())
          .pipe(sass())
          .pipe(postcss([
            autoprefixer()
          ]))
          .pipe(gulp.dest("css"))
          .pipe(bserver.stream());
    });

    gulp.task("serv", ["style"], function() {
      bserver.init({
        server: ".",
        notify: false,
        open: true,
        cors: true
      });
    });

    gulp.watch("sass/**/*.{scss,sass}", ["style"]);
    gulp.watch("*.html").on("change", bserver.reload);

    gulp.task("default", ["serv"]);