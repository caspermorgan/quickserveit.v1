/* ============================================
   QUICKSERVE IT — UTILITY FUNCTIONS
   Helper functions for common tasks
   ============================================ */

/* ─────────────────────────────────────────
   TIME-BASED GREETING SYSTEM
   ───────────────────────────────────────── */

/**
 * Get current greeting based on time of day
 * @returns {Object} Object with 'en' and 'hi' greeting messages
 * 
 * Examples:
 * - Morning (6 AM - 12 PM): "Good morning..."
 * - Afternoon (12 PM - 6 PM): "Good afternoon..."
 * - Evening (6 PM - 10 PM): "Good evening..."
 * 
 * Usage:
 * const greeting = getGreeting();
 * console.log(greeting.en);  // "Good morning! Let's elevate..."
 * console.log(greeting.hi);  // "सुप्रभात! आइए अपनी डिजिटल..."
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

/* ─────────────────────────────────────────
   DATE FORMATTING UTILITIES
   ───────────────────────────────────────── */

/**
 * Format date to readable format (e.g., "December 5, 2025")
 * @param {Date|String|Number} date - Date to format
 * @returns {String} Formatted date string
 * 
 * Examples:
 * formatDate(new Date());           // "December 5, 2025"
 * formatDate('2025-12-05');         // "December 5, 2025"
 * formatDate(1733384400000);        // "December 5, 2025"
 * 
 * Usage:
 * const formatted = formatDate(new Date());
 * console.log(formatted);  // "December 5, 2025"
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',      // Full year (2025)
    month: 'long',        // Full month name (December)
    day: 'numeric'        // Day number (5)
  });
}

/* ─────────────────────────────────────────
   DEBOUNCE & THROTTLE (Performance)
   ───────────────────────────────────────── */

/**
 * Debounce function - delays execution until after N milliseconds of inactivity
 * Useful for: Search input, window resize, form validation
 * 
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 * 
 * Why debounce?
 * - Prevents excessive function calls during rapid events
 * - Saves CPU and network resources
 * - Improves performance on repetitive events
 * 
 * Example: Search Input
 * const handleSearch = debounce((query) => {
 *   // Make API call only after user stops typing
 *   fetch(`/api/search?q=${query}`);
 * }, 300);
 * 
 * inputField.addEventListener('input', (e) => {
 *   handleSearch(e.target.value);
 * });
 * 
 * Behavior:
 * - User types 'h' → timer starts
 * - User types 'e' within 300ms → timer resets
 * - User types 'l' within 300ms → timer resets
 * - User stops typing for 300ms → function executes
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
 * Throttle function - limits execution to once per N milliseconds
 * Useful for: Scroll events, window resize, mouse move tracking
 * 
 * @param {Function} func - Function to throttle
 * @param {Number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 * 
 * Why throttle?
 * - Prevents function from running too frequently
 * - Great for performance on continuous events
 * - Better than debounce when you need regular execution
 * 
 * Example: Scroll Event Listener
 * const handleScroll = throttle(() => {
 *   console.log('Scroll position updated');
 *   updateScrollPosition();
 * }, 250);
 * 
 * window.addEventListener('scroll', handleScroll);
 * 
 * Behavior:
 * - First scroll → function executes immediately
 * - Scroll again within 250ms → ignored
 * - Scroll again after 250ms → function executes
 * - Continues pattern (regular intervals, not after delay)
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

/* ─────────────────────────────────────────
   VIEWPORT & VISIBILITY DETECTION
   ───────────────────────────────────────── */

/**
 * Check if element is currently visible in viewport
 * Useful for: Lazy loading, infinite scroll, animation triggers
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {Boolean} True if element is in viewport
 * 
 * Example: Lazy Loading Images
 * const images = document.querySelectorAll('img[data-src]');
 * images.forEach(img => {
 *   if (isInViewport(img)) {
 *     img.src = img.getAttribute('data-src');
 *   }
 * });
 * 
 * Example: Trigger Animation When Element Appears
 * const cards = document.querySelectorAll('.card');
 * cards.forEach(card => {
 *   if (isInViewport(card)) {
 *     card.classList.add('animate');
 *   }
 * });
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to specific element
 * Useful for: Navigation links, "scroll to top", jump to section
 * 
 * @param {String} elementId - ID of element to scroll to
 * 
 * Example: Navigation Link
 * smoothScrollTo('services');  // Scrolls to <div id="services">
 * 
 * HTML:
 * <nav>
 *   <a href="#" onclick="smoothScrollTo('services')">Services</a>
 * </nav>
 * <section id="services">...</section>
 * 
 * Behavior:
 * - Smooth animation (not instant jump)
 * - Starts at element (block: 'start')
 * - Respects scroll-behavior CSS
 */
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',     // Smooth animation
      block: 'start'          // Align to top
    });
  }
}

