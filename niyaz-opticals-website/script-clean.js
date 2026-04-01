// ==========================
// SAFE DOM LOAD
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // MOBILE MENU TOGGLE
    // ==========================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // ==========================
    // SMOOTH SCROLLING
    // ==========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            if (nav) nav.classList.remove('active');
        });
    });

    // ==========================
    // CONTACT FORM HANDLING
    // ==========================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            alert(`Thank you! We'll call you back on ${data.phone} shortly.\n\nOr call now: 9443617786`);

            contactForm.reset();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================
    // SCROLL ANIMATION
    // ==========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .about, .book').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            observer.observe(el);
        });
    }

    // ==========================
    // WHATSAPP CLICK TRACKING
    // ==========================
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('WhatsApp clicked');
        });
    });

    // ==========================
    // CALL BUTTON TRACKING
    // ==========================
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Call button clicked');
        });
    });

});
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert("Form submitted successfully! We'll call you soon.");

        contactForm.reset();

    } catch (error) {
        alert("Something went wrong!");
    }
});