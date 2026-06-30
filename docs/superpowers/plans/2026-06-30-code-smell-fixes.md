# Code Smell Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all identified code smells, security issues, and deprecated patterns in the resume project.

**Architecture:** Minimal, focused changes — fix security issues first, then remove dead code, then clean up bad practices. Each task is independently committable.

**Tech Stack:** JavaScript (ES6+), SCSS, Handlebars, ESLint, TARS build system

## Global Constraints

- Node >=20
- TARS-CLI v1.15.1
- 4-space indentation, single quotes, semicolons required
- ESLint enforced
- No test suite — verification is running a build

---

## Task 1: Fix XSS in language-switcher.js (innerHTML)

**Files:**
- Modify: `markup/components/header/language-switcher.js:55`

**Interfaces:**
- Consumes: DOMPurify library
- Produces: Safe innerHTML assignment

- [ ] **Step 1: Install DOMPurify**

```bash
npm install dompurify
```

- [ ] **Step 2: Add DOMPurify import and sanitize innerHTML**

In `markup/components/header/language-switcher.js`, add import at top of IIFE and sanitize:

```javascript
import DOMPurify from 'dompurify';
```

Change line 55 from:
```javascript
element.innerHTML = value;
```
to:
```javascript
element.innerHTML = DOMPurify.sanitize(value);
```

- [ ] **Step 3: Run ESLint to verify**

```bash
npx eslint markup/components/header/language-switcher.js
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add markup/components/header/language-switcher.js package.json package-lock.json
git commit -m "fix(security): sanitize translation innerHTML with DOMPurify"
```

---

## Task 2: Sanitize translations on load for Handlebars triple-stache

**Files:**
- Modify: `markup/components/header/language-switcher.js` (loadTranslations function)

**Interfaces:**
- Consumes: DOMPurify (from Task 1)
- Produces: Sanitized translation data

- [ ] **Step 1: Sanitize translation values after loading**

In `markup/components/header/language-switcher.js`, modify `loadTranslations()` to sanitize all string values:

```javascript
function sanitizeStrings(obj) {
    if (typeof obj === 'string') {
        return DOMPurify.sanitize(obj);
    }
    if (Array.isArray(obj)) {
        return obj.map(sanitizeStrings);
    }
    if (obj && typeof obj === 'object') {
        const result = {};
        for (const key of Object.keys(obj)) {
            result[key] = sanitizeStrings(obj[key]);
        }
        return result;
    }
    return obj;
}

async function loadTranslations() {
    if (translations) {
        return translations;
    }

    try {
        const response = await fetch('translations.json');
        const raw = await response.json();
        translations = sanitizeStrings(raw);
        return translations;
    } catch (error) {
        console.error('Failed to load translations:', error);
        return null;
    }
}
```

- [ ] **Step 2: Run ESLint to verify**

```bash
npx eslint markup/components/header/language-switcher.js
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add markup/components/header/language-switcher.js
git commit -m "fix(security): sanitize translation data on load"
```

---

## Task 3: Replace normalize.css with modern-normalize

**Files:**
- Replace: `markup/static/scss/normalize.scss`

**Interfaces:**
- Consumes: modern-normalize package
- Produces: Updated normalize import

- [ ] **Step 1: Install modern-normalize**

```bash
npm install modern-normalize
```

- [ ] **Step 2: Replace normalize.scss content**

Replace `markup/static/scss/normalize.scss` with:

```scss
@use "../../node_modules/modern-normalize/modern-normalize" as *;
```

- [ ] **Step 3: Run build to verify**

```bash
npx gulp build-dev
```

Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add markup/static/scss/normalize.scss package.json package-lock.json
git commit -m "chore(deps): replace normalize.css v8 with modern-normalize"
```

---

## Task 4: Remove IE polyfills and dead IE files

**Files:**
- Delete: `markup/static/js/separate-js/html5shiv-3.7.2.min.js`
- Delete: `markup/static/js/separate-js/svg4everybody.min.js`
- Delete: `markup/static/scss/entry/ie/main_ie8.scss`
- Delete: `markup/static/scss/entry/ie/main_ie9.scss`
- Delete: `markup/static/scss/entry/partials/_components-ie8.scss`
- Delete: `markup/static/scss/entry/partials/_components-ie9.scss`
- Delete: `markup/static/scss/entry/built-in-partials/_service-ie8.scss`

- [ ] **Step 1: Delete IE polyfill JS files**

```bash
rm markup/static/js/separate-js/html5shiv-3.7.2.min.js
rm markup/static/js/separate-js/svg4everybody.min.js
```

- [ ] **Step 2: Delete IE SCSS files**

```bash
rm -rf markup/static/scss/entry/ie/
rm markup/static/scss/entry/partials/_components-ie8.scss
rm markup/static/scss/entry/partials/_components-ie9.scss
rm markup/static/scss/entry/built-in-partials/_service-ie8.scss
```

- [ ] **Step 3: Check if any imports reference deleted files**

```bash
grep -r "ie8\|ie9\|html5shiv\|svg4everybody" markup/ tars/ || echo "No references found"
```

Expected: No references found (or remove them)

- [ ] **Step 4: Run build to verify**

```bash
npx gulp build-dev
```

Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove dead IE polyfills and SCSS files"
```

