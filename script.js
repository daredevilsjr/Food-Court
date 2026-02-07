// ============================================
// QR ORDER - INTERACTIVE JAVASCRIPT
// Food Court Revolution 🍕
// ============================================

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// === MOBILE MENU TOGGLE ===
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenuBtn.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add animation class for children
            const children = entry.target.querySelectorAll('.problem-card, .benefit-card, .use-case-card, .step-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe sections for fade-in animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(section);
});

// === PROBLEM CARDS HOVER EFFECT ===
const problemCards = document.querySelectorAll('.problem-card');
problemCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const emoji = card.querySelector('.problem-emoji');
        emoji.style.animation = 'none';
        setTimeout(() => {
            emoji.style.animation = 'bounce 0.5s ease';
        }, 10);
    });
});

// === USE CASE CARDS INTERACTION ===
const useCaseCards = document.querySelectorAll('.use-case-card');
useCaseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.use-case-icon');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.use-case-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// === OUTLET CARDS INTERACTION (IN SOLUTION SECTION) ===
const outletCards = document.querySelectorAll('.outlet-card');
outletCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all cards
        outletCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
        
        // Add a little bounce animation
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'bounce 0.5s ease';
        }, 10);
    });
});

// === FORM VALIDATION & SUBMISSION ===
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        organization: document.getElementById('organization').value,
        role: document.getElementById('role').value,
        message: document.getElementById('message').value
    };
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address! 📧');
        return;
    }
    
    // Validate phone (basic validation)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid phone number! 📱');
        return;
    }
    
    // Log form data (in production, this would be sent to a backend)
    console.log('🎉 Form Submission:', formData);
    console.log('📊 Submission Time:', new Date().toLocaleString());
    
    // Show success message with animation
    successMessage.classList.add('show');
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Add confetti effect (visual feedback)
    createConfetti();
    
    // Reset form
    contactForm.reset();
    
    // Hide success message after 7 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 7000);
});

// === CONFETTI EFFECT ON FORM SUBMISSION ===
function createConfetti() {
    const confettiCount = 50;
    const confettiColors = ['#FF3B3B', '#FFD23F', '#06D6A0', '#4361EE', '#FF9F1C', '#FF006E'];
    const confettiEmojis = ['🎉', '🎊', '✨', '🌟', '⭐', '💫'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const useEmoji = Math.random() > 0.5;
        
        if (useEmoji) {
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.fontSize = '2rem';
        } else {
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        }
        
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const duration = 2000 + Math.random() * 2000;
        const endLeft = (parseFloat(confetti.style.left) + (Math.random() - 0.5) * 100) + '%';
        
        confetti.animate([
            { 
                top: '-20px', 
                left: confetti.style.left,
                opacity: 1,
                transform: 'rotate(0deg)'
            },
            { 
                top: '100vh', 
                left: endLeft,
                opacity: 0,
                transform: `rotate(${360 + Math.random() * 360}deg)`
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, duration);
    }
}

// === HERO STATS COUNTER ANIMATION ===
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            // Only animate the "100%" stat
            if (statNumbers[1]) {
                let count = 0;
                const interval = setInterval(() => {
                    count += 5;
                    if (count >= 100) {
                        statNumbers[1].textContent = '100%';
                        clearInterval(interval);
                    } else {
                        statNumbers[1].textContent = count + '%';
                    }
                }, 30);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// === PARALLAX EFFECT FOR FLOATING FOOD ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatItems = document.querySelectorAll('.float-item');
    
    floatItems.forEach((item, index) => {
        const speed = (index + 1) * 0.1;
        item.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// === ADD SMOOTH REVEAL FOR BENEFIT CARDS ===
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
});

const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

benefitCards.forEach(card => benefitObserver.observe(card));

// === TYPING EFFECT FOR HERO TITLE (OPTIONAL ENHANCEMENT) ===
// Uncomment if you want a typing animation effect
/*
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';
let charIndex = 0;

function typeTitle() {
    if (charIndex < titleText.length) {
        heroTitle.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeTitle, 100);
    }
}

// Start typing when page loads
window.addEventListener('load', () => {
    setTimeout(typeTitle, 500);
});
*/

// === DEMO CART INTERACTION ===
const demoCart = document.querySelector('.demo-cart');
if (demoCart) {
    let itemCount = 3;
    demoCart.addEventListener('click', (e) => {
        e.preventDefault();
        itemCount++;
        demoCart.textContent = `🛒 View Cart (${itemCount} items)`;
        
        // Add pulse animation
        demoCart.style.animation = 'none';
        setTimeout(() => {
            demoCart.style.animation = 'pulse-qr 0.5s ease';
        }, 10);
    });
}

// === PREVENT FORM DOUBLE SUBMISSION ===
let isSubmitting = false;

contactForm.addEventListener('submit', (e) => {
    if (isSubmitting) {
        e.preventDefault();
        return;
    }
    isSubmitting = true;
    
    setTimeout(() => {
        isSubmitting = false;
    }, 3000);
});

// === ADD EASTER EGG - CLICK LOGO 5 TIMES ===
const logo = document.querySelector('.logo');
let logoClickCount = 0;

logo.addEventListener('click', () => {
    logoClickCount++;
    
    if (logoClickCount === 5) {
        alert('🎉 You found the easter egg! Thanks for exploring our site! 🍕🍔🌮');
        logoClickCount = 0;
        createConfetti();
    }
});

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', (e) => {
    // Press 'C' to scroll to contact section
    if (e.key === 'c' || e.key === 'C') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'H' to scroll to top
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// === FORM FIELD FOCUS EFFECTS ===
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// === CONSOLE MESSAGE ===
console.log('%c🍕 Welcome to QR Order! 🍔', 'font-size: 20px; font-weight: bold; color: #FF3B3B;');
console.log('%cLooking for something? Check out the code!', 'font-size: 14px; color: #4361EE;');
console.log('%cKeyboard shortcuts: Press "C" for Contact, "H" for Home', 'font-size: 12px; color: #06D6A0;');

// === PERFORMANCE OPTIMIZATION - LAZY LOAD ANIMATIONS ===
// Only animate elements when they're about to enter viewport
const lazyAnimateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            lazyAnimateObserver.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '50px'
});

// Apply to heavy animation elements
document.querySelectorAll('.step-item, .use-case-card').forEach(el => {
    lazyAnimateObserver.observe(el);
});

// === INIT MESSAGE ===
console.log('✅ QR Order System initialized successfully!');
console.log('📱 Ready to revolutionize food courts!');

// === SHOW LOADING COMPLETE ===
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('🎉 All resources loaded! Enjoy the experience!');
});