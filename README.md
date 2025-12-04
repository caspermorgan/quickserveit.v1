# quickserveit.v1

Quickserve IT — quickserve-site

Your Personal Tech Partner — Official static website repository (Premium Black–Gold studio).
This README prepares the repo for developers, designers, and for direct deploy to Vercel. It is based on the official developer documentation for Quickserve IT. 

QUICKSERVE IT — OFFICIAL WEBSIT…

Table of contents

Project overview

Quick start (install & run locally)

Folder / file structure (exact)

Technology & coding standards (summary)

Deployment (Vercel) — step-by-step

Performance & optimization checklist

SEO & metadata basics

How to update / content workflow

Forms (static handling)

Accessibility & testing

Contributing guide

License & credits

Contact

1) Project overview

Quickserve IT is a static, mobile-first, ultra-fast, black–gold themed website built to serve institutes, creators and small businesses in rural & small-town India. The site is intentionally static (HTML / CSS / minimal JS) to keep costs zero and performance high. Core goals: clarity, speed, easy contact (WhatsApp / Call / Email), and premium visual identity. 

QUICKSERVE IT — OFFICIAL WEBSIT…

2) Quick start (local)

Clone the repo

git clone https://github.com/<your-org>/quickserve-site.git
cd quickserve-site


Open files locally: since site is static you can open index.html in browser, or use a simple static server for better dev flow:

# Python 3
python -m http.server 8080
# then open http://localhost:8080


Edit HTML/CSS/JS in-place, commit, push. Vercel will auto-deploy on push to the connected GitHub repo (see Deployment).

3) Required folder structure (MUST match docs)

Place files exactly as below (lowercase, hyphens; file names must match):

/quickserve-site
├── index.html
├── work.html
├── plans.html
├── studio.html
├── founder.html
├── connect.html
├── privacy.html
├── terms.html
├── 404.html
├── /services
│   ├── index.html
│   ├── /institutes
│   │   ├── index.html
│   │   ├── documentation.html
│   │   ├── examination.html
│   │   └── government.html
│   ├── /creators
│   │   ├── index.html
│   │   ├── editing.html
│   │   ├── thumbnails.html
│   │   └── scripts.html
│   └── /custom
│       ├── index.html
│       ├── branding.html
│       └── animation.html
└── /assets
    ├── /css
    │   ├── style.css
    │   ├── components.css
    │   └── responsive.css
    ├── /js
    │   └── main.js
    ├── /img
    └── /icons


Naming rules: lowercase, hyphens, no spaces. (e.g. studio.html not AboutUs.html). 

QUICKSERVE IT — OFFICIAL WEBSIT…

4) Technology & coding standards (summary)

Stack: HTML5, CSS3, vanilla JavaScript (ES6). No frameworks (React/Vue) unless explicitly required. 

QUICKSERVE IT — OFFICIAL WEBSIT…

CSS: External only. Use variables; critical CSS inlined for the fold. Minify for production.

JS: Single assets/js/main.js, defer scripts, use const/let, keep interactions minimal (menu toggle, small animations). Avoid heavy DOM manipulation. 

QUICKSERVE IT — OFFICIAL WEBSIT…

Fonts: Poppins or Inter; preload primary font and use font-display: swap. Limit weights. 

QUICKSERVE IT — OFFICIAL WEBSIT…

Images: WebP preferred, SVG for icons/logos. Keep hero images ≤ 250KB, portfolio ≤ 150–180KB. All images optimized. 

QUICKSERVE IT — OFFICIAL WEBSIT…

5) Deployment — Vercel (recommended, free)

Follow these exact steps (documented in the official doc): 

QUICKSERVE IT — OFFICIAL WEBSIT…

Create GitHub repo named quickserve-site and push all files.

Go to https://vercel.com
 → Dashboard → New Project → Import from GitHub → choose quickserve-site.

Framework Preset: Other (Static)

Root directory: /

Output: / (default)

Deploy — Vercel will build and publish instantly.

To add domain quickserve.online — go to Vercel Domains, add domain, add DNS (A records or CNAME) at your registrar and wait for propagation. Vercel provides free HTTPS automatically. 