---

## Task 5: Modernize ESLint config

**Files:**
- Modify: `.eslintrc`

**Interfaces:**
- Consumes: ESLint
- Produces: Updated linting config

- [ ] **Step 1: Update deprecated rules in .eslintrc**

Replace the rules section with updated equivalents:

```json
{
    "root": true,
    "env": {
        "node": true,
        "browser": true,
        "commonjs": true,
        "jquery": true,
        "es6": true
    },
    "globals": {
        "tars": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2022,
        "sourceType": "module"
    },
    "rules": {
        "indent": [2, 4, {"SwitchCase": 1}],
        "brace-style": [2, "1tbs"],
        "camelcase": [2, { "properties": "always" }],
        "comma-spacing": [2, {"before": false, "after": true}],
        "comma-style": [2, "last"],
        "consistent-return": 0,
        "curly": [2, "all"],
        "default-case": 2,
        "dot-notation": [2, { "allowKeywords": true }],
        "eol-last": 2,
        "eqeqeq": [2, "smart"],
        "guard-for-in": 2,
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "new-cap": 2,
        "new-parens": 2,
        "no-alert": 2,
        "no-array-constructor": 2,
        "no-caller": 2,
        "no-debugger": 0,
        "no-delete-var": 2,
        "no-eval": 0,
        "no-extra-bind": 2,
        "no-fallthrough": 2,
        "no-floating-decimal": 2,
        "no-implied-eval": 2,
        "no-invalid-this": 1,
        "no-iterator": 2,
        "no-label-var": 2,
        "no-labels": 2,
        "no-lone-blocks": 2,
        "no-loop-func": 1,
        "no-mixed-spaces-and-tabs": [2, false],
        "no-multi-spaces": 2,
        "no-multi-str": 2,
        "no-global-assign": 2,
        "no-nested-ternary": 2,
        "no-new-func": 2,
        "no-new-object": 2,
        "no-new-wrappers": 2,
        "no-octal": 2,
        "no-octal-escape": 2,
        "no-proto": 2,
        "no-redeclare": 2,
        "no-return-assign": 2,
        "no-script-url": 2,
        "no-sequences": 2,
        "no-shadow": 2,
        "no-shadow-restricted-names": 2,
        "func-call-spacing": 2,
        "no-trailing-spaces": 2,
        "no-undef": 2,
        "no-undef-init": 2,
        "no-undefined": 2,
        "no-unused-expressions": 2,
        "no-unused-vars": [1, {"vars": "all", "args": "after-used"}],
        "no-use-before-define": 2,
        "no-with": 2,
        "quotes": [2, "single"],
        "radix": 2,
        "semi": [2, "always"],
        "semi-spacing": [2, {"before": false, "after": true}],
        "keyword-spacing": 2,
        "space-before-blocks": [2, "always"],
        "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}],
        "space-infix-ops": 2,
        "space-unary-ops": [2, {"words": true, "nonwords": false}],
        "spaced-comment": [2, "always", { "exceptions": ["-"]}],
        "strict": 0,
        "wrap-iife": [2, "inside"],
        "yoda": [2, "never"],
        "no-mixed-requires": 2,
        "no-new-require": 2,
        "no-path-concat": 2,
        "handle-callback-err": [2, "err"],
        "arrow-spacing": [2, {"before": true, "after": true}],
        "constructor-super": 2,
        "no-confusing-arrow": 2,
        "no-class-assign": 2,
        "no-const-assign": 2,
        "no-dupe-class-members": 2,
        "no-this-before-super": 2,
        "prefer-arrow-callback": 0,
        "prefer-template": 0,
        "require-yield": 2,
        "no-var": 1
    }
}
```

- [ ] **Step 2: Run ESLint to verify**

```bash
npx eslint markup/
```

Expected: No new errors

- [ ] **Step 3: Commit**

```bash
git add .eslintrc
git commit -m "chore: modernize ESLint config — update deprecated rules"
```

---

