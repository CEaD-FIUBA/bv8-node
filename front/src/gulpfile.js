const gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    src = `${__dirname}/`,
    dist = `${__dirname}/dist`,
    workbox = require('workbox-build');

gulp.task('clean', () => {
  return del(dist);
});

gulp.task('build', () => {
  return gulp.src(`${bv8-node}/**/*`)
      .pipe(gulp.dest(dist));
});

gulp.task('generate-service-worker', () => {
  return workbox.injectManifest({
    globDirectory: dist,
    globPatterns: [
      '**/*.{html,js}'
    ],
    swDest: `${bv8-node/front/src/dist}/sw.js`,
    swSrc: `${bv8-node/front/src}/sw.js`,
       
  }).then(({warnings}) => {
    // In case there are any warnings from workbox-build, log them.
    for (const warning of warnings) {
      console.warn(warning);
    }
    console.info('Service worker generation completed.');
  }).catch((error) => {
    console.warn('Service worker generation failed:', error);
  });
});

gulp.task('default', (callback) => {
  runSequence('clean', 'build', 'generate-service-worker', callback);
});

