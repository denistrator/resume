# UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the resume's visual design with warmer colors, improved typography, modern spacing, and polished interaction states.

**Architecture:** All visual changes are concentrated in CSS custom properties (`vars.scss`) and a few component SCSS files. The warm amber palette uses cream/dark-brown with an amber accent. System fonts are kept but with improved sizing and spacing. The skewed section borders are removed in favor of clean separation. Links use color + hover underline.

**Tech Stack:** SCSS, CSS custom properties

---

## Design Decisions

| Aspect | Current | New |
|--------|---------|-----|
| **Light BG** | `#f0eef1` (pinkish gray) | `#fffbeb` (warm cream) |
| **Light text** | `#1a1a1a` (near black) | `#1c1917` (warm charcoal) |
| **Dark BG** | `#0a0a0a` (pure black) | `#1c1917` (warm dark) |
| **Dark text** | `#ffffff` (pure white) | `#fef3c7` (warm cream) |
| **Accent** | `#2563eb` (blue) | `#d97706` (amber) |
| **Accent hover** | `#1d4ed8` (dark blue) | `#b45309` (dark amber) |
| **Focus** | `#33b5e5` (cyan) | `#fbbf24` (bright amber) |
| **Border** | `#0a0a0a` / `#ffffff` | `#78716c` (warm gray) |
| **Font stack** | System sans | System sans (improved) |
| **Base size** | 17px | 16px |
| **Line height** | 1.6 | 1.65 |
| **Section border** | 2px skewed pseudo | Removed |
| **Links** | Inherit color + underline | Amber color + hover underline |

## Files to Modify

| File | Changes |
|------|---------|
| `markup/static/scss/vars.scss` | CSS custom properties, font stack, typography vars |
| `markup/static/scss/common/_typography.scss` | Font sizes, line heights, link styles |
| `markup/static/scss/mixins.scss` | Placeholder selector sizes |
| `markup/static/scss/common/_global.scss` | Focus ring styles |
| `markup/static/scss/common/_layout.scss` | Spacing adjustments |
| `markup/components/sections/sections.scss` | Remove skewed border, adjust spacing |
| `markup/components/sectionsItem/sectionsItem.scss` | Section title sizing |
| `markup/components/header/header.scss` | Header link hover states, name sizing |
| `markup/components/footer/footer.scss` | Remove skewed border, adjust styles |
| `markup/components/skills/skills.scss` | Skill separator color |
| `markup/components/languages/languages.scss` | TOEFL badge/tooltip colors |

---

### Task 1: Update Color Palette in vars.scss

**Files:**
- Modify: `markup/static/scss/vars.scss`

**Interfaces:**
- CSS custom properties `:root` (light) and `[data-theme="dark"]` blocks
- SCSS backward-compat variables

- [ ] **Step 1: Replace the CSS custom properties**

Edit `markup/static/scss/vars.scss`. Replace the `:root` and `[data-theme="dark"]` blocks:

```scss
:root {
    // Warm amber light theme
    --color-bg: #fffbeb;
    --color-text-primary: #1c1917;
    --color-text-secondary: #57534e;
    --color-text-muted: #78716c;
    --color-border: #a8a29e;
    --color-link: #d97706;
    --color-link-hover: #b45309;
    --color-focus: #fbbf24;
    --color-skip-bg: #fffbeb;
    --color-skip-text: #1c1917;
    --color-skip-outline: #1c1917;
    --color-scrollbar-track: #fef3c7;
    --color-scrollbar-thumb: #a8a29e;
    --color-skill-separator: #a8a29e;
    --color-section-border: #d6d3d1;
    --transition-theme: 200ms ease;
}

[data-theme="dark"] {
    // Warm amber dark theme
    --color-bg: #1c1917;
    --color-text-primary: #fef3c7;
    --color-text-secondary: #d6d3d1;
    --color-text-muted: #a8a29e;
    --color-border: #78716c;
    --color-link: #fbbf24;
    --color-link-hover: #fcd34d;
    --color-skip-bg: #292524;
    --color-skip-text: #fef3c7;
    --color-skip-outline: #fef3c7;
    --color-scrollbar-track: #292524;
    --color-scrollbar-thumb: #78716c;
    --color-skill-separator: #78716c;
    --color-section-border: #44403c;
}
```

- [ ] **Step 2: Update SCSS backward-compat variables**

Keep the existing `$text-primary`, `$text-secondary`, etc. as-is (they reference CSS vars). No changes needed.

- [ ] **Step 3: Verify build**

