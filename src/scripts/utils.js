/* QuickServe IT — Utility Functions & Shared Helpers */
/* Contains translations, configuration, and reusable functions */

'use strict';

/* ===== CONFIGURATION ===== */

const CONFIG = {
  whatsappNumber: '916388224877',
  email: 'letsquickserveit@gmail.com',
  phone: '6388224877',
  address: 'Gorakhpur Rural, UP, India',
  businessHours: {
    weekdays: { start: 8, end: 22 }, // Mon-Sat: 8 AM - 10 PM
    sunday: { closed: true }
  },
  website: 'https://www.quickserveit.online',
  socialLinks: {
    whatsapp: 'https://wa.me/916388224877',
    instagram: 'https://instagram.com/quickserveit',
    youtube: 'https://youtube.com/@quickserveit',
    email: 'mailto:letsquickserveit@gmail.com'
  }
};

/* ===== TRANSLATIONS ===== */

const TRANSLATIONS = {
  /* Navigation & Header */
  nav: {
    home: { en: 'Home', hi: 'होम' },
    services: { en: 'Services', hi: 'सेवाएं' },
    about: { en: 'About', hi: 'हमारे बारे में' },
    contact: { en: 'Contact', hi: 'संपर्क' },
    getStarted: { en: 'Get Started', hi: 'शुरू करें' }
  },

  /* Status Messages */
  status: {
    onlineAvailable: { en: 'Available now', hi: 'अभी उपलब्ध' },
    offlineAccepting: { en: 'Accepting requests • Replies 8 AM–10 PM IST', hi: 'अनुरोध स्वीकार हो रहे हैं • जवाब सुबह 8 बजे से रात 10 बजे के बीच' }
  },

  /* Greetings */
  greetings: {
    morning: { en: 'Good morning! Let\'s elevate your digital presence ✨', hi: 'सुप्रभात! आइए अपनी डिजिटल उपस्थिति को ऊंचा करें ✨' },
    afternoon: { en: 'Good afternoon! Ready to transform your digital work?', hi: 'शुभ दोपहर! अपने डिजिटल काम को बदलने के लिए तैयार?' },
    evening: { en: 'Good evening! Let\'s create something amazing together 🌆', hi: 'शुभ संध्या! आइए साथ में कुछ अद्भुत बनाएं 🌆' },
    night: { en: 'Still working? Let QuickServe IT handle your stress 🌙', hi: 'अभी भी काम कर रहे? QuickServe IT को अपना तनाव संभालने दें 🌙' }
  },

  /* Toast Messages */
  toast: {
    copied: { en: 'Copied to clipboard! ✓', hi: 'क्लिपबोर्ड पर कॉपी किया गया! ✓' },
    error: { en: 'Something went wrong. Please try again.', hi: 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।' },
    formError: { en: 'Please fill all required fields', hi: 'कृपया सभी आवश्यक फ़ील्ड भरें' },
    preparing: { en: 'Message ready! Opening WhatsApp...', hi: 'संदेश तैयार! WhatsApp खोल रहे हैं...' },
    langSwitch: { en: 'Language switched to English', hi: 'भाषा बदली गई हिंदी में' },
    formSuccess: { en: 'Message sent! Redirecting to WhatsApp...', hi: 'संदेश भेजा गया! WhatsApp पर जा रहे हैं...' },
    termsRequired: { en: 'Please accept Terms & Conditions', hi: 'कृपया शर्तें स्वीकार करें' }
  },

  /* Form Labels & Placeholders */
  form: {
    name: { en: 'Your Name', hi: 'आपका नाम' },
    phone: { en: 'Phone Number', hi: 'फोन नंबर' },
    email: { en: 'Email Address', hi: 'ईमेल पता' },
    serviceType: { en: 'Service Type', hi: 'सेवा का प्रकार' },
    message: { en: 'Your Message', hi: 'आपका संदेश' },
    submit: { en: 'Send via WhatsApp', hi: 'WhatsApp से भेजें' },
    termsConsent: { en: 'I agree to the Terms & Conditions and Privacy Policy', hi: 'मैं शर्तों और गोपनीयता नीति से सहमत हूँ' }
  },

  /* Service Types */
  services: {
    institute: { en: 'Institute Services', hi: 'संस्थान सेवाएं' },
    creator: { en: 'Creator Services', hi: 'निर्माता सेवाएं' },
    custom: { en: 'Custom Work', hi: 'कस्टम काम' },
    typing: { en: 'Typing & Documents', hi: 'टाइपिंग और दस्तावेज़' },
    other: { en: 'Other', hi: 'अन्य' }
  },

  /* CTA Texts */
  cta: {
    contactNow: { en: 'Contact Now', hi: 'अभी संपर्क करें' },
    learnMore: { en: 'Learn More', hi: 'अधिक जानें' },
    viewServices: { en: 'View Services', hi: 'सेवाएं देखें' },
    getQuote: { en: 'Get Quote', hi: 'उद्धरण प्राप्त करें' }
  }
};

/* ===== LANGUAGE MANAGEMENT ===== */

/**
 * Get current language from localStorage or default to 'en'
 */
function getCurrentLanguage() {
  return localStorage.getItem('quickserve-lang') || 'en';
}

/**
 * Set language in localStorage and update DOM
 */
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'hi') {
    console.warn(`Invalid language: ${lang}. Defaulting to 'en'`);
    lang = 'en';
  }
  
  localStorage.setItem('quickserve-lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  updateAllTranslations(lang);
}

