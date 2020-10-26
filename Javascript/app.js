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

let mode = localStorage.getItem("colormode");
var theme = document.querySelector("#theme-link");


 if (localStorage.getItem("colormode") == "Style/darkmode/darkstyle.css") {
     darkmodechanges();                                                      //Chequeo que hay en localStorage y aplico el Style
     hoverRedesNoc();                                                        //Por defecto aplico lightstyle.css, si tengo guardado darkstyle 
     theme.href = localStorage.getItem("colormode");                         // lo aplico con theme.href  //Aplico hover redes dark y logos dark  
}
else{
    hoverRedes();                                                            //aplico hover redes modo diurno
}

/*funcion a aplicar cuando elijo modo diurno
 -- Cambio href y aplico lightstyle.css
 -- Guardo en localStorage href
 -- Aplico cambios de logos con lightmodechanges
 */
function chooselightmode ()  {
    theme.href = "Style/lightmode/lightstyle.css";
    var linklightmode = theme.getAttribute("href");              
    localStorage.setItem("colormode", linklightmode);
    lightmodechanges();
    hoverRedes();
}

/*funcion a aplicar cuando elijo modo nocturno
 -- Cambio href y aplico lightstyle.css
 -- Guardo en localStorage href
 */
function choosedarkmode () {
    theme.href = "Style/darkmode/darkstyle.css";
    var linkdarkmode = theme.getAttribute("href");
    localStorage.setItem("colormode", linkdarkmode);
    darkmodechanges();
    hoverRedesNoc();
}

/*
function darkMode() {
    choosedarkmode();
    hoverRedesNoc();

}

function lightMode() {
    chooselightmode();
    hoverRedes();

}
*/
function darkmodechanges(){
    var logomovil = document.getElementById("logomobile").src = "images/logo-mobile-modo-noct.svg";
    var logo = document.getElementById("logo").src = "images/Logo-modo-noc.svg";
}

function lightmodechanges(){
    var logomovil = document.getElementById("logomobile").src = "images/logo-mobile.svg";
    var logo = document.getElementById("logo").src = "images/logo-desktop.svg";
}
//------------------------------------------------------HOVER MENU Y BOTON MAS----------------------------------------------------------


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
function hoverRedes(){
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
}
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
    var insta = document.getElementById("instagram");
    insta.addEventListener("mouseover", function () {
        insta.src = "images/icon_instagram_noc.svg";
    });
    insta.addEventListener("mouseout", function () {
        insta.src = "images/icon_instagram.svg";
    });
}