'use strict';

const gulp = tars.packages.gulp;
const {
    checkTrackedFiles,
    formatFinding,
} = require('./helpers/public-repository-checker');

module.exports = function() {
    return gulp.task('check-public-repository', async function() {
        let findings;

        try {
            findings = await checkTrackedFiles();
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Public repository check failed.');
            throw new Error('Public repository check could not be completed.');
        }

        if (findings.length === 0) {
            console.log('Public repository check passed.');
            return;
        }

        console.error(`Public repository check failed with ${findings.length} finding(s):`);
        for (const finding of findings) {
            console.error(formatFinding(finding));
        }

        throw new Error('Public repository check failed.');
    });
};