## Task 6: Rename package.json

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: npm
- Produces: Updated package metadata

- [ ] **Step 1: Update package.json name and description**

```json
{
  "name": "denis-resume",
  "version": "1.0.0",
  "description": "Senior Magento 2 Frontend Developer resume",
  "main": "gulpfile.js",
  "directories": {},
  "engines": {
    "node": ">=20"
  },
  "dependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "autoprefixer": "^10.5.2",
    "comment-json": "^5.0.0",
    "dompurify": "^3.0.0"
  },
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-htmlmin": "^3.0.0",
    "gulp-inline-source": "^3.0.0",
    "gulp-webp": "^3.0.0",
    "vinyl-ftp": "^0.6.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Denis Belevtsov",
  "license": "ISC"
}
```

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore: rename package to denis-resume, add author"
```

---

## Task 7: Document window.__pendingLang contract with JSDoc

**Files:**
- Modify: `markup/pages/index.html:8-18` (inline script)
- Modify: `markup/components/header/language-switcher.js:116`

**Interfaces:**
- Consumes: data-lang-ready attribute
- Produces: Documented cross-script contract

- [ ] **Step 1: Add JSDoc comment to inline script in index.html**

In `markup/pages/index.html`, add comment above the inline script:

```html
    <script>
        /**
         * Language pre-initialization script.
         * Sets data-lang-ready attribute when no translation needed (English default),
         * or stores pending language in data-pending-lang attribute for language-switcher.js to process.
         * Contract: language-switcher.js reads data-pending-lang on init.
         */
        (function() {
            const KEY = 'preferred-lang';
            const saved = localStorage.getItem(KEY);
            if (!saved || saved === 'en') {
                document.documentElement.setAttribute('data-lang-ready', '');
            } else {
                document.documentElement.setAttribute('data-pending-lang', saved);
            }
        })();
    </script>
```

- [ ] **Step 2: Update language-switcher.js to read data attribute**

In `markup/components/header/language-switcher.js`, change line 116 from:

```javascript
const savedLang = window.__pendingLang || localStorage.getItem(STORAGE_KEY);
```

to:

```javascript
/** @type {string|null} Language set by inline pre-init script via data-pending-lang attribute */
const savedLang = document.documentElement.getAttribute('data-pending-lang') || localStorage.getItem(STORAGE_KEY);
```

- [ ] **Step 3: Run ESLint to verify**

```bash
npx eslint markup/components/header/language-switcher.js
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add markup/pages/index.html markup/components/header/language-switcher.js
git commit -m "fix: replace window.__pendingLang with data attribute, add JSDoc"
```

---

## Task 8: Remove unused SCSS variables

**Files:**
- Modify: `markup/static/scss/vars.scss:49-55`

**Interfaces:**
- Consumes: SCSS
- Produces: Cleaned vars.scss

- [ ] **Step 1: Delete unused SCSS variables**

Remove lines 48-55 from `markup/static/scss/vars.scss`:

```scss
// === SCSS Variables (non-visual, backward compat) ===
$text-primary: var(--color-text-primary);
$text-secondary: var(--color-text-secondary);
$text-muted: var(--color-text-muted);
$light: var(--color-bg);
$dark: var(--color-border);
$link-color: var(--color-link);
$link-color-hover: var(--color-link-hover);
```

- [ ] **Step 2: Verify no references exist**

```bash
grep -r '\$text-primary\|\$text-secondary\|\$text-muted\|\$light\|\$dark\|\$link-color\|\$link-color-hover' markup/static/scss/ --include="*.scss" | grep -v "vars.scss" || echo "No references found"
```

Expected: No references found

- [ ] **Step 3: Run build to verify**

```bash
npx gulp build-dev
```

Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add markup/static/scss/vars.scss
git commit -m "chore: remove unused SCSS variables from vars.scss"
```

---

## Task 9: Add clipboard error fallback

**Files:**
- Modify: `markup/components/header/copy-email.js:10-18`

**Interfaces:**
- Consumes: navigator.clipboard API
- Produces: Error handling with visual feedback

- [ ] **Step 1: Add .catch() handler to clipboard write**

In `markup/components/header/copy-email.js`, update the click handler:

```javascript
btn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
        btn.classList.add('copied');
        btn.setAttribute('aria-label', 'Email copied!');
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.setAttribute('aria-label', 'Copy email to clipboard');
        }, 2000);
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            btn.classList.add('copied');
            btn.setAttribute('aria-label', 'Email copied!');
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.setAttribute('aria-label', 'Copy email to clipboard');
            }, 2000);
        } catch (e) {
            btn.setAttribute('aria-label', 'Copy failed — select manually');
        }
        document.body.removeChild(textArea);
    });
});
```

