(function() {
    var readingModeToggle = document.querySelector('.reading-mode-toggle');
    readingModeToggle.addEventListener('click', function() {
        document.querySelector('.page').classList.toggle('light');
        if (document.querySelector('.page').classList.contains('light')) {
            readingModeToggle.classList.remove('dark');
            readingModeToggle.classList.add('light');
        } else {
            readingModeToggle.classList.remove('light');
            readingModeToggle.classList.add('dark');
        }
    }, false);
        }
    }, false);
})();
