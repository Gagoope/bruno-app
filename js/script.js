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

// Chatbot Functionality
const chatModal = document.getElementById('chat-modal');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message');
const chatToggle = document.getElementById('chat-toggle');

// Add accessibility attributes
if (chatModal) {
  chatModal.setAttribute('aria-label', 'Chat modal for interacting with Kebatho\'s virtual assistant');
  chatModal.setAttribute('role', 'dialog');
}
if (chatInput) {
  chatInput.setAttribute('aria-label', 'Type your message here');
  chatInput.setAttribute('placeholder', 'Type your message...');
}
if (sendMessageBtn) {
  sendMessageBtn.setAttribute('aria-label', 'Send message');
}
if (chatToggle) {
  chatToggle.setAttribute('aria-label', 'Open chat with Kebatho\'s assistant');
}

// Conversation history for context (max 5 exchanges)
let conversationHistory = [];

function openChatModal() {
  chatModal.style.display = 'block';
  chatModal.classList.add('opening');
  document.body.style.overflow = 'hidden';
  chatInput.focus();
}

function closeChatModal() {
  chatModal.style.display = 'none';
  chatModal.classList.remove('opening');
  document.body.style.overflow = 'auto';
}

function addMessage(content, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (type === 'bot') {
    simulateTyping(content, messageDiv);
  } else {
    messageDiv.textContent = content;
  }

  // Log to conversation history (max 5 exchanges)
  conversationHistory.push({ type, content });
  if (conversationHistory.length > 5) {
    conversationHistory.shift(); // Remove oldest
  }
}

function simulateTyping(text, element) {
  element.textContent = '';
  let index = 0;
  const speed = 30;

  const typing = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } else {
      clearInterval(typing);
    }
  }, speed);
}

