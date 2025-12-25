/* ===================================
   Portfolio Website JavaScript
   Handles navigation, smooth scrolling, lightbox, and animations
   =================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* ===================================
     Navigation Menu Toggle (Mobile)
     =================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* ===================================
     Navbar Background on Scroll
     =================================== */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.98)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  /* ===================================
     Active Navigation Link on Scroll
     =================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  /* ===================================
     Smooth Scrolling for Navigation Links
     =================================== */
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===================================
     Gallery Lightbox Functionality
     =================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const title = this.querySelector('.gallery-overlay h4').textContent;
      const description = this.querySelector('.gallery-overlay p').textContent;

      lightboxImage.src = img.src;
      lightboxCaption.textContent = `${title} - ${description}`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  /* ===================================
     Contact Form Submission
     Opens Gmail with pre-filled information
     =================================== */
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const gmailSubject = encodeURIComponent(subject);
    const gmailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=bibekranjan7890@gmail.com&su=${gmailSubject}&body=${gmailBody}`;

    window.open(gmailUrl, '_blank');

    contactForm.reset();

    alert('Your message form will open in Gmail. Please send the email from there.');
  });

  /* ===================================
     Resume Download Button
     =================================== */
  const downloadResumeBtn = document.getElementById('downloadResume');

  downloadResumeBtn.addEventListener('click', function(e) {
    e.preventDefault();

    alert('Resume download functionality would be implemented here.\n\nPlease upload your resume PDF to the project and link it here.');
  });

  /* ===================================
     Scroll to Top Button
     =================================== */
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ===================================
     Intersection Observer for Fade-in Animations
     =================================== */
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

  const animatedElements = document.querySelectorAll(
    '.project-card, .gallery-item, .concept-card, .timeline-item, .skill-category'
  );

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  /* ===================================
     Dynamic Year in Footer
     =================================== */
  const currentYear = new Date().getFullYear();
  const footerText = document.querySelector('.footer-bottom p');
  if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Bibek Ranjan. All rights reserved.`;
  }

  /* ===================================
     Typing Effect for Hero Subtitle (Optional Enhancement)
     =================================== */
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const subtitleText = 'Graphic Designer & Frontend Developer';
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < subtitleText.length) {
      heroSubtitle.textContent = subtitleText.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWriter, 100);
    }
  }

  heroSubtitle.textContent = '';
  setTimeout(typeWriter, 500);

  /* ===================================
     Project Card Link Handling
     =================================== */
  const projectLinks = document.querySelectorAll('.project-link');

  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Project link would open here.\n\nReplace # with your actual project URLs.');
    });
  });

});
