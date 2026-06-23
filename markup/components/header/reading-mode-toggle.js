(() => {
    const toggle = document.querySelector('.reading-mode-toggle');
    if (!toggle) return;

    const html = document.documentElement;

    const currentTheme = html.getAttribute('data-theme') || 'light';
    toggle.setAttribute('aria-pressed', String(currentTheme === 'dark'));

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        toggle.setAttribute('aria-pressed', String(next === 'dark'));
    });
})();
