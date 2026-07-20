// Custom JavaScript for "Poco a Poco" YouTube Agency LP

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. FAQ Accordion Interaction
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      
      // Close other active FAQ items (optional, but clean for seniors)
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      
      // Toggle active status
      item.classList.toggle('active');
      
      if (item.classList.contains('active')) {
        // Set dynamic max-height based on scrollHeight for smooth transition
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // 2. Contact Form Submission Simulation
  const inquiryForm = document.getElementById('inquiry-form');
  const successMessage = document.getElementById('form-success-message');
  
  if (inquiryForm && successMessage) {
    inquiryForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Stop page reload
      
      // Fetch input values for validation/feedback
      const name = document.getElementById('name').value;
      const contactinfo = document.getElementById('contactinfo').value;
      const message = document.getElementById('message').value;
      
      // Simple feedback simulation
      if (name && contactinfo && message) {
        // Hide the form
        inquiryForm.style.display = 'none';
        
        // Show the success message
        successMessage.style.display = 'flex';
        
        // Scroll to success message smoothly
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        console.log('Form submitted successfully:', {
          name,
          contactinfo,
          message
        });
      }
    });
  }

  // 3. Header Styling on Scroll
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
  });

});
