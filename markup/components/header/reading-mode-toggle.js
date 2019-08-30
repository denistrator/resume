(function () {
    var $readingModeToggle = document.querySelector('.reading-mode-toggle');

    $readingModeToggle.addEventListener('click', switchReadingMode, false);

    function switchReadingMode() {
        var $page = document.querySelector('.page');

        $page.classList.toggle('light');
        $page.classList.toggle('dark');
    }
})();
