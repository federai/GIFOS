const apiKey = "Uc1F9kfal68vQWzdRi60gLKD2i59hyw0";

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
var screen = screen.width;

function gifTrendigs(limit, offset) {

    var urlGifTrendigs = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`;
    console.log(urlGifTrendigs);
    fetch(urlGifTrendigs)
        .then(r => r.json())
        .then((rsp) => {
            var contGif = document.getElementById("sliderimages");
            for (i = 0; i < rsp.data.length; i++) {
                var img = document.createElement("img");
                img.setAttribute("src", rsp.data[i].images.original.url);
                img.classList.add("imgGif");
                contGif.appendChild(img);
            }
        })
};



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


function trendingScreenSize(size) {
    if (size > 768) {
        var limit = 3;
        var offset = 0;
        gifTrendigs(limit,offset);
    }
    else{
        var limit=25;
        var offset=0;
        gifTrendigs(limit,offset);
    }
};


var boton = document.getElementById("buttonsearch");

boton.addEventListener("click", clickbotonbusqueda);
var input = document.getElementById("search");
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

 var carrouselButtonLeft = document.getElementById("left");
 var carrouselButtonRight = document.getElementById("right");

 carrouselButtonRight.addEventListener("click",() =>{

    
 });

 

trendigs();
trendingScreenSize(screen);