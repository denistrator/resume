'use strict';

const gulp = tars.packages.gulp;
const notifier = tars.helpers.notifier;
const fs = require('fs');
const path = require('path');

const LANGS = ['en', 'ru', 'uk'];
const componentsDir = path.resolve(process.cwd(), 'markup/components');

function loadDataFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fn = new Function(`${content}; return data;`);
    return expandDefaults(fn());
}

function expandDefaults(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => expandDefaults(item));
    }

    if ('default' in obj && Object.keys(obj).length === 1) {
        const result = {};

        for (const lang of LANGS) {
            result[lang] = obj.default;
        }

        return result;
    }

    const result = {};

    for (const [key, value] of Object.entries(obj)) {
        result[key] = expandDefaults(value);
    }

    return result;
}

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function isI18nObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return false;
    }
    const keys = Object.keys(obj);
    return keys.length > 0 && keys.every(k => LANGS.includes(k));
}

function extractI18nFields(obj, prefix) {
    if (isI18nObject(obj)) {
        return {[prefix]: obj};
    }

    const result = {};

    for (const [key, value] of Object.entries(obj)) {
        if (isI18nObject(value)) {
            result[`${prefix}.${key}`] = value;
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (isI18nObject(item)) {
                    result[`${prefix}.${key}.${index}`] = item;
                } else if (item && typeof item === 'object') {
                    Object.assign(result, extractI18nFields(item, `${prefix}.${key}.${index}`));
                }
            });
        } else if (value && typeof value === 'object') {
            Object.assign(result, extractI18nFields(value, `${prefix}.${key}`));
        }
    }

    return result;
}

function collectComponentTranslations() {
    const flat = {};

    for (const lang of LANGS) {
        flat[lang] = {};
    }

    const entries = fs.readdirSync(componentsDir, {withFileTypes: true})
        .filter(d => d.isDirectory() && !d.name.startsWith('_'))
        .map(d => d.name);

    for (const componentName of entries) {
        const dataPath = path.join(componentsDir, componentName, 'data/data.js');

        if (!fs.existsSync(dataPath)) {
            continue;
        }

        const data = loadDataFile(dataPath);
        const componentPrefix = toCamelCase(componentName);

        if (data[componentName] === undefined) {
            throw new Error(`Data file for component "${componentName}" must export an object with a key matching the component name.`);
        }

        for (const [sectionKey, sectionData] of Object.entries(data[componentName])) {
            if (!sectionData || typeof sectionData !== 'object') {
                continue;
            }

            const prefix = `${componentPrefix}.${sectionKey}`;
            const translations = extractI18nFields(sectionData, prefix);

            for (const [key, value] of Object.entries(translations)) {
                for (const lang of LANGS) {
                    if (value[lang]) {
                        flat[lang][key] = value[lang];
                    }
                }
            }
        }
    }

    return flat;
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

function generateTranslations() {
    const componentFlat = collectComponentTranslations();
    const componentNested = flattenToNested(componentFlat);

    return componentNested;
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
