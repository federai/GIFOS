//--------------------------------------------- MENU HAMBURGUESA -----------------------------------------------------------------

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

//------------------------------------MODO NOCTURNO---------------------------------------------------------------------------

var modooscuro = document.getElementById("darkmode");
modooscuro.addEventListener("click", darkmode);
const theme = document.querySelector("#theme-link");
var modo = document.getElementById("mode");


function darkmode() {
    var cuerpo = document.body  //body
    
    cuerpo.classList.toggle('darkmodemobile');          // toggle clase fondo gris

    if (modo.innerHTML == "Nocturno") {
        modo.innerHTML = "Diurno";
    }
    else {
        modo.innerHTML = "Nocturno";
    }
    
    if (theme.getAttribute("href") == "Style/lightmode/lightstyle.css") {
        // ... then switch it to "dark-theme.css"
        theme.href = "Style/darkmode/darkstyle.css";
        var logomovil = document.getElementById("logomobile").src="images/logo-mobile-modo-noct.svg";
        var logo = document.getElementById("logo").src="images/Logo-modo-noc.svg";
      // Otherwise...
      } else {
        // ... switch it to "light-theme.css"
        theme.href = "Style/lightmode/lightstyle.css";
        var logomovil = document.getElementById("logomobile").src="images/logo-mobile.svg";
        var logo = document.getElementById("logo").src="images/logo-desktop.svg";
      }


}
//-------------------------------------FULLSCREEN IMAGE----------------------------------------------------------




