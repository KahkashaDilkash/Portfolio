document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    const stickyNav = document.querySelector('.sticky-nav');
    const educationToggle = document.querySelector('.education-toggle');
    const educationDropdown = document.querySelector('.education-dropdown');
    const video = document.querySelector('.header-video');

    // Intersection Observer for Section Animations
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in-bottom');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    // Observe each section
    sections.forEach(section => {
        section.classList.add('section-hidden'); // Initially hide sections
        observer.observe(section);
    });

    // Sticky Navigation
    window.addEventListener('scroll', () => {
        stickyNav.classList.toggle('visible', window.scrollY > header.offsetHeight);
        highlightCurrentSection();
    });

    // Highlight the current section in the sticky nav
    function highlightCurrentSection() {
        const navLinks = document.querySelectorAll('.sticky-nav .nav-links a');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + 100; // Adjust for header height

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Education Dropdown Toggle
    if (educationToggle && educationDropdown) {
        educationToggle.addEventListener('click', () => {
            const isOpen = educationDropdown.classList.toggle('open');
            const icon = educationToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-up', isOpen);
                icon.classList.toggle('fa-chevron-down', !isOpen);
            }
        });
    } else {
        console.error('Education toggle or dropdown not found!');
    }

    // Header Video Playback with Delay
    if (video) {
        video.playbackRate = 0.8; // Slow down the video playback

        video.addEventListener('ended', () => {
            const delayInSeconds = 90; // Set delay in seconds
            video.pause();
            setTimeout(() => {
                video.currentTime = 0;
                video.play();
            }, delayInSeconds * 1000);
        });
    } else {
        console.error('Header video not found!');
    }
});
