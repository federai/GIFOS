const apiKey = "Uc1F9kfal68vQWzdRi60gLKD2i59hyw0";


var navbar = document.querySelector(".navbar");
var ham = document.querySelector(".ham");

// toggles hamburger menu in and out when clicking on the hamburger
function toggleHamburger() {
    navbar.classList.toggle("showNav");
    ham.classList.toggle("showClose");
}

ham.addEventListener("click", toggleHamburger);

// toggle when clicking on links


var menuLinks = document.querySelectorAll(".menuLink");
menuLinks.forEach(
    function (menuLink) {
        menuLink.addEventListener("click", toggleHamburger);
    }
)

