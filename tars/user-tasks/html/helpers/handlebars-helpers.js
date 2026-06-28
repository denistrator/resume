'use strict';

const Handlebars = tars.packages.handlebars;
const fs = require('fs');
const path = require('path');

const translationsPath = path.resolve(process.cwd(), tars.config.devPath, 'translations.json');
let translations = null;

function loadTranslations() {
    if (translations !== null) {
        return;
    }

    try {
        translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
    } catch (e) {
        translations = {};
    }
}

let currentLang = 'en';

function getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((acc, part) => {
        if (acc && typeof acc === 'object') {
            return acc[part];
        }
        return undefined;
    }, obj);
}

const handlebarsHelpers = {
    t(key) {
        if (!key || typeof key !== 'string') {
            return '';
        }

        loadTranslations();
        const lang = currentLang;
        const langData = translations[lang];

        if (!langData) {
            return new Handlebars.SafeString(`[missing lang: ${lang}]`);
        }

        const value = getNestedValue(langData, key);

        if (value === undefined) {
            return new Handlebars.SafeString(`[missing: ${key}]`);
        }

        return new Handlebars.SafeString(value);
    },

    langCode() {
        return currentLang;
    },

    setLang(lang) {
        if (typeof lang === 'string') {
            currentLang = lang;
        }
        return '';
    },

    langSelect(options) {
        const hash = options.hash;
        if (hash[currentLang] !== undefined) {
            return new Handlebars.SafeString(hash[currentLang]);
        }
        if (hash.default !== undefined) {
            return new Handlebars.SafeString(hash.default);
        }
        return '';
    }
};

module.exports = handlebarsHelpers;
