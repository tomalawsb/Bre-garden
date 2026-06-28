const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
}
if (navToggle && nav) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}
const gallery = document.querySelector('[data-gallery]');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImg = document.querySelector('[data-lightbox-img]');
const lightboxCaption = document.querySelector('[data-lightbox-caption]');
if (gallery && window.BREN_GALLERY) {
  window.BREN_GALLERY.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = 'gallery-item';
    btn.type = 'button';
    btn.innerHTML = `<img src="${item.thumb}" alt="${item.alt}" loading="lazy"><span>${item.alt}</span>`;
    btn.addEventListener('click', () => {
      if (!lightbox) return;
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxCaption.textContent = item.alt;
      lightbox.showModal();
    });
    gallery.appendChild(btn);
  });
}
document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog')?.close()));
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
document.querySelectorAll('[data-fake-audio]').forEach(btn => btn.addEventListener('click', () => {
  btn.textContent = '✓ Tu będzie lektor AI MP3';
  setTimeout(() => btn.textContent = '▶ Posłuchaj opisu', 2500);
}));
