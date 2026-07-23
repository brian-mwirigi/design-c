const page = document.body.dataset.page;
const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");

const targetYear = 2019;

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(targetYear);
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
  video.preload = "none";
  btn.addEventListener("click", async () => {
    try {
      if (video.readyState === 0) video.load();
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
      { src: "/media/site/services-lead.jpg", alt: "Keith Fount residential build" },
      { src: "/media/projects/project-1/cover.jpg", alt: "Project 1 finished exterior" },
      { src: "/media/projects/kitale-bungalow/cover.jpg", alt: "Kitale bungalow build" },
      { src: "/media/projects/kisii/cover.jpg", alt: "Kisii residential build" },
      { src: "/media/projects/project-7/cover.jpg", alt: "Project 7 exterior" },
    ],
  },
  landscaping: {
    title: "Landscaping",
    images: [
      { src: "/media/projects/landscaping/cover.jpg", alt: "Outdoor site works" },
      { src: "/media/projects/landscaping/01.jpg", alt: "Site surroundings" },
      { src: "/media/projects/landscaping/02.jpg", alt: "Completed property exterior" },
    ],
  },
  renovation: {
    title: "Remodelling & Renovation",
    images: [
      { src: "/media/projects/renovation/01.jpg", alt: "Kitengela renovations after" },
      { src: "/media/projects/renovation/02.jpg", alt: "Kitengela interior finish" },
      { src: "/media/projects/renovation/03.jpg", alt: "Kitengela works in progress" },
      { src: "/media/projects/renovation/04.jpg", alt: "Kitengela renovation detail" },
      { src: "/media/projects/renovation/05.jpg", alt: "Kitengela renovation progress" },
      { src: "/media/projects/renovation/06.jpg", alt: "Kitengela finished area" },
    ],
  },
  "general-contractor": {
    title: "General Building Contractor",
    images: [
      { src: "/media/projects/civil-works/cover.jpg", alt: "Structural works on site" },
      { src: "/media/projects/project-1/02.jpg", alt: "Residential build progress" },
      { src: "/media/projects/civil-works/01.jpg", alt: "Site construction stage" },
      { src: "/media/projects/kitale/01.jpg", alt: "Kitale construction photo" },
      { src: "/media/projects/project-7/01.jpg", alt: "Project 7 site works" },
    ],
  },
  construction: {
    title: "Building & Construction",
    images: [
      { src: "/media/projects/project-1/cover.jpg", alt: "Residential construction" },
      { src: "/media/projects/kisii/cover.jpg", alt: "Kisii 2 bedroom home" },
      { src: "/media/projects/kitale/cover.jpg", alt: "Kitale completed works" },
      { src: "/media/projects/kitale-bungalow/cover.jpg", alt: "Kitale bungalow" },
      { src: "/media/projects/project-7/cover.jpg", alt: "Project 7 completed works" },
    ],
  },
  consultancy: {
    title: "Consultancy",
    images: [
      { src: "/media/projects/project-5/01.jpg", alt: "Site finishing review" },
      { src: "/media/projects/project-5/02.jpg", alt: "Works in progress" },
      { src: "/media/projects/project-5/03.jpg", alt: "On-site project guidance" },
      { src: "/media/projects/project-5/04.jpg", alt: "Interior consultancy photo" },
      { src: "/media/projects/project-5/05.jpg", alt: "Finishing detail" },
    ],
  },
};

