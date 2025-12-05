
/* QuickServe IT — Main Application Script */
/* Initializes all components and handles page interactions */

'use strict';

/* ===== PAGE INITIALIZATION ===== */

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

/**
 * Main initialization function
 */
function initializeApp() {
  // Initialize language system
  initLanguageSystem();
  
  // Update greeting
  updateGreeting();
  
  // Update online status (and every minute)
  updateOnlineStatus();
  setInterval(updateOnlineStatus, 60000);
  
  // Initialize navbar
  initNavbar();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize CTA buttons
  initCTAButtons();
  
  // Initialize scroll reveal
  initScrollReveal();
  
  // Initialize contact form if on contact page
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    initContactForm();
  }
  
  // Initialize typewriter if present
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    initTypewriter();
  }
  
  // Add loaded class to body
  document.body.classList.add('loaded');
}

/* ===== LANGUAGE SYSTEM ===== */

/**
 * Initialize language toggle and restore saved language
 */
function initLanguageSystem() {
  // Restore saved language
  const savedLang = getCurrentLanguage();
  setLanguage(savedLang);
  
  // Language toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
    updateLanguageToggleLabel();
  }
  
  // Listen for language changes
  document.addEventListener('languageChanged', function(e) {
    updateLanguageToggleLabel();
  });
}

/**
 * Toggle between English and Hindi
 */
function toggleLanguage() {
  const currentLang = getCurrentLanguage();
  const newLang = currentLang === 'en' ? 'hi' : 'en';
  
  setLanguage(newLang);
  showToast(
    newLang === 'en' 
      ? getTranslatedText('toast.langSwitch')
      : 'भाषा बदली गई हिंदी में'
  );
}

/**
 * Update language toggle button label
 */
function updateLanguageToggleLabel() {
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) return;
  
  const currentLang = getCurrentLanguage();
  const label = langToggle.querySelector('.lang-current');
  
  if (label) {
    label.textContent = currentLang === 'en' ? 'हिंदी' : 'English';
  }
}

/* ===== NAVBAR FUNCTIONALITY ===== */

/**
 * Initialize navbar interactions
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  if (!navbar) return;
  
  // Scroll effect on navbar
  window.addEventListener('scroll', throttle(function() {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, 100));
  
  // Close mobile menu on nav link click
  const navLinks = navbar.querySelectorAll('a[href^="/src/pages/"]');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* ===== MOBILE MENU FUNCTIONALITY ===== */

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
  
  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar')) {
      closeMobileMenu();
    }
  });
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger) hamburger.classList.remove('active');
  if (mobileMenu) mobileMenu.classList.remove('active');
}

/* ===== CTA BUTTONS ===== */

/**
 * Initialize all CTA buttons (Get Started)
 */
function initCTAButtons() {
  const ctaButtons = document.querySelectorAll('[id$="CTA"], .btn-cta');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScroll('contactForm') || window.location.href = '/src/pages/contact.html';
    });
  });
}

/* ===== CONTACT FORM ===== */

/**
 * Initialize contact form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', handleContactFormSubmit);
  
  // Restore form data from localStorage (optional auto-fill)
  restoreFormData(form);
}

/**
 * Handle contact form submission
 */
function handleContactFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  
  // Collect form data
  const formData = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    service: form.service.value,
    message: form.message.value.trim(),
    consent: form.consent.checked
  };
  
  // Validate form
  const validation = validateContactForm(formData);
  
  if (!validation.valid) {
    validation.errors.forEach(error => {
      showToast(error, 'error');
    });
    return;
  }
  
  // Show preparing message
  showToast(getTranslatedText('toast.preparing'), 'info');
  
  // Save form data to localStorage (optional)
  saveFormData(formData);
  
  // Open WhatsApp
  setTimeout(() => {
    openWhatsAppChat(formData);
    
    // Reset form
    form.reset();
    
    // Show success message
    showToast(getTranslatedText('toast.formSuccess'), 'success');
  }, 500);
}

/**
 * Save form data to localStorage
 */
function saveFormData(formData) {
  localStorage.setItem('quickserve-lastSubmission', JSON.stringify({
    ...formData,
    timestamp: new Date().toISOString()
  }));
}

/**
 * Restore form data from localStorage
 */
function restoreFormData(form) {
  const saved = localStorage.getItem('quickserve-lastSubmission');
  
  if (saved) {
    try {
      const data = JSON.parse(saved);
      form.name.value = data.name || '';
      form.phone.value = data.phone || '';
      form.email.value = data.email || '';
      form.service.value = data.service || '';
    } catch (e) {
      console.error('Error restoring form data:', e);
    }
  }
}

/* ===== TYPEWRITER EFFECT ===== */

