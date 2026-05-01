// script.js - Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page-specific functionality
    initNavigation();
    
    // Check which page we're on and initialize accordingly
    if (document.getElementById('bookingForm')) {
        initBookingForm();
    }
    
    if (document.getElementById('galleryGrid')) {
        initGallery();
    }
});

/**
 * Navigation functionality
 * Adds scroll effect to navbar and handles mobile menu (if needed)
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-solid');
        } else {
            navbar.classList.remove('navbar-solid');
        }
    });
}

/**
 * Navigate to Gallery Page
 * Uses window.location.href for page redirection as per requirements
 */
function navigateToGallery() {
    // Simulate a brief loading state or transition if desired
    window.location.href = 'gallery.html';
}

/**
 * Navigate to Home Page
 * Used by the back button in gallery
 */
function navigateToHome() {
    window.location.href = 'interface.html';
}

/**
 * Booking Form Initialization
 * Handles validation, Promise-based submission simulation, and DOM updates
 */
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const confirmationMsg = document.getElementById('confirmationMessage');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Disable button and show loading state
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                date: document.getElementById('date').value
            };
            
            // Simulate booking process using Promises and setTimeout
            simulateBooking(formData)
                .then(function(response) {
                    // Success - hide loader and show confirmation
                    btnText.classList.remove('hidden');
                    btnLoader.classList.add('hidden');
                    submitBtn.disabled = false;
                    
                    // Display confirmation message dynamically using DOM
                    showConfirmation();
                    
                    // Reset form
                    form.reset();
                })
                .catch(function(error) {
                    // Error handling
                    console.error('Booking error:', error);
                    alert('An error occurred. Please try again.');
                    submitBtn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnLoader.classList.add('hidden');
                });
        }
    });

    // Real-time validation on input
    const inputs = form.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            this.classList.remove('error');
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
}

/**
 * Form Validation
 * Validates name, email, and date fields
 * Returns boolean indicating if form is valid
 */
function validateForm() {
    let isValid = true;
    
    // Name validation
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    const nameValue = nameInput.value.trim();
    
    if (nameValue === '') {
        showError(nameInput, nameError, 'Please enter your full name');
        isValid = false;
    } else if (nameValue.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters');
        isValid = false;
    }

    // Email validation
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailValue = emailInput.value.trim();
    
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '') {
        showError(emailInput, emailError, 'Please enter your email address');
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    }

    // Date validation
    const dateInput = document.getElementById('date');
    const dateError = document.getElementById('dateError');
    const dateValue = dateInput.value;
    
    if (dateValue === '') {
        showError(dateInput, dateError, 'Please select a preferred date');
        isValid = false;
    } else {
        // Check if selected date is in the past
        const selectedDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError(dateInput, dateError, 'Please select a future date');
            isValid = false;
        }
    }

    return isValid;
}

/**
 * Show Error Function
 * Adds error styling and displays error message
 */
function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
}

/**
 * Clear All Errors
 * Removes error styling and messages from all fields
 */
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorInputs = document.querySelectorAll('.error');
    
    errorMessages.forEach(function(el) {
        el.textContent = '';
    });
    
    errorInputs.forEach(function(el) {
        el.classList.remove('error');
    });
}

/**
 * Simulate Booking Process
 * Returns a Promise that resolves after setTimeout delay
 * Simulates server communication
 */
function simulateBooking(formData) {
    return new Promise(function(resolve, reject) {
        // Simulate network delay with setTimeout (2 seconds)
        setTimeout(function() {
            // Log the booking data (in real app, this would be sent to server)
            console.log('Booking confirmed:', formData);
            
            // Resolve the promise to indicate success
            resolve({
                success: true,
                message: 'Booking confirmed successfully',
                bookingId: 'BK' + Date.now()
            });
        }, 2000);
    });
}

/**
 * Show Confirmation Message
 * Dynamically displays the confirmation message using DOM manipulation
 */
function showConfirmation() {
    const confirmationMsg = document.getElementById('confirmationMessage');
    
    // Remove hidden class to show the message
    confirmationMsg.classList.remove('hidden');
    
    // Scroll to confirmation message
    confirmationMsg.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
    
    // Optional: Hide confirmation after 5 seconds
    setTimeout(function() {
        confirmationMsg.classList.add('hidden');
    }, 5000);
}