function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();

  // Helper function to get or set usage counter in localStorage
  function getUsageCounter(key) {
    return parseInt(localStorage.getItem(key) || '0');
  }
  function setUsageCounter(key, value) {
    localStorage.setItem(key, value.toString());
  }

  // Helper function to get stored user name
  function getUserName() {
    return localStorage.getItem('userName');
  }
  function setUserName(name) {
    localStorage.setItem('userName', name);
  }

  // Check for user name introduction
  const namePatterns = [
    /i'm\s+([a-zA-Z\s]+)/i,
    /my name is\s+([a-zA-Z\s]+)/i,
    /i am\s+([a-zA-Z\s]+)/i,
    /call me\s+([a-zA-Z\s]+)/i
  ];
  for (const pattern of namePatterns) {
    const match = userMessage.match(pattern);
    if (match) {
      const name = match[1].trim();
      setUserName(name);
      return `Nice to meet you, ${name}! I'm Kebatho's virtual assistant. How can I help you today? 😊`;
    }
  }

  // Check for reset command
  if (message === 'reset' || message === 'clear') {
    conversationHistory = [];
    localStorage.clear();
    return "Conversation history and preferences have been reset! Starting fresh. How can I help you today? 🔄";
  }

  // Check conversation history for context (e.g., reference previous topics)
  const lastBotMessage = conversationHistory.slice().reverse().find(entry => entry.type === 'bot');
  const lastUserMessage = conversationHistory.slice().reverse().find(entry => entry.type === 'user');

  // Context-aware responses
  if (message.includes('what about that') || message.includes('tell me more') || message.includes('elaborate')) {
    if (lastBotMessage && lastBotMessage.content.includes('skills')) {
      return "Building on my skills, I'm particularly strong in analytical thinking—perfect for assessing insurance risks. My presentation skills help me train others effectively. What aspect interests you most? 📈";
    } else if (lastBotMessage && lastBotMessage.content.includes('experience')) {
      return "Regarding my experience, my time as an Insurance Trainer has been the most rewarding. I've developed custom programs that boosted trainees' confidence by 40%. Curious about a specific role? 🎓";
    } else if (lastBotMessage && lastBotMessage.content.includes('education')) {
      return "On education, my B.Com (Hons) in Risk Management and Insurance gave me a solid foundation in financial modeling and compliance. It prepared me for real-world challenges in Botswana's insurance sector. Any questions about my studies? 📚";
    } else if (lastBotMessage && lastBotMessage.content.includes('portfolio')) {
      return "Kebatho's portfolio showcases his expertise in insurance training, client solicitation, workshop assistance, and risk management education. Each project demonstrates his commitment to excellence in the insurance sector. Want to explore a specific project? 📁";
    } else if (lastBotMessage && lastBotMessage.content.includes('contact')) {
      return "Kebatho is easily reachable via phone (+267 74148488), email (kebathomodise3@gmail.com), or WhatsApp. He's always open to discussing opportunities in risk management and insurance training. Ready to connect? 📞";
    } else if (lastBotMessage && lastBotMessage.content.includes('social')) {
      return "On social media, Kebatho shares insights on risk management, insurance trends, and professional development. Follow him for valuable content and networking opportunities. Which platform interests you most? 📱";
    }
  }

  // Check for numbers and calculate sum of odd numbers
  const numberRegex = /\d+/g;
  const numbers = userMessage.match(numberRegex);
  if (numbers) {
    const nums = numbers.map(n => parseInt(n));
    const oddNumbers = nums.filter(n => n % 2 !== 0);
    if (oddNumbers.length > 0) {
      const sum = oddNumbers.reduce((a, b) => a + b, 0);
      const oddList = oddNumbers.join(' + ');
      return `I found some odd numbers in your message: ${oddList}. Their sum is ${sum}! In risk management, understanding odds helps assess probabilities. 🔢`;
    }
  }

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    const userName = getUserName();
    const greetings = [
      `Hello${userName ? ` ${userName}` : ''}! I'm Kebatho's virtual assistant. How can I help you today? 😊`,
      `Hi${userName ? ` ${userName}` : ''}! Nice to meet you. What can I assist with regarding Kebatho? 👋`,
      `Hey${userName ? ` ${userName}` : ''}! Ready to chat about Kebatho's portfolio or skills? Let's dive in! 🚀`
    ];
    const counter = getUsageCounter('helloCounter');
    const response = greetings[counter % greetings.length];
    setUsageCounter('helloCounter', counter + 1);
    return response;
  } else if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
    const farewells = [
      "Goodbye! Don't forget to check out Kebatho's amazing portfolio. Come back soon! 👋",
      "See you later! Hope you enjoyed learning about Kebatho. Take care! 😊",
      "Farewell! Remember, Kebatho's always here in spirit. Bye for now! 🌟"
    ];
    const counter = getUsageCounter('byeCounter');
    const response = farewells[counter % farewells.length];
    setUsageCounter('byeCounter', counter + 1);
    return response;
  } else if (message.includes('joke') || message.includes('funny')) {
    const jokes = [
      "Why did the risk manager bring a ladder to work? Because he heard the stakes were high! 😂",
      "What do you call an insurance policy for a smartphone? A 'cell' phone insurance! 📱",
      "Why was the math book sad? Because it had too many problems! 📚",
      "Why did the actuary break up with the statistician? There was no significant relationship! 📊",
      "What's an insurance agent's favorite type of music? Risk and roll! 🎸",
      "Why don't actuaries play hide and seek? Because good luck hiding when they're always calculating the odds! 😏",
      "What did the underwriter say to the risky applicant? \"You're a high premium waiting to happen!\" 💰",
      "Why was the risk manager always calm? He knew how to hedge his bets! 🛡️",
      "How does an insurance broker apologize? \"Sorry, that was a coverage oversight!\" 🤦‍♂️",
      "Why did the policyholder go to therapy? Too many deductibles weighing him down! 🛋️",
      "What's a risk analyst's favorite game? Probability poker! 🃏",
      "Why did the claims adjuster become a chef? He was great at settling disputes! 🍳",
      "How do you know if someone is an actuary? Don't worry, they'll tell you the probability! 📈",
      "Why was the insurance policy cold? It had too many exclusions! ❄️",
      "What did the reinsurance company say? \"We're here to take the risk off your hands!\" 🤝",
      "Why did the broker carry a ladder? To reach those high-risk clients! ⛓️",
      "What's an underwriter's motto? \"Assess twice, approve once!\" 🔍",
      "Why don't risks play cards? They're afraid of the wild cards! 🃏",
      "How does a risk manager exercise? By jumping to conclusions carefully! 💪",
      "Why was the premium so high? The risk was off the charts! 📊",
      "What's the best way to avoid risk? Buy insurance... and read the fine print! 📖",
      "Why did the actuary love math? It was all about the expected value! ❤️",
      "How do insurance agents stay cool? They have great coverage! 🕶️",
      "Why was the claim denied? It didn't meet the policy's expectations! ❌",
      "What did the statistician say to the probabilist? \"The odds are in our favor!\" 👍",
      "Why did the risk assessor quit? Too many unknowns! ❓",
      "What's a broker's favorite snack? Risk-ets! 🍿",
      "Why do actuaries make great friends? They always calculate the best outcomes! 👫",
      "How does an underwriter party? With calculated risks! 🎉",
      "Why was the policy late? It got lost in the fine print! 🐌",
      "What's the risk manager's superpower? Seeing hazards from a mile away! 🦸‍♂️",
      "Why did the insurance company hire a poet? For better policy verses! 📝",
      "How do you spot a bad risk? It comes with too many red flags! 🚩",
      "Why was the actuary bad at jokes? His timing was all about variance! ⏰",
      "What did the claim say to the adjuster? \"Don't leave me hanging!\" ⚖️",
      "Why do risks hate math? Too many variables! ➗",
      "What's an insurance trainer's favorite exercise? Risk reps! 🏋️‍♂️",
      "Why did the policy go to school? To get a higher coverage! 🎓",
      "How does a broker fix a mistake? With an endorsement! ✏️",
      "Why was the risk low? It was well-insured! 🛡️",
      "What's the actuary's favorite movie? The Probability of Rain Man! 🎥",
      "Why did the underwriter meditate? To handle the stress tests! 🧘‍♂️",
      "How do insurance pros celebrate? With a toast to low claims! 🥂",
      "Why was the premium funny? It was a real payout! 💸",
      "What did the risk say to the manager? \"I'm inevitable!\" 😈",
      "Why do actuaries love puzzles? They're all about fitting the pieces of probability! 🧩",
      "How does a claims handler unwind? By adjusting attitudes! 😌",
      "Why was the policy shy? It had too many conditions! 🙈",
      "What's a broker's dream? Closing deals without objections! 💭",
      "Why did the statistician go broke? Bad correlations! 📉",
      "How do risks travel? In bundles! 📦",
      "Why was the insurance class boring? Too much coverage! 😴",
      "What's the best insurance pun? One with full protection! 🛡️",
      "Why did the actuary win the race? He calculated the shortest path! 🏁",
      "How does an underwriter say goodbye? \"Stay covered!\" 👋",
      "Why was the claim happy? It got settled quickly! 😊",
      "What did the policy say to the rider? \"You're an add-on!\" ➕",
      "Why do risk managers read mysteries? To predict the twists! 📚",
      "How do you insure a joke? With a punchline policy! 👊",
      "Why was the premium salty? It was overcharged! 🧂",
      "What's an actuary's pet? A probability pup! 🐶",
      "Why did the broker call? To premium you! 📞",
      "How does insurance handle fear? With peace of mind! 🧠",
      "Why was the risk assessment thorough? No stone unturned! 🔍",
      "What's the funniest part of insurance? The deductibles! 😂",
      "Why did the trainer love risks? They made great teaching moments! 👨‍🏫",
      "How do policies flirt? With attractive rates! 😉",
      "Why was the claim a comedian? It always got the last laugh! 🎤",
      "What's the end of every good risk joke? A safe punchline! 🛡️"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  } else if (message.includes('hilarious') || message.includes('funny') || message.includes('lol') || message.includes('haha') || message.includes('lmao') || message.includes('rofl')) {
    const laughResponses = [
      "Glad you enjoyed the joke! Want to hear another one? Just say 'joke'! 😄",
      "Haha, I'm glad that tickled your funny bone! More jokes? Type 'joke'! 😂",
      "Laughter is the best medicine! Ready for another joke? Say the word! 😆"
    ];
    const counter = getUsageCounter('laughCounter');
    const response = laughResponses[counter % laughResponses.length];
    setUsageCounter('laughCounter', counter + 1);
    return response;
  } else if (message.includes('about') || message.includes('background') || message.includes('bio')) {
    return "I am Kebatho Modise, a Risk Management and Insurance Degree Holder from Botswana. I have 10 months' experience in client solicitation and 2 years 6 months as an Insurance Trainer. I'm passionate about risk management and insurance education. Fun fact: I once trained a group of trainees who thought 'risk' was just a board game! 🎲";
  } else if (message.includes('education') || message.includes('degree') || message.includes('school')) {
    return "I hold a B.Com (Hons) Degree in Risk Management and Insurance from Ba Isago University (July 2018 - December 2022). I also completed my BGCSE at Nata Senior Secondary School (February 2016 - November 2017). Pro tip: Studying risk management taught me that the biggest risk is not having coffee in the morning! ☕";
  } else if (message.includes('experience') || message.includes('work') || message.includes('job')) {
    return "My professional experience includes: Insurance Trainer (Certificate of Proficiency) at Insurance Training Institute (June 2023 - Present, 2 years 6 months), Sales Person at Firstsun Alliance Insurance Brokers (February 2021 - November 2021), and Workshop Assistant at Altonevile Holdings (PTY) LTD (December 2017 - June 2018). I've trained so many people, I could start my own 'Insurance University'! 🎓";
  } else if (message.includes('skills') || message.includes('competencies') || message.includes('abilities')) {
    return "My core competencies include: Communication Skills (90%), Critical Thinking (85%), Analytical Skills (88%), Presentation Skills (82%), Microsoft Office (95%), Customer Orientation (87%), and Collaboration (80%). I'm so good at presentations, I could sell ice to Eskimos! 🧊";
  } else if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
    return "You can contact me at: Phone: +267 74148488 / 77998793, Email: kebathomodise3@gmail.com, or WhatsApp: +267 74148488. Feel free to reach out! Just don't call me at 3 AM unless it's about free pizza. 🍕";
  } else if (message.includes('portfolio') || message.includes('projects')) {
    return "My portfolio includes Insurance Training Programs, Client Solicitation Projects, Workshop Assistance, and Risk Management Education. Check out the Portfolio section for more details! It's so impressive, it might just make you want to hire me on the spot! 💼";
  } else if (message.includes('social') || message.includes('accounts') || message.includes('linkedin') || message.includes('twitter') || message.includes('facebook') || message.includes('tiktok')) {
    return "You can find me on social media: LinkedIn - https://linkedin.com/in/kebathomodise, Twitter - https://twitter.com/KebathoModise, Facebook - https://facebook.com/BrunoModise, TikTok - https://tiktok.com/@BrunoModise. Feel free to connect! Follow me for daily doses of risk management wisdom and occasional cat videos. 🐱";
  } else if (message.includes('thanks') || message.includes('thank you')) {
    const thanksResponses = [
      "You're welcome! If you need anything else, just ask. I'm here to help, not to judge your questionable life choices. 😉",
      "No problem at all! Happy to assist. What's next on your mind? 😊",
      "My pleasure! Feel free to ask more questions anytime. 👍"
    ];
    const counter = getUsageCounter('thanksCounter');
    const response = thanksResponses[counter % thanksResponses.length];
    setUsageCounter('thanksCounter', counter + 1);
    return response;
  } else if (message.includes('name')) {
    return "I'm the chatbot for Kebatho Modise. You can call me Chatty! What's your name? 🤖";
  } else if (message.includes('ok') || message.includes('alright') || message.includes('yes') || message.includes('sure') || message.includes('cool') || message.includes('great')) {
    const positiveResponses = [
      "Awesome! Is there anything specific you'd like to know about Kebatho? Maybe his skills, experience, or just a joke? 😊",
      "Great! What else can I tell you about Kebatho? His portfolio, education, or a fun fact? 🎉",
      "Cool! Let's keep the conversation going. Ask me about anything! 💬"
    ];
    const counter = getUsageCounter('positiveCounter');
    const response = positiveResponses[counter % positiveResponses.length];
    setUsageCounter('positiveCounter', counter + 1);
    return response;
  } else if (message.includes('no') || message.includes('nah') || message.includes('not really')) {
    const negativeResponses = [
      "No worries! Feel free to ask anything else or say 'joke' for some fun. What else can I help with? 🤔",
      "Alright, no problem! Is there something specific you'd like to know? Maybe about Kebatho's skills? 😊",
      "Okay, got it! Let me know if you change your mind or have another question. 👍"
    ];
    const counter = getUsageCounter('negativeCounter');
    const response = negativeResponses[counter % negativeResponses.length];
    setUsageCounter('negativeCounter', counter + 1);
    return response;
  } else if (message.includes('odds') || message.includes('probability') || message.includes('risk')) {
    return "As a risk management expert, I love talking about odds and probabilities! In insurance, we calculate odds to assess risks. For example, the odds of something happening are probability divided by (1 - probability). What specific odds or risk scenario are you curious about? 📊";
  } else if (message.includes('calculate') || message.includes('math') || message.includes('sum')) {
    return "I can help with basic calculations! If you give me numbers, I can sum the odd ones for you. For example, try saying '1 2 3 4 5'. What calculation can I assist with? 🧮";
  } else {
    // Varied fallbacks for any response type
    const fallbacks = [
      "Hmm, I'm not sure I caught that. Could you rephrase? Or try asking about Kebatho's background, skills, or say 'joke' for some fun! 😅",
      "That's an interesting input! As Kebatho's assistant, I specialize in portfolio info, but I'm always up for a chat. What would you like to know? 🤔",
      "I might not have a direct answer for that, but I can tell you about Kebatho's impressive risk management career! Want details? 💼",
      "Let's pivot back to what I know best - Kebatho's professional journey. Ask me about his experience or education! 🎓",
      "I'm here to help with anything related to Kebatho, from his skills to his favorite jokes. What's on your mind? 😊",
      "Not quite sure what you mean, but I'm excited to chat! Tell me more about what you're looking for. 💬"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

function showBotThinking() {
  const thinkingDiv = document.createElement('div');
  thinkingDiv.className = 'message thinking bot';
  thinkingDiv.textContent = 'Thinking...';
  chatMessages.appendChild(thinkingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return thinkingDiv;
}

function handleSendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user');
  chatInput.value = '';

  const thinkingBubble = showBotThinking();

  setTimeout(() => {
    thinkingBubble.remove();
    const botResponse = getBotResponse(userMessage);
    addMessage(botResponse, 'bot');
  }, 600);
}

// Event listeners for chatbot
if (chatToggle) {
  chatToggle.addEventListener('click', openChatModal);
}

if (sendMessageBtn) {
  sendMessageBtn.addEventListener('click', handleSendMessage);
}

if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });
}

// Close chat modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && chatModal.style.display === 'block') {
    closeChatModal();
  }
});

// Close chat modal when clicking outside
window.addEventListener('click', function(event) {
  if (event.target === chatModal) {
    closeChatModal();
  }
});

// Initialize on load
window.addEventListener('load', () => {
  createParticles();
  document.body.style.opacity = '1';
});