/**
 * Get translation for a key
 * Usage: getTranslation('nav.home') returns { en: 'Home', hi: 'होम' }
 */
function getTranslation(key) {
  const keys = key.split('.');
  let obj = TRANSLATIONS;
  
  for (let k of keys) {
    obj = obj[k];
    if (!obj) return key; // Fallback to key if not found
  }
  
  return obj;
}

/**
 * Get translated text for current language
 */
function getTranslatedText(key, lang = null) {
  lang = lang || getCurrentLanguage();
  const translation = getTranslation(key);
  
  if (typeof translation === 'object' && translation[lang]) {
    return translation[lang];
  }
  
  return key;
}

/**
 * Update all elements with data-en and data-hi attributes
 */
function updateAllTranslations(lang) {
  const elements = document.querySelectorAll('[data-en][data-hi]');
  
  elements.forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-hi');
    } else if (el.hasAttribute('value')) {
      el.setAttribute('value', lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-hi'));
    } else {
      el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-hi');
    }
  });
  
  // Emit custom event for page-specific translations
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/* ===== ONLINE STATUS MANAGEMENT ===== */

/**
 * Check if QuickServe IT is currently online
 * Business hours: Mon-Sat 8 AM - 10 PM IST
 */
function isCurrentlyOnline() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  
  // Sunday: always offline
  if (day === 0) {
    return false;
  }
  
  // Mon-Sat: 8 AM to 10 PM (22:00)
  if (day >= 1 && day <= 6) {
    return hour >= 8 && hour < 22;
  }
  
  return false;
}

/**
 * Get online status text for current language
 */
function getOnlineStatusText(lang = null) {
  lang = lang || getCurrentLanguage();
  const isOnline = isCurrentlyOnline();
  
  if (isOnline) {
    return lang === 'en' ? 'Available now' : 'अभी उपलब्ध';
  } else {
    return lang === 'en' 
      ? 'Accepting requests • Replies 8 AM–10 PM IST'
      : 'अनुरोध स्वीकार हो रहे हैं • जवाब सुबह 8 बजे से रात 10 बजे के बीच';
  }
}

/**
 * Update online status chip on the page
 */
function updateOnlineStatus() {
  const statusChip = document.getElementById('statusChip');
  const statusText = document.getElementById('statusText');
  
  if (!statusChip || !statusText) return;
  
  const isOnline = isCurrentlyOnline();
  const text = getOnlineStatusText();
  
  if (isOnline) {
    statusChip.classList.remove('offline');
  } else {
    statusChip.classList.add('offline');
  }
  
  statusText.textContent = text;
}

/* ===== TIME & GREETING FUNCTIONS ===== */

