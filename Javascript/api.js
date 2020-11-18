const apiKey = "Uc1F9kfal68vQWzdRi60gLKD2i59hyw0";
var buttonLeft = document.getElementById("left");
var buttonRight = document.getElementById("right");
var index = 0;
//-----------------------------------------------------API CONNECTION TRENDIGS----------------------------------------------------------------------
function trendings() {
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
                contTrendings.insertAdjacentHTML("afterbegin", txt);
            }

        })
};

//-------------------------------------------------------API CONNECTION GIFS TRENDIGS----------------------------------
var screen = window.innerWidth;
var ids = JSON.parse(localStorage.getItem("ids"));

function gifTrendings(limit, offset) {
    var urlGifTrendigs = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`;
    console.log(urlGifTrendigs);
    fetch(urlGifTrendigs)
        .then(r => r.json())
        .then((rsp) => {
            var contGif = document.getElementById("sliderimages");
            console.log(rsp);
            for (i = 0; i < rsp.data.length; i++) {
                var txt =
                    `<div class="card">
                    <div class="contGif">
                        <img src="${rsp.data[i].images.original.url}" alt="Avatar" class="imgGif" 
                        onclick="agrandar('${rsp.data[i].images.original.url}','${rsp.data[i].username.user}','${rsp.data[i].title}','${rsp.data[i].id}')">
                        </div>
                    <div class="overlay">
                        <div class="buttons">
                            <button class='heart' id='heartfav${i}' onclick="favorites(${i},'${rsp.data[i].id}')">
                            </button>
                            <button class="download" onclick="downloadGif('${rsp.data[i].id}')">  </button>
                            <button class='max' 
                            onclick="agrandar('${rsp.data[i].images.original.url}','${rsp.data[i].username.user}','${rsp.data[i].title}','${rsp.data[i].id}')">
                            </button>
                        </div>
                        <div class="text">${rsp.data[i].username.user}<br> ${rsp.data[i].title}
                        </div>
                    </div>
                </div>`;
                contGif.insertAdjacentHTML('afterbegin', txt);
                if (ids != null) {
                    var searchid = ids.includes(rsp.data[i].id);
                    if (searchid) {
                        var x = document.getElementById("heartfav"+i);
                        x.classList.add("heartactive")
                    }
                    else {
                        console.log("no existe");
                    }

                }
            }


        })
};


if (window.innerWidth > 768) {
    var limit = 3;
    var offset = 0;
    gifTrendings(limit, offset);
}
else {
    var limit = 15;
    var offset = 0;
    gifTrendings(limit, offset);

}



//-------------------------------------------------------API CONNECTION SEARCH----------------------------------

async function search(busqueda, offset) {
    busquedaURI = encodeURIComponent(busqueda);
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

    if (info.pagination.count - info.pagination.offset > 12) {
        for (i = 0; i < 12; i++) {

            var txt = `<div class="cardsearch">
            <div class="contGifsearch">
                <img src="${info.data[i].images.original.url}" alt="Avatar" class="imgsearchresult" 
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username.user}','${info.data[i].title}','${info.data[i].id}')">
                </div>
            <div class="overlaysearch">
                <div class="buttons">
                    <button class='heart' id='heartfav${i}' onclick="favorites(${i},'${info.data[i].id}')">
                    </button>
                    <a href="${info.data[i].images.original.url}" download><button class="download"></a>
                    </button>
                    <button class='max' 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username.user}','${info.data[i].title}','${info.data[i].id}')">
                    </button>
                </div>
                <div class="text">${info.data[i].username.user}<br> ${info.data[i].title}
                </div>
            </div>
        </div>`;
            contimages.insertAdjacentHTML("afterbegin", txt);
            if (ids != null) {
                var searchid = ids.includes(info.data[i].id);
                if (searchid) {
                    var x = document.getElementById("heartfav"+i);
                    x.classList.add("heartactive")
                }
                else {
                    console.log("no existe");
                }

            }
        }
        var txt = '<div class="borde" id="borde"></div>' +
            '<h1 class="titlesearch" id="titlesearch">' + busqueda + '</h1>'
        contgeneral.insertAdjacentHTML('afterbegin', txt);

        //cuento la cantidad de paginas y redondeo para arriba
        var total = info.pagination.count;
        var paginas = Math.ceil(total / 12);
        //dibujo la cantidad de botones necesarios
        for (j = 1; j <= paginas; j++) {
           
            var txt = `<button class="page" id="page${j}" onclick="page('${busqueda}',${j - 1}*12)">${j}</button>`;
            pages.insertAdjacentHTML('beforeend', txt);
            if ((j-1)*12 == offset){
                document.getElementById(`page${j}`).classList.add("actualpage");
            }
        }

    }
    //Cuando no es mayor a 12 hago lo mismo y le sumo condicion del total>12 para que si es menor no dibuje los botones
    else {
        for (i = 0; i < info.pagination.count - info.pagination.offset; i++) {
            
            var txt = `<div class="cardsearch">
            <div class="contGifsearch">
                <img src="${info.data[i].images.original.url}" alt="Avatar" class="imgsearchresult" 
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username.user}','${info.data[i].title}','${info.data[i].id}')">
                </div>
            <div class="overlaysearch">
                <div class="buttons">
                    <button class='heart' id='heartfav${i}' onclick="favorites(${i},'${info.data[i].id}')">
                    </button>
                    <a href="${info.data[i].images.original.url}" download><button class="download"></a>
                    </button>
                    <button class='max' 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username.user}','${info.data[i].title}','${info.data[i].id}')">
                    </button>
                </div>
                <div class="text">${info.data[i].username.user}<br> ${info.data[i].title}
                </div>
            </div>
        </div>`;
            contimages.insertAdjacentHTML("afterbegin", txt);
            if (ids != null) {
                var searchid = ids.includes(info.data[i].id);
                if (searchid) {
                    var x = document.getElementById("heartfav"+i);
                    x.classList.add("heartactive")
                }
                else {
                    console.log("no existe");
                }

            }
        }
        var txt = '<div class="borde" id="borde"></div>' +
            '<h1 class="titlesearch" id="titlesearch">' + busqueda + '</h1>'
        contgeneral.insertAdjacentHTML('afterbegin', txt);
        var total = info.pagination.count;
        var paginas = Math.ceil(total / 12);
        if (total > 12) {
            for (j = 1; j <= paginas; j++) {
                

             var txt = `<button class="page" id="page${j}" onclick="page('${busqueda}',${j - 1}*12)">${j}</button>`;
              pages.insertAdjacentHTML("beforeend", txt);
              if ((j-1)*12 == offset){
                document.getElementById(`page${j}`).classList.add("actualpage");
            }
              
            }
        }

    }
}

function page(busqueda, off) {
    search(busqueda, off);

}

function clickbotonbusqueda() {
    document.getElementById("imagen").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("busqueda").classList.add("activesearch");

}


//------------------------------------------------BOTONES CARUSEL ------------------------------------------------



function moveslides(n) {
    var cant = index += n;
    var contGif = document.getElementById("sliderimages");
    console.log("offset " + cant);
    contGif.style.transition = "all 2s ease-out 2s"
    if (cant >= 0) {

        contGif.innerHTML = "";
        //console.log ("valor n " + cont);
        gifTrendings(3, cant)
    }
}

trendings();

function clickTT(a) {
    search(a);
    clickbotonbusqueda();

}

//-----------------------------------------FUNCION AGRANDAR GIF-----------------------------------------
function agrandar(gifmax, user, title, idmax) {
    console.log(idmax);
    console.log(gifmax);
    document.getElementById("max").innerHTML = "";
    document.getElementById("max").style.display = "unset";
    var cont = document.getElementById("max");
    var txt = `<div id="contbutton">
                <button id="cross" onclick=volver()></button>
                </div>
                <div class="contimagemax"> 
                    <img src="${gifmax}" alt="" class="imgGifmax">
                         <div id="legend">
                              <div id="titleMaxGif">
                                    <div class="userGifMax"> ${user}</div>
                                    <div class="titleGifMax">${title}</div> 
                                </div>
                                <div class="buttonsMaxGif">
                                <button class='heartMax' id='heartfav1' onclick="favorites(1,'${idmax}')">
                                <button id="download"></button>
                                </div> 
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

