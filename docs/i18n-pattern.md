# Localization

## Sources and generated output

The site supports `en`, `ru` and `uk`. English is rendered into the initial HTML.
The build does not detect a visitor's language and does not emit separate localized pages.
Browser JavaScript applies a stored preference or a language-toggle selection after load.

The source of truth is `markup/components/<folder>/data/data.js`:

```js
const data = {
    header: {
        name: {
            en: 'Denis',
            ru: 'Денис',
            uk: 'Денис'
        },
        title1: {
            default: 'Senior Magento Frontend Architect | Hyvä Expert | Performance Engineer'
        }
    }
};
```

These are executable JS declarations consumed by the builder; do not convert them to JSON or
`module.exports` without changing the loaders. The top-level key must match the folder exactly.
For example, `soft-skills/data/data.js` uses `'soft-skills'` as its data root.

`tars/user-tasks/build-translations.js` scans non-underscore component directories, evaluates each
`data/data.js`, expands objects whose only key is `default` into all three languages and extracts
objects whose keys consist solely of supported language codes. It writes `dev/translations.json`.
Production copying places that file at `builds/translations.json`.
Never edit those generated files directly.

The generated schema is language-first, with camelCase component namespaces and numeric object
keys for array positions:

```json
{
    "en": {
        "header": { "name": "Denis" },
        "softSkills": { "title": "Soft Skills" },
        "experience": { "items": { "0": { "title": "Example" } } }
    },
    "ru": {},
    "uk": {}
}
```

This abbreviated example illustrates paths, not a complete translation file.
The generator only includes truthy values: empty strings are omitted. It does not validate
locale completeness, so supply all three languages for each localized field.
Ordinary scalar values remain mock data and are not automatically runtime translations.
Do not mix `default` and locale keys in one leaf; the shorthand requires `default` to be its sole key.

## Initial Handlebars render

`tars/tasks/html/helpers/handlebars-helpers.js` merges built-in helpers with
`tars/user-tasks/html/helpers/handlebars-helpers.js`.
The custom helpers read generated JSON and default to English:

| Helper | Behavior |
| --- | --- |
| `{{t 'header.name'}}` | Resolves a dotted path for the current build-time language |
| `{{langCode}}` | Returns the helper's current language |
| `{{setLang 'uk'}}` | Changes helper language state within the build process |
| `{{langSelect en='...' default='...'}}` | Chooses a supplied value using that language |

The current page does not call `setLang`; it hardcodes `<html lang="en">`.
Helpers return `Handlebars.SafeString`, including visible `[missing: key]` and
`[missing lang: language]` markers for unresolved translations.
Some list templates render `.en` fields directly and use triple braces for text containing markup.
Those paths consume mock data rather than the `t` helper.

Pair initial output with runtime keys:

```handlebars
<span data-i18n="header.name">{{t 'header.name'}}</span>
<button data-i18n-attr="aria-label:header.langAria" aria-label="{{t 'header.langAria'}}">
    <span>en</span>
</button>
```

`data-i18n-attr` supports semicolon-separated `attribute:key` pairs. Array items use dotted
numeric positions such as `experience.items.0.title`; templates derive these with `{{@index}}`.
If array structure changes, keep nested/parent indices aligned with the generated JSON.

## Browser initialization and switching

1. `before-page-content/language-pre-init.html` inserts a rule hiding the root until
   `data-lang-ready` is set. It reads localStorage key `preferred-lang`.
2. With no saved preference or with English, it immediately marks the page ready.
   Otherwise it stores the value in `data-pending-lang`.
3. `header/language-switcher.js` initializes from that pending value or localStorage.
   Valid saved non-English values trigger a fetch of relative `translations.json`.
4. The script sanitizes and caches the response for the page session, applies a supported
   saved language if available, then reveals the page. A failed fetch normally reveals English.
5. Clicking `.lang-toggle` cycles `en → ru → uk → en`; translations load on first need.

Applying a language updates `[data-i18n]` innerHTML, declared attributes, the root `lang`,
`preferred-lang`, the toggle text and the first link containing `Resume-`.
Its PDF filename is rewritten to `Resume-<language>.pdf` while preserving the prefix/path.
The three source PDFs must therefore stay available with the expected suffixes.

The runtime escapes `&`, angle brackets, quotes and apostrophes, then restores only `<br>` tags.
Initial `SafeString`/triple-brace rendering trusts build input and can render more HTML than the
runtime allows. Keep translated copy to plain text and supported line breaks when possible.
Do not treat the runtime sanitizer as protection for executable build data or arbitrary attributes.

## Editing and verification

Update component data and the matching template hooks together. Keep locale ordering and key
casing consistent; use `softSkills`/`hardSkills` for runtime namespaces, even though the data
roots are `'soft-skills'`/`'hard-skills'`.
Run `tars build --min`, inspect generated JSON and HTML, and exercise all language choices,
including reloads with saved preferences, metadata/ARIA attributes and PDF links.

The helper caches JSON once per Node process. Watchers regenerate JSON and recompile templates,
but do not invalidate that cache, so initial helper-rendered strings can stay stale until restart.
Runtime switching uses the newly generated file after a page reload.
The pre-init localStorage access is unguarded, and without JavaScript the visibility rule stays
active. A missing `.lang-toggle` also causes the runtime script to return before revealing a
pending-language page. These are existing limitations; see [operations](operations.md).
