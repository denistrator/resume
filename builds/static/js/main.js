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