//---------------------------------------------SUGGESTION BOX AND SEARCH BOX---------------------------------------

let searchBar = document.getElementById('search-bar');
let searchBoton = document.getElementById('search-button');
let deleteBoton = document.getElementById('delete-button');
let containerSearch = document.getElementById('container-search');

// BORRAR EL INPUT CUANDO SE APRIETA EL BOTON CLOSE
deleteBoton.addEventListener('click', () => {
    searchBar.value = "";
    containerSearch.innerHTML = "";
    deleteBoton.style.display = "none";
    searchBoton.style.display = "inline-block";
    document.getElementById("imagen").style.display = "flex";
    document.getElementById("title").style.display = "block";
    document.getElementById("busqueda").classList.remove("activesearch");

})

//BUSCAR CUANDO APRIETO EL BOTON BUSCAR
searchBoton.addEventListener('click', () => {
    clickbotonbusqueda();
    search(searchBar.value, 0);
    searchBar.value = "";
})

// BUSCAR CUANDO APRIETO ENTER 
searchBar.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        containerSearch.innerHTML = "";
        clickbotonbusqueda();
        search(searchBar.value, 0);
        searchBar.value = "";
    }
});

//SE MUESTRA EL BOTON DELETE PARA BORRAR EL INPUT
searchBar.addEventListener('keydown', () => {
    searchBoton.style.display = "none";
    deleteBoton.style.display = "inline-block";
});

