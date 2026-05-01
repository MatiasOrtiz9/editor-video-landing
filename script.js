const siteHeader = document.getElementById('siteHeader');
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const revealItems = document.querySelectorAll('[data-reveal]');
const autoplayVideos = document.querySelectorAll('[data-autoplay]');

const setHeaderState = () => {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const closeMenu = () => {
    if (!menuButton || !navMenu) {
        return;
    }

    menuButton.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
};

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        navMenu.classList.toggle('is-open');
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId) {
            return;
        }

        const target = document.querySelector(targetId);
        if (!target) {
            return;
        }

        event.preventDefault();
        closeMenu();

        const headerOffset = siteHeader.offsetHeight + 14;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    });
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (autoplayVideos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(() => {
                    // Ignore autoplay rejection gracefully.
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.45
    });

    autoplayVideos.forEach((video) => {
        videoObserver.observe(video);
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        closeMenu();
    }
});
