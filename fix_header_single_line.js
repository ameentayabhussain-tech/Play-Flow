const fs = require('fs');

// 1. UPDATE index.html
let index = fs.readFileSync('index.html', 'utf8');

// Replace Header CSS with sleek single-line header
const oldHeaderCss = `    /* SIMPLE CLEAN HEADER (matching reference screenshot: white bar with subtle rose border) */
    #main-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: #FFFFFF;
      border-bottom: 2px solid #FCE7EB;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
      padding: 12px 0;
      transition: var(--transition);
    }
    .header-inner {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.35rem;
      letter-spacing: -0.02em;
    }
    .brand-logo-img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid #E2E8F0;
    }
    .logo-text { color: #111827; }
    .logo-text span { color: #DC143C; }

    /* Simple clean navigation links */
    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
    }
    .nav-links a, .dropdown-btn {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #1F2937;
      transition: color 0.2s ease;
      padding: 6px 0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
    }
    .nav-links a:hover, .dropdown-btn:hover, .nav-links a.active {
      color: #DC143C;
    }`;

const newHeaderCss = `    /* SLIM, SINGLE-LINE CLEAN HEADER (56px height, strictly single line text) */
    #main-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: #FFFFFF;
      border-bottom: 2px solid #FCE7EB;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.03);
      height: 56px;
      padding: 0;
      display: flex;
      align-items: center;
      transition: var(--transition);
    }
    .header-inner {
      max-width: 1240px;
      width: 100%;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: nowrap;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 9px;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .brand-logo-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid #E2E8F0;
      flex-shrink: 0;
    }
    .logo-text { color: #111827; white-space: nowrap; }
    .logo-text span { color: #DC143C; }

    /* Strict single-line navigation links */
    .nav-links {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
    .nav-links a, .dropdown-btn {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
      font-size: 14.5px;
      font-weight: 500;
      color: #1F2937;
      transition: color 0.15s ease;
      padding: 6px 2px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      white-space: nowrap !important;
      flex-shrink: 0;
      line-height: 1;
    }
    .nav-links a:hover, .dropdown-btn:hover, .nav-links a.active {
      color: #DC143C;
    }`;

index = index.replace(oldHeaderCss, newHeaderCss);

// Ensure the header download button stays strictly single line
index = index.replace(
  `id="header-download-btn" style="padding: 9px 20px; font-size: 0.88rem; box-shadow: 0 3px 12px rgba(255,55,75,0.25);">`,
  `id="header-download-btn" style="padding: 8px 18px; font-size: 0.84rem; white-space: nowrap !important; flex-shrink: 0; line-height: 1; box-shadow: 0 2px 10px rgba(255,55,75,0.22);">`
);

// Update #hero top padding for the 56px slim header
index = index.replace(
  'padding-top: 110px;\n      padding-bottom: 70px;',
  'padding-top: 86px;\n      padding-bottom: 60px;'
);

// Responsive rules: prevent cramped wrap on smaller desktops
index = index.replace(
  `@media (max-width: 1024px) {
      .hero-inner { grid-template-columns: 1fr; text-align: center; }`,
  `@media (max-width: 1100px) {
      .nav-links { gap: 14px; }
      .nav-links a, .dropdown-btn { font-size: 13.5px; }
    }
    @media (max-width: 980px) {
      .nav-links { display: none; }
      .hamburger { display: flex; }
    }
    @media (max-width: 1024px) {
      .hero-inner { grid-template-columns: 1fr; text-align: center; }`
);

fs.writeFileSync('index.html', index, 'utf8');
console.log('Successfully updated index.html with single-line slim header.');

// 2. UPDATE privacy-policy.html
let priv = fs.readFileSync('privacy-policy.html', 'utf8');
priv = priv.replace(
  `    #main-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: #FFFFFF;
      border-bottom: 2px solid #FCE7EB;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }`,
  `    #main-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: #FFFFFF;
      border-bottom: 2px solid #FCE7EB;
      box-shadow: 0 1px 8px rgba(0,0,0,0.03);
      height: 56px;
      display: flex;
      align-items: center;
    }
    .header-inner { height: 56px !important; flex-wrap: nowrap !important; }
    .header-inner * { white-space: nowrap !important; }`
);
fs.writeFileSync('privacy-policy.html', priv, 'utf8');
console.log('Successfully updated privacy-policy.html header.');

// 3. UPDATE terms-of-service.html
let terms = fs.readFileSync('terms-of-service.html', 'utf8');
terms = terms.replace(
  `    #main-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: #FFFFFF;
      border-bottom: 2px solid #FCE7EB;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }`,
  `    #main-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: #FFFFFF;
      border-bottom: 2px solid #FCE7EB;
      box-shadow: 0 1px 8px rgba(0,0,0,0.03);
      height: 56px;
      display: flex;
      align-items: center;
    }
    .header-inner { height: 56px !important; flex-wrap: nowrap !important; }
    .header-inner * { white-space: nowrap !important; }`
);
fs.writeFileSync('terms-of-service.html', terms, 'utf8');
console.log('Successfully updated terms-of-service.html header.');
