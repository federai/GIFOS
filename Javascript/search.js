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
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                </div>
            <div class="overlaysearch">
                <div class="buttons">
                    <button class='heart' id='heartfav${i}' onclick="favorites(${i},'${info.data[i].id}')">
                    </button>
                    <a href="${info.data[i].images.original.url}" download><button class="download"></a>
                    </button>
                    <button class='max' 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                    </button>
                </div>
                <div class="text">${info.data[i].username}<br> ${info.data[i].title}
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
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                </div>
            <div class="overlaysearch">
                <div class="buttons">
                    <button class='heart' id='heartfav${i}' onclick="favorites(${i},'${info.data[i].id}')">
                    </button>
                    <a href="${info.data[i].images.original.url}" download><button class="download"></a>
                    </button>
                    <button class='max' 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                    </button>
                </div>
                <div class="text">${info.data[i].username}<br> ${info.data[i].title}
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
