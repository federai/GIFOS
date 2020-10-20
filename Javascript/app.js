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
        var logomovil = document.getElementById("logomobile").src = "images/logo-mobile-modo-noct.svg";
        var logo = document.getElementById("logo").src = "images/Logo-modo-noc.svg";
        hoverRedesNoc();
       
        
        // Otherwise...
    } else {
        // ... switch it to "light-theme.css"
        theme.href = "Style/lightmode/lightstyle.css";
        var logomovil = document.getElementById("logomobile").src = "images/logo-mobile.svg";
        var logo = document.getElementById("logo").src = "images/logo-desktop.svg";
    }


}
//------------------------------------------------------HOVER MENU Y BOTON MAS----------------------------------------------------------

var menu = document.getElementById("menu");
menu.addEventListener("mouseover", function (event) {
    // highlight the mouseover target
    event.target.style.color = "orange";
    // reset the color after a short delay
});
menu.addEventListener("mouseout", function (event) {
    event.target.style.color = "purple";
});

var botonagregar = document.getElementById("add");
botonagregar.addEventListener("mouseover", function () {
    botonagregar.classList.add("add-hover");
})
botonagregar.addEventListener("mouseout", function () {
    botonagregar.classList.remove("add-hover");
})
botonagregar.addEventListener("click", function () {
    botonagregar.classList.toggle("add-click");
})

//-----------------------------------------------------HOVER FOOTER-----------------------------------------------------------------------

//-----------------------------------------------------Icono Facebook---------------------------------------------------------------------
var facebook = document.getElementById("facebook");

facebook.addEventListener("mouseover", function () {
    facebook.src = "images/icon_facebook_hover.svg";
});
facebook.addEventListener("mouseout", function () {
    facebook.src = "images/icon_facebook.svg";
});
//----------------------------------------------------Icono Twitter---------------------------------------------------------------------
var twitter = document.getElementById("twitter");

twitter.addEventListener("mouseover", function () {
    twitter.src = "images/icon-twitter-hover.svg";
});
twitter.addEventListener("mouseout", function () {
    twitter.src = "images/icon-twitter.svg";
});
//----------------------------------------------------Icono Instagram---------------------------------------------------------------------
var insta = document.getElementById("instagram");

insta.addEventListener("mouseover", function () {
    insta.src = "images/icon_instagram-hover.svg";
});
insta.addEventListener("mouseout", function () {
    insta.src = "images/icon_instagram.svg";
});

//---------------------------------------------------Modo Nocturno-------------------------------------------
function hoverRedesNoc() {
    facebook.addEventListener("mouseover", function () {
        facebook.src = "images/icon_facebook_noc.svg";
    });
    facebook.addEventListener("mouseout", function () {
        facebook.src = "images/icon_facebook.svg";
    });

    twitter.addEventListener("mouseover", function () {
        twitter.src = "images/icon_twitter_noc.svg";
    });
    twitter.addEventListener("mouseout", function () {
        twitter.src = "images/icon-twitter.svg";
    });
    insta.addEventListener("mouseover", function () {
        insta.src = "images/icon_instagram_noc.svg";
    });
    insta.addEventListener("mouseout", function () {
        insta.src = "images/icon_instagram.svg";
    });
}