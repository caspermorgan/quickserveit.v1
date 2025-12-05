# QuickServe IT — Developer Guidelines

This document provides guidelines for contributing to the QuickServe IT website project, maintaining code quality, and ensuring consistency with the brand identity.

---

## Table of Contents

- [Design Philosophy](#design-philosophy)
- [Code Standards](#code-standards)
- [File Structure & Naming](#file-structure--naming)
- [HTML Guidelines](#html-guidelines)
- [CSS Guidelines](#css-guidelines)
- [JavaScript Guidelines](#javascript-guidelines)
- [Testing Checklist](#testing-checklist)
- [Performance Rules](#performance-rules)
- [Accessibility](#accessibility)

---

## Design Philosophy

All contributions must align with QuickServe IT's brand and technical principles:

### Visual Identity

- **Premium, minimal aesthetic**: Dark matte background with warm gold accents
- **Luxury tech studio feel**: Clean, spacious, high-contrast design
- **No clutter**: Every element serves a purpose
- **Warm, approachable tone**: Professional yet personal

### Technical Philosophy

- **Static-first**: No backend unless absolutely necessary
- **Performance obsessed**: Fast even on low-end Android devices
- **Accessibility focused**: Works for all users, all devices
- **Vanilla JavaScript**: No heavy frameworks (no React, Vue, Angular)
- **Semantic HTML**: Clean, meaningful markup
- **Bilingual ready**: All text easily translatable to English/Hindi

---

## Code Standards

### General Rules

- Use **semantic HTML5** tags (`<section>`, `<article>`, `<nav>`, etc.)
- Follow **DRY principle** (Don't Repeat Yourself) — extract common patterns into components
- Use **descriptive names** for classes and functions
- Keep functions **small and focused** (single responsibility)
- Add **comments** for complex logic (not for obvious code)
- Use **camelCase** for JavaScript variables and functions
- Use **kebab-case** for CSS classes and HTML IDs
- Use **UPPERCASE** for constants

### File Formatting

- **Indentation**: 2 spaces (not tabs)
- **Line endings**: LF (Unix-style)
- **Character encoding**: UTF-8 with BOM
- **Max line length**: 100 characters (soft limit; 120 for HTML)

---

## File Structure & Naming


### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| HTML file | lowercase, hyphens | `service-a.html`, `contact.html` |
| CSS class | lowercase, hyphens | `.nav-link`, `.hero-section`, `.btn-primary` |
| CSS ID | lowercase, hyphens | `#contact-form`, `#status-chip` |
| JS variable | camelCase | `currentLang`, `statusChip`, `isOnline` |
| JS function | camelCase, verb-first | `updateGreeting()`, `initLanguageSwitch()` |
| JS constant | UPPERCASE, underscores | `CONFIG`, `TRANSLATIONS` |

---

## HTML Guidelines

### Semantic Markup

<!-- Option 1: data attributes (preferred for element text) -->
<h1 data-en="Welcome to QuickServe IT" data-hi="QuickServe IT में आपका स्वागत है">
  Welcome to QuickServe IT
</h1>

<!-- Option 2: JavaScript-driven (for dynamic content) -->
<p id="greeting"></p>
<!-- Updated by JavaScript: greeting.textContent = getTranslation('greetings.morning') -->

<!-- Option 3: Language-specific classes (for complex layouts) -->
<div data-lang="en" class="lang-en">English content</div>
<div data-lang="hi" class="lang-hi">हिंदी सामग्री</div>
Accessibility: <!-- Use alt text for all images -->
<img src="logo.png" alt="QuickServe IT logo" loading="lazy">

<!-- Use label for form inputs -->
<label for="name-input">Name</label>
<input id="name-input" type="text" required>

<!-- Use button for actions, a for links -->
<button type="submit">Submit</button>
<a href="/contact.html">Contact Us</a>

<!-- Use aria-label for icon buttons -->
<button aria-label="Toggle navigation menu">
  <i class="icon-menu"></i>
</button>
:root {
  /* Colors */
  --color-primary: #0B0B0B;           /* Dark background */
  --color-accent: #D4AF37;             /* Gold accent */
  --color-text: #E0E0E0;               /* Light text */
  --color-text-muted: #888888;         /* Muted text */
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-weight-normal: 400;
  --font-weight-bold: 600;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-smooth: 300ms ease-out;
}
/* Mobile-first (base styles) */
.service-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  gap: var(--space-sm);
}

/* Tablet and up */
@media (min-width: 768px) {
  .service-card {
    flex-direction: row;
    padding: var(--space-lg);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .service-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
/* Good: Use transform & opacity for animations */
.card:hover {
  transform: translateY(-4px);
  opacity: 0.95;
}

/* Bad: Avoid animating width, height, left, right (causes layout thrashing) */
.card:hover {
  width: 120%;      /* Causes reflow */
  left: -10px;      /* Causes reflow */
}

/* Good: Use will-change sparingly for heavy animations */
.animated-element {
  will-change: transform, opacity;
}

/* Bad: Avoid expensive shadows on many elements */
.many-cards {
  box-shadow: 0 0 50px 50px rgba(0, 0, 0, 0.5);  /* Heavy */
}

/* Better: Subtle shadow */
.many-cards {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  /* Light */
}
JavaScript Guidelines
Structure
text
// 1. Configuration (top of file)
const CONFIG = {
  whatsappNumber: '916388224877',
  email: 'letsquickserveit@gmail.com',
};

// 2. Translations (if not in utils.js)
const TRANSLATIONS = { /* ... */ };

// 3. State variables
let currentLang = 'en';

// 4. Utility functions (before they're used)
function showToast(message) { /* ... */ }

// 5. Main logic
function init() { /* ... */ }

// 6. Initialization trigger
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
Language & Online Status Functions
Always include these utilities:

text
// In src/scripts/utils.js

// Get current language
function getCurrentLanguage() {
  return localStorage.getItem('quickserve-lang') || 'en';
}

// Update online status (call every minute)
function updateOnlineStatus() {
  const now = new Date();
  const day = now.getDay();     // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  
  let isOnline = false;
  
  // Business hours: Mon-Sat 8 AM - 10 PM
  if (day >= 1 && day <= 6) {
    isOnline = hour >= 8 && hour < 22;
  }
  
  updateStatusUI(isOnline);
}

function updateStatusUI(isOnline) {
  const statusChip = document.getElementById('statusChip');
  const statusText = document.getElementById('statusText');
  
  if (!statusChip || !statusText) return;
  
  if (isOnline) {
    statusChip.classList.remove('offline');
    statusText.textContent = getCurrentLanguage() === 'en' ? 'Available now' : 'अभी उपलब्ध';
  } else {
    statusChip.classList.add('offline');
    const text = getCurrentLanguage() === 'en' 
      ? 'Accepting requests -  Replies 8 AM–10 PM IST'
      : 'अनुरोध स्वीकार हो रहे हैं -  जवाब सुबह 8 बजे से रात 10 बजे के बीच';
    statusText.textContent = text;
  }
}
Form Validation
text
// Example: Contact form validation
function validateContactForm(formData) {
  const errors = [];
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!formData.phone || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
    errors.push('Phone must be 10 digits');
  }
  
  if (!formData.message || formData.message.trim().length < 5) {
    errors.push('Message must be at least 5 characters');
  }
  
  if (!formData.consent) {
    errors.push('You must agree to Terms & Conditions');
  }
  
  return { valid: errors.length === 0, errors };
}
WhatsApp Message Template
text
// Build WhatsApp message
function buildWhatsAppMessage(formData) {
  const name = encodeURIComponent(formData.name);
  const phone = encodeURIComponent(formData.phone);
  const service = encodeURIComponent(formData.service);
  const message = encodeURIComponent(formData.message);
  
  const template = `
Name: ${name}
Phone: ${phone}
Service: ${service}
Message: ${message}

[Submitted via QuickServe IT website]
  `.trim();
  
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(template)}`;
}
Testing Checklist
Before Committing
 No console errors or warnings (console.log() calls removed)

 All links work (internal and external)

 Form submits and opens WhatsApp correctly

 Language toggle works on all pages

 Online status updates correctly (test by changing system time)

 Responsive design tested at 320px, 768px, and 1024px widths

 No horizontal scrolling on mobile

 Images load properly and aren't distorted

Mobile Testing (Priority: Low-End Android)
Use Chrome DevTools Device Emulation:

Open DevTools (F12)

Click Device Toolbar (or Ctrl+Shift+M)

Select Galaxy A50 or Pixel 3a from dropdown

Test:

Text readability (no zoom needed)

Button tap targets (at least 48px tall)

Form input focus states

Animation smoothness (60 FPS target)

Desktop Testing
 Chrome (latest)

 Firefox (latest)

 Safari (if on Mac)

 Edge (if on Windows)

Performance Rules
Image Optimisation
text
<!-- Always use lazy loading for below-fold images -->
<img src="image.jpg" alt="Description" loading="lazy" width="400" height="300">

<!-- Use srcset for responsive images (optional) -->
<img 
  src="image-small.jpg" 
  srcset="image-small.jpg 480w, image-medium.jpg 768w, image-large.jpg 1024w"
  alt="Description"
  loading="lazy"
>
JavaScript Performance
text
// Good: Debounce expensive operations
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

const handleResize = debounce(() => {
  // Recalculate layout
}, 250);

window.addEventListener('resize', handleResize);

// Bad: Execute on every single event
window.addEventListener('scroll', () => {
  // Expensive calculation on every pixel scroll
});
Animation Performance
text
/* Good: Use GPU-accelerated properties */
@keyframes slideIn {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Bad: Layout-thrashing properties */
@keyframes slideIn {
  from {
    left: -100px;        /* Causes reflow */
    visibility: hidden;
  }
  to {
    left: 0;
    visibility: visible;
  }
}
Accessibility
WCAG 2.1 AA Compliance
Color contrast: Text must have at least 4.5:1 ratio with background

Keyboard navigation: All interactive elements must be keyboard accessible

Focus indicators: Visible focus styles on all focusable elements

Form labels: Every input must have an associated label

Alt text: Every image must have descriptive alt text

Implementation
text
<!-- Good: Semantic, accessible form -->
<form id="contact-form">
  <label for="name">
    <span>Name</span>
    <input id="name" type="text" required aria-required="true">
  </label>
  
  <label for="consent">
    <input id="consent" type="checkbox" required>
    <span>I agree to Terms & Conditions</span>
  </label>
  
  <button type="submit">Send Message</button>
</form>

<!-- Good: Icon button with aria-label -->
<button aria-label="Open navigation menu" class="menu-toggle">
  <svg aria-hidden="true"><!-- menu icon --></svg>
</button>

<!-- Bad: Non-semantic button -->
<div class="button" onclick="doSomething()">Click me</div>
Review & Merge
Before a PR is merged:

Code review passed (at least one approval)

Design review passed (brand consistency verified)

Mobile testing completed (320px–480px width)

Desktop testing completed (1920px+ width)

Performance verified (no significant slowdown)

Accessibility verified (keyboard navigation, color contrast)

Language toggle works on new pages/components

Online status logic preserved and tested

Questions?
For questions about development standards, contact:

Email: letsquickserveit@gmail.com
WhatsApp: +91 6388224877

Last Updated: December 5, 2025