- [ ] **Step 2: Run ESLint to verify**

```bash
npx eslint markup/components/header/copy-email.js
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add markup/components/header/copy-email.js
git commit -m "fix(a11y): add clipboard error fallback for copy-email button"
```

---

## Task 10: Fix theme toggle initial aria state

**Files:**
- Modify: `markup/components/header/reading-mode-toggle.js:7-8`

**Interfaces:**
- Consumes: localStorage theme value
- Produces: Correct initial aria-pressed state

- [ ] **Step 1: Read stored theme for initial aria state**

In `markup/components/header/reading-mode-toggle.js`, update the initial state:

```javascript
const currentTheme = html.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
toggle.setAttribute('aria-pressed', String(currentTheme === 'dark'));
```

- [ ] **Step 2: Run ESLint to verify**

```bash
npx eslint markup/components/header/reading-mode-toggle.js
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add markup/components/header/reading-mode-toggle.js
git commit -m "fix(a11y): set correct initial aria-pressed for theme toggle"
```

---

## Task 11: Document dual i18n pattern

**Files:**
- Create: `docs/i18n-pattern.md`

**Interfaces:**
- Consumes: N/A
- Produces: Documentation file

- [ ] **Step 1: Create i18n documentation**

Create `docs/i18n-pattern.md`:

```markdown
# i18n Pattern

This project uses a dual i18n system:

## Build-Time (Handlebars `{{t}}` helpers)

- Renders initial page content in the user's language
- Used in HTML templates: `{{t 'header.name'}}`
- Data comes from `translations.json` at build time
- Ensures no flash of wrong language on initial load

## Runtime (data-i18n attributes)

- Updates content when user switches language
- Used in HTML templates: `data-i18n="header.name"`
- `language-switcher.js` reads these attributes and updates DOM
- Applies after `translations.json` is fetched

## When to Use Each

| Use Case | System |
|----------|--------|
| Static content that appears on page load | `{{t}}` (build-time) |
| Content that updates on language switch | `data-i18n` (runtime) |
| Attributes (aria-label, placeholder, etc.) | `data-i18n-attr` (runtime) |

## Translation Data Structure

```json
{
    "en": {
        "header": {
            "name": "Denis",
            "surname": "Belevtsov"
        }
    },
    "ru": {
        "header": {
            "name": "Денис",
            "surname": "Белевцов"
        }
    }
}
```
```

- [ ] **Step 2: Commit**

```bash
git add docs/i18n-pattern.md
git commit -m "docs: document dual i18n pattern (build-time + runtime)"
```

---

## Task 12: Make PDF link href more robust

**Files:**
- Modify: `markup/components/header/language-switcher.js:85-89`

**Interfaces:**
- Consumes: language code
- Produces: Constructed PDF href

- [ ] **Step 1: Replace regex with path construction**

In `markup/components/header/language-switcher.js`, replace the PDF link update logic:

```javascript
const pdfLink = document.querySelector('a[href*="Resume-"]');

if (pdfLink) {
    const basePath = pdfLink.href.substring(0, pdfLink.href.lastIndexOf('/') + 1);
    const baseName = pdfLink.href.substring(pdfLink.href.lastIndexOf('/') + 1).replace(/Resume-\w+\.pdf/, '');
    pdfLink.href = `${basePath}Resume-${lang}.pdf`;
}
```

- [ ] **Step 2: Run ESLint to verify**

```bash
npx eslint markup/components/header/language-switcher.js
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add markup/components/header/language-switcher.js
git commit -m "fix: make PDF link href construction more robust"
```

---

## Verification

After all tasks are complete:

```bash
npx gulp build-dev
npx eslint markup/
```

Expected: Build succeeds, no ESLint errors.

## Summary

| Task | Severity | Issue | Fix |
|------|----------|-------|-----|
| 1 | Critical | innerHTML XSS | DOMPurify sanitize |
| 2 | Critical | Triple-stache XSS | Sanitize on load |
| 3 | High | normalize.css v8 | Replace with modern-normalize |
| 4 | High | IE polyfills | Delete all |
| 5 | High | Deprecated ESLint rules | Modernize config |
| 6 | Medium | Package name placeholder | Rename |
| 7 | Medium | window.__pendingLang | Data attribute + JSDoc |
| 8 | Medium | Unused SCSS vars | Delete |
| 9 | Medium | Clipboard error | Add fallback |
| 10 | Medium | Theme toggle aria | Fix initial state |
| 11 | Low | Undocumented i18n | Create docs |
| 12 | Low | PDF link regex | Make more robust |
