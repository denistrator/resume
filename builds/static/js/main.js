"use strict";

(function () {
  var btn = document.querySelector('.copy-email-btn');
  if (!btn) return;
  var emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink) return;
  var email = emailLink.href.replace('mailto:', '');
  btn.addEventListener('click', function () {
    navigator.clipboard.writeText(email).then(function () {
      btn.classList.add('copied');
      btn.setAttribute('aria-label', 'Email copied!');
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.setAttribute('aria-label', 'Copy email to clipboard');
      }, 2000);
    });
  });
})();
"use strict";

(function () {
  var $root = document.querySelector('html'),
    $langToggle = document.querySelector('.lang-toggle');
  var languages = ['en', 'ru', 'uk'];
  $langToggle.addEventListener('click', switchLanguages, false);
  function switchLanguages() {
    $root.setAttribute('lang', getNextLanguage());
  }
  function getNextLanguage() {
    var currentLanguageIndex = languages.indexOf($root.getAttribute('lang'));
    return languages[currentLanguageIndex + 1] || languages[0];
  }
})();
"use strict";

(function () {
  var $readingModeToggle = document.querySelector('.reading-mode-toggle');
  $readingModeToggle.addEventListener('click', switchReadingMode, false);
  function switchReadingMode() {
    var $page = document.querySelector('.page');
    $page.classList.toggle('light');
    $page.classList.toggle('dark');
    var isDark = $page.classList.contains('dark');
    $readingModeToggle.setAttribute('aria-pressed', String(isDark));
  }
})();