// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active Navigation Link
function setActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

setActiveLink();

// Header show/hide on scroll (fade in/out)
let lastScrollY = window.scrollY;
const headerEl = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (!headerEl) return;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    headerEl.classList.add('hide');
  } else {
    headerEl.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});

// Scroll reveal
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => observer.observe(el));
}

initScrollReveal();

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !phone || !message) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Veuillez entrer une adresse email valide');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      alert('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    // Success message
    alert('Merci pour votre message! Nous vous contacterons bientôt.');
    this.reset();
  });
}

// Modal for Project Details
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
  projectCards.forEach(card => {
    card.addEventListener('click', function () {
      const title = this.querySelector('h3').textContent;
      const image = this.querySelector('img').src;
      const type = this.querySelector('.type').textContent;
      const description = this.querySelector('p').textContent;

      document.getElementById('modalImage').src = image;
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalType').textContent = type;
      document.getElementById('modalDescription').textContent = description;

      modal.classList.add('active');
    });
  });
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

// Close modal when clicking outside
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// Set active navigation on page load
window.addEventListener('load', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
