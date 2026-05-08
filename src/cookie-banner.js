// Banner informativo cookie — non blocca il sito.
// Mostrato finché l'utente non clicca "Ho capito", poi non più riproposto per 12 mesi.

const STORAGE_KEY = 'mirhq_cookie_notice_dismissed';
const VALIDITY_MS = 365 * 24 * 60 * 60 * 1000; // 12 mesi

function isDismissed() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (Number.isNaN(ts)) return false;
    return Date.now() - ts < VALIDITY_MS;
  } catch (e) {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch (e) {
    /* ignore (cookie blocked or storage full) */
  }
}

function buildBanner() {
  const banner = document.createElement('aside');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Informativa cookie');
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <div class="cookie-banner-text">
        <strong>Informativa cookie.</strong>
        Questo sito utilizza solo <strong>cookie tecnici</strong> necessari al funzionamento.
        Nessun tracciamento, profilazione o pubblicità.
        <a href="/cookie.html">Leggi di più</a>.
      </div>
      <button type="button" class="cookie-banner-btn" aria-label="Chiudi informativa cookie">
        Ho capito
      </button>
    </div>
  `;
  banner.querySelector('.cookie-banner-btn').addEventListener('click', () => {
    markDismissed();
    banner.classList.add('cookie-banner--leaving');
    setTimeout(() => banner.remove(), 250);
  });
  return banner;
}

function init() {
  if (isDismissed()) return;
  const banner = buildBanner();
  document.body.appendChild(banner);
  // Forza riflow per attivare l'animazione di entrata
  requestAnimationFrame(() => banner.classList.add('cookie-banner--visible'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
