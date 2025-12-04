# Development Guide - QuickServe IT

**Complete Developer Reference & Coding Standards**

---

## Table of Contents

1. [Setup](#setup)
2. [HTML Standards](#html-standards)
3. [CSS Architecture](#css-architecture)
4. [JavaScript Guidelines](#javascript-guidelines)
5. [Component Structure](#component-structure)
6. [Testing Checklist](#testing-checklist)
7. [Common Pitfalls](#common-pitfalls)

---

## Setup

### Prerequisites
- VS Code or modern code editor
- Git
- Browser DevTools

### Development Workflow

```bash
# Clone repository
git clone https://github.com/caspermorgan/quickserveit.v1.git
cd quickserveit.v1

# Start local server (Python 3)
python -m http.server 8000

# Or use Node.js
npx http-server

# Visit in browser
# http://localhost:8000
```

### Required Tools
- Code formatter: Prettier (optional but recommended)
- Image optimizer: TinyPNG, Squoosh
- Git for version control

---

## HTML Standards

### Semantic Structure

```html
<!-- Good ✓ -->
<header class="header">
  <nav class="navbar">...</nav>
</header>

<main>
  <section class="hero">
    <h1>Main Heading</h1>
    <article class="service-card">
      <h2>Subheading</h2>
      <p>Content</p>
    </article>
  </section>
</main>

<footer class="footer">...</footer>

<!-- Bad ✗ -->
<div class="header">
  <div class="navbar">...</div>
</div>
```

### Meta Tags

Every page must include:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Clear, unique description">
<meta name="keywords" content="relevant, keywords">
<title>Clear Title (50-65 chars)</title>
<link rel="canonical" href="https://quickserve.online/page">
<link rel="icon" href="/assets/favicon.ico">

<!-- Open Graph -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="/assets/og-image.webp">
<meta property="og:url" content="https://quickserve.online">
```

### Indentation & Formatting

- Use 2 spaces for indentation
- One attribute per line for clarity
- Always use lowercase tags
- Proper nesting

```html
<button
  class="button button--primary"
  type="submit"
  aria-label="Submit form"
>
  Submit
</button>
```

### Images & Media

```html
<!-- Correct ✓ -->
<img 
  src="/assets/img/services/documentation.webp" 
  alt="Professional documentation services for institutes"
  loading="lazy"
  width="400"
  height="300"
>

<!-- Wrong ✗ -->
<img src="image.jpg">
<img src="image.png" alt="image">
```

---

## CSS Architecture

### File Organization

```
assets/css/
├── style.css         # Global styles, variables
├── components.css    # Reusable components
├── layouts.css       # Header, footer, grid
└── responsive.css    # Media queries
```

### CSS Variables

```css
:root {
  /* Colors */
  --black: #000000;
  --gold-dark: #C9A86A;
  --gold: #FFD700;
  --white: #FFFFFF;
  --grey: #D5D5D5;
  
  /* Spacing (8px grid) */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  
  /* Typography */
  --font-main: 'Poppins', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;
}
```

### Mobile-First Approach

```css
/* Mobile first (default) */
.button {
  padding: 12px 20px;
  font-size: 14px;
  width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .button {
    width: auto;
    padding: 14px 30px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .button {
    font-size: 16px;
  }
}
```

### BEM Naming

```css
/* Block */
.service-card { }

/* Element */
.service-card__title { }
.service-card__description { }

/* Modifier */
.service-card--featured { }
.button--primary { }
.button--secondary { }
```

### No Inline Styles

```html
<!-- Wrong ✗ -->
<div style="color: #C9A86A; padding: 20px;">Text</div>

<!-- Correct ✓ -->
<!-- HTML -->
<div class="highlight-box">Text</div>

<!-- CSS -->
.highlight-box {
  color: var(--gold-dark);
  padding: var(--space-lg);
}
```

---

## JavaScript Guidelines

### Basic Rules

```javascript
// Use const and let, NEVER var
const maxItems = 10;  // ✓
let counter = 0;      // ✓
var old = 5;          // ✗

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Your code here
});
```

### Mobile Menu Toggle

```javascript
// This is the MAIN use of JavaScript on this site
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', function() {
  navLinks.classList.toggle('active');
});

// Close menu when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    navLinks.classList.remove('active');
  });
});
```

### Minimal JS Philosophy

- No jQuery
- No frameworks
- Vanilla JavaScript only
- Keep scripts in `/assets/js/main.js`
- No inline script tags

---

## Component Structure

### Service Card Component

```html
<div class="service-card">
  <h3 class="service-card__title">Service Name</h3>
  <p class="service-card__description">
    Brief description of the service.
  </p>
  <ul class="service-card__features">
    <li>Feature 1</li>
    <li>Feature 2</li>
  </ul>
  <a href="#" class="button button--primary">
    Learn More
  </a>
</div>
```

### Button Variations

```html
<!-- Primary -->
<button class="button button--primary">Click Me</button>

<!-- Secondary -->
<button class="button button--secondary">Alternative</button>

<!-- Full Width (Mobile) -->
<button class="button button--block">Full Width</button>
```

### Hero Section

```html
<section class="hero">
  <div class="container">
    <h1 class="hero__title">Main Heading</h1>
    <p class="hero__subtitle">Subheading description</p>
    <div class="hero__cta">
      <a href="#" class="button button--primary">Primary CTA</a>
      <a href="#" class="button button--secondary">Secondary CTA</a>
    </div>
  </div>
</section>
```

---

## Testing Checklist

### Before Committing

- [ ] All links work (no 404 errors)
- [ ] Images load correctly
- [ ] Responsive on 360px, 768px, 1024px widths
- [ ] No console errors
- [ ] No horizontal scroll
- [ ] All text readable
- [ ] Buttons clickable (44px minimum)
- [ ] Forms functional
- [ ] Mobile menu works

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance

```bash
# Check Lighthouse scores
# Chrome DevTools > Lighthouse
# Target: 85+ Performance, 90+ Accessibility
```

---

## Common Pitfalls

### ✗ Don't Do This

```html
<!-- Heavy images without optimization -->
<img src="original-5mb.jpg">

<!-- Multiple fonts -->
<link href="font1.css">
<link href="font2.css">
<link href="font3.css">

<!-- Auto-playing media -->
<video autoplay>

<!-- Inline styles -->
<div style="color: red;">Text</div>

<!-- Unnecessary div nesting -->
<div><div><div><p>Text</p></div></div></div>
```

### ✓ Do This Instead

```html
<!-- Optimized WebP images -->
<img src="optimized.webp" loading="lazy">

<!-- One primary font -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700">

<!-- Static content, no autoplay -->
<img src="preview.webp" alt="Video preview">

<!-- External CSS only -->
<link rel="stylesheet" href="/assets/css/style.css">

<!-- Semantic, clean structure -->
<article>
  <h2>Title</h2>
  <p>Text</p>
</article>
```

---

## Commit Message Format

```bash
# Good commit messages
git commit -m "docs: Add development guide"
git commit -m "feat: Create service card component"
git commit -m "fix: Mobile menu toggle issue"
git commit -m "perf: Optimize hero image size"

# Format: [type]: [description]
# Types: docs, feat, fix, perf, style, refactor
```

---

## Additional Resources

- [HTML Best Practices](https://htmlcheatsheet.com/)
- [CSS Grid Guide](https://cssgridgarden.com/)
- [Web Accessibility](https://www.w3.org/WAI/)
- [Performance Tips](https://web.dev/performance/)

---

**Last Updated:** December 2025

**Questions?** Open an issue on GitHub or contact Vinod Kumar
