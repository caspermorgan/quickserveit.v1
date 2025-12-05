/* ============================================
   QUICKSERVE IT — UTILITY FUNCTIONS
   ============================================ */

/**
 * Get current greeting based on time of day
 */
function getGreeting() {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return {
      en: "Good morning! Let's elevate your digital presence ✨",
      hi: "सुप्रभात! आइए अपनी डिजिटल उपस्थिति को ऊंचा करें ✨"
    };
  } else if (hour < 18) {
    return {
      en: "Good afternoon! Let's get your project done ⏰",
      hi: "शुभ अपराह्न! आइए आपकी परियोजना पूरी करें ⏰"
    };
  } else {
    return {
      en: "Good evening! Ready to create something amazing? 🌙",
      hi: "शुभ संध्या! कुछ अद्भुत बनाने के लिए तैयार? 🌙"
    };
  }
}

/**
 * Format date to readable format
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
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
 * Throttle function for scroll/resize events
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
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Get stored language preference
 */
function getLanguagePreference() {
  return localStorage.getItem('language') || 'en';
}

/**
 * Save language preference
 */
function setLanguagePreference(lang) {
  localStorage.setItem('language', lang);
}

/**
 * Get text content based on language and data attribute
 */
function getLocalizedText(element, lang) {
  return element.getAttribute(`data-${lang}`) || element.textContent;
}

/**
 * Format phone number
 */
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned}`;
  }
  return phone;
}

/**
 * Validate email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone number
 */
function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 12;
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

/**
 * Generate WhatsApp message URL
 */
function generateWhatsAppURL(phone, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Get status indicator (online/offline)
 */
function getStatusIndicator() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  
  // Online: Mon-Sat, 8 AM - 10 PM IST
  const isWeekday = day !== 0;
  const isWorkHours = hour >= 8 && hour < 22;
  
  return isWeekday && isWorkHours;
}

/**
 * Check if page is mobile
 */
function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * Create URL-safe slug
 */
function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Storage helper functions
 */
const Storage = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};

/**
 * Logger for debugging
 */
const Logger = {
  log: (message, data) => console.log(`[LOG] ${message}`, data || ''),
  warn: (message, data) => console.warn(`[WARN] ${message}`, data || ''),
  error: (message, data) => console.error(`[ERROR] ${message}`, data || ''),
  info: (message, data) => console.info(`[INFO] ${message}`, data || '')
};

export {
  getGreeting,
  formatDate,
  debounce,
  throttle,
  isInViewport,
  smoothScrollTo,
  getLanguagePreference,
  setLanguagePreference,
  getLocalizedText,
  formatPhoneNumber,
  validateEmail,
  validatePhone,
  copyToClipboard,
  generateWhatsAppURL,
  getStatusIndicator,
  isMobile,
  createSlug,
  Storage,
  Logger
};
