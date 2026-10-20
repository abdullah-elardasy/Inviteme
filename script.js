/* ========================================
   INVITEME - DIGITAL WEDDING INVITATION
   Interactive JavaScript Features
   Created by: @abdullah_elardasy
   ======================================== */

// ========== WAIT FOR DOM TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // ========== STICKY HEADER ==========
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#' or empty
            if (targetId === '#' || !targetId) {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== CATALOG FILTER TABS ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogCards = document.querySelectorAll('.catalog-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter catalog cards
            catalogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    // Show all cards
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else if (cardCategory === filterValue) {
                    // Show matching cards
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Hide non-matching cards
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = null;
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== ANIMATE ON SCROLL ==========
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .catalog-card, .step-card, .testimonial-card, .faq-item');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // ========== FLOATING ANIMATION FOR HERO CARDS ==========
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add slight random delay for more natural movement
        const delay = index * 0.3;
        card.style.animationDelay = `${delay}s`;
    });
    
    // ========== DYNAMIC YEAR IN FOOTER ==========
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-copyright');
    if (copyrightText) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2026', currentYear);
    }
    
    // ========== CATALOG CARD HOVER EFFECT ==========
    catalogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ========== PREVENT DEMO LINKS FROM NAVIGATING ==========
    // Since demo links are placeholders, we'll show an alert
    const demoLinks = document.querySelectorAll('a[href="#"]');
    demoLinks.forEach(link => {
        // Only prevent default for actual demo buttons, not all # links
        if (link.textContent.includes('Demo') || link.textContent.includes('Lihat Demo')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Demo sedang dalam pengembangan. Silakan hubungi kami via WhatsApp untuk melihat contoh tema secara langsung! 😊');
            });
        }
    });
    
    // ========== LAZY LOADING FOR IMAGES ==========
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========== STATS COUNTER ANIMATION ==========
    const statsNumbers = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statsNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const hasPlus = text.includes('+');
                    const numberMatch = text.match(/\d+/);
                    
                    if (numberMatch) {
                        const finalNumber = parseInt(numberMatch[0]);
                        let currentNumber = 0;
                        const increment = finalNumber / 50;
                        const duration = 2000;
                        const stepTime = duration / 50;
                        
                        const counter = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= finalNumber) {
                                stat.textContent = text;
                                clearInterval(counter);
                            } else {
                                if (text.includes('/')) {
                                    stat.textContent = currentNumber.toFixed(1) + '/5';
                                } else {
                                    stat.textContent = Math.floor(currentNumber) + (hasPlus ? '+' : '');
                                }
                            }
                        }, stepTime);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // ========== CONSOLE MESSAGE ==========
    console.log('%c👑 Inviteme - Digital Wedding Invitation', 'color: #C5A882; font-size: 20px; font-weight: bold;');
    console.log('%cCreated with ❤️ by @abdullah_elardasy', 'color: #666; font-size: 14px;');
    console.log('%c🚀 Need a custom digital invitation? Contact us via WhatsApp!', 'color: #4CAF50; font-size: 12px;');
    
});

// ========== PERFORMANCE OPTIMIZATION: Debounce Function ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events if needed
window.addEventListener('scroll', debounce(function() {
    // Any additional scroll-based functionality can be added here
}, 100));

// ========== WHATSAPP CLICK TRACKING (Optional Analytics) ==========
const waLinks = document.querySelectorAll('a[href*="wa.me"]');
waLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp link clicked:', this.href);
        // You can integrate Google Analytics or other tracking here
        // gtag('event', 'whatsapp_click', { 'event_category': 'engagement' });
    });
});

// ========== COPY TO CLIPBOARD FUNCTIONALITY (Future Enhancement) ==========
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            console.log('Text copied to clipboard (fallback)');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    }
}

// ========== SERVICE WORKER REGISTRATION (For PWA - Optional) ==========
if ('serviceWorker' in navigator) {
    // Uncomment below if you want to add PWA capability
    /*
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
    */
}