const PROJECT_GALLERIES = {
  "project-1": {
    title: "Project 1",
    images: [
      { src: "/media/projects/project-1/01.jpg", alt: "Project 1 photo" },
      { src: "/media/projects/project-1/02.jpg", alt: "Project 1 photo" },
      { src: "/media/projects/project-1/03.jpg", alt: "Project 1 photo" },
      { src: "/media/projects/project-1/04.jpg", alt: "Project 1 photo" },
      { src: "/media/projects/project-1/05.jpg", alt: "Project 1 photo" },
      { src: "/media/projects/project-1/06.jpg", alt: "Project 1 photo" },
      { src: "/media/projects/project-1/07.jpg", alt: "Project 1 photo" },
    ],
  },
  "renovation": {
    title: "Kitengela renovations",
    images: [
      { src: "/media/projects/renovation/01.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/02.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/03.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/04.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/05.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/06.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/07.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/08.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/09.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/10.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/11.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/12.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/13.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/14.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/15.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/16.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/17.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/18.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/19.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/20.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/21.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/22.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/23.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/24.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/25.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/26.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/27.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/28.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/29.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/30.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/31.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/32.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/33.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/34.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/35.jpg", alt: "Kitengela renovations photo" },
      { src: "/media/projects/renovation/36.jpg", alt: "Kitengela renovations photo" },
    ],
  },
  "kisii": {
    title: "Kisii 2 bedroom",
    images: [
      { src: "/media/projects/kisii/01.jpg", alt: "Kisii 2 bedroom photo" },
      { src: "/media/projects/kisii/02.jpg", alt: "Kisii 2 bedroom photo" },
      { src: "/media/projects/kisii/03.jpg", alt: "Kisii 2 bedroom photo" },
      { src: "/media/projects/kisii/04.jpg", alt: "Kisii 2 bedroom photo" },
      { src: "/media/projects/kisii/05.jpg", alt: "Kisii 2 bedroom photo" },
      { src: "/media/projects/kisii/06.jpg", alt: "Kisii 2 bedroom photo" },
    ],
  },
  "kitale": {
    title: "Kitale",
    images: [
      { src: "/media/projects/kitale/01.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/02.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/03.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/04.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/05.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/06.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/07.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/08.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/09.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/10.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/11.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/12.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/13.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/14.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/15.jpg", alt: "Kitale photo" },
      { src: "/media/projects/kitale/16.jpg", alt: "Kitale photo" },
    ],
  },
  "project-5": {
    title: "Project 5",
    images: [
      { src: "/media/projects/project-5/01.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/02.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/03.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/04.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/05.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/06.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/07.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/08.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/09.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/10.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/11.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/12.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/13.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/14.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/15.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/16.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/17.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/18.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/19.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/20.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/21.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/22.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/23.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/24.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/25.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/26.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/27.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/28.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/29.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/30.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/31.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/32.jpg", alt: "Project 5 photo" },
      { src: "/media/projects/project-5/33.jpg", alt: "Project 5 photo" },
    ],
  },
  "kitale-bungalow": {
    title: "5 bedroom bungalow, Kitale",
    images: [
      { src: "/media/projects/kitale-bungalow/01.jpg", alt: "5 bedroom bungalow, Kitale photo" },
      { src: "/media/projects/kitale-bungalow/02.jpg", alt: "5 bedroom bungalow, Kitale photo" },
      { src: "/media/projects/kitale-bungalow/03.jpg", alt: "5 bedroom bungalow, Kitale photo" },
      { src: "/media/projects/kitale-bungalow/04.jpg", alt: "5 bedroom bungalow, Kitale photo" },
      { src: "/media/projects/kitale-bungalow/05.jpg", alt: "5 bedroom bungalow, Kitale photo" },
      { src: "/media/projects/kitale-bungalow/06.jpg", alt: "5 bedroom bungalow, Kitale photo" },
    ],
  },
  "project-7": {
    title: "Project 7",
    images: [
      { src: "/media/projects/project-7/01.jpg", alt: "Project 7 photo" },
      { src: "/media/projects/project-7/02.jpg", alt: "Project 7 photo" },
      { src: "/media/projects/project-7/03.jpg", alt: "Project 7 photo" },
      { src: "/media/projects/project-7/04.jpg", alt: "Project 7 photo" },
      { src: "/media/projects/project-7/05.jpg", alt: "Project 7 photo" },
      { src: "/media/projects/project-7/06.jpg", alt: "Project 7 photo" },
      { src: "/media/projects/project-7/07.jpg", alt: "Project 7 photo" },
    ],
  },
};

