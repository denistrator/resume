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

(function () {
  const $readingModeToggle = document.querySelector('.reading-mode-toggle');
  $readingModeToggle.addEventListener('click', switchReadingMode, false);
  function switchReadingMode() {
    const $page = document.querySelector('.page');
    $page.classList.toggle('light');
    $page.classList.toggle('dark');
    const isDark = $page.classList.contains('dark');
    $readingModeToggle.setAttribute('aria-pressed', String(isDark));
  }
})();