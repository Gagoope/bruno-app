/* Typing animation for hero text */
const heroText = document.querySelector('.animate-text');
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = '';
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  typeWriter();
}

// Particle background effect
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'particles';
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '-1';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = Math.random() > 0.5 ? '#007bff' : '#00bfff';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    particlesContainer.appendChild(particle);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-100vh) rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Active nav highlighting for multi-page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav ul li a').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === '#home')) {
    link.classList.add('active');
  }
});

// Enhanced IntersectionObserver for stagger fade-ins
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

let staggerDelay = 0;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, staggerDelay);
      staggerDelay += 100;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.glass, .portfolio-card, .blog-post, .contact-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(item);
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navUl = document.querySelector('nav ul');
if (mobileMenuBtn && navUl) {
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navUl.classList.toggle('mobile-open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });
}

// Keyboard navigation for mobile menu
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      mobileMenuBtn.click();
    }
  });
}

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const navUl = document.querySelector('nav ul');
    if (navUl.classList.contains('mobile-open')) {
      navUl.classList.remove('mobile-open');
      mobileMenuBtn.focus();
    }
  }
});

// Contact link loading states
document.querySelectorAll('.contact-item').forEach(link => {
  link.addEventListener('click', function(e) {
    this.classList.add('loading');
    setTimeout(() => {
      this.classList.remove('loading');
    }, 2000); // Simulate connection time
  });
});

// Reduce particles on reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Override createParticles to use fewer particles
  const originalCreateParticles = createParticles;
  createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 10; i++) { // Reduced from 50
      const particle = document.createElement('div');
      particle.style.width = Math.random() * 4 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = Math.random() > 0.5 ? '#007bff' : '#00bfff';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
      particlesContainer.appendChild(particle);
    }
  };
}

// Scroll-triggered nav shadow
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

// Portfolio Modal Functionality
const modal = document.getElementById('portfolio-modal');
const modalBody = document.getElementById('modal-body');

function openModal(projectId) {
  const projectData = {
    'insurance-training': {
      title: 'Insurance Training Programs',
      description: 'As an Insurance Trainer at the Insurance Training Institute, I have developed and delivered comprehensive training programs on risk management and insurance principles. My role involves creating engaging curriculum, conducting interactive workshops, and mentoring trainees to build their expertise in the insurance sector.',
      details: [
        'Developed comprehensive training modules covering risk assessment, policy management, and compliance',
        'Conducted over 50 training sessions for insurance professionals',
        'Created interactive learning materials and assessment tools',
        'Mentored junior trainers and provided ongoing support to trainees'
      ]
    },
    'client-solicitation': {
      title: 'Client Solicitation Projects',
      description: 'At Firstsun Alliance Insurance Brokers, I successfully solicited new clients and captured business, contributing significantly to company growth. My approach focused on building strong relationships, understanding client needs, and providing tailored insurance solutions.',
      details: [
        'Successfully acquired 25+ new clients within 10 months',
        'Increased business revenue by 30% through targeted solicitation strategies',
        'Developed client relationship management protocols',
        'Conducted market research to identify potential client segments'
      ]
    },
    'workshop-assistance': {
      title: 'Workshop Assistance',
      description: 'Provided support in workshops at Altonevile Holdings, assisting in various tasks and gaining hands-on experience in operational environments. This role enhanced my understanding of practical business operations and team collaboration.',
      details: [
        'Assisted in organizing and executing workshop activities',
        'Managed logistics and participant coordination',
        'Contributed to workshop content development',
        'Gained experience in operational management and team coordination'
      ]
    },
    'risk-management': {
      title: 'Risk Management Education',
      description: 'Through my B.Com (Hons) in Risk Management and Insurance from Ba Isago University, I have built a strong foundation in analyzing and mitigating risks across various sectors. My academic background provides me with theoretical knowledge and practical skills in risk assessment and management.',
      details: [
        'Completed comprehensive coursework in risk analysis and insurance principles',
        'Developed expertise in financial risk management and regulatory compliance',
        'Conducted research projects on emerging risk trends in Botswana',
        'Achieved academic excellence with honors degree recognition'
      ]
    }
  };

  const project = projectData[projectId];
  if (project) {
    modalBody.innerHTML = `
      <h3 id="modal-title">${project.title}</h3>
      <p>${project.description}</p>
      <ul>
        ${project.details.map(detail => `<li>${detail}</li>`).join('')}
      </ul>
      <button id="back-to-portfolio" class="btn">Back to Portfolio</button>
    `;
    modal.style.display = 'block';
    modal.classList.add('opening');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Focus management
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const previouslyFocusedElement = document.activeElement;

    firstFocusableElement.focus();

    // Trap focus inside modal
    modal.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });

    // Add staggered animation class
    setTimeout(() => {
      modalBody.classList.add('animate-content');
    }, 100);

    // Create modal particles
    createModalParticles();

    // Back button event listener
    const backButton = document.getElementById('back-to-portfolio');
    if (backButton) {
      backButton.addEventListener('click', function() {
        closeModal();
        document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Store previously focused element for restoration
    modal._previouslyFocusedElement = previouslyFocusedElement;
  }
}

function closeModal() {
  modal.style.display = 'none';
  modal.classList.remove('opening');
  document.body.style.overflow = 'auto'; // Restore scrolling

  // Restore focus to previously focused element
  if (modal._previouslyFocusedElement) {
    modal._previouslyFocusedElement.focus();
  }

  // Remove modal particles
  const modalParticles = document.getElementById('modal-particles');
  if (modalParticles) {
    modalParticles.remove();
  }

  // Remove animation class
  modalBody.classList.remove('animate-content');
}

// Attach modal functions to global scope for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});

// Create modal particles function
function createModalParticles() {
  const modalParticlesContainer = document.createElement('div');
  modalParticlesContainer.id = 'modal-particles';
  modalParticlesContainer.style.position = 'absolute';
  modalParticlesContainer.style.top = '0';
  modalParticlesContainer.style.left = '0';
  modalParticlesContainer.style.width = '100%';
  modalParticlesContainer.style.height = '100%';
  modalParticlesContainer.style.pointerEvents = 'none';
  modalParticlesContainer.style.zIndex = '1';
  modalParticlesContainer.style.overflow = 'hidden';
  modalParticlesContainer.style.borderRadius = '15px';

  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.appendChild(modalParticlesContainer);

    const particleCount = window.matchMedia('(max-width: 768px)').matches ? 10 : 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 3 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = Math.random() > 0.5 ? '#007bff' : '#00bfff';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      particle.style.animation = `modalFloat ${Math.random() * 8 + 6}s linear infinite`;
      modalParticlesContainer.appendChild(particle);
    }
  }
}

// Add modalFloat keyframes
const modalStyle = document.createElement('style');
modalStyle.textContent = `
  @keyframes modalFloat {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-100%) rotate(360deg); }
  }
`;
document.head.appendChild(modalStyle);

// Portfolio card hover glow
document.addEventListener('DOMContentLoaded', function() {
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('glowing');
    });
    card.addEventListener('mouseleave', function() {
      this.classList.remove('glowing');
    });
  });
});

// Initialize on load
window.addEventListener('load', () => {
  createParticles();
  document.body.style.opacity = '1';
});
