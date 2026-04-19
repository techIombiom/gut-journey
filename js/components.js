const LOGO_BLACK = 'https://iombio.com/wp-content/uploads/2025/11/IOM_BLACK.png';
const LOGO_WHITE = 'https://iombio.com/wp-content/uploads/2025/11/IOM_WHITE.png';

function renderHeader({ dark=false, pill='', showMute=false, showBack=false, backHref='', backLabel='Back' } = {}) {
  const logoSrc = dark ? LOGO_WHITE : LOGO_BLACK;
  const backBtn = showBack
    ? `<a href="${backHref}" class="back-btn" style="${dark?'color:rgba(255,255,255,0.6);':''}">&#x2190; ${backLabel}</a>`
    : `<div style="width:60px;"></div>`;
  const pillEl = pill
    ? `<div class="pill${dark?' style=background:rgba(255,255,255,0.15);color:white;border:1px solid rgba(255,255,255,0.2);':''}">
         ${pill}</div>`
    : `<div></div>`;
  const muteEl = showMute
    ? `<button class="mute-btn" id="mute-btn" onclick="toggleMute()" style="${dark?'color:white;opacity:0.5;':''}">&#x1F50A;</button>`
    : `<div style="width:36px;"></div>`;

  return `
    <div class="site-header${dark?' dark':''}">
      ${backBtn}
      <a href="https://iombio.com" target="_blank" class="header-logo header-center">
        <img src="${logoSrc}" alt="iom Bioworks"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
        <span class="logo-fallback" style="display:none;">iom Bioworks</span>
      </a>
      <div class="header-right">
        ${pillEl}
        ${muteEl}
      </div>
    </div>`;
}

function renderFooter({ dark=false } = {}) {
  const logoSrc = dark ? LOGO_WHITE : LOGO_BLACK;
  return `
    <footer class="site-footer${dark?' dark':''}">
      <div class="footer-logo">
        <a href="https://iombio.com" target="_blank">
          <img src="${logoSrc}" alt="iom Bioworks"
               onerror="this.style.display='none';">
        </a>
      </div>
      <p class="footer-tagline">Gut health &amp; microbiome science.<br>Made in India, backed by research.</p>
      <div class="footer-links">
        <a href="https://iombio.com/shop" target="_blank" class="footer-link">Shop</a>
        <a href="https://iombio.com/gut-microbiome-tests" target="_blank" class="footer-link">Gut Tests</a>
        <a href="https://iombio.com/about" target="_blank" class="footer-link">About</a>
        <a href="https://iombio.com/contact" target="_blank" class="footer-link">Contact</a>
        <a href="https://iombio.com/privacy-policy" target="_blank" class="footer-link">Privacy</a>
      </div>
      <p class="footer-copy">&copy; ${new Date().getFullYear()} iom Bioworks. All rights reserved.</p>
    </footer>`;
}

let muted = false;
function toggleMute() {
  muted = !muted;
  const btn = document.getElementById('mute-btn');
  if (btn) btn.innerHTML = muted ? '&#x1F507;' : '&#x1F50A;';
}
