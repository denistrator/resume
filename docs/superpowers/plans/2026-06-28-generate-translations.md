# Generate translations.json from data.js (DRY Fix) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate the DRY violation where `translations.json` manually duplicates content from component `data.js` files by generating it at build time.

**Architecture:** Component `data.js` files remain the single source of truth for trilingual content. A TARS user-task reads each data.js, extracts `{en, ru, uk}` objects, maps them to translation keys, and merges with a small `translations-ui.json` for non-component UI strings. The output `translations.json` is generated at build time — never manually edited.

**Tech Stack:** Node.js (fs, path, eval), TARS user-task (gulp)

---

## File Structure

```
markup/
├── translations-ui.json                       # NEW — non-component UI strings only
├── translations.json                          # DELETE — now generated at build time
├── components/
│   ├── skills/data/data.js                    # KEEP — source of truth
│   ├── experience/data/data.js                # KEEP — source of truth
│   ├── achievements/data/data.js              # KEEP — source of truth
│   ├── languages/data/data.js                 # KEEP — source of truth
│   └── head/data/data.js                      # KEEP — page metadata
tars/user-tasks/
└── build-translations.js                      # MODIFY — generate instead of copy
```

## How It Works

The `build-translations.js` task:
1. Reads `translations-ui.json` for non-component strings (header, footer, section titles, etc.)
2. Reads each component's `data/data.js` file
3. `eval()`s the data file to get the JavaScript object
4. Extracts trilingual content and maps to hierarchical keys
5. Merges all into `{en: {...}, ru: {...}, uk: {...}}`
6. Writes `dev/translations.json`

### Key Mapping

| Data.js Source | Translation Key |
|---|---|
| `skills.skillAreas.magento2.skillGroups[0][0]` | `skills.magento2.0.title` |
| `experience.experienceItem[0].title` | `experience.0.title` |
| `achievements.achievements[0].description` | `achievements.0.description` |
| `languages.languages[0].name` | `languagesList.0.name` |
| `languages.languages[0].toefl.sections[0].name` | `toeflSections.0.name` |

---

### Task 1: Create translations-ui.json

**Files:**
- Create: `markup/translations-ui.json`

**Interfaces:**
- Contains only non-component UI strings (header, footer, section titles, languages UI)
- Does NOT contain component content (skills, experience, achievements data)
- Merged into final translations.json at build time

- [ ] **Step 1: Create the file**

Create `markup/translations-ui.json`:

