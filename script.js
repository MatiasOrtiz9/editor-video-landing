// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: unobserve after animation to improve performance
            // scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class
const revealElements = document.querySelectorAll('.scroll-reveal');
revealElements.forEach(element => {
    scrollObserver.observe(element);
});

// ============================================
// STAGGERED ANIMATIONS FOR CARDS
// ============================================
const cardGrids = document.querySelectorAll('.grid');
cardGrids.forEach(grid => {
    const cards = grid.querySelectorAll('.card, .portfolio-item, .testimonial-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Por favor, ingresa un email válido.');
        return;
    }

    // Create mailto link with form data
    const subject = encodeURIComponent(`Nuevo mensaje de ${formData.name}`);
    const body = encodeURIComponent(
        `Nombre: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Mensaje:\n${formData.message}`
    );

    // Open email client
    window.location.href = `mailto:contacto@videoeditor.com?subject=${subject}&body=${body}`;

    // Show success message
    alert('¡Gracias por tu mensaje! Se abrirá tu cliente de email para enviarlo.');

    // Reset form
    contactForm.reset();
});

// ============================================
// PORTFOLIO VIDEO HOVER EFFECTS
// ============================================
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    const video = item.querySelector('video');

    item.addEventListener('mouseenter', function () {
        if (video) {
            video.play().catch(error => {
                console.log("Video play failed:", error);
            });
        }
    });

    item.addEventListener('mouseleave', function () {
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset video to start
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    // Add fade-in animation to hero elements
    const heroElements = document.querySelectorAll('.fade-in-up');
    heroElements.forEach(element => {
        element.style.opacity = '1';
    });
});

// ============================================
// CUSTOM CURSOR EFFECT (Optional Enhancement)
// ============================================
// Uncomment to enable custom cursor glow effect
/*
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});
*/

console.log('🎬 Video Editor Portfolio loaded successfully!');
