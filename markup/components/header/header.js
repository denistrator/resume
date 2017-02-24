(function() {
    var readingModeToggle = document.querySelector('.reading-mode-toggle');

    readingModeToggle.addEventListener('click', function() {
        var body = document.querySelector('body.page');
        body.classList.toggle('light');
        if (body.classList.contains('light')) {
            readingModeToggle.classList.remove('dark');
            readingModeToggle.classList.add('light');
        } else {
            readingModeToggle.classList.remove('light');
            readingModeToggle.classList.add('dark');
        }
    }, false);

    var langToggle = document.querySelector('.lang-toggle');
    var langToggleText = document.querySelector('.lang-toggle-text');
    var html = document.querySelector('html');

    langToggle.addEventListener('click', function() {
        var currentLang = html.getAttribute('lang');
        console.log(currentLang);
        if (currentLang === 'ru') {
            html.setAttribute('lang', 'en');
            langToggleText.innerHTML = 'EN';
        } else {
            html.setAttribute('lang', 'ru');
            langToggleText.innerHTML = 'RU';
        }
    }, false);
})();
