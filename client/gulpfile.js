const gulp = require('gulp');
const Config = require('./gulp/config')(process.env.ENV);
const recipe = (name, config) => require('./gulp/recipes/' + name)(config);

console.log(`Building with config: `, Config);

// === Work Env ===

gulp.task('clean', recipe('clean', {
  input: './dist'
}));

// === Static files ===

gulp.task('static', recipe('copy', {
  input: './static/**/*',
  output: './dist'
}));

gulp.task('static:node_modules', recipe('copy', {
  input: [
    './node_modules/react/umd/react.development.js',
    './node_modules/react-dom/umd/react-dom.development.js',
  ],
  output: './dist/vendor'
}));

gulp.task('js:node_modules', recipe('browserify', {
  input: '',
  require: Config.NODE_MODULES,
  output: './dist/vendor',
  name: 'node_modules.js'
}));

// === CSS bundles ===

gulp.task('css', gulp.parallel(Config.CSS_BUNDLES.map(title => {
  gulp.task(`css:${title}`, recipe('stylus', {
    input: `./source/css/${title}.bundle.styl`,
    output: './dist/css',
    name: `${title}.css`
  }));

  return `css:${title}`;
})));

// === Composite tasks ===

gulp.task('watch', () => {
  gulp.watch('./source/css/**/*.styl', gulp.parallel('css'));
  gulp.watch('./static/**/*', gulp.parallel('static'));
});

gulp.task('compile-async', gulp.parallel('css', 'static', 'static:node_modules'));
gulp.task('compile', gulp.series('clean', 'compile-async'));
gulp.task('compile-watch', gulp.series('compile', 'watch'));

gulp.task('default', gulp.parallel('compile-watch'));