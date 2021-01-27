"use strict";

(function () {
  var $list = document.querySelector('.portfolio-list'),
      $listHiddenItems = $list.querySelectorAll('.portfolio-item.hidden'),
      $listCollapsePos = $list.querySelector('.portfolio-collapse-pos'),
      $listExpander = document.querySelector('.portfolio-expander'),
      listCollapsedHeight = $listCollapsePos.offsetTop + $listCollapsePos.offsetHeight;
  collapsePortfolioList();
  $listExpander.addEventListener('click', expandPortfolioList);

  function collapsePortfolioList() {
    $list.style.height = listCollapsedHeight + 'px';
  }

  function expandPortfolioList() {
    Array.from($listHiddenItems).forEach(function (e) {
      e.classList.remove('hidden');
    });
    $list.style.height = $list.scrollHeight + 'px';
    $list.classList.add('expanded');
    $listExpander.classList.add('hidden');
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