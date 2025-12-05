
# QuickServe IT — Changelog

All notable changes to the QuickServe IT website project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] — 2025-12-05

### Added

- **Multi-page structure**: Refactored from single-page app to modular, scalable architecture with separate pages for Home, About, Services (category pages), and Contact.
- **Component system**: Introduced reusable components (navbar, footer, card) to reduce code duplication and improve maintainability.
- **Bilingual language system**: Full English/Hindi support with `localStorage` persistence. All critical UI text translated.
- **Updated business hours**: Operating hours changed to **8 AM – 10 PM IST** (from previous 10 AM – 4 PM).
- **Enhanced online status logic**: Professional wording for "Available now" (online) and "Accepting requests • Replies 8 AM–10 PM IST" (offline). Chip never shows red "offline" badge.
- **Legal compliance**: Added Terms & Conditions and Privacy Policy with consent checkbox on contact form.
- **Service category pages**: Dedicated pages for Institute Services, Creator Services, and Custom Work with detailed descriptions and CTAs.
- **Responsive improvements**: Mobile-first design optimised for low-end Android phones with readable text, large tap targets, and zero horizontal scroll.
- **Performance optimisations**: 
  - Minimal vanilla JavaScript (no heavy frameworks)
  - CSS animations optimised (using `transform` and `opacity`)
  - Images set to lazy-load where applicable
  - Removed unnecessary animations and effects
- **Developer documentation**: Added `docs/README.md`, `docs/CHANGELOG.md`, and `docs/DEVELOPMENT.md` for clarity.

### Changed

- **CSS architecture**: Migrated to centralised `variables.css` for all colors, typography, and spacing tokens.
- **JavaScript organisation**: Split monolithic `app.js` into `main.js` (initialisation & page logic) and `utils.js` (shared helpers, translations, configuration).
- **Greeting system**: Improved time-based greetings with better wording and consistent tone across languages.
- **Typewriter animation**: Refined animation timing for smoother, more professional feel. No layout shifts or jank.
- **WhatsApp integration**: Enhanced message template to include service type, consent status, and professional formatting.
- **Footer**: Expanded with additional links, pricing summary, referral program highlight, and social media integration.

### Fixed

- **Language persistence**: Fixed issue where language selection wasn't consistently saved across page reloads.
- **Status chip alignment**: Corrected vertical centering and hover states.
- **Mobile menu**: Fixed hamburger menu not closing when a link is clicked.
- **Form validation**: Improved error handling and user feedback for required fields.
- **Responsive images**: Added `max-width: 100%; height: auto;` to all images to prevent overflow on mobile.

### Removed

- **Heavy animations**: Removed CPU-intensive particle effects and canvas animations for better performance on low-end devices.
- **Redundant CSS**: Cleaned up duplicate styles and consolidated similar rules.
- **External dependencies**: Ensured no external JavaScript libraries; pure vanilla JS only.

### Security

- **Form consent**: Added mandatory Terms & Conditions + Privacy Policy checkbox before form submission.
- **No data storage**: Static site—no form data stored on servers. Messages sent directly to WhatsApp or email.
- **localStorage only**: Language preference is the only client-side data stored (no personal information).

---

## [1.0.0] — 2025-11-20

### Initial Release

- **Single-page website** with HTML, CSS, and JavaScript.
- **Premium dark theme** with gold accents for luxury tech studio feel.
- **Time-based greetings** that update based on visitor's local time.
- **Online status indicator** showing availability based on working hours.
- **English/Hindi bilingual support** with language toggle in navbar.
- **Typewriter effect** showcasing key service statements on hero section.
- **Contact form** with WhatsApp integration for direct messaging.
- **Responsive design** optimised for mobile and desktop.
- **Fast performance** on low-end Android devices (no heavy animations).
- **SEO-friendly** semantic HTML structure.

---

## Future Roadmap

### Planned for v1.2.0

- [ ] Blog section with case studies and tutorials
- [ ] Portfolio gallery with before/after project examples
- [ ] Testimonial carousel with client reviews
- [ ] FAQ page with accordion-style answers
- [ ] Video background on hero section (optional, performance-tested)
- [ ] Dark mode / Light mode theme toggle
- [ ] Cookie consent banner for analytics (if added)
- [ ] Email newsletter signup

### Planned for v2.0.0

- [ ] Backend CMS integration for easy content updates
- [ ] Client dashboard for project tracking
- [ ] Automated invoice and billing system
- [ ] Real-time chat / support widget
- [ ] Advanced analytics and performance metrics
- [ ] Mobile app (React Native or Flutter)

---

## How to Report Issues

If you find a bug or issue:

1. Test on both desktop and mobile (especially low-end Android)
2. Document the steps to reproduce
3. Note your device, browser, and OS version
4. Contact: letsquickserveit@gmail.com

---

## Contributions

Contributions are welcome! Please ensure:

- [ ] All changes maintain the premium luxury feel
- [ ] Responsive design is tested on mobile (< 480px width)
- [ ] Performance remains fast on low-end devices
- [ ] Language toggle works on all pages
- [ ] Online status logic is preserved
- [ ] Code follows semantic HTML and vanilla JavaScript best practices

---

## License

MIT License — See `LICENSE` file for details.

---

**Version History:**
- v1.1.0 — Multi-page refactor, bilingual system, legal compliance
- v1.0.0 — Initial single-page release

**Last Updated:** December 5, 2025