/* ─────────────────────────────────────────
   LANGUAGE MANAGEMENT
   ───────────────────────────────────────── */

/**
 * Get stored language preference from localStorage
 * @returns {String} Language code ('en' or 'hi'), defaults to 'en'
 * 
 * Usage:
 * const currentLang = getLanguagePreference();
 * console.log(currentLang);  // 'en' or 'hi'
 * 
 * Storage Location: browser localStorage under key 'language'
 */
function getLanguagePreference() {
  return localStorage.getItem('language') || 'en';
}

/**
 * Save language preference to localStorage
 * @param {String} lang - Language code ('en' or 'hi')
 * 
 * Usage:
 * setLanguagePreference('hi');  // Saves to localStorage
 * 
 * Storage: Persists across browser sessions
 */
function setLanguagePreference(lang) {
  localStorage.setItem('language', lang);
}

/**
 * Get localized text from element based on language
 * Looks for data-en and data-hi attributes
 * 
 * @param {HTMLElement} element - Element with language attributes
 * @param {String} lang - Language code ('en' or 'hi')
 * @returns {String} Localized text
 * 
 * HTML Example:
 * <h1 data-en="Hello" data-hi="नमस्ते">Hello</h1>
 * 
 * Usage:
 * const h1 = document.querySelector('h1');
 * const enText = getLocalizedText(h1, 'en');  // "Hello"
 * const hiText = getLocalizedText(h1, 'hi');  // "नमस्ते"
 */
function getLocalizedText(element, lang) {
  return element.getAttribute(`data-${lang}`) || element.textContent;
}

/* ─────────────────────────────────────────
   PHONE & EMAIL VALIDATION
   ───────────────────────────────────────── */

/**
 * Format phone number to Indian format
 * Converts 10-digit number to +91 XXXXXXXXXX format
 * 
 * @param {String} phone - Phone number to format
 * @returns {String} Formatted phone number
 * 
 * Examples:
 * formatPhoneNumber('6388224877');      // "+91 6388224877"
 * formatPhoneNumber('0 6388 224877');   // "+91 6388224877"
 * formatPhoneNumber('+91 6388224877');  // "+91 6388224877"
 * 
 * Usage:
 * const formatted = formatPhoneNumber(userPhone);
 * console.log(formatted);  // "+91 6388224877"
 */
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');  // Remove all non-digits
  
  if (cleaned.length === 10) {
    return `+91 ${cleaned}`;  // Add India country code
  }
  
  return phone;  // Return as-is if not 10 digits
}

/**
 * Validate email address format
 * Uses basic regex pattern for common cases
 * 
 * @param {String} email - Email to validate
 * @returns {Boolean} True if valid email format
 * 
 * Examples:
 * validateEmail('user@example.com');      // true
 * validateEmail('invalid.email@');        // false
 * validateEmail('user@domain');           // false
 * 
 * Usage:
 * if (validateEmail(userEmail)) {
 *   // Email is valid
 *   submitForm();
 * } else {
 *   // Show error
 *   showError('Invalid email');
 * }
 * 
 * Note: This is basic validation. For production, use:
 * - Backend validation
 * - Confirmation email
 * - Proper RFC 5322 regex
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate Indian phone number (10 or 12 digits)
 * Accepts: 10-digit local, 12-digit with country code
 * 
 * @param {String} phone - Phone number to validate
 * @returns {Boolean} True if valid phone format
 * 
 * Examples:
 * validatePhone('6388224877');        // true (10 digits)
 * validatePhone('+91 6388224877');    // true (12 digits)
 * validatePhone('638822');             // false (too short)
 * 
 * Usage:
 * if (validatePhone(userPhone)) {
 *   // Phone is valid
 *   sendOTP();
 * } else {
 *   // Show error
 *   showError('Invalid phone number');
 * }
 */
function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');  // Remove all non-digits
  return cleaned.length === 10 || cleaned.length === 12;
}

/* ─────────────────────────────────────────
   CLIPBOARD & SHARING UTILITIES
   ───────────────────────────────────────── */