//SI HAGO CLICK EN CUALQUIER LUGAR DE LA VENTANA QUE NO SEA EL SEARCHBAR, 
// EL CONTAINER SEARCH O EL LOGO, ENTONCES VOY A VACIAR EL CONTAINER SEARCH, Y
// MUESTRO EL BOTON BUSCAR
window.addEventListener('click', (e) => {
    if (e.target != containerSearch || e.target != searchBar || e.target != logo) {
        containerSearch.innerHTML = "";
        searchBoton.style.display = "inline-block";
        deleteBoton.style.display = "none";
    }
})


searchBar.addEventListener('keyup', traerSugerencias);

function traerSugerencias() {
    let searchValue = searchBar.value.toLowerCase();
    if (searchValue != '' || searchValue > 1) {
        let url_sug = `https://api.giphy.com/v1/tags/related/${searchValue}?api_key=${apiKey}`;
        fetch(url_sug)
            .then(resp => {
                return resp.json()
            })
            .then(j => {
                let data = j.data;
                let ul = document.createElement('ul');
                ul.classList.add('ulSearch');
                let item = [];
                for (let x = 0; x < 4; x++) {
                    let names = data[x].name;
                    item.push(names);
                };
                for (let i = 0; i < item.length; i++) {
                    containerSearch.innerHTML = "";
                    var li = document.createElement('li');
                    var icon = document.createElement('div');
                    icon.classList.add('icon-div');
                    icon.innerHTML = '<i class="fas fa-search"></i>';
                    li.classList.add('searchSug');
                    li.innerHTML = item[i];
                    icon.appendChild(li);
                    ul.appendChild(icon);
                }
                containerSearch.appendChild(ul);
                //ESTO ESCRIBE EN EL INPUT LA PALABRA SELECCIONADA
                let lista = document.getElementsByClassName('searchSug');
                for (let x = 0; x < lista.length; x++) {
                    lista[x].addEventListener('click', () => {
                        searchBar.value = lista[x].innerHTML;
                        containerSearch.innerHTML = "";
                        deleteBoton.style.display = "none";
                        searchBoton.style.display = "inline-block";
                    });
                }
            })
            .catch(err => console.log(err));
    } else {
        containerSearch.innerHTML = "";
    }
};


//----------------------------------------------Descargar GIF------------------------------------------
let blob;
async function downloadGif(gifoImg) {
    let blob = await fetch(
      "https://media.giphy.com/media/" + gifoImg + "/giphy.gif"
    ).then((img) => img.blob());
    invokeSaveAsDialog(blob, "myGifo.gif");
  }