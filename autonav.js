document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".navigation__hamburger");
    const navMenu = document.querySelector(".navigation__menu");
    const dropdowns = document.querySelectorAll(".menu__item--dropdown");
  
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
  
        const bars = document.querySelectorAll(".bar");
        bars.forEach((bar) => {
          bar.classList.toggle("bar--cross");
        });
      });
    }
  
    if (dropdowns) {
      dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("click", () => {
          if (window.innerWidth <= 1024) {
            const menu = dropdown.querySelector(".dropdown-menu");
            if (menu) {
              menu.classList.toggle("open");
            }
          }
        });
      });
    }
  
  });