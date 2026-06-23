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

(function () {
  const $root = document.querySelector('html'),
    $langToggle = document.querySelector('.lang-toggle');
  const languages = ['en', 'ru', 'uk'];
  $langToggle.addEventListener('click', switchLanguages, false);
  function switchLanguages() {
    $root.setAttribute('lang', getNextLanguage());
  }
  function getNextLanguage() {
    const currentLanguageIndex = languages.indexOf($root.getAttribute('lang'));
    return languages[currentLanguageIndex + 1] || languages[0];
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