'use strict';

const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Build release version
 */
module.exports = () => {
    return gulp.task(
        'main:build',
        gulp.series('main:build-dev', (done) => {
            runSequence(
                ['html:modify-html', 'images:minify-images'],
                'main:create-build',
                ['css:compress-css'],
                'inline-source',
                'service:zip-build',
                () => {
                    console.log(
                        gutil.colors.black.bold(
                            '\n------------------------------------------------------------',
                        ),
                    );
                    tars.say(gutil.colors.green.bold(' Build has been created successfully!'));

                    if (tars.config.useBuildVersioning) {
                        tars.say(gutil.colors.white.bold('Build version is: ', tars.options.build.version));
                    }
                    console.log(
                        gutil.colors.black.bold(
                            '------------------------------------------------------------\n',
                        ),
                    );
                    done();
                },
            );
        }),
    );
};
