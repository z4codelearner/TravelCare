// 
  document.addEventListener('DOMContentLoaded', function () {
    // Dropdown Toggle Logic
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');

    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();

        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          if (menu !== toggle.nextElementSibling) {
            menu.classList.add('hidden');
          }
        });

        // Toggle current dropdown
        const dropdownMenu = toggle.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.toggle('hidden');
        }
      });
    });

    // Click outside to close all dropdowns
    document.addEventListener('click', function () {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.add('hidden');
      });
    });

    // Menu Active Link Logic
    const currentPath = window.location.pathname.split('/').pop(); // "home.html"
    const menuLinks = document.querySelectorAll("ul li a");

    menuLinks.forEach(link => {
      const linkPath = link.getAttribute("href").split('/').pop(); // Only file name
      if (linkPath === currentPath) {
        link.classList.add("text-white", "active");
        link.classList.remove("text-white/50");
      } else {
        link.classList.remove("active", "text-white");
        link.classList.add("text-black");
      }
    });
  });

function windowScroll() {
    const navbar    = document.getElementById("navbar");
    const logo      = document.getElementById("navbar-logo");
    const menuItems = document.querySelectorAll(".menu-link");
    const toggleBtn = document.getElementById("navbar-toggle");
    const menuIcon = document.getElementById("menu-icon");
    const toggleSvg = toggleBtn?.querySelector("svg");

    const isScrolled = document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50;

    if (!navbar) return;

    if (isScrolled) {
        // Sticky navbar classes
        navbar.classList.add(
            "sticky", "top-0", "left-0", "w-full", "bg-white/80",
            "shadow-md", "backdrop-blur", "transition-all", "duration-300"
        );

        // Change logo
        if (logo) logo.src = "../assets/img/logo3.webp";

        // Update menu item colors
        menuItems.forEach(link => {
            link.classList.remove("text-white/50", "text-white", "text-red-600", "text-gray-900");

            if (link.classList.contains("active")) {
                link.classList.add("text-red-600"); // Active in sticky = red
            } else {
                link.classList.add("text-gray-900"); // Inactive in sticky = black
            }
        });

        // Toggle icon color
        if (toggleSvg) {
            toggleSvg.classList.remove("text-white");
            toggleSvg.classList.add("text-gray-900", "hover:text-red-500");
        }

        // Menu icon color
        if (menuIcon) {
            menuIcon.classList.remove("text-white");
            menuIcon.classList.add("text-gray-900");
        }

    } else {
        // Remove sticky classes
        navbar.classList.remove(
            "sticky", "top-0", "left-0", "w-full", "bg-white/80",
            "shadow-md", "backdrop-blur", "transition-all", "duration-300"
        );

        // Restore original logo
        if (logo) logo.src = "../assets/img/logo.webp";

        // Restore menu colors
        menuItems.forEach(link => {
            link.classList.remove("text-gray-900", "text-red-600", "text-white");

            if (link.classList.contains("active")) {
                link.classList.add("text-white"); // Active in non-sticky = white
            } else {
                link.classList.add("text-white/50"); // Inactive in non-sticky = white/50
            }
        });

        // Reset toggle icon color
        if (toggleSvg) {
            toggleSvg.classList.remove("text-gray-900");
            toggleSvg.classList.add("text-white", "hover:text-red-500");
        }

        // Reset menu icon color
        if (menuIcon) {
            menuIcon.classList.remove("text-gray-900");
            menuIcon.classList.add("text-white");
        }
    }
}

window.addEventListener("scroll", windowScroll);