```json
{
    "en": {
        "header": {
            "name": "Denis",
            "surname": "Belevtsov",
            "title1": "Senior Magento Frontend Architect | Hyvä Specialist | Performance Engineer",
            "title2": "10+ Years Experience",
            "locationText": "Remote, Odessa",
            "locationPrintPrefix": " city",
            "emailAria": "Email",
            "copyEmailAria": "Copy email to clipboard",
            "githubAria": "GitHub (opens in new tab)",
            "githubLabel": "My GitHub page",
            "telegramAria": "Telegram (opens in new tab)",
            "telegramLabel": "My Telegram",
            "pdfAria": "Download resume in PDF",
            "pdfLabel": "Download this resume in PDF",
            "themeAria": "Toggle reading mode (light or dark)",
            "themeLabel": "Toggle reading mode (light or dark)",
            "langAria": "Switch language"
        },
        "section": {
            "skills": { "title": "Skills", "desc": "Know it, use it" },
            "experience": { "title": "Work Experience", "desc": "Magento 2 Frontend Developer | 10+ Years Experience" },
            "achievements": { "title": "Achievements", "desc": "Key results and contributions to projects" },
            "languages": { "title": "Languages", "desc": "Language proficiency" }
        },
        "languages": {
            "toeflAria": "TOEFL score details",
            "toeflHeader": "CEFR Level B2 and TOEFL iBT 90 / 120",
            "toeflDate": "TOEFL (Magoosh) 27.06.2026"
        },
        "footer": {
            "name": "Denis Belevtsov",
            "offer": "Open to suggestions"
        }
    },
    "ru": {
        "header": {
            "name": "Денис",
            "surname": "Белевцов",
            "title1": "Senior Magento Фронтенд Архитектор | Специалист Hyvä | Инженер Производительности",
            "title2": "10+ лет опыта",
            "locationText": "Удалённо, Одесса",
            "locationPrintPrefix": "г. ",
            "emailAria": "Электронная почта",
            "copyEmailAria": "Копировать email",
            "githubAria": "GitHub (откроется в новой вкладке)",
            "githubLabel": "Моя страница на GitHub",
            "telegramAria": "Telegram (откроется в новой вкладке)",
            "telegramLabel": "Мой Telegram",
            "pdfAria": "Завантажити резюме в PDF",
            "pdfLabel": "Загрузить PDF версию этого резюме",
            "themeAria": "Переключить режим чтения (светлый или тёмный)",
            "themeLabel": "Переключить режим чтения (светлый или тёмный)",
            "langAria": "Переключить язык"
        },
        "section": {
            "skills": { "title": "Навыки", "desc": "Могу, умею, практикую" },
            "experience": { "title": "Работа", "desc": "Magento 2 Фронтенд Разработчик | 10+ лет опыта" },
            "achievements": { "title": "Достижения", "desc": "Ключевые результаты и вклад в проекты" },
            "languages": { "title": "Языки", "desc": "Владение языками" }
        },
        "languages": {
            "toeflAria": "Детали оценки TOEFL",
            "toeflHeader": "Уровень CEFR B2 и TOEFL iBT 90 / 120",
            "toeflDate": "TOEFL (Magoosh) 27.06.2026"
        },
        "footer": {
            "name": "Денис Белевцов",
            "offer": "Открыт для предложений"
        }
    },
    "uk": {
        "header": {
            "name": "Денис",
            "surname": "Белевцов",
            "title1": "Senior Magento Фронтенд Архітектор | Спеціаліст Hyvä | Інженер Продуктивності",
            "title2": "10+ років досвіду",
            "locationText": "Віддалено, Одеса",
            "locationPrintPrefix": "м. ",
            "emailAria": "Електронна пошта",
            "copyEmailAria": "Копіювати email",
            "githubAria": "GitHub (відкриється у новій вкладці)",
            "githubLabel": "Моя сторінка на GitHub",
            "telegramAria": "Telegram (відкриється у новій вкладці)",
            "telegramLabel": "Мій Telegram",
            "pdfAria": "Завантажити резюме в PDF",
            "pdfLabel": "Завантажити PDF версію цього резюме",
            "themeAria": "Перемкнути режим читання (світлий або темний)",
            "themeLabel": "Перемкнути режим читання (світлий або темний)",
            "langAria": "Перемкнути мову"
        },
        "section": {
            "skills": { "title": "Навички", "desc": "Вмію, практикую" },
            "experience": { "title": "Робота", "desc": "Magento 2 Фронтенд Розробник | 10+ років досвіду" },
            "achievements": { "title": "Досягнення", "desc": "Ключові результати та внесок у проєкти" },
            "languages": { "title": "Мови", "desc": "Володіння мовами" }
        },
        "languages": {
            "toeflAria": "Деталі оцінки TOEFL",
            "toeflHeader": "Рівень CEFR B2 та TOEFL iBT 90 / 120",
            "toeflDate": "TOEFL (Magoosh) 27.06.2026"
        },
        "footer": {
            "name": "Денис Белевцов",
            "offer": "Відкритий для пропозицій"
        }
    }
}
```

- [ ] **Step 2: Verify JSON syntax**

Run: `node -e "JSON.parse(require('fs').readFileSync('markup/translations-ui.json','utf8')); console.log('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add markup/translations-ui.json
git commit -m "feat(i18n): add UI strings file (non-component translations)"
```

---

### Task 2: Rewrite build-translations.js

**Files:**
- Modify: `tars/user-tasks/build-translations.js`

**Interfaces:**
- Reads: `markup/translations-ui.json` (UI strings)
- Reads: `markup/components/*/data/data.js` (component content)
- Writes: `dev/translations.json` (merged output)
- Consumes: `tars.config.devPath` for output path

- [ ] **Step 1: Rewrite build-translations.js**

Replace `tars/user-tasks/build-translations.js` with:

