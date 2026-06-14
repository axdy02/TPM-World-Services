document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar & Mobile Menu
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link, .nav-btn');

    // Handle scroll for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    });

    // 2. Intersection Observer for Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // 3. Counter Animation for Stats
    const statsContainer = document.getElementById('stats-container');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };

            updateCounter();
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // 4. Form Submission (Prevent Default for UI Demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.style.opacity = '0.8';

            // Simulate network request
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#27ae60';
                btn.style.color = 'white';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = ''; // reset to class styling
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // 5. Modal Functionality for "Learn More" buttons
    const modal = document.getElementById('info-modal');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const closeBtn = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    if (modal && learnMoreBtns.length > 0) {
        const hideModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                if (!modal.classList.contains('show')) {
                    modal.style.display = 'none';
                }
            }, 300);
        };

        learnMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
                // Trigger reflow
                void modal.offsetWidth;
                modal.classList.add('show');
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', hideModal);
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                hideModal();
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
});
