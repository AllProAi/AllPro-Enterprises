// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true
    });
});



// Form validation
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

// Navbar scroll behavior
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Wave animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        wave.style.animationDelay = `${index * 0.2}s`;
    });
});

// Error logging utility
function logError(error, context) {
    console.error(`Error in ${context}:`, error);
}

// Pricing toggle functionality
function updatePrice(select, priceId, basePrice) {
    try {
        // Validate inputs
        if (!select || !priceId || typeof basePrice !== 'number') {
            throw new Error('Invalid input parameters');
        }

        const priceDiv = document.getElementById(priceId);
        if (!priceDiv) {
            throw new Error(`Price element with id ${priceId} not found`);
        }

        // Get price elements safely
        let priceElements = [];
        try {
            priceElements = priceDiv.querySelectorAll('.price, .savings');
        } catch (error) {
            logError(error, 'querySelector operation');
            priceElements = [];
        }

        let totalPrice = basePrice;
        let savingsText = '';
        
        // Safely add fade-out class
        try {
            priceElements.forEach(el => {
                if (el && el.classList) {
                    el.classList.add('fade-out');
                }
            });
        } catch (error) {
            logError(error, 'adding fade-out class');
        }
        
        // Calculate new prices with validation
        if (select.value && typeof select.value === 'string') {
            switch(select.value.toLowerCase()) {
                case 'quarterly':
                    totalPrice = basePrice * 0.95 * 3;
                    savingsText = `Save $${(basePrice * 3 - totalPrice).toFixed(0)} over 3 months`;
                    break;
                case 'biannual':
                    totalPrice = basePrice * 0.90 * 6;
                    savingsText = `Save $${(basePrice * 6 - totalPrice).toFixed(0)} over 6 months`;
                    break;
                case 'yearly':
                    totalPrice = basePrice * 0.85 * 12;
                    savingsText = `Save $${(basePrice * 12 - totalPrice).toFixed(0)} over 12 months`;
                    break;
                default:
                    totalPrice = basePrice;
            }
        }
        
        // Update content after fade-out animation with error handling
        setTimeout(() => {
            try {
                if (priceDiv) {
                    priceDiv.innerHTML = `
                        <p class="price text-gold fade-out">$${totalPrice.toFixed(0)}</p>
                        ${savingsText ? `<p class="savings fade-out">${savingsText}</p>` : ''}
                    `;
                    
                    // Safely handle new elements
                    const newElements = priceDiv.querySelectorAll('.price, .savings');
                    if (newElements.length > 0) {
                        newElements.forEach(el => {
                            if (el) {
                                // Trigger reflow safely
                                try {
                                    el.offsetHeight;
                                } catch (error) {
                                    logError(error, 'triggering reflow');
                                }
                                
                                // Add animation classes safely
                                try {
                                    el.classList.remove('fade-out');
                                    el.classList.add('fade-in');
                                } catch (error) {
                                    logError(error, 'adding fade-in class');
                                }
                            }
                        });
                    }
                }
            } catch (error) {
                logError(error, 'updating price content');
            }
        }, 300);
    } catch (error) {
        logError(error, 'price update function');
        // Fallback: display base price without animation
        try {
            const priceDiv = document.getElementById(priceId);
            if (priceDiv) {
                priceDiv.innerHTML = `<p class="price text-gold">$${basePrice.toFixed(0)}</p>`;
            }
        } catch (fallbackError) {
            logError(fallbackError, 'price update fallback');
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Counter animation for statistics
const countUp = (element, target) => {
    let count = 0;
    const speed = 2000 / target;
    
    const timer = setInterval(() => {
        count += 1;
        element.textContent = count;
        
        if (count >= target) {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize counters when in viewport
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            countUp(entry.target, target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5
});

document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
});