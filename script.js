const WHATSAPP_NUMBER = "201111539089";
function waLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}`;
}
const heroMessage = "مرحبًا، أريد الاستفسار عن طلب تورتة";

const CAKES = [
    {
        name: "كيك أعياد ميلاد",

        image: `assets/74.jpg`,
        fallback: "assets/74.jpg",
    },
    {
        name: "تورتة مناسبات",

        image: "assets/66.jpg",
        fallback: "assets/66.jpg",
    },
    {
        name: "كيك بالفواكه",

        image: "assets/6.jpg",
        fallback: "assets/6.jpg",
    },
    {
        name: "تورتة شوكولاتة",

        image: "assets/70.jpg",
        fallback: "assets/70.jpg",
    },
    {
        name: "ريد فيلفت",

        image: "assets/21.jpg",
        fallback: "assets/21.jpg",
    },
    {
        name: "كب كيك مخصص",

        image: "assets/61.jpg",
        fallback: "assets/61.jpg",
    },
];

// كل صور المعرض الحقيقية لأعمال الشيف أحمد
const GALLERY = Array.from({ length: 88 }, (_, i) => {
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
    { size: "6 أشخاص", price: "150 ج.م" },
    { size: "8 أشخاص", price: "220 ج.م" },
    { size: "10 أشخاص", price: "300 ج.م" },
    { size: "12 شخصًا", price: "380 ج.م" },
    { size: "16 شخصًا", price: "500 ج.م" },
    { size: "20 شخصًا", price: "650 ج.م" },
];

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

const pricingBody = document.getElementById("pricing-body");
if (pricingBody) {
    pricingBody.innerHTML = PRICING.map(
        (item) => `
      <tr class="border-b border-border/60 text-right">
        <td class="px-4 py-3 font-semibold text-foreground">${item.size}</td>
        <td class="px-4 py-3 text-left font-bold text-primary">${item.price}</td>
      </tr>
    `,
    ).join("");
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
