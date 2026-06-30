'use strict';

const through2 = tars.packages.through2;
const path = require('path');

/**
 * Filter files for move-separate js
 */
module.exports = function separateFilesFilter() {

    return through2.obj(function (file, enc, callback) {
        const fileName = path.basename(file.relative);

        this.push(file); // eslint-disable-line no-invalid-this

        return callback();
    }, callback => callback());
};
