module.exports = function(karma) {
  karma.set({

    frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
    files: ['specs/**/*.js'],
    preprocessors: {
      'specs/**/*.js': [ 'browserify' ]
    },

    reporters: [ 'nyan' ], //report results in this format

    browserify: {
      debug: true,
      transform: [ 'reactify' ],
      extensions: ['.js','.jsx']
    },

    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome' ],
    port: 9876,
    colors: true,
    singleRun: true
  });
};
