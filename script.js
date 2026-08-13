document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // SPA Navigation Logic
    const navLinksArray = document.querySelectorAll('.nav-link[data-target]');
    const views = document.querySelectorAll('.view');
    
    navLinksArray.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if(!targetId) return;
            
            // Allow default behavior for external/anchor links, but prevent for view switching
            if(targetId.startsWith('view-')) {
                e.preventDefault();
                
                // Update active link
                navLinksArray.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Update active view
                views.forEach(view => view.classList.remove('active'));
                document.getElementById(targetId).classList.add('active');
                
                // Close mobile menu
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Simple scroll animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.grid-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Crear bolitas de Pilates de fondo
    const ballsContainer = document.createElement('div');
    ballsContainer.className = 'balls-container';
    document.body.appendChild(ballsContainer);

    for (let i = 0; i < 8; i++) {
        const ball = document.createElement('div');
        ball.className = 'pilates-ball';
        
        // Random size between 100px and 300px
        const size = Math.random() * 200 + 100;
        ball.style.width = `${size}px`;
        ball.style.height = `${size}px`;
        
        // Random position
        ball.style.left = `${Math.random() * 100}vw`;
        ball.style.top = `${Math.random() * 100}vh`;
        
        // Random animation duration and delay
        ball.style.animationDuration = `${Math.random() * 20 + 15}s`;
        ball.style.animationDelay = `${Math.random() * 10}s`;
        
        ballsContainer.appendChild(ball);
    }

    // Global Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }

    // Lógica para la música de fondo
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.innerHTML = '⏸️'; // Icono de pausa
            } else {
                bgMusic.pause();
                musicBtn.innerHTML = '🎵'; // Icono de música
            }
        });
    }
});