/**
 * Gallery Initialization
 * Uses Fetch API to load images dynamically from Unsplash
 */
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loader = document.getElementById('galleryLoader');
    const errorContainer = document.getElementById('galleryError');
    
    // Unsplash API configuration
    // Using Unsplash Source API for demo purposes
    // In production, you should use proper API keys and endpoints
    const imageIds = [
        'photo-1492691527719-9d1e07e534b4',
        'photo-1516035069371-29a1b244cc32',
        'photo-1502982720700-bfff97f2ecac',
        'photo-1452587925148-ce544e77e70d',
        'photo-1519741497674-611481863552',
        'photo-1500634245200-e5245c7574ef',
        'photo-1470071459604-3b5ec3a7fe05',
        'photo-1447752875215-b2761acb3c5d',
        'photo-1513694203232-719a280e022f'
    ];
    
    // Simulate API call with Promise and Fetch
    // Using Promise.all to fetch multiple images
    const imagePromises = imageIds.map(function(id, index) {
        return new Promise(function(resolve, reject) {
            // Simulate network delay for each image
            setTimeout(function() {
                // Create image object with metadata
                resolve({
                    id: index + 1,
                    url: `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
                    title: getImageTitle(index),
                    category: getImageCategory(index)
                });
            }, 300 * index); // Staggered loading effect
        });
    });
    
    // Wait for all images to "load" (simulated)
    Promise.all(imagePromises)
        .then(function(images) {
            // Hide loader
            loader.classList.add('hidden');
            
            // Display gallery
            galleryGrid.classList.remove('hidden');
            
            // Render images to DOM
            renderGallery(images);
        })
        .catch(function(error) {
            // Handle errors
            console.error('Error loading gallery:', error);
            loader.classList.add('hidden');
            errorContainer.classList.remove('hidden');
        });
}

/**
 * Render Gallery Images
 * Dynamically creates gallery items and appends to DOM
 */
function renderGallery(images) {
    const galleryGrid = document.getElementById('galleryGrid');
    
    images.forEach(function(image, index) {
        // Create gallery item element
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = (index * 0.1) + 's';
        
        // Create image element
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.title;
        img.loading = 'lazy'; // Lazy loading for performance
        
        // Create info overlay
        const info = document.createElement('div');
        info.className = 'gallery-item-info';
        
        const title = document.createElement('h3');
        title.className = 'gallery-item-title';
        title.textContent = image.title;
        
        const category = document.createElement('span');
        category.className = 'gallery-item-category';
        category.textContent = image.category;
        
        // Assemble elements
        info.appendChild(title);
        info.appendChild(category);
        item.appendChild(img);
        item.appendChild(info);
        
        // Add click event for lightbox (optional enhancement)
        item.addEventListener('click', function() {
            openLightbox(image);
        });
        
        // Append to grid
        galleryGrid.appendChild(item);
    });
}

/**
 * Get Image Title
 * Returns title based on index for variety
 */
function getImageTitle(index) {
    const titles = [
        'Midnight in Paris',
        'Urban Shadows',
        'Golden Hour',
        'Silent Streets',
        'Neon Dreams',
        'Cinematic Portrait',
        'Nature\'s Canvas',
        'Abstract Light',
        'Timeless Moments'
    ];
    return titles[index] || 'Untitled';
}

/**
 * Get Image Category
 * Returns category based on index
 */
function getImageCategory(index) {
    const categories = [
        'Street',
        'Urban',
        'Landscape',
        'Documentary',
        'Night',
        'Portrait',
        'Nature',
        'Abstract',
        'Lifestyle'
    ];
    return categories[index] || 'Photography';
}

/**
 * Open Lightbox (Optional enhancement)
 * Displays full-size image in modal
 */
function openLightbox(image) {
    // Simple lightbox implementation
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${image.url.replace('w=800', 'w=1600')}" alt="${image.title}">
            <div class="lightbox-caption">
                <h3>${image.title}</h3>
                <p>${image.category}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.className === 'lightbox-close') {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }
    });
    
    // Add lightbox styles dynamically if not in CSS
    if (!document.getElementById('lightbox-styles')) {
        const styles = document.createElement('style');
        styles.id = 'lightbox-styles';
        styles.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 85vh;
                object-fit: contain;
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: #fff;
                font-size: 2rem;
                cursor: pointer;
                transition: color 0.3s;
            }
            .lightbox-close:hover {
                color: var(--accent-gold);
            }
            .lightbox-caption {
                text-align: center;
                margin-top: 1rem;
                color: #fff;
            }
            .lightbox-caption h3 {
                font-family: var(--font-display);
                color: var(--accent-gold);
                margin-bottom: 0.5rem;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Export functions for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        simulateBooking,
        navigateToGallery
    };
}