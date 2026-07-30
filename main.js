// Custom JavaScript for "Poco a Poco" YouTube Agency LP

document.addEventListener('DOMContentLoaded', () => {
  // Remove no-js class to enable scroll animations
  document.body.classList.remove('no-js');
  
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

  // 2. Contact Form Submission with FormSubmit
  const inquiryForm = document.getElementById('inquiry-form');
  const successMessage = document.getElementById('form-success-message');
  
  if (inquiryForm && successMessage) {
    inquiryForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Stop page reload
      
      const submitButton = inquiryForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerText;
      submitButton.disabled = true;
      submitButton.innerText = '送信しています...';

      // Fetch input values for submission
      const name = document.getElementById('name').value;
      const contactinfo = document.getElementById('contactinfo').value;
      const message = document.getElementById('message').value;
      
      if (name && contactinfo && message) {
        // Send actual email via FormSubmit AJAX API to user email
        fetch("https://formsubmit.co/ajax/contact.tsc2026@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "お名前": name,
            "ご連絡先": contactinfo,
            "ご相談内容": message
          })
        })
        .then(response => {
          if (response.ok) {
            // Hide the form
            inquiryForm.style.display = 'none';
            // Show the success message
            successMessage.style.display = 'flex';
            // Scroll to success message smoothly
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            alert('送信に失敗しました。恐れ入りますが、LINEからお問い合わせいただくか、時間をおいて再度お試しください。');
            submitButton.disabled = false;
            submitButton.innerText = originalButtonText;
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          alert('通信エラーが発生しました。インターネット接続を確認いただくか、LINEからお問い合わせください。');
          submitButton.disabled = false;
          submitButton.innerText = originalButtonText;
        });
      } else {
        submitButton.disabled = false;
        submitButton.innerText = originalButtonText;
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

  // 4. Scroll Reveal Animation (techbiz style)
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
        // Once revealed, no need to track it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -5% 0px', // Trigger slightly before element enters full view
    threshold: 0.02 // Extremely low threshold so large mobile cards animate instantly
  });

  revealElements.forEach(el => observer.observe(el));

  // 5. Hamburger / Mobile Navigation Drawer
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav    = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavClose   = document.getElementById('mobile-nav-close');
  const mobileNavLinks   = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    mobileNavOverlay.style.display = 'block';
    // small delay to allow display:block to take effect before opacity transition
    requestAnimationFrame(() => mobileNavOverlay.classList.add('is-open'));
    hamburgerBtn.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    mobileNavOverlay.classList.remove('is-open');
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Hide overlay after transition
    mobileNavOverlay.addEventListener('transitionend', () => {
      if (!mobileNavOverlay.classList.contains('is-open')) {
        mobileNavOverlay.style.display = 'none';
      }
    }, { once: true });
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.contains('is-open') ? closeMobileNav() : openMobileNav();
    });
  }

  if (mobileNavClose)    mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay)  mobileNavOverlay.addEventListener('click', closeMobileNav);

  // Close drawer when a nav link is clicked
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // Close drawer when resized to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

});
