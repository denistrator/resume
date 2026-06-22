(function () {
    const $readingModeToggle = document.querySelector('.reading-mode-toggle');

    $readingModeToggle.addEventListener('click', switchReadingMode, false);

    function switchReadingMode() {
        const $page = document.querySelector('.page');

        $page.classList.toggle('light');
        $page.classList.toggle('dark');

        const isDark = $page.classList.contains('dark');
        $readingModeToggle.setAttribute('aria-pressed', String(isDark));
    }
})();
