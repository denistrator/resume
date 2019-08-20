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

