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
                    "<button class='heart' onclick=add('"+rsp.data[i].images.original.url+"')></button>"+
                    '<button class="download"></button>'+
                    '<button class="max"></button>'+
                    '</div>'+
                  '<div class="text">'+rsp.data[i].username.user + '<br> '+rsp.data[i].title + '</div>'+
                '</div>'+
                '</div>'    ;
                contGif.insertAdjacentHTML('afterbegin',txt);
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
var buttonLeft = document.getElementById("left");
var buttonRight = document.getElementById("right"); 
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
