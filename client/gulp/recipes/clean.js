const gulp = require('gulp');
const clean = require('gulp-clean');

module.exports = (config) => {
  return () => {
    return gulp.src(config.input, {
      read: false,
      allowEmpty: true,
    })
      .pipe(clean());
  }
};