```js
'use strict';

const gulp = tars.packages.gulp;
const through2 = tars.packages.through2;
const File = tars.packages.gutil.File;
const notifier = tars.helpers.notifier;
const fs = require('fs');
const path = require('path');

const LANGS = ['en', 'ru', 'uk'];
const componentsDir = path.resolve(process.cwd(), 'markup/components');
const uiStringsPath = path.resolve(process.cwd(), 'markup/translations-ui.json');

function loadDataFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fn = new Function(`${content}; return data;`);
    return fn();
}

function extractSkillsTranslations(skillAreas) {
    const result = {};

    for (const [areaKey, area] of Object.entries(skillAreas)) {
        if (!area.skillGroups) {
            continue;
        }

        area.skillGroups.forEach((group, groupIndex) => {
            group.forEach((item, itemIndex) => {
                const key = `skills.${areaKey}.${groupIndex}.${itemIndex}`;

                if (item.en || item.ru || item.uk) {
                    result[key] = {};

                    for (const lang of LANGS) {
                        if (item[lang]) {
                            result[key][lang] = item[lang];
                        }
                    }
                }
            });
        });
    }

    return result;
}

function extractArrayTranslations(items, prefix, fields) {
    const result = {};

    items.forEach((item, index) => {
        for (const field of fields) {
            if (!item[field]) {
                continue;
            }

            const key = `${prefix}.${index}.${field}`;
            result[key] = {};

            for (const lang of LANGS) {
                if (item[field][lang]) {
                    result[key][lang] = item[field][lang];
                }
            }
        }
    });

    return result;
}

function extractLanguagesTranslations(languages) {
    const listResult = {};
    const sectionsResult = {};

    languages.forEach((lang, index) => {
        if (lang.name) {
            listResult[`languagesList.${index}.name`] = {};

            for (const l of LANGS) {
                if (lang.name[l]) {
                    listResult[`languagesList.${index}.name`][l] = lang.name[l];
                }
            }
        }

        if (lang.level) {
            listResult[`languagesList.${index}.level`] = {};

            for (const l of LANGS) {
                if (lang.level[l]) {
                    listResult[`languagesList.${index}.level`][l] = lang.level[l];
                }
            }
        }

        if (lang.toefl && lang.toefl.sections) {
            lang.toefl.sections.forEach((section, sectionIndex) => {
                if (section.name) {
                    sectionsResult[`toeflSections.${sectionIndex}.name`] = {};

                    for (const l of LANGS) {
                        if (section.name[l]) {
                            sectionsResult[`toeflSections.${sectionIndex}.name`][l] = section.name[l];
                        }
                    }
                }
            });
        }
    });

    return Object.assign({}, listResult, sectionsResult);
}

function mergeTranslations(target, source) {
    for (const lang of LANGS) {
        if (!target[lang]) {
            target[lang] = {};
        }

        if (!source[lang]) {
            continue;
        }

        for (const [key, value] of Object.entries(source[lang])) {
            target[lang][key] = value;
        }
    }
}

function flattenToNested(obj) {
    const result = {};

    for (const lang of LANGS) {
        result[lang] = {};

        if (!obj[lang]) {
            continue;
        }

        for (const [flatKey, value] of Object.entries(obj[lang])) {
            const parts = flatKey.split('.');
            let current = result[lang];

            for (let i = 0; i < parts.length - 1; i++) {
                if (!current[parts[i]]) {
                    current[parts[i]] = {};
                }

                current = current[parts[i]];
            }

            current[parts[parts.length - 1]] = value;
        }
    }

    return result;
}

function collectComponentTranslations() {
    const flat = {};

    for (const lang of LANGS) {
        flat[lang] = {};
    }

    const skillsPath = path.join(componentsDir, 'skills/data/data.js');

    if (fs.existsSync(skillsPath)) {
        const skillsData = loadDataFile(skillsPath);
        const skillsTranslations = extractSkillsTranslations(skillsData.skillAreas);

        for (const lang of LANGS) {
            for (const [key, value] of Object.entries(skillsTranslations)) {
                if (value[lang]) {
                    flat[lang][key] = value[lang];
                }
            }
        }
    }

    const experiencePath = path.join(componentsDir, 'experience/data/data.js');

    if (fs.existsSync(experiencePath)) {
        const experienceData = loadDataFile(experiencePath);
        const experienceTranslations = extractArrayTranslations(
            experienceData.experienceItem, 'experience', ['title', 'description']
        );

        for (const lang of LANGS) {
            for (const [key, value] of Object.entries(experienceTranslations)) {
                if (value[lang]) {
                    flat[lang][key] = value[lang];
                }
            }
        }
    }

    const achievementsPath = path.join(componentsDir, 'achievements/data/data.js');

    if (fs.existsSync(achievementsPath)) {
        const achievementsData = loadDataFile(achievementsPath);
        const achievementsTranslations = extractArrayTranslations(
            achievementsData.achievements, 'achievements', ['title', 'description']
        );

        for (const lang of LANGS) {
            for (const [key, value] of Object.entries(achievementsTranslations)) {
                if (value[lang]) {
                    flat[lang][key] = value[lang];
                }
            }
        }
    }

    const languagesPath = path.join(componentsDir, 'languages/data/data.js');

    if (fs.existsSync(languagesPath)) {
        const languagesData = loadDataFile(languagesPath);
        const languagesTranslations = extractLanguagesTranslations(languagesData.languages);

        for (const lang of LANGS) {
            for (const [key, value] of Object.entries(languagesTranslations)) {
                if (value[lang]) {
                    flat[lang][key] = value[lang];
                }
            }
        }
    }

    return flat;
}

function generateTranslations() {
    let uiStrings = {};

    if (fs.existsSync(uiStringsPath)) {
        uiStrings = JSON.parse(fs.readFileSync(uiStringsPath, 'utf8'));
    }

    const componentFlat = collectComponentTranslations();
    const componentNested = flattenToNested(componentFlat);

    const result = {};

    for (const lang of LANGS) {
        result[lang] = Object.assign({}, uiStrings[lang] || {}, componentNested[lang] || {});
    }

    return result;
}

module.exports = function() {
    return gulp.task('build-translations', function(done) {
        let translations;

        try {
            translations = generateTranslations();
        } catch (error) {
            notifier.error('Failed to generate translations', error);
            done();
            return;
        }

        const jsonContent = JSON.stringify(translations, null, 2);
        const file = new File({
            base: './',
            path: './translations.json',
            contents: Buffer.from(jsonContent)
        });

        return through2.obj(
            function(chunk, enc, callback) {
                callback();
            },
            function(callback) {
                const destPath = path.resolve(process.cwd(), tars.config.devPath, 'translations.json');
                fs.writeFileSync(destPath, jsonContent);
                notifier.success('Translations generated from data.js files');
                callback();
            }
        );
    });
};
```

