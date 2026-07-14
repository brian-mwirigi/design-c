const page = document.body.dataset.page;
const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

if (page && nav) {
  nav.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if (toggle && nav && header) {
  toggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    header.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      header.classList.remove("is-menu-open");
    });
  });
}

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

document.querySelectorAll(".slot img").forEach((img) => {
  const slot = img.closest(".slot");
  const fail = () => {
    if (!slot || slot.classList.contains("empty")) return;
    img.remove();
    slot.classList.add("empty");
  };
  img.addEventListener("error", fail);
  if (img.complete && img.naturalWidth === 0) fail();
});

document.querySelectorAll(".slot video").forEach((video) => {
  const slot = video.closest(".slot");
  const btn = slot?.querySelector(".play-btn");
  if (!slot || !btn) return;
  const fail = () => {
    video.remove();
    btn.remove();
    slot.classList.add("empty");
  };
  video.addEventListener("error", fail);
  const source = video.querySelector("source");
  if (source) source.addEventListener("error", fail);
  video.load();
  btn.addEventListener("click", async () => {
    try {
      video.setAttribute("controls", "");
      slot.classList.add("playing");
      await video.play();
    } catch {
      fail();
    }
  });
});