Run: `tars start build-dev 2>&1 | tail -3`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add markup/static/scss/vars.scss
git commit -m "feat(ui): update color palette to warm amber theme"
```

---

### Task 2: Improve Typography

**Files:**
- Modify: `markup/static/scss/vars.scss` (font vars)
- Modify: `markup/static/scss/common/_typography.scss`
- Modify: `markup/static/scss/mixins.scss`

**Interfaces:**
- `$font-family-base` — improved system font stack
- `$font-size-base` — 16px (from 17px)
- `$line-height-base` — 1.65 (from 1.6)
- Link styles — amber color, hover underline

- [ ] **Step 1: Update font variables in vars.scss**

Edit `markup/static/scss/vars.scss` — replace the typography section:

```scss
// typography
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
$font-size-base: 16px;
$line-height-base: (math.div(26.4, 16));
$heading-font-weight: 500;
$margin-bottom-p: 14px;
```

- [ ] **Step 2: Update typography SCSS**

Edit `markup/static/scss/common/_typography.scss` — update the defaults and link styles:

```scss
$font-size-base: 16px !default;
$line-height-base: 1.65 !default;
$font-family-base: $font-family-base !default;
$margin-bottom-p: 14px !default;

$link-decoration: none !default;
$link-decoration-hover: underline !default;
```

Update the link styles:

```scss
a {
    color: var(--color-link);
    text-decoration: $link-decoration;
    transition: color var(--transition-theme);

    &:hover {
        color: var(--color-link-hover);
        text-decoration: $link-decoration-hover;
    }

    @media print {
        text-decoration: underline;
    }
}
```

- [ ] **Step 3: Update placeholder selectors in mixins.scss**

Edit `markup/static/scss/mixins.scss` — update the section item sizes:

```scss
%section-list-item-title {
    margin-top: 0;
    margin-bottom: 4px;
    font-size: 17px;
    font-weight: 500;
}

%section-list-item-desc {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 15px;
    line-height: 1.65;
}
```

- [ ] **Step 4: Verify build**

Run: `tars start build-dev 2>&1 | tail -3`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add markup/static/scss/vars.scss markup/static/scss/common/_typography.scss markup/static/scss/mixins.scss
git commit -m "feat(ui): improve typography — better font stack, sizing, link styles"
```

---

### Task 3: Update Focus and Global Styles

**Files:**
- Modify: `markup/static/scss/common/_global.scss`

**Interfaces:**
- Focus ring — amber colored, slightly thicker
- Button cursor — already set

- [ ] **Step 1: Update focus styles**

Edit `markup/static/scss/common/_global.scss` — update the focus-visible rule:

```scss
a,
button {
    &:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 3px;
        border-radius: 2px;
    }
}
```

- [ ] **Step 2: Update skip-link focus**

In the same file, update the `.skip-link:focus` styles to use the new palette (the existing CSS var references will auto-adapt, but adjust padding/offset if needed):

```scss
.skip-link {
    &:focus {
        // ... existing positioning ...
        padding: 10px 20px;
        // colors use CSS vars, auto-adapt
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add markup/static/scss/common/_global.scss
git commit -m "feat(ui): update focus ring styles for warm amber palette"
```

---

### Task 4: Remove Skewed Section Borders

**Files:**
- Modify: `markup/components/sections/sections.scss`
- Modify: `markup/components/footer/footer.scss`

**Interfaces:**
- `.sections::before` — remove skewed border, keep as transparent spacer
- `.footer::before`, `.footer::after` — remove skewed borders

- [ ] **Step 1: Update sections.scss**

Edit `markup/components/sections/sections.scss`. Replace the `&:before` block:

```scss
&:before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    border: none;
    background-color: inherit;
    pointer-events: none;
    transition: background-color var(--transition-theme);

    @media print {
        display: none;
    }

    @media (max-width: 767px) {
        right: 0;
        left: 0;
    }

    @media (min-width: 768px) {
        right: 40px;
        left: 40px;
    }
}
```

- [ ] **Step 2: Update footer.scss**

Edit `markup/components/footer/footer.scss`. Remove the `&:before, &:after` skewed borders:

```scss
.footer {
    // ... existing layout styles ...

    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        left: 0;
        right: .5px;
        border: none;
        pointer-events: none;
        transition: background-color var(--transition-theme);
    }

    &:before {
        top: 0;
        bottom: 30%;
    }

    &:after {
        top: 30%;
        bottom: 0;
        left: 0;
    }
}
```

Or better — remove the pseudo-elements entirely if they're only used for the border:

