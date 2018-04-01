####What  you need(installed globaly):
1. [Node.js](https://nodejs.org/en/)
2. [Gulp](https://gulpjs.com)
3. [TARS-CLI](https://github.com/tars/tars-cli)

####Then enter in console:
1. `npm i`
2. `bower i`
3. `tars dev -l`

If you have `Error: Can't find Python executable "python", you can set the PYTHON env variable` try [this](https://github.com/felixrieseberg/windows-build-tools/issues/56#issuecomment-308739624)

Castom tasks are in './tars/user-tasks', it's `critical`, `minify-html`, `uncss` you can start them using command `tars start taskName`
