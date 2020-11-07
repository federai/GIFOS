//--------------------------------------------- MENU HAMBURGUESA -----------------------------------------------------------------
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
}

function lightmodechanges() {
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




//-----------------------------------------------------API CONNECTION TRENDIGS----------------------------------------------------------------------
function trendigs() {
    var urlTrendings = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    fetch(urlTrendings)
        .then(r => r.json())
        .then((rsp) => {
            console.log(rsp);
            var contTrendings = document.getElementById("TT");
            for (i = 0; i < 5; i++) {
                var p = document.createElement("div");
                p.classList.add("mostsearch")
                p.innerHTML = rsp.data[i] + ',';
                contTrendings.append(p);
            }

        })
};

//-------------------------------------------------------API CONNECTION GIFS TRENDIGS----------------------------------
var screen = window.innerWidth;

function gifTrendigs(limit, offset) {

    var urlGifTrendigs = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`;
    console.log(urlGifTrendigs);
    fetch(urlGifTrendigs)
        .then(r => r.json())
        .then((rsp) => {
            var contGif = document.getElementById("sliderimages");
            console.log(rsp);
            for (i = 0; i < rsp.data.length; i++) {
                // var img = document.createElement("img");
                // img.setAttribute("src", rsp.data[i].images.original.url);
                // img.classList.add("imgGif");
                // contGif.appendChild(img);
                var txt =
                '<div class="card">' +
                '<div class="contGif"><img src="'+ rsp.data[i].images.original.url + '" alt="Avatar" class="imgGif"></div>' +
                 '<div class="overlay">' +
                    '<div class="buttons">'+
                    '<button class="heart"></button>'+
                    '<button class="download"></button>'+
                    '<button class="max"></button>'+
                    '</div>'+
                  '<div class="text">User <br> Titulo GIFO</div>'+
                '</div>'+
                '</div>'    ;
                contGif.insertAdjacentHTML('beforeend',txt);
            }
        
        })
};

 
    if (window.innerWidth > 768) {
        var limit = 3;
        var offset = 0;
        gifTrendigs(limit,offset);
    }
    else{
        var limit=25;
        var offset=0;
        gifTrendigs(limit,offset);
    }



//-------------------------------------------------------API CONNECTION SEARCH----------------------------------

async function search(busqueda) {
    var urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&limit=10`;
    resp = await fetch(urlBusqueda);
    info = await resp.json();

    var contimages = document.getElementById("searchimagesresults");
    console.log(info.data[1].images.original.url);
    for (i = 0; i < info.data.length; i++) {
        var img = document.createElement("img");
        img.setAttribute("src", info.data[i].images.original.url);
        img.classList.add("imagesresults");
        contimages.appendChild(img);
    }


    var contgeneral = document.getElementById("searchresults")
    var txt = '<div class="borde"></div>' +
        '<h1 class="titlesearch">' + busqueda + '</h1>'
    contgeneral.insertAdjacentHTML('afterbegin', txt);
}


var boton = document.getElementById("buttonsearch");

boton.addEventListener("click", clickbotonbusqueda);
const input = document.getElementById("search");
function clickbotonbusqueda() {
    
    document.getElementById("imagen").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("busqueda").classList.add("activesearch");
    boton.classList.add("icon-searchactive")
    search(input.value);
}
input.addEventListener('keyup', ()=> {
    if (event.which === 13 || event.keyCode == 13) {
        clickbotonbusqueda();
    }
});

//------------------------------------------------BOTONES CARUSEL ------------------------------------------------
 
var index = 0;
function moveslides(n){
    var cant=index+=n
    console.log("offset " + cant);
    if (cant>=0){
    var contGif = document.getElementById("sliderimages");
    contGif.innerHTML= "";
    //console.log ("valor n " + cont);
    gifTrendigs(3,cant)
   }
   
}


//------------------------------------------------SUGGESTION BOX ------------------------------------------------




input.addEventListener("keyup",()=>{
var searchInput = input.value
console.log(typeof(searchInput));
var url = `http://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${searchInput}`;
fetch (url)
.then (r=>r.json())
.then ((r)=>{
    console.log(r);
    var contsugg=document.getElementById("suggestions");
    contsugg.innerHTML="";
    for (i=0 ; i< r.data.length ; i++){

        var txt = '<div class="suggestion" class="border"><div class="icon-suggestion"></div>'+
                    '<div class="choice">'+r.data[i].name + '</div></div><br>'
                    
        contsugg.insertAdjacentHTML("afterbegin",txt);
        
   }
    
})
})


trendigs();
