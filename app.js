
const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
});

navToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImg = lightbox?.querySelector('img');
const close = document.querySelector('[data-lightbox-close]');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.parentElement.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.dataset.full || img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.hidden = false;
  });
});

close?.addEventListener('click', () => { if (lightbox) lightbox.hidden = true; });
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.hidden = true; });
