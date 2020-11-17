let mode = localStorage.getItem("colormode");
var theme = document.querySelector("#theme-link");
const styledark = "Style/darkmode/darkstyle.css";
const stylelight = "Style/lightmode/lightstyle.css";

if (localStorage.colormode == 'dark') {
    theme.href = styledark;
    darkmodechanges();                                                      //Chequeo que hay en localStorage y aplico el Style
    hoverRedesNoc();                                                        //Por defecto aplico lightstyle.css, si tengo guardado darkstyle 
    // lo aplico con theme.href  //Aplico hover redes dark y logos dark  
}
else {
    theme.href = stylelight
    hoverRedes();                                                            //aplico hover redes modo diurno
}

/*funcion a aplicar cuando elijo modo diurno
 -- Cambio href y aplico lightstyle.css
 -- Guardo en localStorage href
 -- Aplico cambios de logos con lightmodechanges
 */
function chooselightmode() {
    theme.href = stylelight;
    localStorage.setItem("colormode", 'light');
    lightmodechanges();
    hoverRedes();
}

/*funcion a aplicar cuando elijo modo nocturno
 -- Cambio href y aplico lightstyle.css
 -- Guardo en localStorage href
 */
function choosedarkmode() {
    theme.href = styledark;
    localStorage.setItem("colormode", 'dark');
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
function darkmodechanges() {
    var logomovil = document.getElementById("logomobile").src = "images/logo-mobile-modo-noct.svg";
    var logo = document.getElementById("logo").src = "images/Logo-modo-noc.svg";
    var searchbutton=document.getElementById("search-button").src = "images/icon-search-modo-noct.svg"
    var deletebutton = document.getElementById("delete-button").src="images/close-modo-noct.svg"

}

function lightmodechanges() {
    var logomovil = document.getElementById("logomobile").src = "images/logo-mobile.svg";
    var logo = document.getElementById("logo").src = "images/logo-desktop.svg";
    var searchbutton=document.getElementById("search-button").src = "images/icon-search.svg"
    var deletebutton = document.getElementById("delete-button").src="images/close.svg"

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
function hoverRedes() {
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
//---------------------------------------------------Modo Nocturno-------------------------------------------------------------------------
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