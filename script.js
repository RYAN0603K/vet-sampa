document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Transform hamburger to X
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

        // Close menu when clicking a link
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

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll animation for elements
    const animateElements = () => {
        const elements = document.querySelectorAll('.step-card, .service-card, .testimonial-card, .features-text');
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                // We add style inline for simplicity, but could use classes
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.step-card, .service-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    window.addEventListener('scroll', animateElements);
    // Trigger once on load
    setTimeout(animateElements, 100);

    // Video Scroll Effect
    const video = document.getElementById('scroll-video');
    const videoContainer = document.querySelector('.video-container');

    if (video && videoContainer) {
        let scrollProgress = 0;
        
        // Mute and play temporarily to ensure it's loaded in some browsers
        video.muted = true;
        
        // Use requestAnimationFrame for smooth scrubbing
        const scrubVideo = () => {
            if (video.duration && !isNaN(video.duration)) {
                const targetTime = scrollProgress * video.duration;
                // Interpolation for buttery smoothness
                video.currentTime += (targetTime - video.currentTime) * 0.1;
            }
            requestAnimationFrame(scrubVideo);
        };
        
        window.addEventListener('scroll', () => {
            const rect = videoContainer.getBoundingClientRect();
            const containerTop = rect.top;
            const containerHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Calculate how far we've scrolled inside the container
            if (containerTop <= 0 && containerTop >= windowHeight - containerHeight) {
                const maxScroll = containerHeight - windowHeight;
                const scrolled = Math.abs(containerTop);
                scrollProgress = scrolled / maxScroll;
            } else if (containerTop > 0) {
                scrollProgress = 0;
            } else {
                scrollProgress = 1;
            }
        });
        
        // Start animation loop
        requestAnimationFrame(scrubVideo);
    }
});
