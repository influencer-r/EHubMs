# Tech & AI Academy — Operations & Logistics Portal

[![Netlify Status](https://api.netlify.com/api/v1/badges/deploy-status?branch=main)](https://app.netlify.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-0ea5e9.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E.svg)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-ready, mobile-first single-page web application engineered for **Tech & AI Academy**. Built for high-speed reception desk onboarding, daily bus transportation logistics, and classroom attendance tracking. Designed with a frosted glassmorphism visual identity, smooth Ken Burns background slideshow, Supabase PostgreSQL persistence, and zero-configuration Netlify deployment.

---

## 🌟 Key Features

### 1. Dynamic Background Slideshow & Visual Identity
- **Local Image Engine:** Uses background images from `./images/` (`bg1.jpg`, `bg2.jpg`, `bg3.jpg`, `bg4.jpg`) in a continuous, seamless loop.
- **Ken Burns & Smooth Fade Effect:** CSS scale transitions (`scale(1)` to `scale(1.08)`) with 8-second cross-slide fade transitions for an immersive, high-end feel.
- **Vignette Overlay:** Double-layer dark gradient overlay (`rgba(15, 23, 42, 0.75)` to `0.88`) ensuring text readability, contrast, and WCAG accessibility standards.
- **Glassmorphism Aesthetic:** Frosted translucent cards (`backdrop-blur-md`), subtle glowing cyan borders, and typography inspired by SchoolPass and Cloud School System.
- **Interactive Logo Customizer:** Top-left branding logo with instant image upload/preview and persistent local storage with 1-click reset to default.
- **Mobile PWA Installation:** Native Progressive Web App with service worker caching, `manifest.json`, and an interactive **"Install App"** prompt in the header.
- **Clean State:** Zero hardcoded dummy names. All rosters start clean and empty upon first launch.

### 2. Branch A: Boot Camp Module (Kids | Seasonal Intakes)
- **Cohort Switcher:** August Intake, November Intake, plus custom cohort addition.
- **Curriculum Tracks:** Junior Robotics, Advanced Robotics, Web Development, with dynamic **"+ Add Track"** expansion.
- **Split Daily Logistics Module (Mon–Fri):**
  - **🚌 Morning Pick-up Manifest:** Auto-filtered for morning bus students, sorted Alphabetically (A–Z), with 1-tap **"Picked Up"** toggle and direct `tel:` parent calling.
  - **🚍 Evening Drop-off Manifest:** Auto-filtered for evening bus students, sorted Alphabetically (A–Z), with 1-tap **"Dropped Off"** toggle.
  - **🏫 Gate / Parent Pick-up Register:** Auto-filtered for self-arrival and parent-pickup students, sorted Alphabetically (A–Z), with 1-tap **"Checked In"** toggle.
  - **📋 Class Register:** Alphabetical student roster with 1-tap **"Present" / "Absent"** attendance toggles.

### 3. Branch B: Regular Programs Module (Adults/Youth | Year-Round)
- **Flexible Monthly Intakes:** January, February, March, etc., with dynamic **"+ Add Intake"** option.
- **Career Tracks:** Full-Stack Web Development, Cybersecurity & Ethical Hacking, Data Science & Machine Learning, Cloud Engineering (+ Add Track).
- **Class Register:** Alphabetical A–Z roster with 1-tap **"Present" / "Absent"** toggles (excludes transportation fields).

### 4. Single-Entry Onboarding Form (Reception Desk)
- Single entry captures student name, parent phone, residence, branch, intake, track, transportation mode, and notes.
- Submitting updates the database, class registers, and daily transportation manifests in real time without page reload or manual retyping.

### 5. Universal Export & Print Engine
- **🖨️ Native Print Engine (`window.print()`):** Clean `@media print` rules hide UI controls and produce an executive manifest header, date stamp, attendance statistics, and signature lines for bus chaperones, drivers, and supervisors.
- **📊 Excel / CSV Export:** Client-side UTF-8 BOM download generating clean `.csv` spreadsheets compatible with Microsoft Excel, Google Sheets, and LibreOffice.
- **📄 Official PDF Export:** Formatted official document download powered by jsPDF and autoTable, styled with Academy Navy banners and structured data tables.

### 6. Seamless Dual-Storage Architecture (Supabase + LocalStorage)
- **Works Out-of-the-Box:** Runs locally in browser storage immediately with zero setup.
- **Supabase Cloud Sync:** Enter your Supabase Project URL and Anon API key in the Database Settings dialog to enable real-time PostgreSQL synchronization across all staff devices.

---

## 🗄️ Supabase PostgreSQL Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase Dashboard, go to the **SQL Editor**.
3. Copy and run the contents of [`supabase-schema.sql`](./supabase-schema.sql).
4. Go to **Project Settings > API** and copy your **Project URL** and **anon public API key**.
5. In the Tech & AI Academy web app, tap the **Database (gear)** icon in the header, paste your credentials, and click **"Test & Connect"** then **"Save Settings"**.

---

## 🚀 Netlify Deployment

This repository is configured for Netlify deployment (`publish = "."` in `netlify.toml` with `_redirects` SPA rules).

### Option 1: One-Click Netlify CLI Deploy
```bash
# Install Netlify CLI if needed
npm install -g netlify-cli

# Login and deploy
netlify deploy --prod --dir .
```

### Option 2: Connect via GitHub
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Tech & AI Academy Portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/tech-ai-academy.git
   git push -u origin main
   ```
2. Log in to [app.netlify.com](https://app.netlify.com), click **"Add new site" > "Import an existing project"**.
3. Select your GitHub repository. Netlify will automatically detect `netlify.toml` and deploy the application.

---

## 📱 Mobile PWA Installation Guide

- **Android (Chrome):** Tap the **"Install App"** button in the header, or choose **"Add to Home screen"** from the browser menu.
- **iOS (Safari):** Tap the **Share** button (⎋) in Safari and select **"Add to Home Screen"** (📲).

---

## 🛠️ Project Structure

```
├── images/                   # Ken Burns slideshow local images
│   ├── bg1.jpg
│   ├── bg2.jpg
│   ├── bg3.jpg
│   └── bg4.jpg
├── icons/                    # PWA application and favicon icons
│   ├── favicon.svg
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
├── index.html                # Single-page application entry point
├── style.css                 # Glassmorphism styling, Ken Burns & print CSS
├── app.js                    # Core state machine, manifests, onboarding & export engine
├── manifest.json             # Progressive Web App manifest
├── sw.js                     # Service worker for offline caching
├── netlify.toml              # Netlify build configuration & security headers
├── _redirects                # Netlify SPA routing fallback
├── supabase-schema.sql       # Supabase PostgreSQL schema, tables & RLS policies
├── .gitignore                # Git ignore patterns
└── README.md                 # Complete documentation
```

---

## 📄 License

MIT &copy; Tech & AI Academy. All rights reserved.
