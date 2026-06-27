# Languages Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Languages" aside section before Skills, listing 3 languages with an interactive TOEFL score tooltip containing a bar chart.

**Architecture:** A new `languages` component (HTML partial + SCSS + vanilla JS IIFE) following the existing section pattern. The TOEFL tooltip is CSS-styled with JS for click/toggle support (matching the project's existing interactive patterns). Data lives in a Handlebars data file. No external dependencies.

**Tech Stack:** Handlebars, SCSS, vanilla JavaScript (IIFE), CSS custom properties (dark mode support)

## Global Constraints

- Trilingual text: all user-visible strings must have `lang-en`, `lang-ru`, `lang-uk` spans
- Follow existing SCSS conventions: `&-child` BEM nesting, `@extend %section-list` where applicable
- JS files in component folders are auto-discovered by TARS and concatenated into `main.js` (except `data/data.js` and `_*.js` files)
- Section numbering is automatic via CSS counters on `.section-title::before` — inserting Languages before Skills means Languages=00, Skills=01, Experience=02, Achievements=03
- Use CSS custom properties for colors (supports dark mode via `[data-theme="dark]`)
- `@media print` rules needed to show inline score details (no tooltips in print)
- `@media (prefers-reduced-motion: reduce)` must disable transitions

## Design Improvement Suggestions

These ideas enhance the resume by leveraging the new languages section:

1. **Flag emojis** next to each language name (🇬🇧 🇺🇦 🇷🇺) for instant visual recognition — skimmability matters in a resume
2. **Proficiency badges** — small pill-shaped indicators (e.g., "Native", "B2") that use color coding: native = neutral, certified = accent color. Keeps the aside column scannable
3. **Tooltip micro-chart** — horizontal bar chart with labels, not just raw numbers. Each TOEFL section (Reading, Listening, Writing, Speaking) gets a labeled bar. This turns a tooltip into a mini-dashboard that shows strength/weakness at a glance
4. **Score-relative bar coloring** — bars above 4.0 use the accent color, bars below 3.5 use a muted warm color. Visual cue for areas of improvement without being explicit
5. **Print-optimized** — in print mode, show the full TOEFL breakdown inline (no tooltip needed), making the resume self-contained on paper
6. **Keyboard accessible** — tooltip toggles on Enter/Space, dismisses on Escape. Important for accessibility-conscious recruiters

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `markup/components/languages/languages.html` | HTML partial: section with language list and TOEFL tooltip |
| Create | `markup/components/languages/languages.scss` | Styles for language list, TOEFL badge, tooltip, bar chart |
| Create | `markup/components/languages/languages.js` | Tooltip toggle (click/hover, keyboard, dismiss) |
| Create | `markup/components/languages/data/data.js` | Language data (names, levels, TOEFL scores) |
| Modify | `markup/pages/index.html:17-18` | Include `{{> languages/languages}}` before skills |
| Modify | `markup/static/scss/entry/partials/_components.scss:8` | Add SCSS import |

---

### Task 1: Create Languages Data File

**Files:**
- Create: `markup/components/languages/data/data.js`

**Interfaces:**
- Produces: `languages` array consumed by `{{#each languages}}` in the HTML partial
- Each item: `{ name: {en, ru, uk}, level: {en, ru, uk}, flag, toefl?: { total, reading, listening, writing, speaking, testDate } }`

- [ ] **Step 1: Create the data file**

```js
const data = {
    languages: [
        {
            name: { en: 'English', ru: 'Английский', uk: 'Англійська' },
            level: { en: 'B2 — Upper Intermediate', ru: 'B2 — Выше среднего', uk: 'B2 — Вище середнього' },
            flag: '🇬🇧',
            toefl: {
                total: 90,
                maxTotal: 120,
                cefr: 'B2',
                testDate: '27.06.2026',
                sections: [
                    { name: { en: 'Reading', ru: 'Чтение', uk: 'Читання' }, score: 4.5, percent: 75 },
                    { name: { en: 'Listening', ru: 'Аудирование', uk: 'Аудіювання' }, score: 5.5, percent: 92 },
                    { name: { en: 'Speaking', ru: 'Говорение', uk: 'Говоріння' }, score: 4, percent: 67 },
                    { name: { en: 'Writing', ru: 'Письмо', uk: 'Письмо' }, score: 3, percent: 50 }
                ]
            }
        },
        {
            name: { en: 'Ukrainian', ru: 'Украинский', uk: 'Українська' },
            level: { en: 'Native', ru: 'Родной', uk: 'Рідна' },
            flag: '🇺🇦'
        },
        {
            name: { en: 'Russian', ru: 'Русский', uk: 'Російська' },
            level: { en: 'Native', ru: 'Родной', uk: 'Рідна' },
            flag: '🇷🇺'
        }
    ]
};
```

- [ ] **Step 2: Verify the file exists and has correct syntax**

Run: `node -e "require('./markup/components/languages/data/data.js')"` — this will fail because it's not a module, but verify no syntax errors by checking node parses it:
Run: `node --check markup/components/languages/data/data.js 2>&1 || node -e "const fs=require('fs'); const c=fs.readFileSync('markup/components/languages/data/data.js','utf8'); new Function(c); console.log('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add markup/components/languages/data/data.js
git commit -m "feat(languages): add language data with TOEFL scores"
```

---

### Task 2: Create Languages HTML Partial

**Files:**
- Create: `markup/components/languages/languages.html`

**Interfaces:**
- Consumes: `languages` array from `data/data.js` via Handlebars `{{#each}}`
- Produces: `.section.languages` with `.languages-list`, `.toefl-trigger`, `.toefl-tooltip` elements

- [ ] **Step 1: Create the HTML partial**

```html
<section class="section languages">
    <h2 class="title languages-title section-title">
        <span class="lang-en">Languages</span>
        <span class="lang-ru">Языки</span>
        <span class="lang-uk">Мови</span>
    </h2>

    <ul class="languages-list">
        {{#each languages}}
        <li class="languages-item">
            <span class="languages-flag">{{flag}}</span>
            <span class="languages-name">
                <span class="lang-en">{{name.en}}</span>
                <span class="lang-ru">{{name.ru}}</span>
                <span class="lang-uk">{{name.uk}}</span>
            </span>
            <span class="languages-level">
                <span class="lang-en">{{level.en}}</span>
                <span class="lang-ru">{{level.ru}}</span>
                <span class="lang-uk">{{level.uk}}</span>
            </span>
            {{#if toefl}}
            <span class="toefl">
                <span class="toefl-trigger" tabindex="0" role="button"
                      aria-expanded="false"
                      aria-label="TOEFL score details">
                    <span class="toefl-badge">TOEFL {{toefl.total}}/{{toefl.maxTotal}}</span>
                </span>
                <span class="toefl-tooltip" role="tooltip" aria-hidden="true">
                    <span class="toefl-tooltip-header">
                        <span class="lang-en">CEFR Level {{toefl.cefr}} and TOEFL iBT {{toefl.total}} / {{toefl.maxTotal}}</span>
                        <span class="lang-ru">Уровень CEFR {{toefl.cefr}} и TOEFL iBT {{toefl.total}} / {{toefl.maxTotal}}</span>
                        <span class="lang-uk">Рівень CEFR {{toefl.cefr}} та TOEFL iBT {{toefl.total}} / {{toefl.maxTotal}}</span>
                    </span>
                    <span class="toefl-tooltip-date">TOEFL (Magoosh) {{toefl.testDate}}</span>
                    <span class="toefl-chart">
                        {{#each toefl.sections}}
                        <span class="toefl-row">
                            <span class="toefl-row-label">
                                <span class="lang-en">{{name.en}}</span>
                                <span class="lang-ru">{{name.ru}}</span>
                                <span class="lang-uk">{{name.uk}}</span>
                            </span>
                            <span class="toefl-bar-track">
                                <span class="toefl-bar-fill" style="width: {{percent}}%"></span>
                            </span>
                            <span class="toefl-row-score">{{score}}</span>
                        </span>
                        {{/each}}
                    </span>
                </span>
            </span>
            {{/if}}
        </li>
        {{/each}}
    </ul>
</section>
```

Bar widths use pre-calculated `percent` values (score/6 * 100, since Magoosh diagnostic scores are 0-6 scale). The HTML uses `style="width: {{percent}}%"` which Handlebars renders directly.

- [ ] **Step 2: Commit**

```bash
git add markup/components/languages/languages.html markup/components/languages/data/data.js
git commit -m "feat(languages): add HTML partial with TOEFL tooltip structure"
```

---

### Task 3: Create Languages SCSS

**Files:**
- Create: `markup/components/languages/languages.scss`

**Interfaces:**
- Consumes: CSS custom properties from `vars.scss` (`--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-border`, `--color-link`, `--color-focus`, `--transition-theme`)
- Consumes: SCSS variables `$font-family-base`, `$font-size-base`
- Consumes: Mixins `visually-hidden`, placeholder `%nl`
- Produces: `.languages-*` and `.toefl-*` class styles

- [ ] **Step 1: Create the SCSS file**

```scss
.languages {
    &-list {
        @extend %nl;
    }

    &-item {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 4px 8px;
        margin-bottom: 8px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &-flag {
        font-size: 16px;
        line-height: 1;
    }

    &-name {
        font-weight: 500;
        font-size: 15px;
    }

    &-level {
        font-size: 13px;
        color: var(--color-text-muted);
        transition: color var(--transition-theme);
    }
}

.toefl {
    position: relative;
    display: inline-flex;

    &-trigger {
        display: inline-flex;
        cursor: pointer;

        &:focus-visible {
            outline: 2px solid var(--color-focus);
            outline-offset: 2px;
            border-radius: 3px;
        }
    }

    &-badge {
        font-size: 12px;
        font-weight: 500;
        color: var(--color-link);
        background: rgba(0, 0, 0, 0.04);
        padding: 1px 6px;
        border-radius: 3px;
        transition: color var(--transition-theme), background-color var(--transition-theme);
        white-space: nowrap;

        [data-theme="dark"] & {
            background: rgba(255, 255, 255, 0.08);
        }
    }

    &-tooltip {
        display: none;
        position: absolute;
        left: 0;
        top: calc(100% + 8px);
        z-index: 10;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 6px;
        padding: 12px 14px;
        min-width: 240px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: color var(--transition-theme), background-color var(--transition-theme), border-color var(--transition-theme);

        [data-theme="dark"] & {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        &::before {
            content: '';
            position: absolute;
            top: -6px;
            left: 12px;
            width: 10px;
            height: 10px;
            background: var(--color-bg);
            border-left: 1px solid var(--color-border);
            border-top: 1px solid var(--color-border);
            transform: rotate(45deg);
            transition: background-color var(--transition-theme), border-color var(--transition-theme);
        }

        &.is-open {
            display: block;
        }

        @media print {
            display: block;
            position: static;
            box-shadow: none;
            border: 1px solid #ccc;
            padding: 8px;
            margin-top: 8px;

            &::before {
                display: none;
            }
        }
    }

    &-tooltip-header {
        display: block;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
    }

    &-tooltip-date {
        display: block;
        font-size: 11px;
        color: var(--color-text-muted);
        margin-bottom: 10px;
        transition: color var(--transition-theme);
    }

    &-chart {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    &-row {
        display: grid;
        grid-template-columns: 80px 1fr 28px;
        align-items: center;
        gap: 8px;
        font-size: 12px;
    }

    &-row-label {
        color: var(--color-text-secondary);
        transition: color var(--transition-theme);
    }

    &-bar-track {
        height: 8px;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        overflow: hidden;

        [data-theme="dark"] & {
            background: rgba(255, 255, 255, 0.1);
        }
    }

    &-bar-fill {
        display: block;
        height: 100%;
        background: var(--color-link);
        border-radius: 4px;
        transition: width 0.4s ease;
    }

    &-row-score {
        text-align: right;
        font-weight: 500;
        font-variant-numeric: tabular-nums;
    }
}

@media (prefers-reduced-motion: reduce) {
    .languages-level,
    .toefl-badge,
    .toefl-tooltip,
    .toefl-tooltip::before,
    .toefl-bar-fill {
        transition: none;
    }
}

@media print {
    .toefl-trigger {
        display: none;
    }
}
```

- [ ] **Step 2: Verify SCSS compiles**

Run: `npx gulp build-dev 2>&1 | tail -5`
Expected: Build completes without SCSS errors.

- [ ] **Step 3: Commit**

```bash
git add markup/components/languages/languages.scss
git commit -m "feat(languages): add SCSS styles for language list and TOEFL tooltip"
```

---

### Task 4: Create Languages JavaScript

**Files:**
- Create: `markup/components/languages/languages.js`

**Interfaces:**
- Consumes: `.toefl-trigger` and `.toefl-tooltip` DOM elements
- Produces: Toggle `.is-open` class on tooltip; manages `aria-expanded` and `aria-hidden`

- [ ] **Step 1: Create the JS file**

```js
(() => {
    const triggers = document.querySelectorAll('.toefl-trigger');
    if (!triggers.length) return;

    function closeAll() {
        document.querySelectorAll('.toefl-tooltip.is-open').forEach((tip) => {
            tip.classList.remove('is-open');
            tip.setAttribute('aria-hidden', 'true');
        });
        document.querySelectorAll('.toefl-trigger[aria-expanded="true"]').forEach((tr) => {
            tr.setAttribute('aria-expanded', 'false');
        });
    }

    triggers.forEach((trigger) => {
        const tooltip = trigger.nextElementSibling;
        if (!tooltip || !tooltip.classList.contains('toefl-tooltip')) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = tooltip.classList.contains('is-open');
            closeAll();
            if (!isOpen) {
                tooltip.classList.add('is-open');
                tooltip.setAttribute('aria-hidden', 'false');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });

        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            }
            if (e.key === 'Escape') {
                closeAll();
            }
        });
    });

    document.addEventListener('click', closeAll);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAll();
    });
})();
```

- [ ] **Step 2: Verify no syntax errors**

Run: `node --check markup/components/languages/languages.js`
Expected: No output (success)

- [ ] **Step 3: Commit**

```bash
git add markup/components/languages/languages.js
git commit -m "feat(languages): add tooltip toggle JS with keyboard support"
```

---

### Task 5: Register Component in Build

**Files:**
- Modify: `markup/static/scss/entry/partials/_components.scss:8` — add import
- Modify: `markup/pages/index.html:17-18` — add partial include

**Interfaces:**
- Consumes: `languages/languages.html` partial, `languages/languages.scss` stylesheet
- Produces: Languages section rendered in the aside column before Skills

- [ ] **Step 1: Add SCSS import**

Edit `markup/static/scss/entry/partials/_components.scss`, add before the skills import:

```scss
@import 'components/languages/languages';
@import 'components/skills/skills';
```

- [ ] **Step 2: Add partial to page**

Edit `markup/pages/index.html`, line 17-18. Change:

```html
            <div class="sections-aside">
                {{> skills/skills}}
            </div>
```

To:

```html
            <div class="sections-aside">
                {{> languages/languages}}
                {{> skills/skills}}
            </div>
```

- [ ] **Step 3: Verify build succeeds**

Run: `npx gulp build-dev 2>&1 | tail -10`
Expected: Build completes without errors. The `dev/` folder should contain the updated HTML with the languages section.

- [ ] **Step 4: Verify section ordering**

Run: `grep -n 'section-title' dev/index.html`
Expected: Languages section appears before Skills in the output.

- [ ] **Step 5: Commit**

```bash
git add markup/static/scss/entry/partials/_components.scss markup/pages/index.html
git commit -m "feat(languages): register component and add to aside before skills"
```

---

### Task 6: Verify and Polish

**Files:**
- Review all created/modified files for consistency

- [ ] **Step 1: Run full build**

Run: `npx gulp build 2>&1 | tail -10`
Expected: Production build succeeds.

- [ ] **Step 2: Verify the built HTML**

Run: `grep -c 'languages' builds/index.html`
Expected: count > 0

Run: `grep 'toefl' builds/index.html`
Expected: TOEFL markup present in built output.

- [ ] **Step 3: Check for lint issues**

Run: `npx eslint markup/components/languages/ 2>&1`
Expected: No errors (warnings acceptable).

- [ ] **Step 4: Final commit with any fixes**

```bash
git add -A
git commit -m "feat(languages): polish and verify languages section"
```
