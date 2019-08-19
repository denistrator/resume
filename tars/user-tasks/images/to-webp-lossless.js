'use strict';

// The task creates webP images from jpeg

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const tarsConfig = tars.config;
const webP = require('gulp-webp');

const pathToImagesFolder = `./markup/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}/content/`;

/**
 * Task description
 */
module.exports = function () {
    return gulp.task('webp-lossless', function () {
        return gulp.src(`${pathToImagesFolder}*.png`)
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while generating webP images.', error);
                }
            }))
            .pipe(webP({
                lossless: true
            }))
            .pipe(gulp.dest(pathToImagesFolder))
            .pipe(
                notifier.success('WebP images generated')
            );
    });
};
