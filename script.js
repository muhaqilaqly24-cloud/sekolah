/* ==========================================
   AL-AQIL ISLAMIC BOARDING SCHOOL
   SCRIPT MULTIPAGE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ========================================
     1. COPYRIGHT YEAR
  ======================================== */
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ========================================
     2. ANIMATION ON SCROLL
  ======================================== */
  if (typeof AOS !== "undefined") {

    AOS.init({
      duration: 950,
      once: true,
      offset: 65,
      easing: "ease-out-cubic",
      delay: 0,
      mirror: false,

      disable: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    });

  }


  /* ========================================
     3. ACTIVE NAVBAR
  ======================================== */
  const currentFile =
    window.location.pathname.split("/").pop() || "index.html";

  const navLinks =
    document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(function (link) {

    const href = link.getAttribute("href");

    if (!href) return;

    const linkFile = href.split("/").pop();

    if (linkFile === currentFile) {

      link.classList.add("active-page");

      link.setAttribute("aria-current", "page");

    } else {

      link.classList.remove("active-page");

      link.removeAttribute("aria-current");

    }

  });


  /* ========================================
     4. SCROLL PROGRESS
  ======================================== */
  const progressBar =
    document.getElementById("scroll-progress");

  const header =
    document.getElementById("main-header");

  const backToTop =
    document.getElementById("backToTop");


  function updateScrollUI() {

    const scrollY = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    let scrollPercent = 0;

    if (documentHeight > 0) {

      scrollPercent =
        (scrollY / documentHeight) * 100;

    }

    if (progressBar) {

      progressBar.style.width =
        scrollPercent + "%";

    }

    if (header) {

      header.classList.toggle(
        "scrolled",
        scrollY > 60
      );

    }

    if (backToTop) {

      backToTop.style.display =
        scrollY > 350 ? "block" : "none";

    }

  }


  /* ========================================
     5. HERO PARALLAX
  ======================================== */
  const heroBanner =
    document.querySelector(".hero-banner");

  const heroImage =
    heroBanner
      ? heroBanner.querySelector(".hero-bg")
      : null;


  function updateParallax() {

    if (!heroBanner || !heroImage) return;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) {

      heroImage.style.transform = "none";
      return;

    }

    const rect = heroBanner.getBoundingClientRect();

    if (
      rect.bottom < 0 ||
      rect.top > window.innerHeight
    ) {
      return;
    }

    const movement = Math.max(
      -100,
      Math.min(100, -rect.top * 0.28)
    );

    heroImage.style.transform =
      "translate3d(0," +
      movement +
      "px,0) scale(1.04)";

  }


  /* ========================================
     6. OPTIMIZED SCROLL EVENT
  ======================================== */
  let ticking = false;

  function onScroll() {

    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(function () {

      updateScrollUI();
      updateParallax();

      ticking = false;

    });

  }

  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );

  window.addEventListener("resize", function () {

    updateScrollUI();
    updateParallax();

    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }

  });

  updateScrollUI();
  updateParallax();


  /* ========================================
     7. GALLERY FILTER
  ======================================== */
  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const galleryColumns =
    document.querySelectorAll(".gallery-col");

  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const selectedFilter =
        button.getAttribute("data-filter");

      filterButtons.forEach(function (btn) {

        btn.classList.remove("active");

      });

      button.classList.add("active");

      galleryColumns.forEach(function (item) {

        const category =
          item.getAttribute("data-category");

        const shouldHide =
          selectedFilter !== "all" &&
          selectedFilter !== category;

        item.classList.toggle(
          "hide",
          shouldHide
        );

        // Pastikan item yang ditampilkan
        // tidak tersembunyi oleh animasi lama
        if (!shouldHide) {

          item.classList.add("aos-animate");

        }

      });

      if (typeof AOS !== "undefined") {

        setTimeout(function () {
          AOS.refresh();
        }, 50);

      }

    });

  });


  /* ========================================
     8. SEARCH PAGE
  ======================================== */
  const searchForm =
    document.getElementById("searchForm");

  const searchInput =
    document.getElementById("searchInput");

  const searchResult =
    document.getElementById("searchResult");


  const searchablePages = [

    {
      file: "index.html",
      keywords: [
        "beranda",
        "home",
        "utama",
        "sekolah"
      ]
    },

    {
      file: "profil.html",
      keywords: [
        "profil",
        "sejarah",
        "tentang al aqil",
        "identitas"
      ]
    },

    {
      file: "visi-misi.html",
      keywords: [
        "visi",
        "misi",
        "tujuan",
        "nilai pendidikan"
      ]
    },

    {
      file: "struktur.html",
      keywords: [
        "struktur",
        "organisasi",
        "pimpinan",
        "yayasan",
        "guru"
      ]
    },

    {
      file: "jurusan.html",
      keywords: [
        "jurusan",
        "konsentrasi",
        "rpl",
        "mipa",
        "robotika",
        "multimedia"
      ]
    },

    {
      file: "program.html",
      keywords: [
        "program",
        "tahfizh",
        "coding",
        "bahasa",
        "ekstrakurikuler"
      ]
    },

    {
      file: "berita.html",
      keywords: [
        "berita",
        "kegiatan",
        "artikel",
        "informasi"
      ]
    },

    {
      file: "galeri.html",
      keywords: [
        "galeri",
        "foto",
        "dokumentasi",
        "gambar"
      ]
    },

    {
      file: "fasilitas.html",
      keywords: [
        "fasilitas",
        "asrama",
        "masjid",
        "laboratorium",
        "perpustakaan",
        "lapangan"
      ]
    },

    {
      file: "ppdb.html",
      keywords: [
        "ppdb",
        "daftar",
        "pendaftaran",
        "santri baru",
        "formulir"
      ]
    }

  ];


  if (searchForm && searchInput) {

    searchForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        const keyword =
          searchInput.value.trim().toLowerCase();

        if (!keyword) return;

        let foundPage = null;

        for (const page of searchablePages) {

          const isMatch =
            page.keywords.some(function (word) {

              return word.includes(keyword) ||
                     keyword === word;

            });

          if (isMatch) {

            foundPage = page;
            break;

          }

        }

        if (foundPage) {

          window.location.href = foundPage.file;

        } else if (searchResult) {

          searchResult.textContent =
            "Halaman tidak ditemukan. " +
            "Coba kata kunci seperti profil, " +
            "jurusan, berita, galeri, atau ppdb.";

        }

      }
    );

  }


  /* ========================================
     9. PPDB FORM
  ======================================== */
  const ppdbForm =
    document.getElementById("ppdbForm");

  const ppdbSuccess =
    document.getElementById("ppdbSuccess");

  const ppdbSuccessText =
    document.getElementById("ppdbSuccessText");


  if (ppdbForm) {

    ppdbForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        if (!ppdbForm.checkValidity()) {

          ppdbForm.reportValidity();
          return;

        }

        const nama =
          document.getElementById("namaSantri").value.trim();

        const jurusan =
          document.getElementById("pilihanJurusan").value;

        if (ppdbSuccessText) {

          ppdbSuccessText.textContent =
            "Ringkasan formulir atas nama " +
            nama +
            " dengan pilihan konsentrasi " +
            jurusan +
            " berhasil dibuat. " +
            "Data ini belum dikirim atau disimpan " +
            "ke database sekolah.";

        }

        if (ppdbSuccess) {

          ppdbSuccess.style.display = "block";

          ppdbSuccess.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

      }
    );

  }


  /* ========================================
     10. IMAGE ERROR FALLBACK
  ======================================== */
  const images =
    document.querySelectorAll("img");

  images.forEach(function (img) {

    function handleImageError() {

      if (img.dataset.fallbackApplied === "true") {
        return;
      }

      img.dataset.fallbackApplied = "true";

      if (img.classList.contains("hero-bg")) {

        img.style.display = "none";

        const parent = img.parentElement;

        if (parent) {

          parent.style.background =
            "linear-gradient(135deg,#0f543a,#06170f)";

        }

      } else {

        img.style.background = "#163428";

      }

    }

    img.addEventListener(
      "error",
      handleImageError
    );

    if (
      img.complete &&
      img.naturalWidth === 0
    ) {

      handleImageError();

    }

  });


});


