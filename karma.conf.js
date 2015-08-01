// Karma configuration

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    //plugins: ['karma-babel-preprocessor', 'karma-phantomjs-launcher', 'karma-mocha', 'karma-jquery'],
    // frameworks to use
    frameworks: ['mocha', 'chai', 'jquery-2.1.0'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
      'node_modules/string2mediaquery/lib/string2mediaquery.js',
      'lib/breaks.js',
      'test.js'
    ],

    preprocessors: {
      'test.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        loose: 'all'
      },
      filename: function (file) {
        return file.originalPath;
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],

    junitReporter: {
      outputFile: 'test-results.xml',
      outputDir: '.'
    },

    // web server port
    //port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: [
      'PhantomJS'
    ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
