'use strict';

// This is example of task function

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const tarsConfig = tars.config;

var critical = require('critical');
// Include browserSync, if you need to reload browser:
// const browserSync = tars.packages.browserSync;

/**
 * Task description
 */
module.exports = function () {

    return gulp.task('critical', /*['build'],*/ function (cb) {
        critical.generate({
            inline: true,
            base: './builds',
            src: 'index.html',
            dest: 'index.html',
            minify: true,
            width: 1920,
            height: 1000
        });
    });
};
