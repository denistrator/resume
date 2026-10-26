# Development

## Prerequisites and setup

Run commands from the repository root. `package.json` requires Node >=20; the deployment workflow
uses Node 20. `package-lock.json` is checked in, so use `npm ci` for a locked local install.
The builder additionally relies on TARS-CLI to supply packages missing from the local manifest.

```bash
npm ci
npm install -g tars-cli --ignore-scripts
```

The CLI installation command matches deployment CI. It is needed only if TARS-CLI is missing.
CLI dependencies are not pinned by the project's lockfile. Record Node/CLI versions when
investigating differences across machines. This checkout already includes initialized tasks and
source; `tars init` is a scaffolding/setup operation, not a normal prerequisite here.

## Command reference

| Command | Effect |
| --- | --- |
| `tars build-dev` | Rebuilds `dev/` once, without watchers |
| `tars dev --lr` | Rebuilds and watches; BrowserSync serves `http://localhost:3004` |
| `tars dev` | Rebuilds and watches without starting BrowserSync |
| `tars build` | Rebuilds staging and `builds/`; references ordinary CSS/JS |
| `tars build --min` | Builds minified output; matches deployment CI |
| `tars build --release` | Selects minified assets with a random per-build filename hash |
| `tars start check-public-repository` | Checks indexed paths and blobs for public-repository rules |

`BROWSERSYNC_PORT` can override port 3004. `DISABLE_NOTIFIER=1` disables desktop notifications
for unattended commands. `--tunnel` also enables BrowserSync and exposes a tunnel, so use it
only when that sharing is intended.

Gulp aliases exist for `build-dev`, `dev`, `build` and `init`. A fallback such as
`npx --no-install gulp build --min` only works when every framework package can resolve locally.
The local package manifest intentionally does not contain the full TARS toolchain; a missing
`gulp-util` or another framework dependency is a setup problem, not a template compilation error.

## Common edits

### Resume content and translations

Edit `markup/components/<component>/data/data.js`. Add English, Russian and Ukrainian values
or a sole `default` value for content shared across languages. Keep the component root key
identical to its folder. Follow [the localization guide](i18n-pattern.md), including the camelCase
runtime namespace for a hyphenated folder. Keep template array positions and translation keys aligned.
PDF content must be updated separately under `markup/static/misc/media/`.

### Components and interactions

Use `markup/components/_template/` as a shape reference. Add the HTML partial to page/section
composition with `{{> name/name}}`. Register its SCSS in
`markup/static/scss/entry/partials/_components.scss`. A non-underscore component `.js` file
is automatically included by the concat workflow; do not wire it through the inactive
`markup/static/js/main.js` entry. Use a self-contained IIFE with DOM guards and explicit event handling.

Preserve localization attributes, semantic structure, ARIA state, keyboard behavior,
focus indicators, mobile layout and print presentation. New state should fit existing DOM
contracts rather than assume a framework lifecycle.

### Styling and assets

Use `vars.scss` for theme values, shared `common/` files for site-wide rules and component SCSS
for local styles. Inspect the import order in [architecture](architecture.md) before moving rules.
The project uses Sass imports and builder-generated sprite files; do not migrate its preprocessor
structure as an incidental part of a content edit.

Put content images in `markup/static/img/` and files that need root-relative output placement
in `markup/static/misc/`. Keep the `Resume-<language>.pdf` filename suffix expected by the switcher.
`webp-lossless` converts content PNGs to WebP in the source folder when explicitly invoked;
it is not part of the build and does not automatically rewrite template references.

### Build changes

Prefer `tars/user-tasks/` for custom tasks/helpers. Existing `tars/tasks/` and watchers have
project modifications, so inspect those implementations before replacing or updating TARS.
`plugins-config.json` contains comments and `insert(...)` substitution expressions and must be
handled with its existing parser. `tars-config.js` controls which alternative pipeline is active;
a configured Webpack bundler does not make Webpack active under the concat workflow.

## Verification

There is no automated unit/E2E suite. `npm test` always fails with the placeholder message.
For source/build changes, run:

```bash
DISABLE_NOTIFIER=1 tars build --min
```

Read the full task log as well as the exit status. Several streams use error handlers that
can finish without failing the process. Confirm `builds/index.html`, `builds/translations.json`,
referenced JavaScript, embedded CSS and required assets exist. Search HTML for missing-translation
markers and unexpanded TARS/Handlebars tokens. Check all three PDF downloads are present.
`build-dev` alone does not exercise the public-repository gate or production inlining.

For interactive/style changes, serve output over HTTP and check:

- Initial English render and fresh loads with saved Russian/Ukrainian preferences.
- Full language cycle, translated attributes/title, root `lang` and PDF link suffixes.
- Light/dark toggle, persisted state and system preference behavior.
- Desktop and narrow layouts, including the 768px panel transition and print preview.
- Keyboard navigation, skip link, tooltip Enter/Space/Escape and outside-click closing.
- Email copying in an environment where the Clipboard API is available.
- Network failures for `translations.json` and console errors where relevant.

`.eslintrc`, `.eslintignore` and Prettier configuration express formatting expectations, but
linting is disabled in TARS and ESLint/Prettier are not declared local tools. If an appropriate
ESLint version is already available, target JavaScript explicitly (for example,
`eslint 'markup/**/*.js'`); an unqualified `npx eslint` may download an incompatible newer tool.
Do not describe linting as an enforced build gate.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Missing framework package | TARS-CLI installation and CLI invocation; local `npm ci` is only part of setup |
| BrowserSync never starts | Use `--lr`; check port override and port 3004 availability |
| Translation JSON changes but initial English HTML stays old in watch mode | Handlebars helper caches JSON; restart the dev process or use a fresh one-shot build |
| `[missing: ...]` / `[missing lang: ...]` in HTML | Data root/schema, key casing and translation-task ordering |
| Page remains hidden | `data-lang-ready`, localStorage availability, pre-init errors and language-switcher execution |
| Translation differs after switching | Runtime escapes HTML except `<br>`; initial `SafeString`/triple-brace rendering differs |
| Public-repository check reports old content | It reads indexed blobs, not unstaged edits; inspect staging intentionally |
| Successful command but missing output | Look for swallowed task errors and inspect artifacts directly |

See [operations and limitations](operations.md) for the precise boundaries of these behaviors.
