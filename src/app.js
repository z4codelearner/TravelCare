// ========== DOM Ready Wrapper ==========
document.addEventListener('DOMContentLoaded', function () {
  // ========== Navbar Dropdowns ==========
  const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
  const menuItems = document.querySelectorAll(".menu-link");
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("navbar-logo");

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const dropdownMenu = toggle.nextElementSibling;

      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== dropdownMenu) menu.classList.add('hidden');
      });

      if (dropdownMenu) {
        dropdownMenu.classList.toggle('hidden');

        // Icon toggle
        if (toggle.contains(menuIcon)) {
          menuIcon.innerHTML = dropdownMenu.classList.contains('hidden')
            ? `<path d="M3 12h18M3 6h18M3 18h18"></path>`
            : `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`;
        }
      }
    });
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.add('hidden'));
    if (menuIcon) {
      menuIcon.innerHTML = `<path d="M3 12h18M3 6h18M3 18h18"></path>`;
    }
  });

  function windowScroll() {
    const isScrolled = window.scrollY >= 50;
    const isMobile = window.innerWidth < 1024;

    if (!navbar) return;

    navbar.classList.add("sticky", "top-0", "left-0", "w-full", "z-50", "transition-all", "duration-300", "ease-in-out");

    if (isScrolled || isMobile) {
      navbar.classList.add("bg-white/70", "shadow-md", "backdrop-blur");
      if (logo) logo.src = "../assets/img/logo3.webp";
    } else {
      navbar.classList.remove("bg-white/70", "shadow-md", "backdrop-blur");
      if (logo) logo.src = "../assets/img/logo.webp";
    }

    menuItems.forEach(link => {
      link.classList.remove("text-white/70", "text-white/50", "text-gray-900", "text-white", "text-black", "text-red-500");

      if (isMobile) {
        link.classList.add(link.classList.contains("active") ? "text-red-500" : "text-black");
      } else {
        if (link.classList.contains("active")) {
          link.classList.add(isScrolled ? "text-red-500" : "text-white");
        } else {
          link.classList.add(isScrolled ? "text-gray-900" : "text-white/50");
        }
      }
    });

    const allIcons = document.querySelectorAll("#menu-icon, [data-dropdown-toggle] svg");
    allIcons.forEach(icon => {
      icon.classList.remove("text-white", "text-gray-900", "text-black");
      icon.classList.add(isMobile ? "text-black" : isScrolled ? "text-gray-900" : "text-white");
    });
  }

  windowScroll();
  window.addEventListener("scroll", windowScroll);
  window.addEventListener("resize", windowScroll);

  // ========== Video Modal ==========
  const playBtn = document.getElementById("play-video-btn");
  const videoModal = document.getElementById("video-modal");
  const iframe = document.getElementById("youtube-iframe");
  const closeBtn = document.getElementById("close-video");
  const youtubeURL = "https://www.youtube.com/embed/nZmO8B9rRik?si=iXFXGfKaB3LKPGa-";

  if (playBtn && videoModal && iframe && closeBtn) {
    playBtn.addEventListener("click", function () {
      videoModal.classList.remove("hidden");
      videoModal.classList.add("flex");
      iframe.src = youtubeURL;
    });

    closeBtn.addEventListener("click", function () {
      videoModal.classList.add("hidden");
      videoModal.classList.remove("flex");
      iframe.src = "";
    });

    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) {
        videoModal.classList.add("hidden");
        videoModal.classList.remove("flex");
        iframe.src = "";
      }
    });
  }

  // ========== Flatpickr ==========
  if (typeof flatpickr !== 'undefined') {
    flatpickr("#dateInput", {
      dateFormat: "Y-m-d",
    });
  }

  // ========== Counter ==========
  const counters = document.querySelectorAll(".counter");
  const speed = 100;
  counters.forEach(counter => {
    const animate = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + inc;
        setTimeout(animate, 10);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });

}); // DOMContentLoaded End

// ========== Feather Replace ==========
if (typeof feather !== 'undefined') {
  feather.replace();
}

// ========== AOS ==========
if (typeof AOS !== 'undefined') {
  AOS.init();
}

// ========== Swiper ==========
if (typeof Swiper !== 'undefined') {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}

// ========== Favorite Toggle ==========
function toggleFavorite(btn) {
  const icon = btn.querySelector('i');
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    icon.classList.remove('fill-red-500');
    icon.classList.add('text-red-500');
  } else {
    btn.classList.add('active');
    icon.classList.remove('text-red-500');
    icon.classList.add('fill-red-500');
  }
}
