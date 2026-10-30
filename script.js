/* ========================================
   INVITEME - PREMIUM DIGITAL WEDDING INVITATION
   Interactive JavaScript (No Dark Mode)
   ======================================== */

// ========== WAIT FOR DOM TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
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
    
    // ========== STICKY HEADER WITH SLIM GLASSMORPHISM EFFECT ==========
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', debounce(function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 6px 28px rgba(127, 17, 48, 0.12)';
            header.style.background = 'rgba(253, 251, 247, 0.9)';
            header.style.backdropFilter = 'blur(12px)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(127, 17, 48, 0.08)';
            header.style.background = 'rgba(253, 251, 247, 0.85)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScroll = currentScroll;
    }, 10));
    
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
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter catalog cards with smooth animation
                catalogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // ========== HERO STATS COUNTER ANIMATION ==========
    const statsNumbers = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statsNumbers.forEach(stat => {
                    const htmlContent = stat.innerHTML;
                    const numberMatch = htmlContent.match(/\d+/);
                    
                    if (numberMatch) {
                        const finalNumber = parseInt(numberMatch[0]);
                        let currentNumber = 0;
                        const increment = finalNumber / 60;
                        const duration = 2000;
                        const stepTime = duration / 60;
                        
                        const counter = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= finalNumber) {
                                stat.innerHTML = htmlContent;
                                clearInterval(counter);
                            } else {
                                // Preserve the original HTML structure while updating number
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = htmlContent;
                                const numberNode = tempDiv.firstChild;
                                numberNode.textContent = Math.floor(currentNumber);
                                stat.innerHTML = tempDiv.innerHTML;
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
    
    // ========== PARALLAX EFFECT FOR FLOATING ELEMENTS ==========
    const floatingElements = document.querySelectorAll('.floating-badge');
    
    if (floatingElements.length > 0 && window.innerWidth > 768) {
        window.addEventListener('scroll', debounce(function() {
            const scrolled = window.pageYOffset;
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.1;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, 10));
    }
    
    // ========== SMOOTH ENTRY ANIMATIONS ON PAGE LOAD ==========
    setTimeout(() => {
        document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(element => {
            element.style.visibility = 'visible';
        });
    }, 100);
    
    // ========== FEATURE CARDS STAGGERED ANIMATION ==========
    const featureCards = document.querySelectorAll('.feature-card');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        featureObserver.observe(card);
    });
    
    // ========== CATALOG CARDS STAGGERED ANIMATION ==========
    const catalogCardsAnim = document.querySelectorAll('.catalog-card');
    const catalogObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    catalogCardsAnim.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        catalogObserver.observe(card);
    });
    
    // ========== PREVENT DEMO LINKS FROM NAVIGATING ==========
    const demoLinks = document.querySelectorAll('a[href*="demo"], a[href*="Preview"], a[href="#"]');
    demoLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        if (linkText.includes('demo') || linkText.includes('preview') || linkText.includes('lihat')) {
            link.addEventListener('click', function(e) {
                // Only prevent if it's not an actual demo link
                if (!this.href.includes('nasik-nabila') && this.href.includes('#')) {
                    e.preventDefault();
                    showNotification('Preview template akan segera hadir! Hubungi kami via WhatsApp untuk melihat demo lengkap. 💍');
                }
            });
        }
    });
    
    // ========== WHATSAPP LINK ANALYTICS ==========
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    waLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('WhatsApp link clicked:', this.href);
            // Add your analytics code here
            // Example: gtag('event', 'whatsapp_click', { 'event_category': 'engagement' });
        });
    });
    
    // ========== DYNAMIC YEAR IN FOOTER ==========
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('[data-year]');
    copyrightElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // ========== CONSOLE BRANDING ==========
    console.log('%c💍 Inviteme - Premium Digital Wedding Invitation', 'color: #7f1130; font-size: 20px; font-weight: bold; font-family: Playfair Display, serif;');
    console.log('%c✨ Crafted with love and elegance', 'color: #ffd38d; font-size: 14px;');
    console.log('%c🚀 Ready to create your dream invitation?', 'color: #6b5445; font-size: 12px;');
    
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Show notification (custom toast)
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #7f1130, #5c0d23);
        color: white;
        padding: 1.25rem 2rem;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(127, 17, 48, 0.3);
        z-index: 10000;
        font-weight: 600;
        font-family: 'Plus Jakarta Sans', sans-serif;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 4000);
}

// Copy to clipboard utility
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('✅ Tersalin ke clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('✅ Tersalin ke clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textArea);
    }
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images exist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
});

// ========== FAQ ACCORDION (If exists) ==========
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const answer = faqItem.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = null;
                    }
                });
                
                // If it wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        }
    });
}

// ========== BACK TO TOP BUTTON (If exists) ==========
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', debounce(function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 100));
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
