





(function () {
    var readingModeToggle = document.querySelector('.reading-mode-toggle');

    readingModeToggle.addEventListener('click', function () {
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

    langToggle.addEventListener('click', function () {
        var currentLang = html.getAttribute('lang');
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
        html.setAttribute('lang', lang);
        langToggleText.innerHTML = locale;
    }, false);
})();

(function() {
	var blockToCollapse = document.querySelector(".portfolio-list");
    var collapsedHeight = document.querySelector(".portfolio-collapse-pos").offsetTop +
   						  document.querySelector(".portfolio-collapse-pos").offsetHeight;

    blockToCollapse.style.height = collapsedHeight +"px";

    var expander = document.querySelector(".portfolio-expander");
    expander.addEventListener('click', function() {
        blockToCollapse.style.height = blockToCollapse.scrollHeight +"px";
    	expander.classList.add("hide");
    });
})();



