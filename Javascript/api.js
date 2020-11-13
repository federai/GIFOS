const apiKey = "Uc1F9kfal68vQWzdRi60gLKD2i59hyw0";
// localStorage.clear();
//-----------------------------------------------------API CONNECTION TRENDIGS----------------------------------------------------------------------
function trendigs() {
    var urlTrendings = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    fetch(urlTrendings)
        .then(r => r.json())
        .then((rsp) => {
            console.log(rsp);
            var contTrendings = document.getElementById("TT");
            for (i = 0; i < 5; i++) {
                var txt = `<div class="mostsearch" id="mostsearch" onclick="clickTT('${rsp.data[i]}')">
                ${rsp.data[i]},
                </div>`;
                contTrendings.insertAdjacentHTML("afterbegin",txt);
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
                `<div class="card">
                    <div class="contGif">
                        <img src="${rsp.data[i].images.original.url}" alt="Avatar" class="imgGif" 
                        onclick="agrandar('${rsp.data[i].images.original.url}','${rsp.data[i].username.user}','${rsp.data[i].title}')">
                        </div>
                    <div class="overlay">
                        <div class="buttons">
                            <button class='heart' onclick=favorites('${rsp.data[i].images.original.url}','${rsp.data[i].id}')>
                            </button>
                            <button class="download">
                            </button>
                            <button class='max' 
                            onclick="agrandar('${rsp.data[i].images.original.url}','${rsp.data[i].username.user}','${rsp.data[i].title}')">
                            </button>
                        </div>
                        <div class="text">${rsp.data[i].username.user}<br> ${rsp.data[i].title}
                        </div>
                    </div>
                </div>`;
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
        var limit=15;
        var offset=0;
        gifTrendigs(limit,offset);
        
    }



//-------------------------------------------------------API CONNECTION SEARCH----------------------------------

async function search(busqueda, offset) {
    busquedaURI=encodeURIComponent(busqueda);
    var contgeneral = document.getElementById("searchresults");
    contgeneral.innerHTML = '<div id="titlesearchresult">' +
        '<div id="searchimagesresults">' +                    //Borro imagenes anteriores en nueva busqueda
        '</div>' +
        '<div class="pages" id="pages"></div>' +
        '</div>';
    var urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&offset=${offset}`;
    console.log(urlBusqueda);
    resp = await fetch(urlBusqueda);
    info = await resp.json();
    console.log(info);
    var pages = document.getElementById("pages");
    var contimages = document.getElementById("searchimagesresults");
    
    //Condicion si el resultado que devuelve es mayor a 12 para que solo dibuje con for 12 por pagina
    
    if (info.pagination.count-info.pagination.offset > 12) {
        for (i = 0; i < 12; i++) {
           
            var txt = `<img src="${info.data[i].images.original.url}" class="imagesresults" onclick=agrandar('${info.data[i].images.original.url}')></img>`;
            contimages.insertAdjacentHTML("afterbegin", txt);

        }
        var txt = '<div class="borde" id="borde"></div>' +
            '<h1 class="titlesearch" id="titlesearch">' + busqueda + '</h1>'
        contgeneral.insertAdjacentHTML('afterbegin', txt);

        //cuento la cantidad de paginas y redondeo para arriba
        var total = info.pagination.count;
        var paginas = Math.ceil(total / 12);
        //dibujo la cantidad de botones necesarios
        for (j = 1; j <= paginas; j++) {
            var txt = `<button class="page" id="page" onclick="page('${busqueda}',${j - 1}*12)">${j}</button>`;
            pages.insertAdjacentHTML('beforeend',txt);
        }

    }
     //Cuando no es mayor a 12 hago lo mismo y le sumo condicion del total>12 para que si es menor no dibuje los botones
     else { 
        for (i = 0; i < info.pagination.count-info.pagination.offset; i++) {
        var txt = `<img src="${info.data[i].images.original.url}" class="imagesresults" onclick=agrandar('${info.data[i].images.original.url}')></img>`;
        contimages.insertAdjacentHTML("afterbegin", txt);
        }
        var txt = '<div class="borde" id="borde"></div>' +
            '<h1 class="titlesearch" id="titlesearch">' + busqueda + '</h1>'
        contgeneral.insertAdjacentHTML('afterbegin', txt);
        var total = info.pagination.count;
        var paginas = Math.ceil(total / 12);
        if (total>12){
        for (j = 1; j <= paginas; j++) {
            var txt = `<button class="page" id="page" onclick="page('${busqueda}',${j - 1}*12)">${j}</button>`;
            pages.insertAdjacentHTML("beforeend",txt);
        }
    }
    
    }
}

function page(busqueda,off) {
    
    search(busqueda, off);
}

var boton = document.getElementById("buttonsearch");
var contgeneralsearch = document.getElementById("searchresults");
boton.addEventListener("click", clickbotonbusqueda);
const input = document.getElementById("search");


function clickbotonbusqueda() {             
    document.getElementById("imagen").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("busqueda").classList.add("activesearch");
    boton.classList.add("icon-searchactive")
   
}
input.addEventListener('keyup', ()=> {
    if (event.which === 13 || event.keyCode == 13) {
        clickbotonbusqueda();
        search(input.value,0);
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
// input.addEventListener("input",()=>{
//     const value = input.value;
//     if (!value){
//     var contsugg=document.getElementById("suggestions");
//     console.log("valor vacio" + input.value);
//     contsugg.style.borderBottom="1px solid #572EE5";
    
// }
// })

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

        var txt = `<div class="suggestion" class="border"><div class="icon-suggestion"></div>
        <div class="choice" onclick="clickTT("${r.data[i].name}")">${r.data[i].name}</div></div><br>`
                    
        contsugg.insertAdjacentHTML("afterbegin",txt);
        
   }
    
})
});



trendigs();

function clickTT(a){
    search(a);
    clickbotonbusqueda();
    
}

//-----------------------------------------FUNCION AGRANDAR GIF-----------------------------------------
function agrandar(gifmax,user,title) {
    document.getElementById("max").innerHTML = "";
    document.getElementById("max").style.display = "unset";
    var cont = document.getElementById("max");
    var txt = `<div id="contbutton"><button id="cross" onclick=volver()></button></div>
    <div class="contimagemax"> 
        <img src="${gifmax}" alt="" class="img">
        <div id="botones">
        <div id="titleMaxGif"> <div class="userGifMax"> ${user}</div><div class="titleGifMax">${title}</div> </div>
        <button class='heart' onclick=add('${gifmax}')></button>
        <button id="download"></button>
       
    </div>    
    </div>`;
    cont.insertAdjacentHTML("afterbegin", txt);
    document.getElementById("all").style.display = "none";

};

//Cuando aprieto la cruz del GIF agrandado vuelve a la pagina principal
function volver() {
    document.getElementById("all").style.display = "unset";
    document.getElementById("max").style.display = "none";
}

