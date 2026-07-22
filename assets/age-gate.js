document.addEventListener('DOMContentLoaded', () => {
  const gate = document.getElementById('age-gate');

  document.getElementById('age-yes')?.addEventListener('click', e => {
    e.preventDefault();
    try { localStorage.setItem('ageVerified', 'true'); } catch {}
    gate.setAttribute('hidden', '');
    document.documentElement.style.overflow = '';
  });

  document.getElementById('age-no')?.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'https://www.gov.za/sites/default/files/gcis_document/201503/act-27-1989.pdf';
  });
});

// Theme editor: re-check when sections re-render
document.addEventListener('shopify:section:load', () => {
  const gate = document.getElementById('age-gate');
  const exempt = ['/pages/the-221-game'].some(p =>
    location.pathname === p || location.pathname.startsWith(p + '/')
  );
  let verified = false;
  try { verified = localStorage.getItem('ageVerified') === 'true'; } catch {}

  if (gate && !exempt && !verified) {
    gate.removeAttribute('hidden');
    document.documentElement.style.overflow = 'hidden';
  }
});