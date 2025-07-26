// Serelix AI - JavaScript Interactions and Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initScrollEffects();
    initFormValidations();
    initInteractiveElements();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background blur on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animation initialization
function initAnimations() {
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .stat-item, .feature, .tech-item').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    animateCounters();
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on original format
            const originalText = counter.textContent;
            if (originalText.includes('K')) {
                counter.textContent = Math.floor(current) + 'K';
            } else if (originalText.includes('M')) {
                counter.textContent = Math.floor(current) + 'M+';
            } else if (originalText.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('/')) {
                counter.textContent = '24/7';
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-visual');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // Progress bar for page scroll
    createScrollProgress();
}

// Create scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        const progressBarFill = document.querySelector('.scroll-progress-bar');
        if (progressBarFill) {
            progressBarFill.style.width = scrollProgress + '%';
        }
    });
}

// Form validations
function initFormValidations() {
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Real-time email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', validateEmail);
        input.addEventListener('input', clearValidationError);
    });

    // Password strength validation
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.name === 'password') {
            input.addEventListener('input', updatePasswordStrength);
        }
    });

    // Form field animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });

            // Check if field has value on load
            if (input.value) {
                group.classList.add('focused');
            }
        }
    });
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--success-green)';
        
        // Reset form
        setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            
            // Show notification
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    }, 1500);
}

// Email validation
function validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formGroup = e.target.closest('.form-group');
    
    if (email && !emailRegex.test(email)) {
        showFieldError(formGroup, 'Please enter a valid email address');
    } else {
        clearFieldError(formGroup);
    }
}

// Clear validation error
function clearValidationError(e) {
    const formGroup = e.target.closest('.form-group');
    clearFieldError(formGroup);
}

// Show field error
function showFieldError(formGroup, message) {
    clearFieldError(formGroup);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    
    const input = formGroup.querySelector('input, textarea, select');
    input.style.borderColor = 'var(--error-red)';
}

// Clear field error
function clearFieldError(formGroup) {
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    const input = formGroup.querySelector('input, textarea, select');
    input.style.borderColor = '';
}

// Password strength indicator
function updatePasswordStrength(e) {
    const password = e.target.value;
    const strengthIndicator = document.getElementById('passwordStrength');
    
    if (!strengthIndicator) return;
    
    let strength = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character type checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Determine strength level
    if (password.length === 0) {
        feedback = '';
        strengthIndicator.className = 'password-strength';
    } else if (strength <= 2) {
        feedback = 'Weak';
        strengthIndicator.className = 'password-strength weak';
    } else if (strength <= 4) {
        feedback = 'Medium';
        strengthIndicator.className = 'password-strength medium';
    } else {
        feedback = 'Strong';
        strengthIndicator.className = 'password-strength strong';
    }
    
    strengthIndicator.textContent = feedback;
}

// Interactive elements
function initInteractiveElements() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.service-card, .client-card, .dashboard-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Loading states for forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Re-enable after 3 seconds if not handled elsewhere
                setTimeout(() => {
                    if (submitBtn.disabled) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                }, 3000);
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

// Close notification
function closeNotification(closeBtn) {
    const notification = closeBtn.closest('.notification');
    notification.classList.add('hide');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Dashboard specific functions
if (window.location.pathname.includes('dashboard') || window.location.pathname.includes('clients')) {
    initDashboardFeatures();
}

function initDashboardFeatures() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Auto-refresh dashboard stats
    if (window.location.pathname.includes('dashboard')) {
        setInterval(updateDashboardStats, 30000); // Update every 30 seconds
    }

    // Client search functionality
    const searchInput = document.getElementById('clientSearch');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterClients(this.value);
            }, 300);
        });
    }

    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterClientsByStatus(this.value);
        });
    }
}

// Update dashboard stats
function updateDashboardStats() {
    // This would typically fetch fresh data from the API
    console.log('Updating dashboard stats...');
}

// Filter clients by search term
function filterClients(searchTerm) {
    const clientCards = document.querySelectorAll('.client-card');
    const searchLower = searchTerm.toLowerCase();
    
    clientCards.forEach(card => {
        const name = card.dataset.name || '';
        const company = card.dataset.company || '';
        const email = card.querySelector('.detail-item span')?.textContent || '';
        
        const matches = name.includes(searchLower) || 
                       company.includes(searchLower) || 
                       email.toLowerCase().includes(searchLower);
        
        card.style.display = matches ? 'block' : 'none';
    });
}

// Filter clients by status
function filterClientsByStatus(status) {
    const clientCards = document.querySelectorAll('.client-card');
    
    clientCards.forEach(card => {
        if (!status || card.dataset.status === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Utility functions
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

// Add CSS for additional animations and effects
const additionalStyles = `
    .scroll-progress {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(30, 64, 175, 0.1);
        z-index: 999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: var(--gradient-primary);
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .animate-fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group.focused label {
        color: var(--primary-blue);
        transform: translateY(-20px) scale(0.8);
    }
    
    .field-error {
        color: var(--error-red);
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }
    
    .notification-container {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
    }
    
    .notification {
        background: white;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        margin-bottom: 1rem;
        padding: 1rem;
        border-left: 4px solid var(--primary-blue);
        display: flex;
        align-items: center;
        justify-content: space-between;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.hide {
        transform: translateX(100%);
        opacity: 0;
    }
    
    .notification-success {
        border-left-color: var(--success-green);
    }
    
    .notification-error {
        border-left-color: var(--error-red);
    }
    
    .notification-warning {
        border-left-color: var(--warning-yellow);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-400);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: var(--gray-100);
        color: var(--gray-600);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
    }
    
    @media (max-width: 768px) {
        .sidebar-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--gray-600);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.375rem;
            transition: all 0.3s ease;
        }
        
        .sidebar-toggle:hover {
            background: var(--gray-100);
        }
        
        .dashboard-sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .dashboard-sidebar.active {
            transform: translateX(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);