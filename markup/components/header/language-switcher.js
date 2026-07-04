(() => {
    const STORAGE_KEY = 'preferred-lang';
    const LANGS = ['en', 'ru', 'uk'];
    const DEFAULT_LANG = 'en';

    let translations = null;
    let currentLang = DEFAULT_LANG;

    function revealPage() {
        document.documentElement.setAttribute('data-lang-ready', '');
    }

    const toggle = document.querySelector('.lang-toggle');

    if (!toggle) {
        return;
    }

    function getNestedValue(obj, keyPath) {
        return keyPath.split('.').reduce((acc, part) => {
            if (acc && typeof acc === 'object') {
                return acc[part];
            }
            return void 0;
        }, obj);
    }

    function sanitize(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
    }

    function sanitizeStrings(obj) {
        if (typeof obj === 'string') {
            return sanitize(obj);
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

    function applyTranslations(lang) {
        if (!translations || !translations[lang]) {
            return;
        }

        const langData = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const value = getNestedValue(langData, key);

            if (value !== void 0) {
                element.innerHTML = value;
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
            const pairs = element.getAttribute('data-i18n-attr').split(';');

            pairs.forEach((pair) => {
                const [attr, key] = pair.split(':');

                if (attr && key) {
                    const value = getNestedValue(langData, key.trim());

                    if (value !== void 0) {
                        element.setAttribute(attr.trim(), value);
                    }
                }
            });
        });

        document.documentElement.lang = lang;
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);

        const langText = toggle.querySelector('.lang-toggle-text');

        if (langText) {
            langText.textContent = lang;
        }

        const pdfLink = document.querySelector('a[href*="Resume-"]');

        if (pdfLink) {
            const basePath = pdfLink.href.substring(0, pdfLink.href.lastIndexOf('/') + 1);
            const baseName = pdfLink.href.substring(pdfLink.href.lastIndexOf('/') + 1).replace(/Resume-\w+\.pdf/, '');
            pdfLink.href = `${basePath}${baseName}Resume-${lang}.pdf`;
        }
    }

    async function switchLanguage(lang) {
        if (lang === currentLang) {
            return;
        }

        if (!translations) {
            await loadTranslations();
        }

        if (translations && translations[lang]) {
            applyTranslations(lang);
        }
    }

    function getNextLang() {
        const index = LANGS.indexOf(currentLang);
        return LANGS[(index + 1) % LANGS.length];
    }

    toggle.addEventListener('click', () => {
        const next = getNextLang();
        switchLanguage(next);
    });

    /** @type {string|null} Language set by inline pre-init script via data-pending-lang attribute */
    const savedLang = document.documentElement.getAttribute('data-pending-lang') || localStorage.getItem(STORAGE_KEY);

    if (savedLang && LANGS.includes(savedLang) && savedLang !== DEFAULT_LANG) {
        loadTranslations().then(() => {
            if (translations && translations[savedLang]) {
                applyTranslations(savedLang);
            }
            revealPage();
        });
    } else {
        revealPage();
    }
})();
