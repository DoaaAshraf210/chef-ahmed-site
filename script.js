const WHATSAPP_NUMBER = "201111539089";
function waLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}`;
}
const heroMessage = "مرحبًا، أريد الاستفسار عن طلب تورتة";

const CAKES = [
    { name: "فانيليا", image: "assets/96.png", fallback: "assets/96.png" },
    { name: "شوكولاتة", image: "assets/70.jpg", fallback: "assets/70.jpg" },
    { name: "نص ونص", image: "assets/73.jpg", fallback: "assets/73.jpg" },
    { name: "تورتة 4 سيزون", image: "assets/forsession.jpg", fallback: "assets/forsession.jpg" },
    { name: "بلاك فورست", image: "assets/blackforst.jpg", fallback: "assets/blackforst.jpg" },
    { name: "تورتة فواكه", image: "assets/19.jpg", fallback: "assets/19.jpg" },
];
const GATEAU = [
    { name: "جاتو شوكولاتة", desc: "قطع جاتو شوكولاتة غنية، مثالية للتوزيع في الأفراح.", image: "assets/g-3.png", fallback: "assets/g-3.png" },
    { name: "جاتو فانيليا", desc: "طعم كلاسيكي خفيف، يناسب كل الأذواق.", image: "assets/g-2.jpg", fallback: "assets/g-2.jpg" },
    { name: "جاتو نص ونص", desc: "مزيج شوكولاتة وفانيليا في قطعة واحدة.", image: "assets/g-1.jpg", fallback: "assets/g-1.jpg" },
];
const GALLERY = Array.from({ length: 102 }, (_, i) => {
    const n = i + 1;
    return {
        src: `assets/${n}.jpg`,
        fallback: `assets/${n}.png`,
        alt: `تورتة من أعمال الشيف أحمد ${i + 1}`,
    };
});
const GALLERY_PAGE_SIZE = 12;
let galleryVisibleCount = GALLERY_PAGE_SIZE;

const PRICING = [
    { label: "مقاس 18", price: "100 ج.م" },
    { label: "مقاس 20", price: "170 ج.م" },
    { label: "مقاس 22", price: "230 ج.م" },
    { label: "مقاس 24", price: "300 ج.م" },
    { label: "مقاس 26", price: "350 ج.م" },
    { label: "مقاس 20×20", price: "250 ج.م" },
    { label: "قلب وسط", price: "200 ج.م" },
    { label: "قلب كبير", price: "300 ج.م" },
    { label: "بيضاوي كبيرة", price: "300 ج.م" },
];

const SPECIAL_PRICING = {
    label: "تورتة بصورة مطبوعة (أي مقاس)",
    price: "+80 ج.م على سعر المقاس",
};
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

function starsHTML(count) {
    let s = "";
    for (let i = 0; i < count; i++) {
        s += '<i data-lucide="star" class="h-4 w-4 fill-current"></i>';
    }
    return s;
}

// Render hero stars
document.getElementById("hero-stars").innerHTML = starsHTML(5).replace(
    /h-4 w-4/g,
    "h-4 w-4",
);

// Render menu cards
const menuGrid = document.getElementById("menu-grid");
menuGrid.innerHTML = CAKES.map(
    (cake) => `
    <article class="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img src="${cake.image}" alt="${cake.name}" loading="lazy" width="1024" height="1024"
             class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
             onerror="this.onerror=null; this.src='${cake.fallback}';" />
      </div>
      <div class="flex flex-1 flex-col p-5">
        <h3 class="text-lg font-bold sm:text-xl">${cake.name}</h3>
        <a href="${waLink()}" target="_blank" rel="noopener noreferrer"
           class="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
          <i data-lucide="phone" class="h-4 w-4"></i>
          اطلب الآن
        </a>
      </div>
    </article>
  `,
).join("");

// Render gallery (with "load more" pagination)
const galleryGrid = document.getElementById("gallery-grid");
const galleryLoadMoreBtn = document.getElementById("gallery-load-more");

function renderGallery() {
    const visible = GALLERY.slice(0, galleryVisibleCount);
    galleryGrid.innerHTML = visible
        .map(
            (img, idx) => `
      <button type="button" data-index="${idx}"
              class="gallery-btn group relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-soft transition-all duration-300 hover:shadow-elegant focus:outline-none focus:ring-4 focus:ring-primary/30"
              aria-label="عرض ${img.alt}">
        <img src="${img.src}" alt="${img.alt}" loading="lazy" width="1024" height="1024"
             class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
             onerror="this.onerror=null; this.src='${img.fallback}';" />
        <div class="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/20"></div>
      </button>
    `,
        )
        .join("");

    document.querySelectorAll(".gallery-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
            openLightbox(parseInt(btn.dataset.index, 10)),
        );
    });

    if (galleryVisibleCount >= GALLERY.length) {
        galleryLoadMoreBtn.classList.add("hidden");
    } else {
        galleryLoadMoreBtn.classList.remove("hidden");
    }
    lucide.createIcons();
}

galleryLoadMoreBtn.addEventListener("click", () => {
    galleryVisibleCount = Math.min(
        galleryVisibleCount + GALLERY_PAGE_SIZE,
        GALLERY.length,
    );
    renderGallery();
});

// Render reviews
const reviewsGrid = document.getElementById("reviews-grid");
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

document.getElementById("footer-year").textContent =
    new Date().getFullYear();


const pricingSteps = document.getElementById("pricing-steps");
if (pricingSteps) {
    pricingSteps.innerHTML = PRICING.map(
        (item, idx) => `
      <div class="price-step">
        <div class="price-step-dot">${idx + 1}</div>
        <span class="price-step-label">${item.label}</span>
        <span class="price-step-price">${item.price}</span>
      </div>
    `,
    ).join("");
}
const gateauGrid = document.getElementById("gateau-grid");
if (gateauGrid) {
    gateauGrid.innerHTML = GATEAU.map(
        (item) => `
      <article class="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
        <div class="relative aspect-[4/3] overflow-hidden">
          <img src="${item.image}" alt="${item.name}" loading="lazy" width="1024" height="1024"
               class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
               onerror="this.onerror=null; this.src='${item.fallback}';" />
        </div>
        <div class="flex flex-1 flex-col p-5">
          <h3 class="text-lg font-bold sm:text-xl">${item.name}</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">${item.desc}</p>
          <a href="${waLink()}" target="_blank" rel="noopener noreferrer"
             class="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
            <i data-lucide="phone" class="h-4 w-4"></i>
            اطلب بالقطعة
          </a>
        </div>
      </article>
    `,
    ).join("");
}
const specialLabel = document.getElementById("special-pricing-label");
const specialPrice = document.getElementById("special-pricing-price");
if (specialLabel && specialPrice) {
    specialLabel.textContent = SPECIAL_PRICING.label;
    specialPrice.textContent = SPECIAL_PRICING.price;
}
// Render gallery (first page)
renderGallery();

// Init icons after dynamic content injected
lucide.createIcons();

// Navbar scroll shadow
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

// Mobile menu toggle
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
}
function closeLightbox() {
    lightboxIndex = null;
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    document.body.style.overflow = "";
}
function updateLightbox() {
    const img = GALLERY[lightboxIndex];
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