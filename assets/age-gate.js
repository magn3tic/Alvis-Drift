document.addEventListener('DOMContentLoaded', () => {
  const gate = document.getElementById('age-gate');
  const yes  = document.getElementById('age-yes');
  const no   = document.getElementById('age-no');
  const AGE_KEY = 'ageVerified';
  const REDIRECT_URL = 'https://www.gov.za/sites/default/files/gcis_document/201503/act-27-1989.pdf';

  function showGate() {
    if (!gate) return;
    gate.removeAttribute('hidden');         // <-- THIS is the key
    // gate.style.removeProperty('display');   // clean up any inline 'display'
    gate.style.display = 'block';
    document.documentElement.style.overflow = 'hidden';
  }

  function hideGate() {
    if (!gate) return;
    gate.setAttribute('hidden', '');        // hide by putting the attribute back
    document.documentElement.style.overflow = '';
  }

  const shouldShow = (() => {
    try { return localStorage.getItem(AGE_KEY) !== 'true'; }
    catch { return true; } // if storage blocked, show gate
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
  const gate = document.getElementById('age-gate');
  if (gate && localStorage.getItem('ageVerified') !== 'true') {
    gate.removeAttribute('hidden');
    gate.style.removeProperty('display');
  }
});
