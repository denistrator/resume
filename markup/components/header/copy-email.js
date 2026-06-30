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
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                btn.classList.add('copied');
                btn.setAttribute('aria-label', 'Email copied!');
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.setAttribute('aria-label', 'Copy email to clipboard');
                }, 2000);
            } catch (e) {
                btn.setAttribute('aria-label', 'Copy failed — select manually');
            }
            document.body.removeChild(textArea);
        });
    });
})();