/**
 * Copy text to clipboard
 * Uses modern Clipboard API (supported in all modern browsers)
 * 
 * @param {String} text - Text to copy
 * 
 * Example: Copy WhatsApp Link
 * const waLink = 'https://wa.me/916388224877';
 * copyToClipboard(waLink);
 * // Text copied to clipboard, user can paste anywhere
 * 
 * Usage:
 * document.querySelector('.copy-btn').addEventListener('click', () => {
 *   copyToClipboard('Contact: +91 6388224877');
 *   alert('Copied to clipboard!');
 * });
 * 
 * Browser Support:
 * - Chrome 63+
 * - Firefox 63+
 * - Safari 13.1+
 * - Edge 79+
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
 * Creates pre-filled WhatsApp message link
 * 
 * @param {String} phone - Phone number (with country code, no +)
 * @param {String} message - Message text to pre-fill
 * @returns {String} WhatsApp URL
 * 
 * Example:
 * const waLink = generateWhatsAppURL('916388224877', 'Hello! I need help');
 * // "https://wa.me/916388224877?text=Hello%21%20I%20need%20help"
 * 
 * Usage: Open WhatsApp
 * const phone = '916388224877';
 * const msg = 'I am interested in your services';
 * window.open(generateWhatsAppURL(phone, msg));
 * 
 * HTML Example:
 * <a href="https://wa.me/916388224877?text=Hi%20there%21">Chat on WhatsApp</a>
 * 
 * Phone Format:
 * - Include country code: 916388224877 (for India +91)
 * - No '+' symbol in function
 * - No spaces or dashes
 */
function generateWhatsAppURL(phone, message) {
  const encoded = encodeURIComponent(message);  // URL-encode message
  return `https://wa.me/${phone}?text=${encoded}`;
}

/* ─────────────────────────────────────────
   STATUS & AVAILABILITY CHECKING
   ───────────────────────────────────────── */

/**
 * Check if business is currently online
 * Based on: Working hours (8 AM - 10 PM) and working days (Mon-Sat)
 * 
 * @returns {Boolean} True if currently online
 * 
 * Working Hours:
 * - Days: Monday to Saturday
 * - Time: 8 AM to 10 PM IST
 * - Timezone: IST (Indian Standard Time, UTC+5:30)
 * 
 * Examples:
 * Monday 10 AM → true (working day and hours)
 * Saturday 8 PM → true (within hours)
 * Saturday 11 PM → false (after 10 PM)
 * Sunday 5 PM → false (Sunday is off)
 * 
 * Usage:
 * if (getStatusIndicator()) {
 *   showOnlineStatus();  // Show "Online"
 * } else {
 *   showOfflineStatus(); // Show "Offline"
 * }
 * 
 * To Customize:
 * - Change hour >= 8 to your start hour
 * - Change hour < 22 to your end hour
 * - Change day !== 0 logic for different days
 *   (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 */
function getStatusIndicator() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  
  // Online: Mon-Sat (day !== 0), 8 AM - 10 PM
  const isWeekday = day !== 0;           // Not Sunday
  const isWorkHours = hour >= 8 && hour < 22;  // 8 AM to 10 PM
  
  return isWeekday && isWorkHours;
}

/* ─────────────────────────────────────────
   DEVICE & VIEWPORT DETECTION
   ───────────────────────────────────────── */

/**
 * Check if page is viewed on mobile device
 * Based on viewport width: <= 768px is considered mobile
 * 
 * @returns {Boolean} True if mobile view
 * 
 * Breakpoints:
 * - Mobile: < 768px
 * - Desktop: >= 768px
 * 
 * Examples:
 * iPhone (375px) → true
 * iPad (768px) → false (exactly at breakpoint)
 * Desktop (1024px) → false
 * 
 * Usage:
 * if (isMobile()) {
 *   // Show mobile menu
 *   showHamburgerMenu();
 * } else {
 *   // Show desktop menu
 *   showDesktopMenu();
 * }
 * 
 * Note: This is runtime check. Better to use CSS media queries
 * where possible for performance.
 */
function isMobile() {
  return window.innerWidth <= 768;
}

/* ─────────────────────────────────────────
   STRING UTILITIES
   ───────────────────────────────────────── */

