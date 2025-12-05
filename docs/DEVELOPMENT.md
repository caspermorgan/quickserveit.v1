# QuickServe IT – Development Guide

## Philosophy

- Static, fast, and reliable.
- Beautiful and usable on low-end Android phones.
- Premium luxury studio feel.
- Always supports English + Hindi for main content.

## Tech Stack

- HTML5
- CSS3 with variables (`src/styles/variables.css`)
- Vanilla JavaScript (`src/scripts/*.js`)
- Optional: simple static server (e.g. `npx serve .`)

## Folder Overview

- `src/pages/` – Home, About, Services, Contact pages.
- `src/components/` – `navbar.html`, `footer.html`, `card.html`.
- `src/styles/` – `variables.css` (theme), `style.css` (layout & components).
- `src/scripts/` – `utils.js` (helpers), `main.js` (bootstrapping, events).
- `public/` – Favicon, robots, sitemap.
- `docs/` – Project documentation.

## Workflow

1. Edit HTML in `src/pages` for structure and content.
2. Adjust shared components under `src/components`.
3. Change visual theme in `src/styles/variables.css`.
4. Adjust layout and responsive behavior in `src/styles/style.css`.
5. Add/modify JS logic in `src/scripts/utils.js` and `src/scripts/main.js`.

## Language Rules (EN / HI)

- Default language: English.
- User choice stored in `localStorage`.
- The `data-en` / `data-hi` attributes and helper function `applyLanguage()` handle translations.
- When adding new text, provide both EN and HI wherever possible.

## Online Status Rules

- Business hours: **08:00–22:00 IST**.
- During hours:
  - `Available now` (EN)
  - `अभी उपलब्ध` (HI)
- Outside hours:
  - `Accepting requests • Replies 8 AM – 10 PM IST`
  - Hindi equivalent
- No explicit “Offline” words or red chips.

## Contact Form

- Located at `src/pages/contact.html`.
- Requires:
  - Name
  - Phone
  - Service
  - Message
  - Terms & Privacy consent checkbox
- On submit, prepares a WhatsApp URL with a structured message and opens it in a new tab.

## Testing Checklist

- Check all pages on:
  - Small phone (360px width)
  - Tablet
  - Laptop/desktop
- Verify:
  - EN/HI toggle works everywhere.
  - Online status text matches current time rules.
  - Links and buttons are clickable and properly spaced.
  - No unexpected horizontal scroll.
