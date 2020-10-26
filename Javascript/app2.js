var navbar = document.querySelector(".navbar")
var ham = document.querySelector(".ham")

// toggles hamburger menu in and out when clicking on the hamburger
function toggleHamburger() {
    navbar.classList.toggle("showNav")
    ham.classList.toggle("showClose")
}

ham.addEventListener("click", toggleHamburger)

// toggle when clicking on links


var menuLinks = document.querySelectorAll(".menuLink")
menuLinks.forEach(
    function (menuLink) {
        menuLink.addEventListener("click", toggleHamburger)
    }
)



let mode = localStorage.getItem("colormode");
var theme = document.querySelector("#theme-link");

if (localStorage.getItem("colormode") == null) {
    theme.href = "Style/lightmode/lightstyle.css";
}
else {
    theme.href = localStorage.getItem("colormode");
}




const chooselightmode = () => {
    theme.href = "Style/lightmode/lightstyle.css";
    var linklightmode = theme.getAttribute("href");
    console.log("El link es " + linklightmode)
    localStorage.setItem("colormode", linklightmode);
    var logomovil = document.getElementById("logomobile").src = "images/logo-mobile.svg";
    var logo = document.getElementById("logo").src = "images/logo-desktop.svg";
}
const choosedarkmode = () => {
    theme.href = "Style/darkmode/darkstyle.css";
    var linkdarkmode = theme.getAttribute("href");
    console.log("El link es " + linkdarkmode)
    localStorage.setItem("colormode", linkdarkmode);
    var logomovil = document.getElementById("logomobile").src = "images/logo-mobile-modo-noct.svg";
    var logo = document.getElementById("logo").src = "images/Logo-modo-noc.svg";

}

function darkMode() {
    choosedarkmode();

}
function lightMode() {
    chooselightmode();

}