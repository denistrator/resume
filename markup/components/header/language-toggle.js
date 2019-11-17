(function () {
    const $root = document.querySelector('html'),
        $langToggle = document.querySelector('.lang-toggle');

    const languages = [
        'en',
        'ru'
    ];

    $langToggle.addEventListener('click', switchLanguages, false);

    function switchLanguages() {
        $root.setAttribute('lang', getNextLanguage());
    }

    function getNextLanguage() {
        const currentLanguageIndex = languages.indexOf($root.getAttribute('lang'));

        return languages[currentLanguageIndex + 1] || languages[0];
    }
})();
