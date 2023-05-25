document.addEventListener("DOMContentLoaded", () => {

  
  function createMenuItem(id, text, isDropdown=false) {
      const menuItem = document.createElement("li");
      menuItem.classList.add("menu__item");
      if (isDropdown) {
          menuItem.classList.add("menu__item--dropdown");
          const pElement = document.createElement("p");
          pElement.textContent = text;
          menuItem.appendChild(pElement);

          const dropdownMenu = document.createElement("div");
          dropdownMenu.classList.add("dropdown-menu");
          menuItem.appendChild(dropdownMenu);
      } else {
          const anchor = document.createElement("a");
          anchor.textContent = text;
          anchor.href = `#${id}`;
          menuItem.appendChild(anchor);
      }

      return menuItem;
  }

  function createDropdownMenuItem(id, text) {
      const anchor = document.createElement("a");
      anchor.textContent = text;
      anchor.href = `#${id}`;
      return anchor;
  }

  const header = document.createElement("header");
  header.classList.add("header");

  const navigation = document.createElement("nav");
  navigation.classList.add("navigation");

  const logoDiv = document.createElement("div");
  logoDiv.classList.add("navigation__logo");

  const logoLink = document.createElement("a");
  logoLink.href = "./index.html";

  const logoSpan = document.createElement("span");
  logoSpan.textContent = "AutoNav";

  logoLink.appendChild(logoSpan);
  logoDiv.appendChild(logoLink);

  navigation.appendChild(logoDiv);

  const navigationMenu = document.createElement("menu");
  navigationMenu.classList.add("navigation__menu");

  const sections = Array.from(document.querySelectorAll("section"));

  sections.forEach(section => {
      const children = Array.from(section.children);
      let lastH2Item = null;

      children.forEach(child => {
          if (child.tagName === "H2") {
              const menuItem = createMenuItem(child.id, child.textContent, true);
              navigationMenu.appendChild(menuItem);
              lastH2Item = menuItem;
          } else if (child.tagName === "H3" && lastH2Item) {
              const dropdownMenu = lastH2Item.querySelector(".dropdown-menu");
              const dropdownItem = createDropdownMenuItem(child.id, child.textContent);
              dropdownMenu.appendChild(dropdownItem);
          }
      });
  });

  navigation.appendChild(navigationMenu);

  const hamburgerDiv = document.createElement("div");
  hamburgerDiv.classList.add("navigation__hamburger");

  for (let i = 0; i < 3; i++) {
      const barSpan = document.createElement("span");
      barSpan.classList.add("bar");
      hamburgerDiv.appendChild(barSpan);
  }

  navigation.appendChild(hamburgerDiv);

  header.appendChild(navigation);

  document.body.insertBefore(header, document.body.firstChild);

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
