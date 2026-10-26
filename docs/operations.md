# Operations and limitations

## Deployment

`.github/workflows/deploy.yml` runs on pushes to `master` and manual dispatch.
Despite its GitHub Pages title, the single deploy job publishes to both Cloudflare Pages and
GitHub Pages, in sequence:

1. Check out the repository and set up Node 20.
2. Install local dependencies with `npm ci`.
3. Install global TARS-CLI with `npm install -g tars-cli --ignore-scripts`.
4. Run `tars build --min`.
5. Deploy `builds/` through `cloudflare/wrangler-action@v4`.
6. Configure GitHub Pages, upload `builds/` and deploy the uploaded artifact.

Cloudflare requires repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`,
and variable `CLOUDFLARE_PROJECT_NAME`. GitHub deployment uses the workflow's token, Pages
permissions and `github-pages` environment. No credential values belong in the repository.
The `pages` concurrency group cancels older in-progress runs.
A Cloudflare-step failure prevents the later GitHub Pages steps; the two publications are not
transactional. Do not infer live deployment success from a local build.

`tars/user-tasks/deploy-ftp.js` separately registers `deploy`. It uploads newer files from
`builds/**` to `/public_html`, using host/user/password CLI flags. It is not in the build pipeline
or CI workflow. Treat it as a legacy explicit publishing option, not a verification command.

`.travis.yml` and `appveyor.yml` retain upstream-style Node 16, initialization and IE build
configuration. They differ from the current Node >=20 package requirement and GitHub deployment
workflow. Their presence alone does not establish active CI coverage or IE support.

## Public-repository gate

`tars/user-tasks/check-public-repository.js` calls
`tars/user-tasks/helpers/public-repository-checker.js`. Production `main:build` runs this after
its staging build and before creating production output. It can also run independently:

```bash
tars start check-public-repository
```

The checker enumerates Git index entries and reads their indexed blobs with Git commands.
It detects selected forbidden paths (environment/credential files, keys/certificates, dependency
and IDE/worktree/output directories, database dumps), unmerged index entries and selected token
or credential-assignment patterns. Binary-content inspection is skipped, but path rules still apply.
Messages include paths and rule names rather than matched credential values.

This is a heuristic check of indexed content. It does not scan Git history, unstaged edits,
untracked files, generated deployment output, dependency vulnerabilities or arbitrary secret
formats. Passing it is not a security audit. Intentional edits must be staged by the contributor's
normal workflow before this gate can assess them; do not stage unrelated files or bypass findings.

## Observed maintenance risks

These findings describe the checked-in source; they are not runtime fixes or claims of exploited
vulnerabilities. The documentation change does not alter application behavior.

| Area | Evidence and implication |
| --- | --- |
| Dependency reproducibility | Local dependencies are locked, but CI installs unpinned global TARS-CLI. Its toolchain packages are outside the local lockfile and may change independently. |
| Build error propagation | Translation generation catches errors and calls `done()` without an error; several stream tasks report errors through plumber/notifier and may continue. Inspect logs and artifacts, not only exit status. |
| Translation hot reload | The Handlebars helper caches JSON at module scope; watchers regenerate the file without invalidating that cache. Fresh one-shot builds avoid that stale process state. |
| Initial visibility | A head style hides the root until JS sets `data-lang-ready`. JavaScript-disabled loads stay hidden; unguarded localStorage reads or missing runtime controls can also interrupt readiness. |
| Translation consistency | Extraction omits falsy values and has no completeness/schema validation. Missing values can leave previous-language DOM text; array reordering requires matching index keys. |
| Employment translation hooks | Five date attribute paths reference scalar dates absent from generated translations. Runtime skips those updates and keeps the initial datetime values. The company translation hook wraps the initially rendered company plus location, so switching language replaces that combined content with company alone. |
| HTML handling | Build helpers return trusted HTML; runtime sanitization permits only line breaks. Markup can differ between initial rendering and switched content. Data files themselves execute during builds. |
| Clipboard feedback | Copy-email has no rejection handler and resets feedback to hardcoded English. Its button also has `tabindex="-1"`, so ordinary Tab navigation skips it. |
| Theme accessibility state | The pre-init system-theme listener changes the root attribute; the toggle's `aria-pressed` is initialized and updated on click, not synchronized by that listener. |
| PDF drift | Download PDFs are maintained independently of HTML/data. A successful build does not establish that PDF content matches the page. |
| Custom task paths | `inline-source`, `minify-html` and FTP tasks hardcode `./builds`; enabling build versioning or changing output paths requires reviewing those tasks. |
| Verification coverage | No automated test suite, enforced lint gate or browser CI is configured. Build success cannot establish interaction, accessibility, print or cross-browser correctness. |

Prioritize build error propagation and reliable visibility/language initialization when doing
future reliability work. Any behavioral fix should include verification for the affected failure
case. Toolchain modernization and replacement of upstream documentation are separate scoped work.

## Verification recorded for this documentation review

On 2026-10-26, `DISABLE_NOTIFIER=1 tars build --min` completed with exit code 0 using
Node 22.20.0. The public-repository check passed. The log contained Node deprecation warnings
for `fs.Stats` and `util._extend`, with no reported task errors.
Generated HTML contained embedded CSS, no unresolved template/translation markers, and
referenced existing local assets. All three language PDFs were present.

An inspection of 129 distinct runtime translation paths found 124 available in all three
languages. The five absent paths are `employment.items.0.startDate`,
`employment.items.1.startDate`, `employment.items.1.endDate`,
`employment.items.2.startDate` and `employment.items.2.endDate`; they are the scalar-date hooks
described above. No interactive browser or print verification was performed for this
documentation-only change.
