
const API_BASE_URL = "https://chef-ahmed-site.runasp.net/api";

const WHATSAPP_NUMBER = "201111539089";
function waLink(message) {
    const text = message ? `?text=${encodeURIComponent(message)}` : "";
    return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}
const heroMessage = "مرحبًا، أريد الاستفسار عن طلب تورتة";

const REVIEWS = [
    {
        name: "منى إبراهيم",
        text: "أجمل تورتة عملتها في حياتي! التصميم كان مطابق للمواصفات والطعم لا يوصف. شكراً شيف أحمد.",
        rating: 5,
    },
    { name: "أحمد سامي", text: "طلبت تورتة خطوبة وكانت تحفة فنية بجد. التعامل راقي والالتزام بالمواعيد ممتاز.", rating: 5 },
    {
        name: "سارة عبدالله",
        text: "أفضل كيك شوكولاتة تذوقته في مصر. الجودة عالية والسعر مناسب جداً. أنصح الكل بالتجربة.",
        rating: 5,
    },
];

const GALLERY_PAGE_SIZE = 12;
let galleryVisibleCount = GALLERY_PAGE_SIZE;
let GALLERY = [];
async function fetchJSON(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("فشل تحميل البيانات من:", url, err);
        return null;
    }
}

function starsHTML(count) {
    let s = "";
    for (let i = 0; i < count; i++) {
        s += '<i data-lucide="star" class="h-4 w-4 fill-current"></i>';
    }
    return s;
}

