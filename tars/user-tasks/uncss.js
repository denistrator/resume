'use strict';

// This is example of task function

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const tarsConfig = tars.config;

var uncss = require('gulp-uncss');
// Include browserSync, if you need to reload browser:
// const browserSync = tars.packages.browserSync;

/**
 * Task description
 */
module.exports = function () {

    return gulp.task('uncss', function (done) {
        return gulp.src('./dev/static/css/grid.css')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while something.', error);
                }
            }))
            // Do stuff here, like
            // .pipe(less())
            .pipe(uncss({
                html: ['./dev/index.html']
            }))
            .pipe(gulp.dest('./markup/static/scss/uncss-output'))

            // If you need to reload browser, uncomment the row below
            // .pipe(browserSync.reload({ stream:true }))
            .pipe(
                // You can change text of success message
                notifier.success('CSS has been uncssed')
            );

        // You can return callback, if you can't return pipe
        // done(null);
    });
};
