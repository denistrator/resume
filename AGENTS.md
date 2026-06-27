# AGENTS.md

## Project overview

TARS-based frontend project (v1.15.1) for building a resume. Gulp 4 orchestrates the build; Webpack bundles JS; SCSS preprocesses CSS; Handlebars compiles HTML templates. There is **no test suite** — verification is running a build.

## Key commands

```bash
npm install                    # install deps (Node >=20)
tars init                      # first-time setup: creates file structure from tars-config
tars dev                       # dev build + watchers + livereload
tars build                     # production build (non-minified by default)
tars build --min               # production build, minified
tars build --release           # production build, minified + hashed filenames
tars build-dev                 # dev build without watchers
```

Requires TARS-CLI installed globally (`npm i -g tars-cli`). Without it, use `npx gulp` as a fallback (some CLI features unavailable).

## Project structure

```
markup/                        # ALL source code lives here
  pages/                       # Handlebars page templates (entry: index.html)
  components/                  # Handlebars partials (header, skills, experience, etc.)
  static/
    scss/                      # SCSS sources (entries: common.scss, entry/main.scss)
    js/                        # JS sources (entry: main.js)
    img/                       # Images
    fonts/                     # Fonts
    misc/                      # Misc static files
tars/                          # TARS framework internals (tasks, watchers, helpers)
tars-config.js                 # Central build config (templater, preprocessor, paths)
plugins-config.json            # Plugin-specific config (browserSync, htmlmin, etc.)
```

Build output goes to `dev/` (development) or `builds/` (production). Never edit files in these directories — they are regenerated.

## The `tars` global

`tars` is a global variable injected by `tars/tars.js`. It is available everywhere — in gulpfile, webpack config, and tasks. It exposes:
- `tars.config` — merged tars-config.js values
- `tars.flags` — CLI flags (`--min`, `--release`, `--ie8`, etc.)
- `tars.options` — computed options (watch state, build paths)
- `tars.isDevMode` — boolean
- `tars.packages.gulp` — the gulp instance
- `tars.require()` — resolves packages from TARS-CLI or local node_modules

The `.eslintrc` declares `tars` as a global so ESLint won't flag it.

## Handlebars templates

Pages use `{{> component-name/partial}}` to include components. TARS special tokens:
- `%=symbols=%` — SVG symbol sprite injection point
- `%=static=%` — resolves to static folder path
- `%=hash=%` — file hash (release builds)
- `%=min=%` — min suffix (minified builds)

## Current build config highlights (tars-config.js)

- Templater: **handlebars**
- CSS preprocessor: **scss** (workflow: `manual`)
- JS workflow: **concat** via Webpack (not module-based)
- Babel: enabled (`@babel/preset-env`)
- `removeConsoleLog: true` in production builds
- SVG symbols: active, inject loading mode
- Sourcemaps: inline in dev mode

## Code style

- 4-space indentation, single quotes, semicolons required
- camelCase for all properties
- ESLint enforced (`.eslintrc`) — run `npx eslint markup/` to check
- Prettier configured (`prettier.config.js`): single quotes, trailing commas, 110 char width

## SCSS architecture

Two separate entry points — do not confuse them:

- `markup/static/scss/common.scss` — global styles (layout, typography, vars, mixins). Rarely touched when adding components.
- `markup/static/scss/entry/main.scss` — the real build entry. Imports normalize, libraries, plugins, then component styles, then etc.
- **Component styles** are registered in `markup/static/scss/entry/partials/_components.scss` — add new component imports there, not in `common.scss`.

## Key conventions

- Components live in `markup/components/<name>/` with an `.html` partial, optional `.scss`/`.js`, and a `data/` folder. See `markup/components/_template/` for the scaffold.
- `markup/components/default_component_scheme.json` defines the template used by `tars init` when creating new components.
- JS entry point is `markup/static/js/main.js` (currently empty — JS is concat workflow via Webpack).
- Babel ignores: `babel_ignore_*.js`, `framework/`, `libraries/`, `plugins/`, `separate-js/`
- `plugins-config.json` uses JSON with comments (non-standard) — parse carefully if editing programmatically
- BrowserSync dev server runs on port 3004 (configured in `plugins-config.json`)
