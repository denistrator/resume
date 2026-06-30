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
