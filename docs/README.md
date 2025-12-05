
# QuickServe IT — Premium Digital Services Studio

> A premium digital services studio designed for rural and urban institutes, creators, and small businesses seeking fast, reliable, professional technical assistance.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Language System](#language-system)
- [Business Hours & Status](#business-hours--status)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)

## 🚀 Quick Start

1. **Clone or download** the project to your local machine.
2. **Open `/src/pages/index.html`** in a web browser (or use a local static server).
3. **No build tools required** — this is a static site.

/
├── src/
│ ├── pages/
│ │ ├── index.html # Homepage
│ │ ├── about.html # About / Studio / Founder
│ │ ├── contact.html # Contact form & details
│ │ └── services/
│ │ ├── index.html # Services overview
│ │ ├── service-a.html # Institute Services
│ │ ├── service-b.html # Creator Services
│ │ └── service-c.html # Custom Work / Branding
│ │
│ ├── components/
│ │ ├── navbar.html # Navigation header
│ │ ├── footer.html # Footer component
│ │ └── card.html # Reusable service/testimonial card
│ │
│ ├── styles/
│ │ ├── variables.css # CSS custom properties (colors, typography, spacing)
│ │ └── style.css # Global styles, layout, components
│ │
│ ├── scripts/
│ │ ├── utils.js # Shared utilities (translations, helpers, online status logic)
│ │ └── main.js # Main app initialization, event handlers
│ │
│ └── assets/
│ ├── img/ # Images (logo, illustrations, etc.)
│ │ └── logo.png # Main logo (referenced in navbar/footer)
│ ├── icons/ # SVG icons (optional, can use Unicode symbols)
│ └── fonts/ # Custom fonts (if any)
│
├── public/
│ ├── favicon.ico # Website favicon
│ ├── robots.txt # SEO robots file
│ └── sitemap.xml # XML sitemap
│
├── docs/
│ ├── README.md # This file
│ ├── CHANGELOG.md # Version history
│ └── DEVELOPMENT.md # Developer guidelines
│
├── .gitignore # Git ignore rules
├── LICENSE # MIT License
└── package.json # Project metadata

text

---

## 🌐 Language System

### How It Works

1. **Default Language**: English (EN)
2. **Toggle**: Click the language switcher in the navbar (label shows opposite language)
3. **Storage**: Selection saved in `localStorage['quickserve-lang']`
4. **Persistence**: User's language choice applies across all pages

### Adding New Translations

All translations are in `src/scripts/utils.js` under the `TRANSLATIONS` object. To add a new translatable string:

// In src/scripts/utils.js, TRANSLATIONS object:

toastMessages: {
customMessage: {
en: "Your English text here",
hi: "आपका हिंदी पाठ यहाँ"
}
}

text

Then use it in your HTML with data attributes:

<p data-en="Your English text here" data-hi="आपका हिंदी पाठ यहाँ"></p> ```
Or via JavaScript:

text
showToast('customMessage');
🕐 Business Hours & Status
Current Implementation
Online Hours (Status = Green / "Available now"):

Monday – Friday: 8:00 AM – 10:00 PM IST

Saturday: 8:00 AM – 10:00 PM IST

Sunday: Offline (Neutral status, still accepts form submissions)

How to Modify
Edit the updateOnlineStatus() function in src/scripts/main.js:

text
function updateOnlineStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  
  let isOnline = false;
  
  // Modify these conditions to change working hours
  if (day >= 1 && day <= 6) { // Monday to Saturday
    isOnline = hour >= 8 && hour < 22; // 8 AM to 10 PM
  }
  
  // Rest of the function...
}
⚙️ Configuration
Key settings are in src/scripts/utils.js and the top of src/scripts/main.js:

WhatsApp Integration
text
// src/scripts/utils.js
const CONFIG = {
  whatsappNumber: '916388224877',      // Include country code (91 for India)
  email: 'letsquickserveit@gmail.com',
  phone: '6388224877',
  address: 'Gorakhpur Rural, UP, India'
};
Modifying Greetings
Edit the greetings object in TRANSLATIONS (src/scripts/utils.js):

text
TRANSLATIONS.greetings.morning.en = "Your custom morning greeting here";
Contact Form Service Options
Edit the select dropdown in src/pages/contact.html:

text
<option value="Typing & Document Work">Typing & Document Work</option>
<option value="School & Institute Services">School & Institute Services</option>
<!-- Add more options as needed -->
🛠️ Development
Adding New Pages
Create a new HTML file in src/pages/ (e.g., blog.html)

Include the navbar and footer components (via script import or HTML include)

Link it from the navbar navigation

Update public/sitemap.xml to include the new page

Adding New Components
Create an HTML file in src/components/ (e.g., testimonial-section.html)

Use semantic HTML and apply existing CSS classes

Include translatable text with data-en and data-hi attributes

CSS Customisation
All colors and spacing are defined as CSS variables in src/styles/variables.css. To change the primary accent color:

text
/* In src/styles/variables.css */
--color-primary: #D4AF37;  /* Gold */
--color-primary-dark: #B8860B;  /* Darker gold */
Performance Tips
Use loading="lazy" on all images

Keep JavaScript functions lightweight and debounced if needed

Avoid !important in CSS; use specificity instead

Test on low-end Android phones (use Chrome DevTools throttling)

📦 Deployment
Static Hosting Options
GitHub Pages (Free)

Push to GitHub, enable Pages in repository settings

Site available at https://username.github.io/repo-name/

Vercel (Free tier available)

Connect GitHub repo

Auto-deploys on push

Netlify (Free tier available)

Drag & drop src/ folder or connect GitHub

Traditional Web Hosting

Upload src/ folder via FTP

Set src/pages/index.html as home page

Pre-Deployment Checklist
 Test on mobile (iOS & Android)

 Test on desktop (Chrome, Firefox, Safari, Edge)

 Verify all links work

 Check online status logic (should match your working hours)

 Verify WhatsApp link works with correct phone number

 Test language toggle on all pages

 Verify sitemap.xml is valid

 Update robots.txt with your site URL if needed

📞 Support & Contacts
Website: https://www.quickserveit.online

WhatsApp: +91 6388224877

Email: letsquickserveit@gmail.com

Address: Gorakhpur Rural, UP, India

Working Hours: Mon–Sat: 8 AM – 10 PM IST | Sun: Offline

📄 License
This project is licensed under the MIT License. See LICENSE file for details.

🙏 Credits
Built as a premium digital services website for rural India, combining speed, elegance, and accessibility.

Version: 1.1.0
Last Updated: December 202
