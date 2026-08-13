document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = mobileBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // Scroll animation for elements
    const animateElements = () => {
        const elements = document.querySelectorAll('.section-header, .service-card, .testimonial-card, .feature-card, .funnel-step-content');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 60) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.section-header, .service-card, .testimonial-card, .feature-card, .funnel-step-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Floating WhatsApp visibility
    const floatingWhatsApp = document.querySelector('.floating-whatsapp');
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        // Show whatsapp button after scrolling past the hero section
        const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 500;
        if (window.scrollY > 400 || (heroBottom < 0)) {
            if (floatingWhatsApp) floatingWhatsApp.classList.add('visible');
        } else {
            if (floatingWhatsApp) floatingWhatsApp.classList.remove('visible');
        }
    });

    window.addEventListener('scroll', animateElements);
    setTimeout(animateElements, 100);

    // Video Scroll Effect — enabled for all devices
    const video = document.getElementById('scroll-video');
    const videoContainer = document.querySelector('.video-container');

    if (video && videoContainer) {
        // Essential for iOS scrubbing
        video.muted = true;
        video.playsInline = true;
        video.pause();

        let scrollProgress = 0;

        const scrubVideo = () => {
            if (video.duration && !isNaN(video.duration)) {
                const targetTime = scrollProgress * video.duration;
                // Lock exactly to scroll instead of "loose" smoothing
                video.currentTime = targetTime;
            }
            requestAnimationFrame(scrubVideo);
        };

        window.addEventListener('scroll', () => {
            const rect = videoContainer.getBoundingClientRect();
            const containerTop = rect.top;
            const containerHeight = rect.height;
            const windowHeight = window.innerHeight;

            if (containerTop <= 0 && containerTop >= windowHeight - containerHeight) {
                const maxScroll = containerHeight - windowHeight;
                const scrolled = Math.abs(containerTop);
                scrollProgress = scrolled / maxScroll;
            } else if (containerTop > 0) {
                scrollProgress = 0;
            } else {
                scrollProgress = 1;
            }
        }, { passive: true });

        // Trigger once when metadata loads to ensure first frame is drawn
        video.addEventListener('loadedmetadata', () => {
            requestAnimationFrame(scrubVideo);
        });

        // Fallback start
        requestAnimationFrame(scrubVideo);
    }
});
