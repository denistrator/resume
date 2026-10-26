# AGENTS.md

## Project and documentation

This repository builds Denis Belevtsov's single-page, multilingual resume as a static website.
It contains a customized TARS 1.15.1 builder, Gulp 4 tasks, Handlebars templates, SCSS, and
plain browser JavaScript. There is no backend, database, client router, or application framework.

Read [docs/README.md](docs/README.md) for the documentation map,
[docs/architecture.md](docs/architecture.md) for the system design,
[docs/development.md](docs/development.md) for workflows and verification, and
[docs/i18n-pattern.md](docs/i18n-pattern.md) before changing localized content.
The root READMEs provide matching English and Russian project overviews.
`docs/en/` / `docs/ru/` describe upstream TARS defaults; the checked-in implementation
and project-specific docs take precedence. Keep both root READMEs aligned when changing them.

## Setup and commands

Use Node >=20 (`package.json`); deployment CI uses Node 20. Install local dependencies
with `npm ci` and install TARS-CLI separately if missing (`npm install -g tars-cli --ignore-scripts`,
as in CI). Many builder dependencies come from TARS-CLI rather than this package's manifest.
Do not run `tars init` on this already initialized checkout for routine development.

```bash
tars build-dev                 # one-shot build into dev/
tars dev --lr                  # watchers + BrowserSync at http://localhost:3004
tars dev                       # watchers, without BrowserSync unless --lr/--tunnel is set
tars build                     # build into builds/, without selecting minified CSS/JS
tars build --min               # minified production build; CI uses this
tars build --release           # minified CSS/JS with random build hash in filenames
tars start check-public-repository
```

`npx --no-install gulp <task>` only works if all required builder packages are locally
resolvable; `npm ci` alone does not guarantee this. Do not download unrelated replacement
tooling merely to run a check. See development docs for troubleshooting.

There is **no automated test suite**. `npm test` is a placeholder that exits 1.
Verify changes with `tars build --min`, review the task log for errors, and inspect generated
HTML/assets. UI or runtime changes also need relevant browser checks. Lint is disabled in
`tars-config.js`; ESLint configuration exists but ESLint is not a declared local dependency.
Do not claim lint or browser checks passed unless actually run.

## Where to edit

- `markup/pages/index.html`: page composition; `_template.html` is a scaffold, not an output page.
- `markup/components/<name>/`: HTML partials, optional SCSS and browser JS, `data/data.js`.
- `markup/static/scss/entry/main.scss`: actual CSS entry, importing service/common styles and components.
- `markup/static/scss/entry/partials/_components.scss`: register component styles here.
- `markup/static/scss/common.scss` and `common/`: shared layout, typography, browser UI.
- `markup/static/scss/vars.scss`: light/dark CSS custom properties and SCSS typography variables.
- `markup/static/img/`: images; `markup/static/misc/`: copied site-root files, favicons and PDFs.
- `tars/user-tasks/`: project-specific translation, publishing and helper tasks.
- `tars/tasks/` and `tars/watchers/`: customized builder internals; inspect before assuming upstream behavior.
- `.github/workflows/deploy.yml`: builds and publishes `builds/` to Cloudflare Pages and GitHub Pages.

Never hand-edit generated `dev/`, `builds/`, `dev/temp/`, sprite SCSS or generated
`translations.json`. PDF downloads are maintained source assets, not generated from the HTML.
Keep unrelated local/untracked files untouched.

## Runtime and content contracts

The page includes head/pre-init scripts, header, sections, and footer. The sidebar contains
languages, hard skills and employment; the main column contains experience, achievements
and soft skills. Preserve semantic headings, skip link, focus states, responsive and print behavior.

**JavaScript uses the concat workflow, not Webpack.** `js:processing` selects
`js:concat-processing`; `webpack.config.js` is for the inactive modular workflow.
Component JS is picked up automatically, Babel-transformed and concatenated into `main.js`.
`markup/static/js/main.js` is a placeholder and is not included by the active concat task.
Data files and underscore-prefixed JS are excluded. Keep component scripts isolated in IIFEs
and avoid depending on glob order. The page loads the bundle with `async` at the end of body.

Data files declare `const data = { '<component-folder>': { ... } };`; they are executable
build input, not JSON or CommonJS exports. Keep the root key identical to the folder name.
Translations use `{ en, ru, uk }` or a sole `{ default: 'shared value' }` object.
Use camelCase translation namespaces for hyphenated component folders (`soft-skills` → `softSkills`).
Pair initial English rendering (`{{t 'key'}}` or `.en` fields in loops) with `data-i18n`
and `data-i18n-attr` for runtime updates. Preserve array-index key alignment.
Build-time helpers return trusted HTML; runtime translations escape markup except `<br>`.

Keep these contracts synchronized across inline scripts, component JS and styles:

| Contract | Meaning |
| --- | --- |
| `preferred-lang` localStorage | `en`, `ru`, `uk`; language toggle cycles in that order |
| `data-pending-lang` / `data-lang-ready` | pre-init to language-switcher handoff and page visibility |
| `theme` localStorage / `data-theme` | persisted light/dark preference and CSS theme selector |
| `Resume-en.pdf`, `Resume-ru.pdf`, `Resume-uk.pdf` suffixes | runtime PDF link rewriting |

## Builder and style conventions

`gulpfile.js` initializes the global `tars` through `tars/tars.js`, then registers system and
user tasks. `tars.require()` resolves CLI-owned packages when `process.env.npmRoot` is set;
ordinary `require()` resolves local dependencies. `tars.flags`, `tars.options`, `tars.config`,
`tars.packages`, and `tars.isDevMode` are shared across tasks. `isDevMode` depends on
min/release flags, not the task name. Active concat CSS/JS sourcemaps require watch mode.

Use four spaces, LF, single quotes and semicolons for JS; follow surrounding template/SCSS
formatting. `package.json` uses two spaces. Prettier specifies trailing commas and 110 columns.
`plugins-config.json` contains comments and `insert(...)` substitutions: do not parse it as strict JSON.
Keep TARS tokens (`%=static=%`, `%=symbols=%`, `%=hash=%`, `%=min=%`) in source templates.

The production build runs `check-public-repository` against **Git index contents**, not
unstaged or untracked files. Do not bypass a failure or stage user files merely to satisfy it.
Build and checks are local; publishing is separate. Pushing `master` triggers deployment.
Do not invoke FTP `deploy` or publish changes unless the user requests it.