const serviceTriggers = document.querySelectorAll("[data-service]");
const projectTriggers = document.querySelectorAll("[data-project]");
if (serviceTriggers.length || projectTriggers.length) {
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
    if (gallery.length > 12) {
      dotsEl.hidden = true;
      return;
    }
    dotsEl.hidden = false;
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

  const openLightbox = (data, startIndex = 0) => {
    if (!data?.images?.length) return;
    gallery = data.images;
    index = Math.max(0, Math.min(startIndex, gallery.length - 1));
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
    trigger.addEventListener("click", () => openLightbox(SERVICE_GALLERIES[trigger.dataset.service]));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(SERVICE_GALLERIES[trigger.dataset.service]);
      }
    });
  });

  projectTriggers.forEach((trigger) => {
    const open = (start = 0) => openLightbox(PROJECT_GALLERIES[trigger.dataset.project], start);
    trigger.addEventListener("click", (event) => {
      if (event.target.closest(".play-btn, video, button:not([data-project-open])")) return;
      const thumb = event.target.closest("[data-gallery-index]");
      open(thumb ? Number(thumb.dataset.galleryIndex) : 0);
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(0);
      }
    });
    trigger.querySelectorAll("[data-project-open]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        open(0);
      });
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

/* Enquire mini-tabs + survey engine (contact page) */
(function () {
  const panelRoot = document.querySelector(".enquire-panel");
  if (!panelRoot) return;

  const tabs = panelRoot.querySelectorAll("[data-tab]");
  const panels = panelRoot.querySelectorAll("[data-panel]");

  const setTab = (name) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.tab === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach((panel) => {
      const active = panel.dataset.panel === name;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
    if (name === "survey") {
      if (location.hash !== "#survey") history.replaceState(null, "", "#survey");
    } else if (location.hash === "#survey") {
      history.replaceState(null, "", location.pathname + location.search);
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setTab(tab.dataset.tab));
  });

  if (location.hash === "#survey") setTab("survey");

  const getApiUrl = (path) => {
    const isLocalStaticPreview = window.location.port === "5500";
    return isLocalStaticPreview ? `http://127.0.0.1:3000${path}` : path;
  };

  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    const statusEl = document.getElementById("quoteFormStatus");
    const setQuoteStatus = (message, isError = false) => {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.classList.toggle("is-error", isError);
    };

    quoteForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(quoteForm);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const email = String(data.get("email") || "").trim();
      const company = String(data.get("company") || "").trim();
      const interest = String(data.get("interest") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !phone || !email || !message) {
        quoteForm.reportValidity();
        return;
      }

      const subject = "Project enquiry: " + interest;
      const body = [
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + email,
        company ? "Company: " + company : null,
        "Interested in: " + interest,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      setQuoteStatus("Sending your message…", false);

      try {
        const response = await fetch(getApiUrl("/api/contact"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, email, company, interest, message }),
        });

        const result = await response.json().catch(() => null);
        if (!response.ok) throw new Error(result?.error || "Unable to send message.");

        setQuoteStatus("Thanks! Your message has been sent.", false);
        quoteForm.reset();
      } catch (error) {
        console.error(error);
        setQuoteStatus("The message could not be sent directly. Please email keithfountsolutions@gmail.com.", true);
        window.location.href =
          "mailto:keithfountsolutions@gmail.com?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);
      }
    });
  }

  const stageEl = document.getElementById("kfsStage");
  const progressBar = document.getElementById("kfsProgressBar");
  const stepLabel = document.getElementById("kfsStepLabel");
  if (!stageEl || !progressBar || !stepLabel) return;

  const SERVICES = [
    { id: "design-build", label: "Design & Build", desc: "Interior design, exterior work and civil works, first plans to handover." },
    { id: "landscaping", label: "Landscaping", desc: "Outdoor areas planned to suit the building." },
    { id: "renovation", label: "Remodelling & Renovation", desc: "Updates that work with your structure, budget and daily life." },
    { id: "contractor", label: "General Building Contractor", desc: "Foundations, structure and full project delivery." },
    { id: "construction", label: "Building & Construction", desc: "Residential and commercial building with clear site management." },
    { id: "consultancy", label: "Consultancy", desc: "Site supervision, building advice and cost estimates." },
  ];

  const SERVICE_TO_SET = {
    "design-build": "design-build",
    landscaping: "landscaping",
    renovation: "renovation",
    contractor: "construction",
    construction: "construction",
    consultancy: "consultancy",
  };

  const QUESTION_SETS = {
    "design-build": [
      {
        id: "db_type",
        type: "single",
        title: "What type of project is this?",
        options: [
          { v: "New build", l: "New build" },
          { v: "Interior design", l: "Interior design" },
          { v: "Exterior work", l: "Exterior work" },
          { v: "Full design-to-build", l: "Full design-to-build" },
        ],
      },
      {
        id: "db_plans",
        type: "single",
        title: "Do you already have architectural plans?",
        options: [
          { v: "Yes, fully approved", l: "Yes, fully approved" },
          { v: "Yes, partial or draft", l: "Yes, partial or draft" },
          { v: "No, need design from scratch", l: "No, need design from scratch" },
        ],
      },
      {
        id: "db_size",
        type: "text",
        title: "What's the approximate size of the space?",
        sub: "Rooms, square metres, or floors, whatever you have.",
        placeholder: "e.g. 4-bedroom, ~250 sqm",
      },
      {
        id: "db_goal",
        type: "single",
        title: "What's driving this project?",
        options: [
          { v: "Need more space", l: "Need more space" },
          { v: "Modern look and feel", l: "Modern look and feel" },
          { v: "Better functionality", l: "Better functionality" },
          { v: "Increasing property value", l: "Increasing property value" },
          { v: "Other", l: "Other" },
        ],
      },
    ],
    renovation: [
      {
        id: "rn_areas",
        type: "multi",
        title: "Which areas need work?",
        sub: "Select all that apply.",
        options: [
          { v: "Kitchen", l: "Kitchen" },
          { v: "Bathroom(s)", l: "Bathroom(s)" },
          { v: "Full interior", l: "Full interior" },
          { v: "Exterior / facade", l: "Exterior / facade" },
          { v: "Roofing", l: "Roofing" },
          { v: "Multiple areas", l: "Multiple areas" },
        ],
      },
      {
        id: "rn_condition",
        type: "single",
        title: "What condition is the current structure in?",
        options: [
          { v: "Good, cosmetic changes only", l: "Good, cosmetic changes only" },
          { v: "Fair, some repairs needed", l: "Fair, some repairs needed" },
          { v: "Poor, major work needed", l: "Poor, major work needed" },
        ],
      },
      {
        id: "rn_occupied",
        type: "single",
        title: "Will the property be occupied during the renovation?",
        options: [
          { v: "Yes, fully occupied", l: "Yes, fully occupied" },
          { v: "Partially occupied", l: "Partially occupied" },
          { v: "No, vacant during works", l: "No, vacant during works" },
        ],
      },
      {
        id: "rn_goal",
        type: "single",
        title: "What's driving this renovation?",
        options: [
          { v: "Wear and tear repairs", l: "Wear and tear repairs" },
          { v: "Updating an outdated look", l: "Updating an outdated look" },
          { v: "Preparing to sell or let", l: "Preparing to sell or let" },
          { v: "Changing how the space is used", l: "Changing how the space is used" },
          { v: "Other", l: "Other" },
        ],
      },
    ],
    landscaping: [
      {
        id: "ls_size",
        type: "single",
        title: "What's the size of the outdoor area?",
        options: [
          { v: "Small courtyard or balcony", l: "Small courtyard or balcony" },
          { v: "Medium garden or yard", l: "Medium garden or yard" },
          { v: "Large residential compound", l: "Large residential compound" },
          { v: "Commercial grounds", l: "Commercial grounds" },
        ],
      },
      {
        id: "ls_elements",
        type: "multi",
        title: "Which elements are you interested in?",
        sub: "Select all that apply.",
        options: [
          { v: "Planting and gardens", l: "Planting and gardens" },
          { v: "Paving and walkways", l: "Paving and walkways" },
          { v: "Water features", l: "Water features" },
          { v: "Outdoor lighting", l: "Outdoor lighting" },
          { v: "Fencing and boundary walls", l: "Fencing and boundary walls" },
          { v: "Full landscape design", l: "Full landscape design" },
        ],
      },
      {
        id: "ls_new",
        type: "single",
        title: "Is this a new outdoor space or an update to an existing one?",
        options: [
          { v: "New space, starting from bare ground", l: "New space, starting from bare ground" },
          { v: "Update to an existing landscape", l: "Update to an existing landscape" },
        ],
      },
      {
        id: "ls_notes",
        type: "text",
        title: "Any site conditions we should know about?",
        sub: "Slope, drainage, existing trees, soil type, anything relevant. Optional.",
        optional: true,
        placeholder: "Optional: leave blank if not sure",
      },
    ],
    construction: [
      {
        id: "cn_use",
        type: "single",
        title: "Is this a residential or commercial project?",
        options: [
          { v: "Residential", l: "Residential" },
          { v: "Commercial", l: "Commercial" },
          { v: "Mixed use", l: "Mixed use" },
        ],
      },
      {
        id: "cn_stage",
        type: "single",
        title: "What stage is the project at?",
        options: [
          { v: "Land only, nothing started", l: "Land only, nothing started" },
          { v: "Foundation started", l: "Foundation started" },
          { v: "Partial structure in place", l: "Partial structure in place" },
          { v: "Design complete, ready to build", l: "Design complete, ready to build" },
        ],
      },
      {
        id: "cn_scope",
        type: "single",
        title: "What scope of work do you need?",
        options: [
          { v: "Full construction, start to finish", l: "Full construction, start to finish" },
          { v: "Structural work only", l: "Structural work only" },
          { v: "Project management and supervision", l: "Project management and supervision" },
        ],
      },
      {
        id: "cn_size",
        type: "text",
        title: "What's the approximate size of the build?",
        sub: "Square metres, number of floors, or units, whatever you have.",
        placeholder: "e.g. 3 floors, ~400 sqm",
      },
    ],
    consultancy: [
      {
        id: "cs_type",
        type: "single",
        title: "What kind of consultancy do you need?",
        options: [
          { v: "Site supervision", l: "Site supervision" },
          { v: "Building advice", l: "Building advice" },
          { v: "Cost estimation", l: "Cost estimation" },
          { v: "Feasibility study", l: "Feasibility study" },
        ],
      },
      {
        id: "cs_stage",
        type: "single",
        title: "What stage is your project at?",
        options: [
          { v: "Planning, before any work starts", l: "Planning, before any work starts" },
          { v: "Mid-construction", l: "Mid-construction" },
          { v: "Post-construction issue to resolve", l: "Post-construction issue to resolve" },
        ],
      },
      {
        id: "cs_docs",
        type: "single",
        title: "Do you have existing drawings or reports?",
        options: [
          { v: "Yes", l: "Yes" },
          { v: "No", l: "No" },
        ],
      },
    ],
  };

  const COMMON_QUESTIONS = [
    { id: "co_name", type: "text", title: "What's your name?", placeholder: "Full name" },
    { id: "co_phone", type: "tel", title: "Best phone number to reach you on?", placeholder: "07xx xxx xxx" },
    { id: "co_email", type: "email", title: "And your email address?", placeholder: "you@example.com" },
    {
      id: "co_location",
      type: "text",
      title: "Where is the project located?",
      sub: "Town or area is fine.",
      placeholder: "e.g. Karen, Nairobi",
    },
    {
      id: "co_timeline",
      type: "single",
      title: "When are you looking to start?",
      options: [
        { v: "As soon as possible", l: "As soon as possible" },
        { v: "1-3 months", l: "1-3 months" },
        { v: "3-6 months", l: "3-6 months" },
        { v: "Just exploring for now", l: "Just exploring for now" },
      ],
    },
    {
      id: "co_budget",
      type: "single",
      title: "What's your approximate budget range?",
      sub: "This just helps us scope the right proposal, an estimate is fine.",
      options: [
        { v: "Under KES 500,000", l: "Under KES 500,000" },
        { v: "KES 500,000 - 1,000,000", l: "KES 500,000 - 1,000,000" },
        { v: "KES 1,000,000 - 3,000,000", l: "KES 1,000,000 - 3,000,000" },
        { v: "KES 3,000,000+", l: "KES 3,000,000+" },
        { v: "Not sure yet", l: "Not sure yet" },
      ],
    },
  ];

  const serviceQuestion = {
    id: "service",
    type: "single",
    title: "Which service are you interested in?",
    sub: "Pick the one closest to what you need, the next questions will follow from it.",
    options: SERVICES.map((s) => ({ v: s.id, l: s.label, d: s.desc })),
  };

  const answers = {};
  window.kfsCollectedAnswers = answers;
  let flow = [serviceQuestion];
  let current = 0;

  const escapeHtml = (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  };

  const buildFlowForService = (serviceId) => {
    const setKey = SERVICE_TO_SET[serviceId];
    const serviceQs = QUESTION_SETS[setKey] || [];
    flow = [serviceQuestion].concat(serviceQs, COMMON_QUESTIONS);
  };

  const renderProgress = () => {
    const pct = Math.round((current / flow.length) * 100);
    progressBar.style.width = pct + "%";
    stepLabel.textContent = "Step " + (current + 1) + " of " + (flow.length + 1);
  };

  const submitSurvey = async () => {
    console.log("Keith Fount survey submission:", answers);
    progressBar.style.width = "100%";
    stepLabel.textContent = "Complete";
    stageEl.innerHTML = "";
    const summary = document.createElement("div");
    summary.className = "kfs-summary";
    summary.innerHTML =
      '<div class="kfs-mark-big"><span>?</span></div>' +
      "<h2>Thank you, " +
      (answers.co_name ? escapeHtml(answers.co_name.split(" ")[0]) : "there") +
      ".</h2>" +
      "<p>We've received your project details. Our team will review them and reach out on " +
      (answers.co_phone ? escapeHtml(answers.co_phone) : "the contact you provided") +
      " shortly to discuss next steps.</p>";
    stageEl.appendChild(summary);

    try {
      const response = await fetch(getApiUrl("/api/survey"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) throw new Error("Unable to send the survey response.");
    } catch (error) {
      console.error(error);
      const note = document.createElement("p");
      note.className = "kfs-sub";
      note.textContent = "Your enquiry details were received locally, but the email delivery could not be completed automatically.";
      summary.appendChild(note);
    }
  };

  const goToNextQuestion = () => {
    if (current === flow.length - 1) submitSurvey();
    else {
      current += 1;
      renderQuestion();
    }
  };

  const renderQuestion = () => {
    const q = flow[current];
    renderProgress();
    stageEl.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "kfs-question";

    const h2 = document.createElement("h2");
    h2.textContent = q.title;
    wrap.appendChild(h2);

    if (q.sub) {
      const sub = document.createElement("p");
      sub.className = "kfs-sub";
      sub.textContent = q.sub;
      wrap.appendChild(sub);
    }

    const nextBtn = document.createElement("button");
    nextBtn.className = "kfs-btn kfs-btn-gold";
    nextBtn.type = "button";
    nextBtn.textContent = current === flow.length - 1 ? "Submit enquiry" : "Next";

    const refreshNextState = () => {
      const val = answers[q.id];
      let answered;
      if (q.type === "multi") {
        answered = Array.isArray(val) && val.length > 0;
      } else if (q.optional) {
        answered = true;
      } else {
        answered = val !== undefined && val !== null && String(val).trim() !== "";
      }
      nextBtn.disabled = !answered;
    };

    if (q.type === "single" || q.type === "multi") {
      const optionsWrap = document.createElement("div");
      optionsWrap.className = "kfs-options";

      q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "kfs-option type-" + q.type;

        const mark = document.createElement("span");
        mark.className = "kfs-mark";
        mark.textContent = "?";
        btn.appendChild(mark);

        const labelWrap = document.createElement("span");
        const strong = document.createElement("span");
        strong.className = "kfs-opt-label";
        strong.textContent = opt.l;
        labelWrap.appendChild(strong);
        if (opt.d) {
          const descEl = document.createElement("span");
          descEl.className = "kfs-opt-desc";
          descEl.textContent = opt.d;
          labelWrap.appendChild(descEl);
        }
        btn.appendChild(labelWrap);

        const isSelected = () => {
          if (q.type === "multi") {
            return Array.isArray(answers[q.id]) && answers[q.id].indexOf(opt.v) > -1;
          }
          return answers[q.id] === opt.v;
        };
        btn.classList.toggle("is-selected", isSelected());

        btn.addEventListener("click", () => {
          if (q.type === "multi") {
            const arr = Array.isArray(answers[q.id]) ? answers[q.id].slice() : [];
            const idx = arr.indexOf(opt.v);
            if (idx > -1) arr.splice(idx, 1);
            else arr.push(opt.v);
            answers[q.id] = arr;
            optionsWrap.querySelectorAll(".kfs-option").forEach((el, i) => {
              el.classList.toggle("is-selected", arr.indexOf(q.options[i].v) > -1);
            });
          } else {
            answers[q.id] = opt.v;
            optionsWrap.querySelectorAll(".kfs-option").forEach((el) => {
              el.classList.remove("is-selected");
            });
            btn.classList.add("is-selected");
            if (q.id === "service") buildFlowForService(opt.v);
            setTimeout(() => {
              goToNextQuestion();
            }, 120);
          }
          refreshNextState();
        });

        optionsWrap.appendChild(btn);
      });

      wrap.appendChild(optionsWrap);
    } else {
      const input = document.createElement("input");
      input.className = "kfs-field";
      input.type = q.type === "tel" ? "tel" : q.type === "email" ? "email" : "text";
      input.placeholder = q.placeholder || "";
      input.value = answers[q.id] || "";
      input.addEventListener("input", () => {
        answers[q.id] = input.value;
        refreshNextState();
      });
      wrap.appendChild(input);
      setTimeout(() => input.focus(), 60);
    }

    const nav = document.createElement("div");
    nav.className = "kfs-nav";

    const backBtn = document.createElement("button");
    backBtn.className = "kfs-btn kfs-btn-line";
    backBtn.type = "button";
    backBtn.textContent = "Back";
    backBtn.disabled = current === 0;
    backBtn.addEventListener("click", () => {
      if (current > 0) {
        current -= 1;
        renderQuestion();
      }
    });

    nextBtn.addEventListener("click", goToNextQuestion);

    refreshNextState();
    nav.appendChild(backBtn);
    nav.appendChild(nextBtn);
    wrap.appendChild(nav);
    stageEl.appendChild(wrap);
  };

  renderQuestion();
})();