/**
 * Create URL-safe slug from text
 * Converts text to lowercase, replaces spaces with hyphens
 * 
 * @param {String} text - Text to convert
 * @returns {String} URL-safe slug
 * 
 * Examples:
 * createSlug('Hello World');           // "hello-world"
 * createSlug('Learn Web Development'); // "learn-web-development"
 * createSlug('C++ Programming');       // "c-programming"
 * 
 * Usage: Generate URL-friendly IDs
 * const title = 'My Awesome Article';
 * const slug = createSlug(title);
 * const url = `/blog/${slug}`;  // "/blog/my-awesome-article"
 * 
 * Process:
 * 1. Convert to lowercase
 * 2. Trim whitespace
 * 3. Remove special characters
 * 4. Replace spaces with hyphens
 * 5. Collapse multiple hyphens to single
 */
function createSlug(text) {
  return text
    .toLowerCase()                    // lowercase
    .trim()                           // remove leading/trailing spaces
    .replace(/[^\w\s-]/g, '')         // remove special characters
    .replace(/\s+/g, '-')             // replace spaces with hyphens
    .replace(/-+/g, '-');             // collapse multiple hyphens
}

/* ─────────────────────────────────────────
   STORAGE HELPER OBJECT
   JSON-safe localStorage wrapper
   ───────────────────────────────────────── */

/**
 * Storage object - Simplified localStorage operations
 * Handles JSON serialization/deserialization automatically
 * 
 * Methods:
 * - Storage.set(key, value)    → Save value
 * - Storage.get(key)           → Retrieve value
 * - Storage.remove(key)        → Delete specific key
 * - Storage.clear()            → Delete all data
 * 
 * Examples:
 * 
 * Save Data:
 * Storage.set('user', { name: 'John', age: 30 });
 * Storage.set('theme', 'dark');
 * 
 * Retrieve Data:
 * const user = Storage.get('user');     // { name: 'John', age: 30 }
 * const theme = Storage.get('theme');   // 'dark'
 * const missing = Storage.get('notfound'); // null
 * 
 * Delete Data:
 * Storage.remove('theme');  // Removes 'theme' key
 * 
 * Clear All:
 * Storage.clear();  // Removes all stored data
 * 
 * Why use this wrapper?
 * - Automatic JSON stringification
 * - Null safety (returns null if not found)
 * - Cleaner syntax than localStorage
 * - Easy to replace with IndexedDB later
 */
const Storage = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  get: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  }
};

/* ─────────────────────────────────────────
   LOGGER UTILITY OBJECT
   Console logging with prefixes
   ───────────────────────────────────────── */

/**
 * Logger object - Organized console logging
 * Adds colored prefixes to different log types
 * 
 * Methods:
 * - Logger.log(message, data)     → General logging
 * - Logger.warn(message, data)    → Warnings
 * - Logger.error(message, data)   → Errors
 * - Logger.info(message, data)    → Information
 * 
 * Examples:
 * 
 * Log general info:
 * Logger.log('User logged in', { userId: 123 });
 * // [LOG] User logged in { userId: 123 }
 * 
 * Log warning:
 * Logger.warn('Low storage space', { available: '50MB' });
 * // [WARN] Low storage space { available: '50MB' }
 * 
 * Log error:
 * Logger.error('API failed', { status: 500, message: 'Server error' });
 * // [ERROR] API failed { status: 500, message: 'Server error' }
 * 
 * Log info:
 * Logger.info('Page loaded', { time: '2.5s' });
 * // [INFO] Page loaded { time: '2.5s' }
 * 
 * Benefits:
 * - Easy to grep logs ([LOG], [WARN], [ERROR], [INFO])
 * - Optional data parameter for debugging
 * - Consistent format across application
 * - Can be extended to send logs to server
 */
const Logger = {
  log: (message, data) => {
    console.log(`[LOG] ${message}`, data || '');
  },
  
  warn: (message, data) => {
    console.warn(`[WARN] ${message}`, data || '');
  },
  
  error: (message, data) => {
    console.error(`[ERROR] ${message}`, data || '');
  },
  
  info: (message, data) => {
    console.info(`[INFO] ${message}`, data || '');
  }
};

/* ─────────────────────────────────────────
   EXPORTS (For Module Usage)
   ───────────────────────────────────────── */

/**
 * Export all functions and objects for ES6 module usage
 * 
 * Usage in other files:
 * import { getGreeting, validateEmail, Storage } from './utils.js';
 * 
 * Or CommonJS (Node.js):
 * module.exports checks if module is available
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
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
}

/* ═════════════════════════════════════════════════════════
   END OF COMPLETE UTILS.JS FILE
   ═════════════════════════════════════════════════════════ */
