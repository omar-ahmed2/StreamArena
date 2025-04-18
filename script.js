function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    return false; // Prevent default anchor behavior
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const streamCards = document.querySelectorAll('.stream-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const heroImage = document.querySelector('.hero-image');

    // Animate navigation
    setTimeout(() => {
        nav.classList.add('animate');
    }, 100);

    // Animate sections and cards
    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('animate');
                
                // Animate cards within the section
                if (section.id === 'streams') {
                    streamCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
                
                if (section.id === 'features') {
                    featureCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
            }
        });
    };

    // Initial animation check
    animateOnScroll();

    // Scroll event listener for animations
    window.addEventListener('scroll', () => {
        // Navigation scroll effect
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Animate sections on scroll
        animateOnScroll();
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced hover effects for cards
    streamCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Enhanced hover effects for feature cards
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Enhanced hero image animation
    const animateHeroImage = () => {
        const heroImage = document.querySelector('.hero-image');
        const time = Date.now() / 1000;
        
        // Create a more complex floating animation in 4 axes
        const floatY = Math.sin(time) * 20; // Up and down
        const floatX = Math.cos(time * 0.7) * 15; // Left and right
        const floatZ = Math.sin(time * 0.5) * 10; // Forward and backward
        const scale = 1 + Math.sin(time * 0.3) * 0.02; // Subtle scaling
        
        // Apply the transformation
        heroImage.style.transform = `
            translate3d(${floatX}px, ${floatY}px, ${floatZ}px)
            scale(${scale})
        `;
        
        // Update shadow based on position
        const shadowX = floatX * 0.5;
        const shadowY = floatY * 0.5;
        const shadowBlur = 40 + Math.abs(floatY) * 0.5;
        heroImage.style.boxShadow = `
            ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(124, 58, 237, 0.4)
        `;
        
        requestAnimationFrame(animateHeroImage);
    };
    
    // Start the hero image animation
    animateHeroImage();

    // Start typing animation immediately
    const startTypingSequence = async () => {
        const titleElement = document.getElementById('typed-title');
        const heroDescription = document.getElementById('hero-description');
        const heroButtons = document.getElementById('hero-buttons');

        // Clear initial text
        titleElement.innerHTML = '';

        // Enhanced typing effect
        const typeText = async (element, text, speed = 100, delay = 0) => {
            await new Promise(resolve => setTimeout(resolve, delay));
            element.innerHTML = '';
            
            // Type text
            for (let i = 0; i < text.length; i++) {
                await new Promise(resolve => setTimeout(resolve, speed));
                if (i < 6) { // "Stream" is 6 letters
                    element.innerHTML = `<span class="text-purple-500">${text.substring(0, i + 1)}</span>${text.substring(i + 1)}`;
                } else {
                    element.innerHTML = `<span class="text-purple-500">Stream</span>${text.substring(6, i + 1)}`;
                }
            }
            
            // Pause before deleting
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Delete text
            for (let i = text.length; i >= 0; i--) {
                await new Promise(resolve => setTimeout(resolve, speed / 2));
                if (i > 6) { // Keep "Stream" while deleting the rest
                    element.innerHTML = `<span class="text-purple-500">Stream</span>${text.substring(6, i)}`;
                } else if (i > 0) {
                    element.innerHTML = `<span class="text-purple-500">${text.substring(0, i)}</span>`;
                } else {
                    element.innerHTML = '';
                }
            }
            
            // Pause after deleting
            await new Promise(resolve => setTimeout(resolve, 1000));
        };

        // Start continuous typing loop
        const typingLoop = async () => {
            while (true) {
                await typeText(titleElement, 'Stream Your Gaming Journey', 100);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        };

        // Start the typing loop immediately
        typingLoop();

        // Fade in description and buttons with staggered timing
        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
            setTimeout(() => {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }, 500);
        }, 1000);
    };

    // Start typing animation immediately
    startTypingSequence();

    // Background motion animation
    const motionCircles = document.querySelectorAll('.motion-circle');
    motionCircles.forEach((circle, index) => {
        circle.style.animationDelay = `${index * -5}s`;
    });

    // Background shapes animation
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.style.animationDelay = `${Math.random() * 5}s`;
    });

    // Enhanced scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Add more sophisticated reveal logic
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                // Calculate visibility percentage
                const visiblePercentage = Math.min(
                    100,
                    Math.max(
                        0,
                        ((windowHeight - elementTop) / (elementBottom - elementTop)) * 100
                    )
                );
                
                // Apply smooth opacity and transform based on visibility
                element.style.opacity = `${visiblePercentage / 100}`;
                element.style.transform = `translateY(${(100 - visiblePercentage) * 0.5}px)`;
                
                // Add class when fully visible
                if (visiblePercentage > 50) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                element.classList.remove('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Scroll event listener
    window.addEventListener('scroll', () => {
        // Navigation scroll effect
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Reveal elements on scroll
        revealOnScroll();
    });

    // Add click event to CTA buttons
    const ctaButtons = document.querySelectorAll('button:not(.stream-card button)');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('animate-pulse');
            setTimeout(() => {
                button.classList.remove('animate-pulse');
            }, 1000);
        });
    });

    // Get the reload animation element
    const reloadAnimation = document.querySelector('.reload-animation');
    
    // Function to show reload animation
    function showReloadAnimation() {
        reloadAnimation.classList.remove('hidden');
        reloadAnimation.classList.add('show');
        
        // Hide the animation after 2 seconds
        setTimeout(() => {
            reloadAnimation.classList.remove('show');
            reloadAnimation.classList.add('hidden');
        }, 2000);
    }
    
    // Add click event to stream cards
    streamCards.forEach(card => {
        card.addEventListener('click', () => {
            showReloadAnimation();
            
            // Simulate loading new stream data
            setTimeout(() => {
                // Update the featured stream
                const featuredStream = document.querySelector('.aspect-video img');
                const streamTitle = document.querySelector('.absolute.bottom-0 h2');
                const streamGame = document.querySelector('.absolute.bottom-0 p');
                
                // Get the clicked card's data
                const clickedCard = card;
                const cardImage = clickedCard.querySelector('img').src;
                const cardTitle = clickedCard.querySelector('h3').textContent;
                const cardGame = clickedCard.querySelector('p').textContent;
                
                // Update featured stream with animation
                featuredStream.classList.add('opacity-0');
                setTimeout(() => {
                    featuredStream.src = cardImage;
                    streamTitle.textContent = cardTitle;
                    streamGame.textContent = cardGame;
                    featuredStream.classList.remove('opacity-0');
                }, 500);
            }, 2000);
        });
    });
    
    // Add click event to login and signup buttons
    const loginBtn = document.querySelector('button:first-of-type');
    const signupBtn = document.querySelector('button:last-of-type');
    
    loginBtn.addEventListener('click', () => {
        alert('Login functionality coming soon!');
    });
    
    signupBtn.addEventListener('click', () => {
        alert('Sign up functionality coming soon!');
    });

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const handleParallax = (e) => {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    };

    // Add mousemove event for parallax
    document.addEventListener('mousemove', handleParallax);

    // Game filtering functionality
    const filterButtons = document.querySelectorAll('.game-filter');
    const viewAllButton = document.getElementById('view-all-streams');
    let isShowingAll = false;

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-purple-600'));
            filterButtons.forEach(btn => btn.classList.add('border-2', 'border-purple-500'));
            
            // Add active class to clicked button
            button.classList.add('active', 'bg-purple-600');
            button.classList.remove('border-2', 'border-purple-500');
            
            const category = button.getAttribute('data-category');
            
            // Get all current cards including dynamically added ones
            const currentCards = document.querySelectorAll('.stream-card');
            currentCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = cardCategory === category ? 'block' : 'none';
                }
            });
        });
    });

}); 