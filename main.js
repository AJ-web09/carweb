// Main Dashboard Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
  
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.navbar-nav');
    
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
          }
        }
      });
    });
  
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, you would handle logout logic here
        window.location.href = 'index.html';
      });
    }
  
    // Gallery tabs
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    
    galleryTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        galleryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Filter gallery items
        const category = this.dataset.category;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  
    // Vehicles tabs
    const vehiclesTabs = document.querySelectorAll('.vehicles-tab');
    const vehiclesContents = document.querySelectorAll('.vehicles-content');
    
    vehiclesTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and contents
        vehiclesTabs.forEach(t => t.classList.remove('active'));
        vehiclesContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding content
        const type = this.dataset.type;
        document.getElementById(`vehicles-${type}`).classList.add('active');
      });
    });
  
    // Rental modal
    const modal = document.getElementById('rental-modal');
    const rentButtons = document.querySelectorAll('.rent-btn');
    const closeModal = document.querySelector('.modal-close');
    const confirmRental = document.getElementById('confirm-rental');
    
    // Vehicle data (in a real app, this would come from a database)
    const vehicles = {
      1: { name: "Tesla Model S", type: "Electric Sedan", price: 150 },
      2: { name: "BMW X5", type: "Luxury SUV", price: 180 },
      3: { name: "Mercedes C-Class", type: "Luxury Sedan", price: 160 },
      4: { name: "Toyota Camry", type: "Sedan", price: 90 },
      5: { name: "Harley-Davidson Iron 883", type: "Cruiser", price: 120 },
      6: { name: "Ducati Panigale V4", type: "Sport", price: 200 },
      7: { name: "Kawasaki Ninja 650", type: "Sport", price: 110 },
      8: { name: "Honda CB500F", type: "Standard", price: 85 }
    };
    
    // Set minimum date for date inputs to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('pickup-date').min = today;
    document.getElementById('return-date').min = today;
    
    rentButtons.forEach(button => {
      button.addEventListener('click', function() {
        const vehicleId = this.dataset.id;
        const vehicle = vehicles[vehicleId];
        
        document.getElementById('vehicle-name').textContent = vehicle.name;
        
        modal.classList.add('active');
      });
    });
    
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
    
    if (confirmRental) {
      confirmRental.addEventListener('click', function() {
        const pickupDate = document.getElementById('pickup-date').value;
        const returnDate = document.getElementById('return-date').value;
        const renterName = document.getElementById('renter-name').value;
        const renterPhone = document.getElementById('renter-phone').value;
        
        if (!pickupDate || !returnDate || !renterName || !renterPhone) {
          showToast('Error', 'Please fill in all fields', 'error');
          return;
        }
        
        // In a real app, you would send this data to a server
        console.log('Rental confirmed:', { pickupDate, returnDate, renterName, renterPhone });
        
        modal.classList.remove('active');
        showToast('Booking Confirmed', 'Your rental has been successfully booked!', 'success');
      });
    }
  
    // Extend rental functionality
    const extendButtons = document.querySelectorAll('.extend-btn');
    
    extendButtons.forEach(button => {
      button.addEventListener('click', function() {
        const rentalId = this.dataset.id;
        // In a real app, you would handle the extension logic
        console.log('Extending rental:', rentalId);
        showToast('Rental Extended', 'Your rental has been extended by 3 days.', 'success');
      });
    });
  
    // Cancel rental functionality
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    
    cancelButtons.forEach(button => {
      button.addEventListener('click', function() {
        const rentalId = this.dataset.id;
        const card = this.closest('.rented-card');
        
        // In a real app, you would send a cancellation request to the server
        console.log('Cancelling rental:', rentalId);
        
        // Remove the card from the UI
        card.remove();
        
        showToast('Rental Cancelled', 'Your rental has been cancelled successfully.', 'success');
      });
    });
  
    // Review rating functionality
    const ratingStars = document.querySelectorAll('.rating-star');
    let selectedRating = 5;
    
    // Initialize stars
    updateStars(selectedRating);
    
    ratingStars.forEach(star => {
      star.addEventListener('mouseover', function() {
        const rating = parseInt(this.dataset.rating);
        highlightStars(rating);
      });
      
      star.addEventListener('mouseout', function() {
        highlightStars(selectedRating);
      });
      
      star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.rating);
        highlightStars(selectedRating);
      });
    });
    
    function highlightStars(rating) {
      ratingStars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    }
    
    function updateStars(rating) {
      ratingStars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    }
  
    // Submit review functionality
    const submitReviewBtn = document.getElementById('submit-review');
    
    if (submitReviewBtn) {
      submitReviewBtn.addEventListener('click', function() {
        const reviewText = document.getElementById('review-text').value;
        
        if (!reviewText.trim()) {
          showToast('Error', 'Please enter a review before submitting.', 'error');
          return;
        }
        
        // In a real app, you would send this data to a server
        console.log('Review submitted:', { rating: selectedRating, text: reviewText });
        
        // Add the new review to the UI
        const reviewsList = document.querySelector('.reviews-list');
        const currentDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        const newReview = document.createElement('div');
        newReview.className = 'review-card';
        newReview.innerHTML = `
          <div class="review-content">
            <div class="review-header">
              <div>
                <h3>You</h3>
                <p>${currentDate}</p>
              </div>
              <div class="review-rating">
                ${generateStarRating(selectedRating)}
              </div>
            </div>
            <p>${reviewText}</p>
          </div>
        `;
        
        reviewsList.insertBefore(newReview, reviewsList.firstChild);
        
        // Reset the form
        document.getElementById('review-text').value = '';
        selectedRating = 5;
        updateStars(selectedRating);
        
        showToast('Review Submitted', 'Thank you for your feedback!', 'success');
      });
    }
    
    function generateStarRating(rating) {
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars += '<i class="fas fa-star"></i>';
        } else {
          stars += '<i class="far fa-star"></i>';
        }
      }
      return stars;
    }
  
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const message = document.getElementById('contact-message').value;
        
        // In a real app, you would send this data to a server
        console.log('Contact form submitted:', { name, email, phone, message });
        
        // Reset the form
        contactForm.reset();
        
        showToast('Message Sent', 'We\'ll get back to you as soon as possible!', 'success');
      });
    }
  
    // Toast notification functionality
    const toast = document.getElementById('toast');
    const toastTitle = document.querySelector('.toast-title');
    const toastMessage = document.querySelector('.toast-message');
    const toastClose = document.querySelector('.toast-close');
    
    function showToast(title, message, type = 'success') {
      toastTitle.textContent = title;
      toastMessage.textContent = message;
      
      // Set toast color based on type
      if (type === 'error') {
        toastTitle.style.color = (--danger-color);
      } else {
        toastTitle.style.color = (--success-color);
      }
      
      toast.classList.add('show');
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
    
    if (toastClose) {
      toastClose.addEventListener('click', function() {
        toast.classList.remove('show');
      });
    }
  });