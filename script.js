/* ==============================================
   CONFIG
============================================== */
const pageNames = [
  "beranda",
  "profil-sekolah",
  "visi-misi",
  "struktur-organisasi",
  "jurusan",
  "program",
  "berita",
  "galeri",
  "asrama",
  "ppdb"
];

const searchKeywords = {
  "beranda": ["home", "utama"],
  "profil-sekolah": ["profil", "sejarah", "tentang"],
  "visi-misi": ["visi", "misi", "tujuan"],
  "struktur-organisasi": ["struktur", "organisasi", "pimpinan"],
  "jurusan": ["jurusan", "keahlian", "rpl", "mipa"],
  "program": ["program", "tahfizh", "coding", "bahasa"],
  "berita": ["berita", "artikel", "informasi"],
  "galeri": ["galeri", "foto", "dokumentasi"],
  "asrama": ["fasilitas", "asrama", "masjid", "laboratorium"],
  "ppdb": ["daftar", "pendaftaran", "ppdb", "santri baru"]
};

/* ==============================================
   AOS
============================================== */
function initializeAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 950,
      once: true,
      offset: 65,
      easing: "ease-out-cubic",
      disable: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    });
  }
}

/* ==============================================
   NAVIGASI HALAMAN
============================================== */
function navigateTo(pageName) {

  if (!pageNames.includes(pageName)) {
    pageName = "beranda";
  }

  document.querySelectorAll(".page-section")
  .forEach(function(page) {
    page.classList.remove("active");
    page.style.display = "none";
  });

  const destination =
    document.getElementById("page-" + pageName);

  if (!destination) return;

  destination.style.display = "block";
  destination.classList.add("active");

  document.querySelectorAll(".nav-link")
  .forEach(function(link) {
    link.classList.remove("active-page");
  });

  const activeLink =
    document.getElementById("nav-" + pageName);

  if (activeLink) {
    activeLink.classList.add("active-page");
  }

  window.scrollTo(0, 0);

  if (window.location.hash !== "#" + pageName) {
    history.replaceState(null, "", "#" + pageName);
  }

  const menu = document.getElementById("mobileNavbar");

  if (menu && menu.classList.contains("show")) {
    if (typeof bootstrap !== "undefined") {
      bootstrap.Collapse.getOrCreateInstance(menu, {
        toggle: false
      }).hide();
    } else {
      menu.classList.remove("show");
    }
  }

  // Reset animasi saat pindah halaman
  destination.querySelectorAll("[data-aos]")
  .forEach(function(element) {
    element.classList.remove("aos-animate");
  });

  setTimeout(function() {
    if (typeof AOS !== "undefined") {
      AOS.refreshHard();
    }

    updateParallax();
    updateScrollUI();
  }, 100);
}

window.navigateTo = navigateTo;

/* ==============================================
   NAVLINK CLICK
============================================== */
function initializeNavigation() {

  document.querySelectorAll(".navbar-nav .nav-link")
  .forEach(function(link) {

    link.addEventListener("click", function(event) {
      event.preventDefault();

      const page = link.getAttribute("href").replace("#", "");
      navigateTo(page);
    });

  });
}

/* ==============================================
   SCROLL UI
============================================== */
function updateScrollUI() {

  const scrollY = window.scrollY;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const percent = maxScroll > 0
    ? (scrollY / maxScroll) * 100
    : 0;

  document.getElementById("scroll-progress").style.width =
    percent + "%";

  document.getElementById("main-header")
    .classList.toggle("scrolled", scrollY > 60);

  document.getElementById("backToTop").style.display =
    scrollY > 350 ? "block" : "none";
}

/* ==============================================
   FULL HERO PARALLAX
============================================== */
function updateParallax() {

  const page = document.querySelector(".page-section.active");
  if (!page) return;

  const hero = page.querySelector(".hero-banner");
  if (!hero) return;

  const background = hero.querySelector(".hero-bg");
  if (!background) return;

  if (window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches) {
    background.style.transform = "none";
    return;
  }

  const position = hero.getBoundingClientRect();

  if (
    position.bottom < 0 ||
    position.top > window.innerHeight
  ) {
    return;
  }

  const movement = Math.max(
    -100,
    Math.min(100, -position.top * 0.28)
  );

  background.style.transform =
    "translate3d(0," + movement + "px,0) scale(1.04)";
}

/* ==============================================
   SCROLL RAF
============================================== */
let ticking = false;

