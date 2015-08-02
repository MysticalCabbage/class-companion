var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var envify = require('envify');

// DEVELOPMENT TASKS

// Watch index.html for any changes
gulp.task('watch', function() {
  // If something does change, run the copy task
  gulp.watch('src/index.html', ['copyHTML']);
  gulp.watch('src/styles/*.css', ['copyCSS']);
  gulp.watch('src/assets/*', ['copyAssets']);

  // Watchify will cache our files and watch for changes, only updating the necessary changes
  // Here we're passing browserify an object to set up the configurations for our browserify build
  var watcher  = watchify(browserify({
    // Specif files we want to transform
    // We just need to specify the path of our main component and it willt ake care of all the child components
    entries: ['./src/js/app.js'],
    // Specify how to transform our code
    // Reactify will take care of JSX to JS transpiling
    transform: [reactify],
    // Set debug to true tells Browserify to use source maps
    // When there is an error, the error will point to the line no. in our JSX file rather than the transpiled JS file
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  // Watch for updates in the parent/children components and invoke callback
  return watcher.on('update', function () {
    // Create new bundle that uses the cache
    watcher.bundle()
      .pipe(source('app.js'))
      // Pipe result to the dist/src folder
      .pipe(gulp.dest('dist/js'))
      console.log('Updated');
  })
    // Bundle and pipe when we first call gulp watch before any changes are made
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('serve', function(){
  nodemon({
    // Start server on index.js and watch for changes
    script: 'index.js',
    // Watch all js and html files in the directory
    ext: 'js',
    ignore: 'node_modules/**/*.js',
    env: {
      PORT: '3000'
    }
  });
});

// PRODUCTION TASKS
gulp.task('clean', function(){
  return gulp.src('dist/', {read: false})
    .pipe(clean());
})

// Replace script tag reference in index.html to the new build.min.js
gulp.task('replaceHTML', function(){
 // Grab index.html
 gulp.src('src/index.html')
 // Replace the build:js comment with <script src="build/build.min.js"></script>
 .pipe(htmlreplace({
   'js': 'src/app.min.js'
 }))
 .pipe(gulp.dest('dist'));
});

gulp.task('copyHTML',function() {
 gulp.src('src/index.html')
   .pipe(gulp.dest('dist'));
});

gulp.task('copyCSS',function() {
 gulp.src('src/styles/**/*.css')
   .pipe(gulp.dest('dist/styles'));
});

gulp.task('copyAssets',function() {
 gulp.src('src/assets/*')
   .pipe(gulp.dest('dist/assets'));
});

gulp.task('build', function(){
 browserify({
   entries: ['src/js/app.js'],
   transform: [[reactify],['envify', {'global': true, '_': 'purge', NODE_ENV: 'production'}]]
 })
 .bundle()
 .pipe(source('app.min.js'))
 .pipe(streamify(uglify().on('error', gutil.log)))
 .pipe(gulp.dest('dist/src'));
});

gulp.task('default', function(){
 runSequence('clean', 'copyHTML', 'copyCSS', 'copyAssets', 'watch', 'serve');
});

gulp.task('production', function(){
 runSequence('clean', 'copyAssets', 'copyCSS', 'build', 'replaceHTML');
});

gulp.task('heroku:production', function(){
  runSeq('clean', 'build', 'minify')
})