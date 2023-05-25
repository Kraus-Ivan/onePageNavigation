export default function autonav(header, isDropdown, websiteName, logoImage) {
    // Položka v menu
    function createMenuItem(id, text, isDropdown=false) {
        const menuItem = document.createElement("li");
        menuItem.classList.add("menu__item");

        const anchor = document.createElement("a");
        anchor.textContent = text;
        anchor.href = `#${id}`;

        if (isDropdown) {
            menuItem.classList.add("menu__item--dropdown");

            const pElement = document.createElement("p");
            pElement.textContent = text;
            menuItem.appendChild(pElement);

            const dropdownMenu = document.createElement("div");
            dropdownMenu.classList.add("dropdown-menu");

            const h2DropdownItem = createDropdownMenuItem(id, text);  // Odkaz na h2 element
            dropdownMenu.appendChild(h2DropdownItem);

            menuItem.appendChild(dropdownMenu);
        } else {
            menuItem.appendChild(anchor);
        }

        return menuItem;
    }

    // Položka v dropdown menu
    function createDropdownMenuItem(id, text) {
        const anchor = document.createElement("a");
        anchor.textContent = text;
        anchor.href = `#${id}`;
        return anchor;
    }
    
    const navigation = document.createElement("nav");
    navigation.classList.add("navigation");

    const logoDiv = document.createElement("div");
    logoDiv.classList.add("navigation__logo");

    const logoLink = document.createElement("a");
    logoLink.href = "./index.html";

    if (logoImage) {
        const logoImg = document.createElement("img");
        logoImg.src = logoImage;
        logoImg.alt = "Logo";
        logoLink.appendChild(logoImg);
    }

    if (websiteName) {
        const logoSpan = document.createElement("span");
        logoSpan.textContent = websiteName;
        logoLink.appendChild(logoSpan);
    }

    logoDiv.appendChild(logoLink);

    navigation.appendChild(logoDiv);

    const navigationMenu = document.createElement("ul");
    navigationMenu.classList.add("navigation__menu");

    const h2s = Array.from(document.querySelectorAll("h2"));
    let lastH2Item = null;

    // Projde a přidá h2 do menu
    h2s.forEach(h2 => {
        const siblings = Array.from(h2.parentElement.children);
        const index = siblings.indexOf(h2);
        const nextItems = siblings.slice(index + 1);
        const nextH3Items = nextItems.filter(item => item.tagName === "H3");
    
        if (isDropdown && nextH3Items.length > 0) {
            const menuItem = createMenuItem(h2.id, h2.textContent, true);
            navigationMenu.appendChild(menuItem);
            lastH2Item = menuItem;
    
            nextH3Items.forEach(nextItem => {
                const dropdownMenu = lastH2Item.querySelector(".dropdown-menu");
                const dropdownItem = createDropdownMenuItem(nextItem.id, nextItem.textContent);
                dropdownMenu.appendChild(dropdownItem);
            });
        } else {
            const menuItem = createMenuItem(h2.id, h2.textContent, false);
            navigationMenu.appendChild(menuItem);
        }
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

    // Přidá hotové menu do stránky
    document.body.insertBefore(header, document.body.firstChild);


    // Funkčnost navigace
    const hamburger = document.querySelector(".navigation__hamburger");
    const navMenu = document.querySelector(".navigation__menu");
    const dropdowns = document.querySelectorAll(".menu__item--dropdown");

    if (hamburger && navMenu) {
        // hamburger menu
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
        // dropdown menu aktivace
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("click", () => {
                const dropdownMenu = dropdown.querySelector(".dropdown-menu");
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle("open");
                }
            });
        });
    }
}
