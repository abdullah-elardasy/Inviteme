// ============================================
// MINIMALIST WEDDING INVITATION - NO PHOTO
// Interactive JavaScript Features
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. GUEST NAME FROM URL PARAMETER
    // ============================================
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    const guestNameElement = document.getElementById('guestName');
    
    if (guestName) {
        guestNameElement.textContent = decodeURIComponent(guestName);
    }

    // ============================================
    // 2. OPEN INVITATION BUTTON
    // ============================================
    const openInvitationBtn = document.getElementById('openInvitation');
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    openInvitationBtn.addEventListener('click', function() {
        // Hide cover with fade animation
        cover.classList.add('hidden');
        
        // Show main content
        setTimeout(() => {
            mainContent.classList.remove('hidden');
            
            // Auto-play music
            bgMusic.play().catch(err => {
                console.log('Autoplay blocked by browser:', err);
            });
            
            // Update music button state
            musicToggle.classList.add('playing');
            
            // Trigger fade-in animations
            triggerAnimations();
        }, 800);
    });

    // ============================================
    // 3. BACKGROUND MUSIC TOGGLE
    // ============================================
    let isPlaying = false;

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play();
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Update playing state when music plays
    bgMusic.addEventListener('play', function() {
        isPlaying = true;
        musicToggle.classList.add('playing');
    });

    bgMusic.addEventListener('pause', function() {
        isPlaying = false;
        musicToggle.classList.remove('playing');
    });

    // ============================================
    // 4. COUNTDOWN TIMER
    // ============================================
    // Set your wedding date here (Year, Month-1, Day, Hour, Minute)
    const weddingDate = new Date(2025, 2, 15, 8, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);

        // If countdown is finished
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<p class="countdown-ended">Acara Sedang Berlangsung!</p>';
        }
    }

    // Format numbers to always show 2 digits
    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ============================================
    // 5. RSVP FORM SUBMISSION
    // ============================================
    const rsvpForm = document.getElementById('rsvpForm');
    const wishesContainer = document.getElementById('wishesContainer');

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;

        // Create wish item
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        wishItem.style.animation = 'fadeInUp 0.5s ease';

        // Determine status class
        let statusClass = '';
        let statusText = '';
        if (attendance === 'hadir') {
            statusClass = 'hadir';
            statusText = 'Hadir';
        } else if (attendance === 'tidak-hadir') {
            statusClass = 'tidak-hadir';
            statusText = 'Tidak Hadir';
        } else {
            statusClass = 'masih-ragu';
            statusText = 'Masih Ragu';
        }

        wishItem.innerHTML = `
            <div class="wish-header">
                <span class="wish-name">${escapeHtml(name)}</span>
                <span class="wish-status ${statusClass}">${statusText}</span>
            </div>
            ${message ? `<p class="wish-message">${escapeHtml(message)}</p>` : ''}
        `;

        // Add to top of wishes list
        wishesContainer.insertBefore(wishItem, wishesContainer.firstChild);

        // Show success message
        alert('Terima kasih atas konfirmasi dan ucapannya! 🎉');

        // Reset form
        rsvpForm.reset();

        // Scroll to wishes section
        wishItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // In production, you would send this data to a backend/database
        // Example: sendToBackend(name, attendance, guests, message);
    });

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // 6. FADE-IN ANIMATIONS ON SCROLL
    // ============================================
    function triggerAnimations() {
        const observerOptions = {
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

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    }

    // ============================================
    // 7. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

});

// ============================================
// 8. COPY TO CLIPBOARD FUNCTION (Global)
// ============================================
function copyToClipboard(text, button) {
    // Use modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            showCopySuccess(button);
        }).catch(function(err) {
            // Fallback for older browsers
            fallbackCopyToClipboard(text, button);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(text, button);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        alert('Gagal menyalin. Silakan salin manual: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Tersalin';
    button.classList.add('copied');
    
    setTimeout(function() {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
    }, 2000);
}

// ============================================
// 9. PREVENT CONTEXT MENU ON IMAGES (Optional)
// ============================================
// Uncomment if you want to prevent right-click on images
/*
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
*/

// ============================================
// 10. PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images if needed in future versions
// Debounce scroll events for better performance

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

// Log when page is fully loaded
window.addEventListener('load', function() {
    console.log('Wedding Invitation Loaded Successfully! 💒');
});