- [ ] **Step 2: Verify syntax**

Run: `node --check tars/user-tasks/build-translations.js`
Expected: No output

- [ ] **Step 3: Test the generator manually**

Run: `node -e "const gen = require('./tars/user-tasks/build-translations.js'); console.log('loaded')"`
Expected: `loaded` (the module.exports is a function, not executed yet — that's OK)

- [ ] **Step 4: Commit**

```bash
git add tars/user-tasks/build-translations.js
git commit -m "feat(i18n): generate translations.json from component data.js files"
```

---

### Task 3: Delete translations.json and Verify Build

**Files:**
- Delete: `markup/translations.json`
- Verify: Build produces `dev/translations.json` with correct content

- [ ] **Step 1: Delete manually maintained translations.json**

```bash
rm markup/translations.json
```

- [ ] **Step 2: Run build**

Run: `tars start build-dev 2>&1 | tail -10`
Expected: Build succeeds. `build-translations` task runs.

- [ ] **Step 3: Verify generated translations.json exists**

Run: `ls -la dev/translations.json`
Expected: File exists

- [ ] **Step 4: Verify generated content has all languages**

Run: `node -e "const t = JSON.parse(require('fs').readFileSync('dev/translations.json','utf8')); console.log('langs:', Object.keys(t).join(', ')); console.log('en keys:', Object.keys(t.en).join(', ')); console.log('skills:', Object.keys(t.en.skills || {}).join(', '))"`
Expected:
```
langs: en, ru, uk
en keys: header, section, languages, footer, skills, experience, achievements, languagesList, toeflSections
skills: hyvä, magento2, frontend, backend, flow, misc
```

- [ ] **Step 5: Verify no data loss — compare with old translations.json**

If the old translations.json is still available in git, compare:
Run: `git show HEAD~1:markup/translations.json | node -e "const old=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); const cur=JSON.parse(require('fs').readFileSync('dev/translations.json','utf8')); const oldKeys=Object.keys(old.en.skills.magento2); const curKeys=Object.keys(cur.en.skills.magento2); console.log('old keys:', oldKeys.length, 'cur keys:', curKeys.length)"`
Expected: Same count

- [ ] **Step 6: Verify [missing: keys in built HTML**

Run: `grep -c '\[missing:' dev/index.html`
Expected: `0`

- [ ] **Step 7: Commit**

```bash
git rm markup/translations.json
git commit -m "feat(i18n): remove manually maintained translations.json (now generated)"
```

---

## Self-Review

- [ ] Component data.js files are the single source of truth for trilingual content
- [ ] translations-ui.json contains only non-component UI strings
- [ ] build-translations.js reads data.js files and generates translations.json
- [ ] The manually maintained translations.json is deleted
- [ ] The generated translations.json has the same structure as the old one
- [ ] `{{t}}` helper and `data-i18n` attributes work unchanged
- [ ] No `[missing:` keys in built output
