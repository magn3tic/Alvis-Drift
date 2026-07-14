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