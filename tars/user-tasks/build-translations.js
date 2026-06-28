'use strict';

const gulp = tars.packages.gulp;
const notifier = tars.helpers.notifier;

module.exports = function() {
    return gulp.task('build-translations', function(done) {
        return gulp
            .src('./markup/translations.json')
            .pipe(gulp.dest(tars.config.devPath))
            .pipe(notifier.success('Translations file copied'));
    });
};