function renderCakes(cakes) {
    const menuGrid = document.getElementById("menu-grid");
    if (!menuGrid) return;

    if (!cakes || cakes.length === 0) {
        menuGrid.innerHTML = `<p class="col-span-full text-center text-muted-foreground">لا توجد تورتات مضافة حاليًا.</p>`;
        return;
    }

    menuGrid.innerHTML = cakes
        .map(
            (cake) => `
        <article class="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
          <div class="relative aspect-[4/3] overflow-hidden">
            <img src="${cake.imageUrl}" alt="${cake.name}" loading="lazy" width="1024" height="1024"
                 class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                 onerror="this.closest('article').remove();" />
          </div>
          <div class="flex flex-1 flex-col p-5">
            <h3 class="text-lg font-bold sm:text-xl">${cake.name}</h3>
            ${cake.description ? `<p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">${cake.description}</p>` : ""}
            <a href="${waLink(`مرحبًا، أريد الاستفسار عن تورتة ${cake.name}`)}" target="_blank" rel="noopener noreferrer"
               class="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
              <i data-lucide="phone" class="h-4 w-4"></i>
              اطلب الآن
            </a>
          </div>
        </article>
      `,
        )
        .join("");
}

function renderGateaux(gateaux) {
    const gateauGrid = document.getElementById("gateau-grid");
    if (!gateauGrid) return;

    if (!gateaux || gateaux.length === 0) {
        gateauGrid.innerHTML = `<p class="col-span-full text-center text-muted-foreground">لا توجد أنواع جاتو مضافة حاليًا.</p>`;
        return;
    }

    gateauGrid.innerHTML = gateaux
        .map(
            (item) => `
        <article class="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
          <div class="relative aspect-[4/3] overflow-hidden">
            <img src="${item.imageUrl}" alt="${item.name}" loading="lazy" width="1024" height="1024"
                 class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                 onerror="this.closest('article').remove();" />
          </div>
          <div class="flex flex-1 flex-col p-5">
            <h3 class="text-lg font-bold sm:text-xl">${item.name}</h3>
            ${item.description ? `<p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">${item.description}</p>` : ""}
            <div class="mt-3 flex gap-4 text-sm text-muted-foreground">
              <span>حجم صغير <span class="font-bold text-gradient-gold">${item.smallSizePrice} ج.م</span></span>
              <span>حجم كبير <span class="font-bold text-gradient-gold">${item.largeSizePrice} ج.م</span></span>
            </div>
            <a href="${waLink(`مرحبًا، أريد الاستفسار عن الجاتو ${item.name}`)}" target="_blank" rel="noopener noreferrer"
               class="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
              <i data-lucide="phone" class="h-4 w-4"></i>
              اطلب بالقطعة
            </a>
          </div>
        </article>
      `,
        )
        .join("");
}

function renderPricing(pricingItems) {
    const pricingSteps = document.getElementById("pricing-steps");
    if (!pricingSteps) return;

    if (!pricingItems || pricingItems.length === 0) {
        pricingSteps.innerHTML = `<p class="text-center text-muted-foreground">لا توجد أسعار مضافة حاليًا.</p>`;
        return;
    }

    pricingSteps.innerHTML = pricingItems
        .map(
            (item, idx) => `
      <div class="price-step">
        <div class="price-step-dot">${idx + 1}</div>
        <span class="price-step-label">${item.sizeLabel}</span>
        <span class="price-step-price">${item.price}</span>
      </div>
    `,
        )
        .join("");
}

function renderSpecialPricing(special) {
    const specialLabel = document.getElementById("special-pricing-label");
    const specialPrice = document.getElementById("special-pricing-price");
    if (!specialLabel || !specialPrice) return;

    if (!special) {
        specialLabel.textContent = "";
        specialPrice.textContent = "";
        return;
    }

    specialLabel.textContent = special.label;
    specialPrice.textContent = special.price;
}

function renderReviews() {
    const reviewsGrid = document.getElementById("reviews-grid");
    if (!reviewsGrid) return;

    reviewsGrid.innerHTML = REVIEWS.map(
        (r) => `
      <figure class="flex flex-col rounded-3xl bg-card p-6 shadow-soft sm:p-8">
        <div class="flex text-gold">${starsHTML(r.rating)}</div>
        <blockquote class="mt-4 flex-1 text-base leading-relaxed text-foreground/90">"${r.text}"</blockquote>
        <figcaption class="mt-6 flex items-center gap-3 border-t border-border pt-4">
          <div class="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">${r.name.charAt(0)}</div>
          <div>
            <p class="font-bold">${r.name}</p>
            <p class="text-xs text-muted-foreground">عميل موثق</p>
          </div>
        </figcaption>
      </figure>
    `,
    ).join("");
}

// Gallery (نفس المنطق القديم، بس GALLERY بقت متغيرة مش ثابتة)
const galleryGrid = document.getElementById("gallery-grid");
const galleryLoadMoreBtn = document.getElementById("gallery-load-more");

function renderGallery(appendOnly = false) {
    if (!galleryGrid) return;

    const start = appendOnly ? galleryVisibleCount - GALLERY_PAGE_SIZE : 0;
    const visible = GALLERY.slice(start, galleryVisibleCount);

    const html = visible
        .map((img, i) => {
            const idx = start + i;
            return `
      <button type="button" data-index="${idx}"
              class="gallery-btn group relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-soft transition-all duration-300 hover:shadow-elegant focus:outline-none focus:ring-4 focus:ring-primary/30"
              aria-label="عرض ${img.alt}">
        <img src="${img.src}" alt="${img.alt}" loading="lazy" width="1024" height="1024"
             class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
             onerror="this.closest('.gallery-btn').remove();" />
        <div class="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/20"></div>
      </button>
    `;
        })
        .join("");

    if (appendOnly) {
        galleryGrid.insertAdjacentHTML("beforeend", html);
    } else {
        galleryGrid.innerHTML = html || `<p class="col-span-full text-center text-muted-foreground">لا توجد صور مضافة حاليًا.</p>`;
    }

    document.querySelectorAll(".gallery-btn").forEach((btn) => {
        if (btn.dataset.bound) return;
        btn.dataset.bound = "1";
        btn.addEventListener("click", () =>
            openLightbox(parseInt(btn.dataset.index, 10)),
        );
    });

    if (galleryVisibleCount >= GALLERY.length) {
        galleryLoadMoreBtn?.classList.add("hidden");
    } else {
        galleryLoadMoreBtn?.classList.remove("hidden");
    }
    lucide.createIcons();
}

galleryLoadMoreBtn?.addEventListener("click", () => {
    galleryVisibleCount = Math.min(
        galleryVisibleCount + GALLERY_PAGE_SIZE,
        GALLERY.length,
    );
    renderGallery(true);
});

async function loadAllData() {
    const [cakes, gateaux, pricing, special, portfolio] = await Promise.all([
        fetchJSON(`${API_BASE_URL}/Cakes`),
        fetchJSON(`${API_BASE_URL}/Gateaux`),
        fetchJSON(`${API_BASE_URL}/Pricing`),
        fetchJSON(`${API_BASE_URL}/Pricing/special`),
        fetchJSON(`${API_BASE_URL}/Portfolio`),
    ]);

    renderCakes(cakes);
    renderGateaux(gateaux);
    renderPricing(pricing);
    renderSpecialPricing(special);
    renderReviews();

    GALLERY = (portfolio || [])
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((img, i) => ({
            src: img.imageUrl,
            alt: `تورتة من أعمال الشيف أحمد ${i + 1}`,
        }));
    renderGallery();

    lucide.createIcons();
}

document.getElementById("hero-stars").innerHTML = starsHTML(5);

document.getElementById("footer-year").textContent = new Date().getFullYear();

const navbar = document.getElementById("navbar");
function onScroll() {
    if (window.scrollY > 20) {
        navbar.classList.remove("bg-background/60", "backdrop-blur-sm");
        navbar.classList.add(
            "bg-background/90",
            "backdrop-blur-md",
            "shadow-soft",
        );
    } else {
        navbar.classList.add("bg-background/60", "backdrop-blur-sm");
        navbar.classList.remove(
            "bg-background/90",
            "backdrop-blur-md",
            "shadow-soft",
        );
    }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIconOpen = document.getElementById("menu-icon-open");
const menuIconClose = document.getElementById("menu-icon-close");
let menuOpen = false;

function setMenuOpen(open) {
    menuOpen = open;
    if (open) {
        mobileMenu.classList.remove("max-h-0", "opacity-0");
        mobileMenu.classList.add("max-h-96", "opacity-100");
        menuIconOpen.classList.add("hidden");
        menuIconClose.classList.remove("hidden");
        menuToggle.setAttribute("aria-expanded", "true");
    } else {
        mobileMenu.classList.add("max-h-0", "opacity-0");
        mobileMenu.classList.remove("max-h-96", "opacity-100");
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
    }
}
menuToggle.addEventListener("click", () => setMenuOpen(!menuOpen));

// Smooth scroll nav links + close mobile menu
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            setMenuOpen(false);
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxFigure = document.getElementById("lightbox-figure");
let lightboxIndex = null;

function openLightbox(idx) {
    lightboxIndex = idx;
    updateLightbox();
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.style.overflow = "hidden";
    document.getElementById("lightbox-close").focus();
}
function closeLightbox() {
    const lastBtn = document.querySelector(
        `.gallery-btn[data-index="${lightboxIndex}"]`,
    );
    lightboxIndex = null;
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    document.body.style.overflow = "";
    if (lastBtn) lastBtn.focus();
}
function updateLightbox() {
    const img = GALLERY[lightboxIndex];
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${img.alt} · ${lightboxIndex + 1} / ${GALLERY.length}`;
}
function nextImage() {
    if (lightboxIndex === null) return;
    lightboxIndex = (lightboxIndex + 1) % GALLERY.length;
    updateLightbox();
}
function prevImage() {
    if (lightboxIndex === null) return;
    lightboxIndex = (lightboxIndex - 1 + GALLERY.length) % GALLERY.length;
    updateLightbox();
}

document
    .getElementById("lightbox-close")
    .addEventListener("click", closeLightbox);
document
    .getElementById("lightbox-next")
    .addEventListener("click", (e) => {
        e.stopPropagation();
        nextImage();
    });
document
    .getElementById("lightbox-prev")
    .addEventListener("click", (e) => {
        e.stopPropagation();
        prevImage();
    });
lightbox.addEventListener("click", closeLightbox);
lightboxFigure.addEventListener("click", (e) => e.stopPropagation());

window.addEventListener("keydown", (e) => {
    if (lightboxIndex === null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") prevImage(); // RTL: right = previous
    if (e.key === "ArrowLeft") nextImage();
});

// Active nav link on scroll (scrollspy)
const sections = ["home", "menu", "gallery", "gateau", "pricing", "why", "reviews"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function setActiveLink(id) {
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${id}`) {
            link.classList.add("active-link");
        } else {
            link.classList.remove("active-link");
        }
    });
}

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
);

sections.forEach((sec) => sectionObserver.observe(sec));
document.getElementById("hero-whatsapp-link").href = waLink(heroMessage);

loadAllData();
