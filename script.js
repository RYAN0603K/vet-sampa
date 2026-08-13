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
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement && header) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // Scroll animation for elements (Safe fallback)
    const elementsToAnimate = document.querySelectorAll('.section-header, .service-card, .testimonial-card, .funnel-step-content');
    
    // Set initial state safely
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const animateElements = () => {
        try {
            elementsToAnimate.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < window.innerHeight - 40) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        } catch(e) { console.error(e); }
    };

    window.addEventListener('scroll', animateElements, { passive: true });
    setTimeout(animateElements, 100);
    // Extra safety: force show all after 2 seconds in case scroll event fails
    setTimeout(() => {
        elementsToAnimate.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 2000);

    // Floating WhatsApp visibility
    const floatingWhatsApp = document.querySelector('.floating-whatsapp');
    const heroSection = document.querySelector('.hero');
    if (floatingWhatsApp) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 500;
            if (window.scrollY > 400 || (heroBottom < 0)) {
                floatingWhatsApp.classList.add('visible');
            } else {
                floatingWhatsApp.classList.remove('visible');
            }
        }, { passive: true });
    }

    // Video Scroll Effect — Safer Implementation
    const video = document.getElementById('scroll-video');
    const videoContainer = document.querySelector('.video-container');

    if (video && videoContainer) {
        try {
            video.muted = true;
            video.playsInline = true;
            video.pause();

            let scrollProgress = 0;
            let loopRunning = false;

            const scrubVideo = () => {
                try {
                    if (video.duration && isFinite(video.duration) && !isNaN(video.duration)) {
                        const targetTime = scrollProgress * video.duration;
                        if (isFinite(targetTime) && !isNaN(targetTime)) {
                            // Only update if difference is noticeable to save CPU
                            if (Math.abs(video.currentTime - targetTime) > 0.05) {
                                video.currentTime = targetTime;
                            }
                        }
                    }
                } catch(e) {
                    console.error("Video scrub error", e);
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

            video.addEventListener('loadedmetadata', () => {
                if (!loopRunning) {
                    loopRunning = true;
                    requestAnimationFrame(scrubVideo);
                }
            });

            // Fallback if loadedmetadata doesn't fire
            setTimeout(() => {
                if (!loopRunning) {
                    loopRunning = true;
                    requestAnimationFrame(scrubVideo);
                }
            }, 1000);
            
        } catch(e) { console.error(e); }
    }
});