/* ==========================================
   11. GALLERY LIGHTBOX
   GLOBAL FUNCTIONS
========================================== */

function openLightbox(element) {

  const img = element.querySelector("img");

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  if (!img || !lightbox || !lightboxImage) return;

  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;

  lightbox.style.display = "flex";

  document.body.style.overflow = "hidden";

}


function closeLightbox() {

  const lightbox =
    document.getElementById("lightbox");

  if (lightbox) {

    lightbox.style.display = "none";

  }

  document.body.style.overflow = "";

}


/* ==========================================
   12. LIGHTBOX CLICK OUTSIDE
========================================== */
document.addEventListener("click", function (event) {

  const lightbox =
    document.getElementById("lightbox");

  if (
    lightbox &&
    event.target === lightbox
  ) {

    closeLightbox();

  }

});


/* ==========================================
   13. ESC KEY
========================================== */
document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {

    closeLightbox();

    const waBox =
      document.getElementById("waBox");

    if (waBox) {

      waBox.style.display = "none";

    }

  }

});


/* ==========================================
   14. WHATSAPP INFO BOX
========================================== */
function toggleWA() {

  const waBox =
    document.getElementById("waBox");

  if (!waBox) return;

  waBox.style.display =
    waBox.style.display === "block"
      ? "none"
      : "block";

}


/* ==========================================
   15. BACK TO TOP
========================================== */
function scrollToTop() {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}