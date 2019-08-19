####What  you need(installed globally):
1. [Node.js](https://nodejs.org/en/)
3. [Gulp](https://gulpjs.com)
4. [TARS-CLI](https://github.com/tars/tars-cli)

####Then enter in console:
1. `npm i`
2. `tars dev -l`

If you have `Error: Can't find Python executable "python", you can set the PYTHON env variable` try [this](https://github.com/felixrieseberg/windows-build-tools/issues/56#issuecomment-308739624)

Custom tasks are in './tars/user-tasks', it's `minify-html`, `to-webp-lossless.js` you can start them using command `tars start taskName`
