var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/app.js'
};

// DEVELOPMENT TASKS

// Copy index.html from src folder into the dist folder
gulp.task('copy', function(){
	// Grab index.html
	gulp.src(path.HTML)
		// Copy it over to the dest folder
		.pipe(gulp.dest(path.DEST));
});

// Watch index.html for any changes
gulp.task('watch', function() {
	// If something does change, run the copy task
  gulp.watch(path.HTML, ['copy']);

  // Watchify will cache our files and watch for changes, only updating the necessary changes
  // Here we're passing browserify an object to set up the configurations for our browserify build
  var watcher  = watchify(browserify({
    // Specif files we want to transform
    // We just need to specify the path of our main component and it willt ake care of all the child components
    entries: [path.ENTRY_POINT],
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
      .pipe(source(path.OUT))
      // Pipe result to the dist/src folder
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
  	// Bundle and pipe when we first call gulp watch before any changes are made
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('serve', function(){
  nodemon({
    // Start server on index.js and watch for changes
    script: 'index.js',
    // Watch all js and html files in the directory
    ext: 'js html'
  });
});

// PRODUCTION TASKS

gulp.task('build', function(){
	browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify]
	})
	.bundle()
	.pipe(source(path.MINIFIED_OUT))
	.pipe(streamify(uglify(path.MINIFIED_OUT)))
	// Pipe result to the dist/build folder
	.pipe(gulp.dest(path.DEST_BUILD));
});

// Replace script tag reference in index.html to the new build.min.js
gulp.task('replaceHTML', function(){
	// Grab index.html
	gulp.src(path.HTML)
	// Replace the build:js comment with <script src="build/build.min.js"></scrip>
	.pipe(htmlreplace({
		'js': 'build/' + path.MINIFIED_OUT
	}))
	.pipe(gulp.dest(path.DEST));
});

gulp.task('default', ['serve', 'watch']);
gulp.task('production', ['replaceHTML', 'build']);