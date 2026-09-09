// Voyer Design landing — shared behavior

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (mobileNavClose && mobileNav) {
    mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  }
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // close all others (single-open accordion)
      item.parentElement.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // --- Brochure download form ---
  // NOTE FOR DEV: this currently only captures the lead client-side and
  // triggers the local placeholder brochure download. Wire `action` up to
  // your lead backend (Google Sheets Apps Script endpoint, Formspree, etc.)
  // before going live — see README.md.
  const brochureForm = document.getElementById('brochure-form');
  if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = brochureForm.querySelector('[name="name"]').value.trim();
      const phone = brochureForm.querySelector('[name="phone"]').value.trim();
      if (!name || !phone) return;

      // TODO: replace with a real POST to your lead-capture endpoint
      // fetch('YOUR_ENDPOINT', { method: 'POST', body: new FormData(brochureForm) });

      const success = document.getElementById('brochure-success');
      if (success) success.classList.add('visible');
      brochureForm.reset();

      const dl = document.createElement('a');
      dl.href = 'assets/voyer-brochure.pdf';
      dl.download = 'Voyer-Design-Brosur.pdf';
      document.body.appendChild(dl);
      dl.click();
      dl.remove();
    });
  }

  // --- Consultation form ---
  const consultForm = document.getElementById('consult-form');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = consultForm.querySelector('[name="name"]').value.trim();
      const phone = consultForm.querySelector('[name="phone"]').value.trim();
      if (!name || !phone) return;

      // TODO: replace with a real POST to your lead-capture endpoint
      // fetch('YOUR_ENDPOINT', { method: 'POST', body: new FormData(consultForm) });

      const success = document.getElementById('consult-success');
      const formEl = consultForm;
      if (success) {
        success.classList.add('visible');
        formEl.style.display = 'none';
      }
    });
  }

});
