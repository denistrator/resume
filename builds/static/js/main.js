"use strict";

(() => {
  const btn = document.querySelector('.copy-email-btn');
  if (!btn) return;
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink) return;
  const email = emailLink.href.replace('mailto:', '');
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
      btn.classList.add('copied');
      btn.setAttribute('aria-label', 'Email copied!');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.setAttribute('aria-label', 'Copy email to clipboard');
      }, 2000);
    });
  });
})();
"use strict";

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
  async function loadTranslations() {
    if (translations) {
      return translations;
    }
    try {
      const response = await fetch('translations.json');
      translations = await response.json();
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
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const value = getNestedValue(langData, key);
      if (value !== void 0) {
        element.innerHTML = value;
      }
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      const pairs = element.getAttribute('data-i18n-attr').split(';');
      pairs.forEach(pair => {
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
      pdfLink.href = pdfLink.href.replace(/Resume-\w+\.pdf/, `Resume-${lang}.pdf`);
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
  const savedLang = window.__pendingLang || localStorage.getItem(STORAGE_KEY);
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
"use strict";

(() => {
  const toggle = document.querySelector('.reading-mode-toggle');
  if (!toggle) return;
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  toggle.setAttribute('aria-pressed', String(currentTheme === 'dark'));
  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.setAttribute('aria-pressed', String(next === 'dark'));
  });
})();
"use strict";

(() => {
  const triggers = document.querySelectorAll('.toefl-trigger');
  if (!triggers.length) {
    return;
  }
  function closeAll() {
    document.querySelectorAll('.toefl-tooltip.is-open').forEach(tip => {
      tip.classList.remove('is-open');
      tip.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('.toefl-trigger[aria-expanded="true"]').forEach(tr => {
      tr.setAttribute('aria-expanded', 'false');
    });
  }
  triggers.forEach(trigger => {
    const tooltip = trigger.nextElementSibling;
    if (!tooltip || !tooltip.classList.contains('toefl-tooltip')) {
      return;
    }
    tooltip.addEventListener('click', e => {
      e.stopPropagation();
    });
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = tooltip.classList.contains('is-open');
      closeAll();
      if (!isOpen) {
        tooltip.classList.add('is-open');
        tooltip.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    trigger.addEventListener('keydown', e => {
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
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAll();
    }
  });
})();