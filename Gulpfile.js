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

// DEVELOPMENT TASKS

// Watch index.html for any changes
gulp.task('watch', function() {
  // If something does change, run the copy task
  gulp.watch('src/index.html', ['copy']);

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


gulp.task('copy',function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
    gulp.src('src/styles/*.css')
      .pipe(gulp.dest('dist/styles'));
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
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
})

gulp.task('build', function(){
 browserify({
   entries: ['src/js/app.js'],
   transform: [reactify]
 })
 .bundle()
 .pipe(source('app.min.js'))
 .pipe(streamify(uglify()))
 // Pipe result to the dist/build folder
 .pipe(gulp.dest('dist/build'));
});

// Replace script tag reference in index.html to the new build.min.js
gulp.task('replaceHTML', function(){
 // Grab index.html
 gulp.src('src/index.html')
 // Replace the build:js comment with <script src="build/build.min.js"></script>
 .pipe(htmlreplace({
   'js': 'build/app.min.js'
 }))
 .pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy', 'watch', 'serve']);
// gulp.task('production', ['clean', 'copy', 'replaceHTML', 'build']);
gulp.task('production', ['replaceHTML', 'build']);
