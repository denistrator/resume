(() => {
    const toggle = document.querySelector('.reading-mode-toggle');
    if (!toggle) return;

    const html = document.documentElement;

    const currentTheme = html.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
    toggle.setAttribute('aria-pressed', String(currentTheme === 'dark'));

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        toggle.setAttribute('aria-pressed', String(next === 'dark'));
    });

    let themeBeforePrint;

    window.addEventListener('beforeprint', () => {
        themeBeforePrint = html.getAttribute('data-theme') || 'light';
        html.setAttribute('data-theme', 'light');
    });

    window.addEventListener('afterprint', () => {
        html.setAttribute('data-theme', themeBeforePrint);
    });
})();
