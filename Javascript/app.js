//--------------------------------------------- MENU HAMBURGUESA -----------------------------------------------------------------
const apiKey = "Uc1F9kfal68vQWzdRi60gLKD2i59hyw0"
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
const styledark = "Style/darkmode/darkstyle.css";
const stylelight = "Style/lightmode/lightstyle.css";

 if (localStorage.colormode == 'dark') {
    theme.href = styledark;  
    darkmodechanges();                                                      //Chequeo que hay en localStorage y aplico el Style
    hoverRedesNoc();                                                        //Por defecto aplico lightstyle.css, si tengo guardado darkstyle 
                                                                             // lo aplico con theme.href  //Aplico hover redes dark y logos dark  
}
else{
    theme.href = stylelight
    hoverRedes();                                                            //aplico hover redes modo diurno
}

/*funcion a aplicar cuando elijo modo diurno
 -- Cambio href y aplico lightstyle.css
 -- Guardo en localStorage href
 -- Aplico cambios de logos con lightmodechanges
 */
function chooselightmode ()  {
    theme.href = stylelight;             
    localStorage.setItem("colormode", 'light');
    lightmodechanges();
    hoverRedes();
}

/*funcion a aplicar cuando elijo modo nocturno
 -- Cambio href y aplico lightstyle.css
 -- Guardo en localStorage href
 */
function choosedarkmode () {
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


//-----------------------------------------------------API CONNECTION TRENDIGS----------------------------------------------------------------------
function trendigs () {
var urlTrendings = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
fetch (urlTrendings)
.then (r => r.json())
.then ((rsp) => {
    console.log(rsp);
     var contTrendings = document.getElementById("TT");
     for (i=0 ; i<5 ; i++){
        var p = document.createElement("p");
        p.classList.add("mostsearch")
        p.innerHTML=rsp.data[i];
        contTrendings.append(p);
     }

})};

//-------------------------------------------------------API CONNECTION GIFS TRENDIGS----------------------------------
function gifTrendigs(){
var urlGifTrendigs = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
fetch (urlGifTrendigs)
.then (r => r.json())
.then ((rsp) => {
    var contGif = document.getElementById("slider");
    for (i=0 ; i<5 ; i++){
        var img = document.createElement("img");
        img.setAttribute("src",rsp.data[i].images.original.url);
        img.classList.add("imgGif");
        contGif.appendChild(img);
    }
})};

async function search (busqueda){
    var urlBusqueda =`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&limit=10`;
    resp = await fetch(urlBusqueda);
    info = await resp.json();

    var contimages = document.getElementById("searchimagesresults");
    console.log(info.data[1].images.original.url);
    for (i=0 ; i<info.data.length ; i++){
        var img = document.createElement("img");
        img.setAttribute("src",info.data[i].images.original.url);
        img.classList.add("imagesresults");
        contimages.appendChild(img);
    }


    var contgeneral = document.getElementById("searchresults")
    var txt = '<div class="borde"></div>' +
    '<h1 class="titlesearch">'+busqueda+'</h1>'
    contgeneral.insertAdjacentHTML('afterbegin',txt);
}


    var boton = document.getElementById("buttonsearch");
    boton.addEventListener("click",clickbotonbusqueda);

    function clickbotonbusqueda (){
        var input = document.getElementById("search");
        document.getElementById("title").style.display="none";
        document.getElementById("busqueda").classList.add("activesearch");
        boton.classList.add("icon-searchactive")
        search(input.value);
    }










trendigs();
gifTrendigs();