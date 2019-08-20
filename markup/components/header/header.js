(function () {
    var $readingModeToggle = document.querySelector('.reading-mode-toggle');

    $readingModeToggle.addEventListener('click', function () {
        var $page = document.querySelector('.page');

        $page.classList.toggle('light');
        $page.classList.toggle('dark');
    }, false);
})();

(function () {
    var $langToggle = document.querySelector('.lang-toggle');
    var $langToggleText = document.querySelector('.lang-toggle-text');
    var $root = document.querySelector('html');

    $langToggle.addEventListener('click', function () {
        var currentLang = $root.getAttribute('lang');
        var lang, locale;
        switch (currentLang) {
            case 'en':
                lang = 'ru';
                locale = 'Ru';
                break;
            default:
                lang = 'en';
                locale = 'En';
        }
        $root.setAttribute('lang', lang);
        $langToggleText.innerHTML = locale;
    }, false);
})();