/* Before / after comparison sliders */
(function () {
  const sliders = document.querySelectorAll("[data-ba]");
  if (!sliders.length) return;

  const setPos = (slider, percent) => {
    const clamped = Math.min(100, Math.max(0, percent));
    const pane = slider.querySelector(".ba-before-pane");
    const handle = slider.querySelector(".ba-handle");
    if (!pane || !handle) return;
    pane.style.width = clamped + "%";
    handle.style.left = clamped + "%";
  };

  const syncWidths = () => {
    sliders.forEach((slider) => {
      const beforeImg = slider.querySelector(".ba-img-before");
      if (beforeImg) beforeImg.style.width = slider.offsetWidth + "px";
    });
  };

  syncWidths();
  window.addEventListener("resize", syncWidths);

  sliders.forEach((slider) => {
    let dragging = false;

    const move = (clientX) => {
      const rect = slider.getBoundingClientRect();
      if (!rect.width) return;
      setPos(slider, ((clientX - rect.left) / rect.width) * 100);
    };

    const start = (clientX) => {
      dragging = true;
      move(clientX);
    };
    const end = () => {
      dragging = false;
    };

    slider.addEventListener("pointerdown", (event) => {
      slider.setPointerCapture(event.pointerId);
      start(event.clientX);
    });
    slider.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      move(event.clientX);
    });
    slider.addEventListener("pointerup", end);
    slider.addEventListener("pointercancel", end);

    const handle = slider.querySelector(".ba-handle");
    if (handle) {
      handle.addEventListener("keydown", (event) => {
        const current = parseFloat(handle.style.left) || 50;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setPos(slider, current - 3);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          setPos(slider, current + 3);
        }
      });
    }
  });
})();