/**
 * Get time period of day (morning, afternoon, evening, night)
 */
function getTimePeriod() {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

/**
 * Get greeting message for current time
 */
function getGreeting(lang = null) {
  lang = lang || getCurrentLanguage();
  const period = getTimePeriod();
  const greetingObj = TRANSLATIONS.greetings[period];
  
  return greetingObj ? greetingObj[lang] : TRANSLATIONS.greetings.morning[lang];
}

/**
 * Update greeting element
 */
function updateGreeting() {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;
  
  greetingEl.textContent = getGreeting();
}

/* ===== WHATSAPP INTEGRATION ===== */

/**
 * Format phone number for WhatsApp
 */
function formatPhoneForWhatsApp(phone) {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // If it doesn't start with country code, add India's +91
  if (!cleaned.startsWith('91')) {
    return '91' + cleaned;
  }
  
  return cleaned;
}

/**
 * Build WhatsApp message from form data
 */
function buildWhatsAppMessage(formData) {
  const lang = getCurrentLanguage();
  
  const template = `
*New Inquiry from QuickServe IT Website*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
${formData.email ? `*Email:* ${formData.email}` : ''}
*Service:* ${formData.service}

*Message:*
${formData.message}

---
*Terms & Privacy:* Agreed ✓
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `.trim();
  
  return template;
}

/**
 * Open WhatsApp with pre-filled message
 */
function openWhatsAppChat(formData) {
  const message = buildWhatsAppMessage(formData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
  
  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

/**
 * Generate WhatsApp link for quick contact
 */
function generateWhatsAppLink(customMessage = '') {
  const message = customMessage || 'Hi, I\'d like to know more about your services.';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

/* ===== FORM VALIDATION ===== */

/**
 * Validate contact form data
 */
function validateContactForm(formData) {
  const errors = [];
  
  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.push(getTranslatedText('toast.formError'));
  }
  
  // Phone validation (10 digits)
  const cleanPhone = formData.phone.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.push('Phone number must be at least 10 digits');
  }
  
  // Email validation (optional but if provided, must be valid)
  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
  }
  
  // Service validation
  if (!formData.service) {
    errors.push('Please select a service type');
  }
  
  // Message validation
  if (!formData.message || formData.message.trim().length < 5) {
    errors.push('Message must be at least 5 characters');
  }
  
  // Consent validation
  if (!formData.consent) {
    errors.push(getTranslatedText('toast.termsRequired'));
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/* ===== UI HELPERS ===== */

/**
 * Show toast notification
 */
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  if (type === 'error') {
    toast.style.backgroundColor = 'var(--color-error)';
  } else if (type === 'warning') {
    toast.style.backgroundColor = 'var(--color-warning)';
  } else if (type === 'info') {
    toast.style.backgroundColor = 'var(--color-info)';
  }
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.4s ease-out';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/**
 * Debounce function for performance
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

/**
 * Throttle function for performance
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

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      showToast(getTranslatedText('toast.copied'), 'success');
    })
    .catch(() => {
      showToast(getTranslatedText('toast.error'), 'error');
    });
}

/* ===== SCROLL & DOM HELPERS ===== */

/**
 * Smooth scroll to element
 */
function smoothScroll(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const headerHeight = 70; // navbar height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

/**
 * Get URL parameter
 */
function getUrlParameter(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/* ===== EXPORT FOR GLOBAL USE ===== */

window.QuickServeUtils = {
  CONFIG,
  TRANSLATIONS,
  getCurrentLanguage,
  setLanguage,
  getTranslation,
  getTranslatedText,
  updateAllTranslations,
  isCurrentlyOnline,
  getOnlineStatusText,
  updateOnlineStatus,
  getTimePeriod,
  getGreeting,
  updateGreeting,
  formatPhoneForWhatsApp,
  buildWhatsAppMessage,
  openWhatsAppChat,
  generateWhatsAppLink,
  validateContactForm,
  showToast,
  debounce,
  throttle,
  copyToClipboard,
  smoothScroll,
  isInViewport,
  getUrlParameter
};


