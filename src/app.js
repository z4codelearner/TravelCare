


// JavaScript Logic for Navbar and Dropdowns
document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
  const menuItems = document.querySelectorAll(".menu-link");
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("navbar-logo");

  // Dropdown toggle
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const dropdownMenu = toggle.nextElementSibling;

      // Close others
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.add('hidden');
        }
      });

      if (dropdownMenu) {
        dropdownMenu.classList.toggle('hidden');

        // If it's the mobile menu icon, toggle SVG icon
        if (toggle.contains(menuIcon)) {
          if (dropdownMenu.classList.contains('hidden')) {
            menuIcon.innerHTML = `<path d="M3 12h18M3 6h18M3 18h18"></path>`;
          } else {
            menuIcon.innerHTML = `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`;
          }
        }
      }
    });
  });

  // Click outside closes all dropdowns
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.add('hidden'));
    if (menuIcon) {
      menuIcon.innerHTML = `<path d="M3 12h18M3 6h18M3 18h18"></path>`;
    }
  });

  // Handle scroll + responsive logic
  function windowScroll() {
    const isScrolled = window.scrollY >= 50;
    const isMobile = window.innerWidth < 1024;

    if (!navbar) return;

    // Sticky always ON
    navbar.classList.add("sticky", "top-0", "left-0", "w-full", "z-50", "transition-all", "duration-300", "ease-in-out");

    if (isScrolled || isMobile) {
      navbar.classList.add("bg-white/70", "shadow-md", "backdrop-blur");
      if (logo) logo.src = "../assets/img/logo3.webp";
    } else {
      navbar.classList.remove("bg-white/70", "shadow-md", "backdrop-blur");
      if (logo) logo.src = "../assets/img/logo.webp";
    }
    // Update menu items color based on scroll and mobile state
    // Inside windowScroll() function → update this section:
    menuItems.forEach(link => {
      link.classList.remove("text-white/70", "text-white/50", "text-gray-900", "text-white", "text-black", "text-red-500");

      if (isMobile) {
        if (link.classList.contains("active")) {
          link.classList.add("text-red-500");
        } else {
          link.classList.add("text-black");
        }
      } else {
        if (link.classList.contains("active")) {
          link.classList.add(isScrolled ? "text-red-500" : "text-white");
        } else {
          link.classList.add(isScrolled ? "text-gray-900" : "text-white/50");
        }
      }
    });

    // Update toggle icon color
    const allIcons = document.querySelectorAll("#menu-icon, [data-dropdown-toggle] svg");
    allIcons.forEach(icon => {
      icon.classList.remove("text-white", "text-gray-900", "text-black");
      icon.classList.add(isMobile ? "text-black" : isScrolled ? "text-gray-900" : "text-white");
    });
  }

  windowScroll(); // on load
  window.addEventListener("scroll", windowScroll);
  window.addEventListener("resize", windowScroll);
});


// JavaScript Logic for Video Popup

document.addEventListener("DOMContentLoaded", function () {
  const playBtn = document.getElementById("play-video-btn");
  const videoModal = document.getElementById("video-modal");
  const iframe = document.getElementById("youtube-iframe");
  const closeBtn = document.getElementById("close-video");

  const youtubeURL = "https://www.youtube.com/embed/nZmO8B9rRik?si=iXFXGfKaB3LKPGa-";

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

  // Optional: click outside modal closes it
  videoModal.addEventListener("click", function (e) {
    if (e.target === videoModal) {
      videoModal.classList.add("hidden");
      videoModal.classList.remove("flex");
      iframe.src = "";
    }
  });
});

// Flatpickr Date Picker Initialization
  document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#dateInput", {
      dateFormat: "Y-m-d",
    });
  });





