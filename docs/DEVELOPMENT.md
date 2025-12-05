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


### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| HTML file | lowercase, hyphens | `service-a.html`, `contact.html` |
| CSS class | lowercase, hyphens | `.nav-link`, `.hero-section`, `.btn-primary` |
| CSS ID | lowercase, hyphens | `#contact-form`, `#status-chip` |
| JS variable | camelCase | `currentLang`, `statusChip`, `isOnline` |
| JS function | camelCase, verb-first | `updateGreeting()`, `initLanguageSwitch()` |
| JS constant | UPPERCASE, underscores | `CONFIG`, `TRANSLATIONS` |

