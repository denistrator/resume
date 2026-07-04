'use strict';

const gulp = tars.packages.gulp;
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

function extractSkillsTranslations(items) {
    const result = {};

    items.forEach((item, itemIndex) => {
        if (item.name && (item.name.en || item.name.ru || item.name.uk)) {
            const nameKey = `skills.${itemIndex}.name`;
            result[nameKey] = {};

            for (const lang of LANGS) {
                if (item.name[lang]) {
                    result[nameKey][lang] = item.name[lang];
                }
            }
        }

        if (item.skills) {
            item.skills.forEach((skill, skillIndex) => {
                if (skill.name && (skill.name.en || skill.name.ru || skill.name.uk)) {
                    const skillNameKey = `skills.${itemIndex}.${skillIndex}.name`;
                    result[skillNameKey] = {};

                    for (const lang of LANGS) {
                        if (skill.name[lang]) {
                            result[skillNameKey][lang] = skill.name[lang];
                        }
                    }
                }

                if (skill.extra && (skill.extra.en || skill.extra.ru || skill.extra.uk)) {
                    const extraKey = `skills.${itemIndex}.${skillIndex}.extra`;
                    result[extraKey] = {};

                    for (const lang of LANGS) {
                        if (skill.extra[lang]) {
                            result[extraKey][lang] = skill.extra[lang];
                        }
                    }
                }
            });
        }
    });

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

function extractLanguagesTranslations(data) {
    const listResult = {};
    const sectionsResult = {};

    if (data.title) {
        listResult['section.languages.title'] = {};

        for (const l of LANGS) {
            if (data.title[l]) {
                listResult['section.languages.title'][l] = data.title[l];
            }
        }
    }

    if (data.description) {
        listResult['section.languages.desc'] = {};

        for (const l of LANGS) {
            if (data.description[l]) {
                listResult['section.languages.desc'][l] = data.description[l];
            }
        }
    }

    const items = data.items || [];

    items.forEach((lang, index) => {
        if (lang.name) {
            listResult[`languages.${index}.name`] = {};

            for (const l of LANGS) {
                if (lang.name[l]) {
                    listResult[`languages.${index}.name`][l] = lang.name[l];
                }
            }
        }

        if (lang.level) {
            listResult[`languages.${index}.level`] = {};

            for (const l of LANGS) {
                if (lang.level[l]) {
                    listResult[`languages.${index}.level`][l] = lang.level[l];
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

function mergeFlatToTarget(target, flat) {
    for (const lang of LANGS) {
        for (const [key, value] of Object.entries(flat)) {
            if (value[lang]) {
                target[lang][key] = value[lang];
            }
        }
    }
}

const ARRAY_COMPONENTS = [
    {dir: 'experience', dataKey: 'items', prefix: 'experience'},
    {dir: 'achievements', dataKey: 'items', prefix: 'achievements'},
    {dir: 'soft-skills', dataKey: 'items', prefix: 'softSkills'}
];

function collectComponentTranslations() {
    const flat = {};

    for (const lang of LANGS) {
        flat[lang] = {};
    }

    for (const {dir, dataKey, prefix} of ARRAY_COMPONENTS) {
        const filePath = path.join(componentsDir, dir, 'data/data.js');

        if (fs.existsSync(filePath)) {
            const data = loadDataFile(filePath);
            const key = prefix || dataKey;
            const translations = extractArrayTranslations(data[dataKey], key, ['title', 'description']);

            mergeFlatToTarget(flat, translations);
        }
    }

    const skillsPath = path.join(componentsDir, 'skills/data/data.js');

    if (fs.existsSync(skillsPath)) {
        const skillsData = loadDataFile(skillsPath);

        mergeFlatToTarget(flat, extractSkillsTranslations(skillsData.items));
    }

    const languagesPath = path.join(componentsDir, 'languages/data/data.js');

    if (fs.existsSync(languagesPath)) {
        const languagesData = loadDataFile(languagesPath);

        mergeFlatToTarget(flat, extractLanguagesTranslations(languagesData));
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

module.exports = function () {
    return gulp.task('build-translations', function (done) {
        let translations;

        try {
            translations = generateTranslations();
        } catch (error) {
            notifier.error('Failed to generate translations', error);
            done();
            return;
        }

        const jsonContent = JSON.stringify(translations, null, 2);
        const destPath = path.resolve(process.cwd(), tars.config.devPath, 'translations.json');
        fs.writeFileSync(destPath, jsonContent);
        notifier.success('Translations generated from data.js files');
        done();
    });
};
