# Denis Belevtsov — resume

English | [Русский](README_RU.md)

Personal resume website for a Senior Magento Frontend Architect, Hyvä expert and performance
engineer. The site presents professional experience, skills, achievements and contact details
in English, Russian and Ukrainian.

## Features

- Language switching with a saved browser preference.
- Light and dark themes, with system preference detection and a manual toggle.
- Responsive resume layout and print styles.
- PDF downloads in all three languages.
- Interactive TOEFL score details and email copying.

## Technology

The site is generated as static HTML, CSS and JavaScript. A customized TARS 1.15.1 build system
uses Gulp 4, Handlebars, SCSS, PostCSS/Autoprefixer, Babel and Terser.
UI icons come from the `@phosphor-icons/core` npm package and are embedded as inline SVGs at build time.
Browser scripts use plain JavaScript and are concatenated from component files.
No application server or database is required to host the output.

## Local development

Use Node.js **20 or newer**. The deployment workflow uses Node 20.
Run the following commands from the repository root:

```bash
npm ci
npm install -g tars-cli --ignore-scripts
tars dev --lr
```

Install TARS-CLI only if it is not already available. It supplies builder dependencies that
are not included in the local package manifest. The project is already initialized.

Open [localhost:3004](http://localhost:3004). BrowserSync serves `dev/` and reloads the page
when source files change. Use `BROWSERSYNC_PORT` to override the port.

| Command | Result |
| --- | --- |
| `tars dev --lr` | Development build, file watchers and BrowserSync |
| `tars dev` | Development build and file watchers without BrowserSync |
| `tars build-dev` | One-shot development build in `dev/` |
| `tars build` | Production output in `builds/`, with ordinary CSS/JS references |
| `tars build --min` | Production output with minified CSS/JS; used by CI |
| `tars build --release` | Minified output with hashed CSS/JS filenames |
| `tars start check-public-repository` | Check Git-index contents for selected sensitive paths and credential patterns |

## Project structure

```text
markup/
  pages/index.html              Page composition
  components/                   Templates, component styles, browser scripts and content data
  static/
    scss/entry/main.scss        Stylesheet entry
    scss/vars.scss              Theme tokens and typography variables
    img/                        Content images
    misc/                       Files copied to the site root, including PDF downloads
tars/                           Build tasks, helpers and watchers
docs/                           Project documentation
tars-config.js                  Build workflows and paths
plugins-config.json             Plugin options
.github/workflows/deploy.yml    Build and deployment workflow
```

`dev/` and `builds/` are generated directories. Make changes in source files rather than editing
build output.

## Updating the resume

Edit content in `markup/components/<component>/data/data.js`. Localized fields contain `en`,
`ru` and `uk` values; shared strings can use a sole `default` value. The build generates
`translations.json` from these files. Initial HTML is rendered in English, and browser scripts
apply language changes. See the [localization guide](docs/i18n-pattern.md) for data and template contracts.

Update section markup and interactions in their component folders. Register component SCSS in
`markup/static/scss/entry/partials/_components.scss`; use `vars.scss` for theme values.
Component browser scripts are included automatically by the active concatenation workflow.
Use Phosphor regular icon names in the `PhosphorIcon` helper, for example
`{{PhosphorIcon iconName="linkedin-logo" className="header-icon" iconWidth="24" iconHeight="24"}}`.
Only referenced Phosphor icons are embedded; no manual SVG copies or browser icon library are needed.
Local SVGs are also supported through `markup/static/img/svg/` and the original `Icon` helper,
using the TARS symbols sprite injected into each page.

PDF resumes in `markup/static/misc/media/` are maintained separately from the website content.
Update each language version when changing the resume; the build copies PDFs without regenerating them.

## Verification

Run the production build before submitting source changes:

```bash
DISABLE_NOTIFIER=1 tars build --min
```

Review the task log and generated files in `builds/`. For UI changes, also check language
switching, saved preferences, theme controls, keyboard interactions, mobile layout, print preview
and PDF links in a browser.

There is no automated test suite; `npm test` is a failing placeholder. Linting is not enabled
as a build gate. The production build includes a public-repository check of **Git-index contents**;
it does not inspect unstaged or untracked changes. Detailed checks and troubleshooting are in
the [development guide](docs/development.md).

## Deployment

Pushes to `master` and manual workflow runs build the site with `tars build --min`, then publish
`builds/` to Cloudflare Pages and GitHub Pages. Cloudflare requires the repository secrets
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, plus the variable `CLOUDFLARE_PROJECT_NAME`.
See [operations](docs/operations.md) for deployment configuration and known limitations.

## Documentation

- [Documentation index](docs/README.md)
- [Architecture and build pipeline](docs/architecture.md)
- [Development and verification](docs/development.md)
- [Localization](docs/i18n-pattern.md)
- [Operations and limitations](docs/operations.md)
- [Agent contribution instructions](AGENTS.md)
