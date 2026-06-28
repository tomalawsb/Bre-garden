const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");
const closeBtn = document.querySelector(".lightbox-close");

if (year) year.textContent = new Date().getFullYear();

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".lightbox-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const img = link.querySelector("img");
    lightboxImg.src = link.href;
    lightboxImg.alt = img ? img.alt : "Zdjęcie z galerii Breń Garden";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});
