(() => {
    const triggers = document.querySelectorAll('.toefl-trigger');
    if (!triggers.length) {
        return;
    }

    function closeAll() {
        document.querySelectorAll('.toefl-tooltip.is-open').forEach((tip) => {
            tip.classList.remove('is-open');
            tip.setAttribute('aria-hidden', 'true');
        });
        document.querySelectorAll('.toefl-trigger[aria-expanded="true"]').forEach((tr) => {
            tr.setAttribute('aria-expanded', 'false');
        });
    }

    triggers.forEach((trigger) => {
        const tooltip = trigger.nextElementSibling;
        if (!tooltip || !tooltip.classList.contains('toefl-tooltip')) {
            return;
        }

        tooltip.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = tooltip.classList.contains('is-open');
            closeAll();
            if (!isOpen) {
                tooltip.classList.add('is-open');
                tooltip.setAttribute('aria-hidden', 'false');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });

        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            }
            if (e.key === 'Escape') {
                closeAll();
            }
        });
    });

    document.addEventListener('click', closeAll);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAll();
        }
    });
})();
