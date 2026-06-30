(() => {
    const btn = document.querySelector('.copy-email-btn');
    if (!btn) return;

    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (!emailLink) return;

    const email = emailLink.href.replace('mailto:', '');

    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(email).then(() => {
            btn.classList.add('copied');
            btn.setAttribute('aria-label', 'Email copied!');
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.setAttribute('aria-label', 'Copy email to clipboard');
            }, 2000);
        });
    });
})();
