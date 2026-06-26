document.addEventListener('DOMContentLoaded', () => {
  const gate = document.getElementById('age-gate');
  const yes  = document.getElementById('age-yes');
  const no   = document.getElementById('age-no');
  const AGE_KEY = 'ageVerified';
  const REDIRECT_URL = 'https://www.gov.za/sites/default/files/gcis_document/201503/act-27-1989.pdf';

  // Pages where the age gate should be skipped
  const EXEMPT_PATHS = [
    '/pages/the-221-game'
  ];

  const isExemptPage = EXEMPT_PATHS.some(path =>
    window.location.pathname === path ||
    window.location.pathname.startsWith(path + '/')
  );

  function showGate() {
    if (!gate) return;
    gate.removeAttribute('hidden');
    gate.style.display = 'block';
    document.documentElement.style.overflow = 'hidden';
  }

  function hideGate() {
    if (!gate) return;
    gate.setAttribute('hidden', '');
    document.documentElement.style.overflow = '';
  }

  const shouldShow = (() => {
    if (isExemptPage) return false; // Skip gate on exempt pages
    try { return localStorage.getItem(AGE_KEY) !== 'true'; }
    catch { return true; }
  })();

  if (shouldShow) showGate();

  yes?.addEventListener('click', e => {
    e.preventDefault();
    try { localStorage.setItem(AGE_KEY, 'true'); } catch {}
    hideGate();
  });

  no?.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = REDIRECT_URL;
  });
});

// If your theme re-renders sections, re-run the logic:
document.addEventListener('shopify:section:load', () => {
  const EXEMPT_PATHS = ['/pages/the-221-game'];
  const isExemptPage = EXEMPT_PATHS.some(path =>
    window.location.pathname === path ||
    window.location.pathname.startsWith(path + '/')
  );

  const gate = document.getElementById('age-gate');
  if (gate && !isExemptPage && localStorage.getItem('ageVerified') !== 'true') {
    gate.removeAttribute('hidden');
    gate.style.removeProperty('display');
  }
});