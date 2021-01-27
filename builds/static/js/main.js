"use strict";

(function () {
  var $portfolioList = document.querySelector('.portfolio-list'),
      $portfolioListCollapsePos = $portfolioList.querySelector('.portfolio-collapse-pos'),
      $portfolioListExpander = $portfolioList.querySelector('.portfolio-expander'),
      portfolioListCollapsedHeight = $portfolioListCollapsePos.offsetTop + $portfolioListCollapsePos.offsetHeight;
  collapsePortfolioList();
  $portfolioListExpander.addEventListener('click', expandPortfolioList);

  function collapsePortfolioList() {
    $portfolioList.style.height = portfolioListCollapsedHeight + 'px';
  }

  function expandPortfolioList() {
    $portfolioList.style.height = $portfolioList.scrollHeight + 'px';
    $portfolioListExpander.classList.add('hide');
  }
})();
"use strict";

(function () {
  var $root = document.querySelector('html'),
      $langToggle = document.querySelector('.lang-toggle');
  var languages = ['en', 'ru'];
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
  }
})();