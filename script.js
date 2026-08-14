document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // SPA Navigation Logic (Branch Buttons)
    const branchBtns = document.querySelectorAll('.btn-branch');
    const views = document.querySelectorAll('.view');
    
    branchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-target');
            if(!targetId) return;
            
            // Update active view
            views.forEach(view => view.classList.remove('active'));
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
                
                // Scroll down to the view smoothly
                setTimeout(() => {
                    targetView.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
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
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
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
