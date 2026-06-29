'use strict';

/* ── Header scroll behaviour ───────────────────────────────────────── */
const header = document.querySelector('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile nav toggle ─────────────────────────────────────────────── */
const toggle = document.querySelector('[data-nav-toggle]');
const nav    = document.querySelector('[data-nav]');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
  });
  // Close on link click
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
}

/* ── Gallery render ────────────────────────────────────────────────── */
const galleryEl = document.querySelector('[data-gallery]');
if (galleryEl && window.BREN_GALLERY && galleryEl.children.length === 0) {
  galleryEl.innerHTML = window.BREN_GALLERY.map((item, i) =>
    `<div class="g-item">
       <button type="button" class="gallery-item" data-idx="${i}" aria-label="Powiększ: ${item.alt}">
         <img src="${item.thumb}" alt="${item.alt}" loading="lazy" decoding="async">
         <div class="gallery-item-overlay"><span>${item.alt}</span></div>
       </button>
     </div>`
  ).join('');
}

/* ── Lightbox ──────────────────────────────────────────────────────── */
const lightbox    = document.querySelector('[data-lightbox]');
const lbImg       = lightbox?.querySelector('[data-lightbox-img]');
const lbCaption   = lightbox?.querySelector('[data-lightbox-caption]');
const lbClose     = lightbox?.querySelector('[data-close]');

function openLightbox(idx) {
  if (!lightbox || !window.BREN_GALLERY) return;
  const item = window.BREN_GALLERY[idx];
  if (!item) return;
  lbImg.src = item.src;
  lbImg.alt = item.alt;
  lbCaption.textContent = item.alt;
  lightbox.showModal();
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-idx]');
  if (btn) openLightbox(Number(btn.dataset.idx));
});

lbClose?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });

/* Keyboard navigation */
document.addEventListener('keydown', e => {
  if (!lightbox?.open) return;
  if (e.key === 'Escape') lightbox.close();
});

/* ── Smooth scroll for anchor links ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Intersection Observer: fade-in sections ──────────────────────── */
if ('IntersectionObserver' in window) {
  const style = document.createElement('style');
  style.textContent = `
    .fade-ready { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    .fade-ready.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  const sections = document.querySelectorAll(
    '.section-about, .section-experience, .section-gallery, .section-offer, .section-qr, .section-contact, .exp-card, .pricing-card'
  );
  sections.forEach((el, i) => {
    el.classList.add('fade-ready');
    if (el.closest('.exp-cards') || el.closest('.pricing-cards')) {
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(el => observer.observe(el));
}
