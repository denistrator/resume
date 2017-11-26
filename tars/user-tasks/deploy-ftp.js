'use strict';

const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const ftp = require( 'vinyl-ftp' );

/**
 * Upload files by FTP
 */
module.exports = function () {

    return gulp.task('deploy', function () {
        const conn = ftp.create({
            host:     tars.flags.host || tars.flags.h,
            user:     tars.flags.user || tars.flags.u,
            password: tars.flags.pass || tars.flags.p,
            log:      gutil.log,
        });

        return gulp.src('./builds/**', {buffer: false})
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while something.', error);
                }
            }))
            .pipe(
                conn.newer('/public_html')
            ) // only upload newer files
            .pipe(
                conn.dest('/public_html')
            )
            .pipe(
                notifier.success('Project deployed successfully')
            );
    });
};