```scss
.footer {
    // ... existing layout styles ...
    // Remove &:before and &:after entirely
}
```

- [ ] **Step 3: Commit**

```bash
git add markup/components/sections/sections.scss markup/components/footer/footer.scss
git commit -m "feat(ui): remove skewed section borders for cleaner layout"
```

---

### Task 5: Update Header and Component Styles

**Files:**
- Modify: `markup/components/header/header.scss`
- Modify: `markup/components/skills/skills.scss`
- Modify: `markup/components/languages/languages.scss`
- Modify: `markup/components/sectionsItem/sectionsItem.scss`

**Interfaces:**
- Header name — slightly smaller, better weight
- Header link hover — amber tinted
- Section title — adjusted size
- Skill separator — uses updated CSS var
- TOEFL badge — amber accent

- [ ] **Step 1: Update header.scss**

Edit `markup/components/header/header.scss`:

```scss
&-name {
    text-transform: uppercase;
    font-size: 34px;
    margin: 0;
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: 0.02em;
}

&-pos {
    margin: 4px 0 0;
    color: var(--color-text-secondary);
    transition: color var(--transition-theme);
    font-size: 15px;

    & + & {
        margin-top: -2px;
    }

    &:before {
        content: '//';
        color: var(--color-text-muted);
        margin-right: 4px;
    }
}
```

Update header link hover (around line 59-63):

```scss
&:hover {
    .header-link {
        color: var(--color-link-hover);
        background-color: rgba(217, 119, 6, 0.08);
    }
}
```

And the dark mode variant:

```scss
[data-theme="dark"] &:hover {
    .header-link {
        background-color: rgba(251, 191, 36, 0.08);
    }
}
```

- [ ] **Step 2: Update sectionsItem.scss**

Edit `markup/components/sectionsItem/sectionsItem.scss`:

```scss
.section {
    $a: 28px;
    padding-left: $a;
    padding-top: 12px;
    padding-bottom: 12px;
    page-break-inside: avoid;

    &-title {
        &:before {
            content: "0" counter(section-number) ". ";
            counter-increment: section-number;
            user-select: none;
            font-size: 70%;
            margin-left: -($a + 4px);
            color: var(--color-text-muted);
        }
    }

    .title {
        margin: 0;
        font-size: 26px;
        line-height: 1.25;
        letter-spacing: 0.01em;
    }

    .desc {
        font-size: 13px;
        color: var(--color-text-muted);
        transition: color var(--transition-theme);
        letter-spacing: 0.01em;
    }
}
```

- [ ] **Step 3: Update languages.scss TOEFL badge**

Edit `markup/components/languages/languages.scss` — update the badge to use amber:

```scss
&-badge {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-link);
    background: rgba(217, 119, 6, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
    transition: color var(--transition-theme), background-color var(--transition-theme);
    white-space: nowrap;

    [data-theme="dark"] & {
        background: rgba(251, 191, 36, 0.12);
    }
}
```

- [ ] **Step 4: Commit**

```bash
git add markup/components/header/header.scss markup/components/sectionsItem/sectionsItem.scss markup/components/languages/languages.scss
git commit -m "feat(ui): update header, section, and component styles for warm amber"
```

---

### Task 6: Verify and Polish

**Files:**
- Review all modified files

- [ ] **Step 1: Run production build**

Run: `tars build -m 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 2: Verify CSS output**

Run: `grep -c '#fffbeb' builds/static/css/main.css`
Expected: count > 0 (warm cream bg is in output)

Run: `grep -c '#d97706' builds/static/css/main.css`
Expected: count > 0 (amber accent is in output)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(ui): complete warm amber UI redesign"
```

---

## Summary of Changes

**Colors:**
- Light: cream bg (#fffbeb), warm charcoal text (#1c1917), amber accent (#d97706)
- Dark: warm dark bg (#1c1917), cream text (#fef3c7), bright amber accent (#fbbf24)
- Borders: warm gray (#a8a29e light, #78716c dark)
- Muted: warm stone (#78716c light, #a8a29e dark)

**Typography:**
- Base: 16px (from 17px), line-height 1.65 (from 1.6)
- Headings: weight 500 (from 400), slightly tighter sizing
- Links: amber color, no underline by default, underline on hover

**Layout:**
- Section skewed borders: removed
- Section number prefix: muted color
- Spacing: slightly increased

**Interactions:**
- Focus ring: amber (#fbbf24), 3px offset, rounded corners
- Header link hover: amber tinted background
- TOEFL badge: amber accent with subtle background
