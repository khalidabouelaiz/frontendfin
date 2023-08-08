// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const fs = require('fs');
const path = require('path');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      onComplete: function () {
        const logFilePath =
          '/Users/khalidabouelaiz/Downloads/thetiptop-front-develop 4/test-errors.txt';
        const errors = this.specResults.reduce((acc, specResult) => {
          return acc.concat(
            specResult.failedExpectations.map(
              (failedExpectation) => failedExpectation.stack
            )
          );
        }, []);

        fs.writeFileSync(logFilePath, errors.join('\n'), { flag: 'a' });
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '/coverage/pfe'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    reporters: ['progress', 'kjhtml'],
    port: 4200,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
