// Smooth back-to-top button and section reveal animations
const homeBtn = document.getElementById('homeBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) homeBtn.classList.add('show'); else homeBtn.classList.remove('show');
});

homeBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Smooth internal anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Section reveal on scroll
const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('main section, main .project-highlight').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Profile photo: if user leaves placeholder, hide broken image gracefully
const photo = document.getElementById('profilePhoto');
photo.addEventListener('error', () => { photo.style.opacity = '0.6'; photo.style.filter = 'grayscale(60%)'; });

// Form submission via FormSubmit.co
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        // FormSubmit.co handles the submission automatically
        // Optional: show success feedback
        setTimeout(() => {
            form.reset();
        }, 500);
    });
}
