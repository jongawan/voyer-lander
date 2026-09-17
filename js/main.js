// Voyer Design landing — shared behavior

// --- Lead tracking: log to Google Sheet + push GTM event ---
var SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxi1xU0WW1G16qbBd7T5gHDI-ZQSzLe43zp7suvwR_y2cDkj8TGtalUAwfsBSLVcYWv/exec';

function sendLeadToSheetAndGTM(fields) {
  // 1) Log the lead to Google Sheets. Fire-and-forget — we don't await
  //    this, so it never delays or blocks the WhatsApp redirect.
  //    Content-Type text/plain is intentional: it avoids a CORS preflight
  //    request that Apps Script Web Apps don't handle, while Apps Script
  //    still reads the body fine with JSON.parse(e.postData.contents).
  try {
    fetch(SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(fields)
    }).catch(function (err) {
      console.warn('Voyer lead: sheet log failed', err);
    });
  } catch (err) {
    console.warn('Voyer lead: sheet log failed', err);
  }

  // 2) Push a dataLayer event. GTM (GTM-KWXCRCVG, already installed on
  //    the page) listens for this via a Custom Event trigger and fires
  //    the GA4 event tag + Google Ads conversion tag from there.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    lead_ruang_lingkup: fields.ruangLingkup || '',
    lead_lokasi: fields.lokasi || '',
    lead_gaya_desain: fields.gayaDesain || ''
  });
}

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
    style: 'Gaya Desain Disukai',
    timeline: 'Kapan Ingin Mulai',
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

      const getValue = (fieldName) => {
        const el = consultForm.querySelector(`[name="${fieldName}"]`);
        return el ? el.value.trim() : '';
      };

      sendLeadToSheetAndGTM({
        nama: name,
        whatsapp: phone,
        lokasi: getValue('location'),
        ruangLingkup: getValue('scope'),
        luasTanah: getValue('landarea'),
        gayaDesain: getValue('style'),
        kapanMulai: getValue('timeline'),
      });

      const success = document.getElementById('consult-success');
      if (success) success.classList.add('visible');

      window.open(waUrl, '_blank', 'noopener');
      consultForm.reset();
    });
  }

});