function handleScroll() {

  if (ticking) return;

  ticking = true;

  window.requestAnimationFrame(function() {
    updateScrollUI();
    updateParallax();
    ticking = false;
  });
}

window.addEventListener("scroll", handleScroll, {
  passive: true
});

window.addEventListener("resize", function() {
  updateScrollUI();
  updateParallax();
});

/* ==============================================
   GALERI FILTER
============================================== */
function initializeGallery() {

  const buttons = document.querySelectorAll(".filter-btn");
  const photos = document.querySelectorAll(".gallery-col");

  buttons.forEach(function(button) {

    button.addEventListener("click", function() {

      const selected = button.getAttribute("data-filter");

      buttons.forEach(function(btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      photos.forEach(function(photo) {
        const category = photo.getAttribute("data-category");

        photo.classList.toggle(
          "hide",
          selected !== "all" && category !== selected
        );
      });

      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }

    });

  });
}

/* ==============================================
   LIGHTBOX
============================================== */
function openLightbox(element) {

  const photo = element.querySelector("img");
  if (!photo) return;

  document.getElementById("lightboxImage").src = photo.src;
  document.getElementById("lightboxImage").alt = photo.alt;

  document.getElementById("lightbox").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.body.style.overflow = "";
}

document.getElementById("lightbox")
.addEventListener("click", function(event) {
  if (event.target.id === "lightbox") {
    closeLightbox();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

/* ==============================================
   SEARCH
============================================== */
function initializeSearch() {

  document.getElementById("searchForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    const keyword =
      document.getElementById("searchInput")
      .value.toLowerCase().trim();

    if (!keyword) return;

    let result = null;

    for (const pageName of pageNames) {

      const values = [
        pageName,
        ...(searchKeywords[pageName] || [])
      ];

      if (values.some(function(value) {
        return value.includes(keyword) ||
               keyword.includes(value);
      })) {
        result = pageName;
        break;
      }
    }

    const resultBox = document.getElementById("searchResult");

    if (result) {

      const modal = document.getElementById("searchModal");

      if (typeof bootstrap !== "undefined") {
        bootstrap.Modal.getOrCreateInstance(modal).hide();
      }

      navigateTo(result);
      resultBox.textContent = "";

    } else {
      resultBox.textContent =
        "Halaman tidak ditemukan. Coba kata kunci lain.";
    }

  });
}

/* ==============================================
   PPDB FRONTEND
============================================== */
function initializePPDB() {

  document.getElementById("ppdbForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }

    const name =
      document.getElementById("namaSantri").value.trim();

    const jurusan =
      document.getElementById("pilihanJurusan").value;

    const text = document.getElementById("ppdbSuccessText");

    text.textContent =
      "Ringkasan formulir " + name +
      " untuk pilihan " + jurusan +
      " berhasil dibuat. Data belum dikirim atau disimpan.";

    const box = document.getElementById("ppdbSuccess");
    box.style.display = "block";

    box.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

/* ==============================================
   FLOATING BUTTONS
============================================== */
function toggleWA() {
  const box = document.getElementById("waBox");

  box.style.display = box.style.display === "block"
    ? "none"
    : "block";
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ==============================================
   IMAGE ERROR FALLBACK
============================================== */
function initializeImageFallback() {

  document.querySelectorAll("img")
  .forEach(function(img) {

    function fallback() {
      if (img.dataset.fallbackApplied) return;

      img.dataset.fallbackApplied = "true";

      if (img.classList.contains("hero-bg")) {
        img.style.display = "none";

        img.parentElement.style.background =
          "linear-gradient(135deg,#0f543a,#06170f)";
      } else {
        img.style.background = "#163428";
      }
    }

    img.addEventListener("error", fallback);

    if (img.complete && img.naturalWidth === 0) {
      fallback();
    }
  });
}

/* ==============================================
   INIT WEBSITE
============================================== */
document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  initializeAOS();
  initializeNavigation();
  initializeGallery();
  initializeSearch();
  initializePPDB();
  initializeImageFallback();

  const initialPage = window.location.hash.replace("#", "");

  navigateTo(
    pageNames.includes(initialPage)
      ? initialPage
      : "beranda"
  );

  updateScrollUI();
  updateParallax();

});

window.addEventListener("hashchange", function() {

  const pageName = window.location.hash.replace("#", "");

  if (
    pageNames.includes(pageName) &&
    !document.getElementById("page-" + pageName)
      .classList.contains("active")
  ) {
    navigateTo(pageName);
  }

});