QUICKSERVE IT — OFFICIAL WEBSIT…

Notes: Vercel will serve 404.html automatically for missing pages (no extra server config needed). 

QUICKSERVE IT — OFFICIAL WEBSIT…

6) Performance & optimization checklist (pre-deploy)

 Inline critical CSS for above-the-fold.

 Minify CSS/JS/HTML; combine CSS into style.min.css if possible. 

QUICKSERVE IT — OFFICIAL WEBSIT…

 Preload hero fonts & hero image.

 Convert images to WebP; keep file sizes per guidance. 

QUICKSERVE IT — OFFICIAL WEBSIT…

 Defer scripts: <script src="/assets/js/main.js" defer></script>. 

QUICKSERVE IT — OFFICIAL WEBSIT…

 Enable caching headers on host (Vercel handles CDN & caching).

 Ensure Lighthouse mobile perf ≥ target (85+). 

QUICKSERVE IT — OFFICIAL WEBSIT…

7) SEO & metadata basics

Each page must include:

<title> and <meta name="description">

Open Graph tags (og:title, og:description, og:image, og:url)

One H1 per page, followed by H2/H3 hierarchy.

sitemap.xml and robots.txt in root.

Clean URLs (lowercase, no query strings). 

QUICKSERVE IT — OFFICIAL WEBSIT…

Local SEO: add a LocalBusiness JSON-LD script in the home <head> (areaServed etc.) to help local discoverability. 

QUICKSERVE IT — OFFICIAL WEBSIT…

8) How to update content (workflow)

Edit HTML/CSS/JS locally → git commit → git push → Vercel auto-deploys.

To add a page: create new file in correct folder, commit, and update nav links.

Replace images in /assets/img/ and push. Vercel will redeploy quickly. 

QUICKSERVE IT — OFFICIAL WEBSIT…

9) Contact forms & static form handling

Two recommended zero-backend options:

Formspree — use <form action="https://formspree.io/f/your-endpoint" method="POST"> to receive emails. 

QUICKSERVE IT — OFFICIAL WEBSIT…

mailto: (less recommended) — <form action="mailto:you@example.com" method="POST" enctype="text/plain"> (requires client mail app). 

QUICKSERVE IT — OFFICIAL WEBSIT…

Avoid server-side form processing; keep site static.

10) Accessibility & testing

High contrast (black + gold) and readable font sizes.

Alt text on all images.

Keyboard navigation and aria-labels for icons.

Test responsive layouts at 360px, 414px, 768px, 1024px, 1366px. 

QUICKSERVE IT — OFFICIAL WEBSIT…

11) Contributing

If you allow collaborators, add a CONTRIBUTING.md. Recommended minimal rules:

Branching: main = production, use feature branches feature/xxx.

Commit messages: concise, present-tense.

Pull requests: include test steps and screenshots (mobile/desktop).

Run link checker before PR (avoid broken links). 

QUICKSERVE IT — OFFICIAL WEBSIT…

12) Recommended repo files

README.md (this file)

LICENSE (e.g., MIT or your chosen license)

CONTRIBUTING.md

CODE_OF_CONDUCT.md (optional)

.gitignore (ignore local builds, .DS_Store, node_modules if any)

sitemap.xml, robots.txt, favicon.ico/SVG

13) License & credits

Add your chosen license (e.g., MIT) in LICENSE. Credit the documentation and founder where appropriate. The full developer documentation lives inside the repository as the master PDF (developer edition). 

QUICKSERVE IT — OFFICIAL WEBSIT…

14) Useful snippets (copy-paste)

Defer script example

<script src="/assets/js/main.js" defer></script>


Preload font example

<link rel="preload" href="/assets/fonts/poppins-600.woff2" as="font" type="font/woff2" crossorigin>


Lazy load image

<img src="/assets/img/work1.webp" loading="lazy" alt="Design sample">

15) Final notes — founder & vision

This project is founder-led, mission driven: a premium rural-tech studio intent on delivering modern digital services with zero running cost and maximum performance. Keep the site clean, fast and simple — follow the docs exactly. 

QUICKSERVE IT — OFFICIAL WEBSIT…
