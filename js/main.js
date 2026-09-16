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

  // --- Consultation form: build a pre-filled WhatsApp message ---
  const WA_NUMBER = '6282117777290';
  const FIELD_LABELS = {
    name: 'Nama',
    phone: 'No. WhatsApp',
    location: 'Lokasi',
    service: 'Jenis Layanan',
    scope: 'Ruang Lingkup',
    room: 'Ruangan',
    area: 'Estimasi Luas (m²)',
    landarea: 'Luas Tanah (m²)',
  };

  const consultForm = document.getElementById('consult-form');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = consultForm.querySelector('[name="name"]').value.trim();
      const phone = consultForm.querySelector('[name="phone"]').value.trim();
      if (!name || !phone) return;

      const lines = [];
      Array.from(consultForm.elements).forEach((el) => {
        const label = FIELD_LABELS[el.name];
        const value = el.value && el.value.trim();
        if (label && value) lines.push(`${label}: ${value}`);
      });

      const message = `Halo Voyer Design, saya ingin konsultasi gratis dengan detail berikut:\n\n${lines.join('\n')}`;
      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

      const success = document.getElementById('consult-success');
      if (success) success.classList.add('visible');

      window.open(waUrl, '_blank', 'noopener');
      consultForm.reset();
    });
  }

});
