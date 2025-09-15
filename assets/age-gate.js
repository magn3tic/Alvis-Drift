(function () {
  const AGE_KEY = 'ageVerified';
  const REDIRECT_URL = 'https://www.gov.za/sites/default/files/gcis_document/201503/act-27-1989.pdf';

  function canUseStorage() {
    try {
      localStorage.setItem('__age_test__', '1');
      localStorage.removeItem('__age_test__');
      return true;
    } catch (_) { return false; }
  }

  function shouldShowAgeGate() {
    if (!canUseStorage()) return true;
    return localStorage.getItem(AGE_KEY) !== 'true';
  }

  function showGate() {
    const gate = document.getElementById('age-gate');
    if (!gate) return;
    gate.hidden = false;
    document.documentElement.style.overflow = 'hidden';
  }

  function hideGate() {
    const gate = document.getElementById('age-gate');
    if (!gate) return;
    gate.hidden = true;
    document.documentElement.style.overflow = '';
  }

  function bind() {
    const yes = document.getElementById('age-yes');
    const no  = document.getElementById('age-no');
    const gate = document.getElementById('age-gate');
    if (!gate || !yes || !no) return;

    if (!gate.__bound) {
      yes.addEventListener('click', function (e) {
        e.preventDefault();
        try { localStorage.setItem(AGE_KEY, 'true'); } catch (_) {}
        hideGate();
      });

      no.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = REDIRECT_URL;
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !gate.hidden) hideGate();
      });

      gate.__bound = true;
    }

    if (shouldShowAgeGate()) showGate();
  }

  document.addEventListener('DOMContentLoaded', bind);
  document.addEventListener('shopify:section:load', bind);
  document.addEventListener('shopify:section:select', bind);
})();