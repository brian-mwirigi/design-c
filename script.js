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

const SERVICE_GALLERIES = {
  "design-build": {
    title: "Design & Build",
    images: [
      { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80", alt: "Construction site works" },
      { src: "media/projects/civil-works/cover.jpg", alt: "Civil works on site" },
      { src: "media/projects/residential-build/cover.jpg", alt: "Residential build in progress" },
    ],
  },
  landscaping: {
    title: "Landscaping",
    images: [
      { src: "media/projects/landscaping/cover.jpg", alt: "Landscaping project" },
      { src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1600&q=80", alt: "Garden and outdoor space" },
      { src: "https://images.unsplash.com/photo-1598904327874-098494c07030?auto=format&fit=crop&w=1600&q=80", alt: "Landscape design detail" },
    ],
  },
  renovation: {
    title: "Remodelling & Renovation",
    images: [
      { src: "media/projects/renovation/01.jpg", alt: "Renovation works in progress" },
      { src: "media/projects/renovation/02.jpg", alt: "Interior remodel detail" },
      { src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80", alt: "Renovated living space" },
    ],
  },
  "general-contractor": {
    title: "General Building Contractor",
    images: [
      { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80", alt: "Structural building works" },
      { src: "media/projects/residential-build/01.jpg", alt: "Site execution and masonry" },
      { src: "media/projects/civil-works/cover.jpg", alt: "Foundation and civil works" },
    ],
  },
  construction: {
    title: "Building & Construction",
    images: [
      { src: "media/projects/residential-build/cover.jpg", alt: "Residential construction" },
      { src: "media/projects/residential-build/01.jpg", alt: "Building progress on site" },
      { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80", alt: "Commercial building facade" },
    ],
  },
  consultancy: {
    title: "Consultancy",
    images: [
      { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80", alt: "Construction planning and advice" },
      { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80", alt: "Architectural drawings review" },
      { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80", alt: "Site supervision and inspection" },
    ],
  },
};

const serviceTriggers = document.querySelectorAll("[data-service]");
if (serviceTriggers.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "service-lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="service-lightbox-backdrop" data-close></div>
    <div class="service-lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="service-lightbox-title">
      <div class="service-lightbox-head">
        <h2 id="service-lightbox-title"></h2>
        <button class="service-lightbox-close" type="button" aria-label="Close gallery" data-close>&times;</button>
      </div>
      <div class="service-lightbox-stage">
        <img alt="" />
        <button class="service-lightbox-nav service-lightbox-prev" type="button" aria-label="Previous image">&lsaquo;</button>
        <button class="service-lightbox-nav service-lightbox-next" type="button" aria-label="Next image">&rsaquo;</button>
      </div>
      <div class="service-lightbox-foot">
        <span class="service-lightbox-counter"></span>
        <div class="service-lightbox-dots"></div>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const titleEl = lightbox.querySelector("#service-lightbox-title");
  const imgEl = lightbox.querySelector(".service-lightbox-stage img");
  const counterEl = lightbox.querySelector(".service-lightbox-counter");
  const dotsEl = lightbox.querySelector(".service-lightbox-dots");
  const prevBtn = lightbox.querySelector(".service-lightbox-prev");
  const nextBtn = lightbox.querySelector(".service-lightbox-next");
  let gallery = [];
  let index = 0;
  let lastFocus = null;

  const renderSlide = () => {
    const slide = gallery[index];
    if (!slide) return;
    imgEl.classList.remove("is-active");
    imgEl.onload = () => imgEl.classList.add("is-active");
    imgEl.onerror = () => {
      imgEl.alt = "Image unavailable";
      imgEl.classList.add("is-active");
    };
    imgEl.src = slide.src;
    imgEl.alt = slide.alt;
    if (imgEl.complete) imgEl.classList.add("is-active");
    counterEl.textContent = `${index + 1} / ${gallery.length}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === gallery.length - 1;
    dotsEl.querySelectorAll(".service-lightbox-dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });
  };

  const buildDots = () => {
    dotsEl.innerHTML = "";
    gallery.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "service-lightbox-dot";
      dot.setAttribute("aria-label", `Go to image ${i + 1}`);
      dot.addEventListener("click", () => {
        index = i;
        renderSlide();
      });
      dotsEl.appendChild(dot);
    });
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    document.body.classList.remove("is-lightbox-open");
    if (lastFocus) lastFocus.focus();
  };

  const openLightbox = (key) => {
    const data = SERVICE_GALLERIES[key];
    if (!data?.images?.length) return;
    gallery = data.images;
    index = 0;
    titleEl.textContent = data.title;
    buildDots();
    renderSlide();
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("is-open"));
    document.body.classList.add("is-lightbox-open");
    lightbox.querySelector(".service-lightbox-close").focus();
  };

  serviceTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger.dataset.service));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(trigger.dataset.service);
      }
    });
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index -= 1;
      renderSlide();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (index < gallery.length - 1) {
      index += 1;
      renderSlide();
    }
  });

  lightbox.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft" && index > 0) {
      index -= 1;
      renderSlide();
    }
    if (event.key === "ArrowRight" && index < gallery.length - 1) {
      index += 1;
      renderSlide();
    }
  });
}