/**
 * Initialize typewriter animation
 */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter');
  if (!typewriterEl) return;
  
  const lines = [
    { en: 'brings professional quality to your work', hi: 'आपके काम में पेशेवर गुणवत्ता लाता है' },
    { en: 'saves you time and reduces stress daily', hi: 'आपका समय बचाता है और रोजाना तनाव कम करता है' },
    { en: 'delivers results you can trust always', hi: 'आप पर भरोसा कर सकते हैं ऐसे परिणाम देता है' },
    { en: 'supports your growth consistently', hi: 'आपकी वृद्धि को लगातार समर्थन करता है' },
    { en: 'provides solutions that actually work', hi: 'ऐसे समाधान प्रदान करता है जो वास्तव में काम करते हैं' },
    { en: 'creates lasting professional impact', hi: 'स्थायी पेशेवर प्रभाव बनाता है' },
    { en: 'streamlines your digital workflow', hi: 'आपके डिजिटल वर्कफ़्लो को सुव्यवस्थित करता है' },
    { en: 'ensures excellence in every project', hi: 'हर प्रोजेक्ट में उत्कृष्टता सुनिश्चित करता है' },
    { en: 'transforms raw files into premium output', hi: 'कच्ची फाइलों को प्रीमियम आउटपुट में बदलता है' },
    { en: 'makes digital work effortless for you', hi: 'आपके लिए डिजिटल काम को आसान बनाता है' },
    { en: 'serves rural India with metro quality', hi: 'ग्रामीण भारत को मेट्रो गुणवत्ता के साथ सेवा देता है' },
    { en: 'understands your needs deeply', hi: 'आपकी जरूरतों को गहराई से समझता है' },
    { en: 'delivers on time, every time', hi: 'हमेशा समय पर डिलीवर करता है' },
    { en: 'builds long-term partnerships', hi: 'दीर्घकालिक भागीदारी बनाता है' },
    { en: 'offers transparent honest pricing', hi: 'स्वच्छ और ईमानदार मूल्य निर्धारण प्रदान करता है' }
  ];
  
  let lineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  
  function typewriterStep() {
    const currentLang = getCurrentLanguage();
    const currentLine = lines[lineIdx][currentLang];
    
    if (!isDeleting) {
      typewriterEl.textContent = currentLine.substring(0, charIdx + 1);
      charIdx++;
      
      if (charIdx === currentLine.length) {
        isDeleting = true;
        setTimeout(typewriterStep, 2000); // Pause before deleting
        return;
      }
    } else {
      typewriterEl.textContent = currentLine.substring(0, charIdx - 1);
      charIdx--;
      
      if (charIdx === 0) {
        isDeleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        setTimeout(typewriterStep, 500); // Pause before typing next line
        return;
      }
    }
    
    const speed = isDeleting ? 25 : 60;
    setTimeout(typewriterStep, speed);
  }
  
  typewriterStep();
  
  // Update typewriter on language change
  document.addEventListener('languageChanged', function() {
    charIdx = 0;
    isDeleting = false;
    typewriterEl.textContent = '';
    typewriterStep();
  });
}

/* ===== SCROLL REVEAL ANIMATION ===== */

/**
 * Initialize scroll reveal for elements with .reveal class
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  if (reveals.length === 0) return;
  
  // Reveal hero elements immediately
  document.querySelectorAll('.hero .reveal').forEach(el => {
    el.classList.add('active');
  });
  
  // Watch for scroll and reveal other elements
  const revealOnScroll = debounce(function() {
    reveals.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
  }, 50);
  
  window.addEventListener('scroll', revealOnScroll);
  
  // Initial check
  revealOnScroll();
}

/* ===== SMOOTH ANCHOR SCROLLING ===== */

/**
 * Initialize smooth scrolling for anchor links
 */
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
    const href = e.target.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      smoothScroll(href.substring(1));
    }
  }
});

/* ===== UTILITY: SMOOTH SCROLL ===== */

/**
 * Smooth scroll to element by ID
 */
function smoothScroll(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return false;
  
  const headerHeight = 70;
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
  
  return true;
}

/* ===== UTILITY: THROTTLE ===== */

/**
 * Throttle function (reuse from utils)
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/* ===== UTILITY: DEBOUNCE ===== */

/**
 * Debounce function (reuse from utils)
 */
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

/* ===== KEYBOARD ACCESSIBILITY ===== */

document.addEventListener('keydown', function(e) {
  // Close mobile menu on Escape
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});

/* ===== PERFORMANCE: LAZY LOADING ===== */

if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('loading');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

/* ===== PERFORMANCE MONITORING ===== */

if (window.performance && window.performance.timing) {
  window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log(`Page load time: ${pageLoadTime}ms`);
  });
}

/* ===== GLOBAL ERROR HANDLING ===== */

window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

/* ===== EXPORT FUNCTIONS FOR GLOBAL USE ===== */

window.QuickServeApp = {
  initializeApp,
  initLanguageSystem,
  toggleLanguage,
  initNavbar,
  initMobileMenu,
  closeMobileMenu,
  initCTAButtons,
  initContactForm,
  handleContactFormSubmit,
  initTypewriter,
  initScrollReveal,
  smoothScroll
};
