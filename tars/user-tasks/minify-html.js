'use strict';

// This is example of task function

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const tarsConfig = tars.config;

var htmlmin = require('gulp-htmlmin');
// Include browserSync, if you need to reload browser:
// const browserSync = tars.packages.browserSync;

/**
 * Task description
 */
module.exports = function () {

    return gulp.task('minify-html', /*['required-task-name'],*/ function (done) {
        return gulp.src('./builds/*.html')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while something.', error);
                }
            }))
            // Do stuff here, like
            // .pipe(less())
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('./builds'))

            // If you need to reload browser, uncomment the row below
            // .pipe(browserSync.reload({ stream:true }))
            .pipe(
                // You can change text of success message
                notifier.success('Example task has been finished')
            );

        // You can return callback, if you can't return pipe
        // done(null);
    });
};
