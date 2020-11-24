
async function drawFavorites(array, valorpasado) {

    var favssave = JSON.parse(localStorage.getItem("ids"));
    var urlBusqueda = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${array}`;
    resp = await fetch(urlBusqueda);
    info = await resp.json();

    contfav.innerHTML = `<div class="imagesfavs" id="imagesfavs"></div>
                             <div class="pages" id="pages"></div>`;
    info.pagination.offset = valorpasado;
    containerfavs = document.getElementById("imagesfavs");
    var pages = document.getElementById("pages");
   
   //Cuando son mas de 12 GIFS dibujo con i hasta 12.
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
                <button class="download" onclick="downloadGif('${info.data[i].id}')">  </button>

                    <button class='max' 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}')">
                    </button>
                </div>
                <div class="text">${info.data[i].username}<br> ${info.data[i].title}
                </div>
            </div>
        </div>`;
            containerfavs.insertAdjacentHTML("beforeend", txt);
            //Chequeo si existe algun dato en el localstorage
            if (favssave != null) {
                // Si existe con includes busco si el string de id esta en el array de ids
                var searchid = favssave.includes(info.data[i].id);
                if (searchid) {
                    //si esta me traigo el boton heart y le agrego el estilo heartactive en hoja _hoverimages.scss
                    var x = document.getElementById("heartfav" + i);
                    x.classList.add("heartactive")
                }
                else {
                    //console.log("no existe");
                }

            }
        }


        //cuento la cantidad de paginas y redondeo para arriba
        var total = info.pagination.count;
        var paginas = Math.ceil(total / 12);
        //dibujo la cantidad de botones necesarios
        for (j = 1; j <= paginas; j++) {
            var txt = `<button class="page" id="page${j}" onclick="pagefav(${j - 1}*12)">${j}</button>`;
            pages.insertAdjacentHTML('beforeend', txt);
            if ((j - 1) * 12 == valorpasado) {
                document.getElementById(`page${j}`).classList.add("actualpage");
            }

        }

    }
    
    //Cuando no es mayor a 12 hago lo mismo y le sumo condicion del total>12 para que si es menor no dibuje los botones
    else {
        //dibujo desde el valor pasado hasta el count porque las paginas que tienen menos de 12 resultados caen aca.
        // Por ejemplo si tengo 15 gif los ultimos 3 caen en esta condicion.
        for (i = valorpasado; i < info.pagination.count; i++) {
            var txt = `<div class="cardsearch">
            <div class="contGifsearch">
                <img src="${info.data[i].images.original.url}" alt="Avatar" class="imgsearchresult" 
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}')">
                </div>
            <div class="overlaysearch">
                <div class="buttons">
                <button class='heart' id='heartfav${i}' onclick="favorites(${i},'${info.data[i].id}')">
                    </button>
                    <button class="download" onclick="downloadGif('${info.data[i].id}')">  </button>
                    <button class='max' 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                    </button>
                </div>
                <div class="text">${info.data[i].username}<br> ${info.data[i].title}
                </div>
            </div>
        </div>`;
            containerfavs.insertAdjacentHTML("beforeend", txt);
            if (favssave != null) {
                var searchid = favssave.includes(info.data[i].id);
                if (searchid) {
                    var x = document.getElementById("heartfav" + i);
                    x.classList.add("heartactive")
                }
                else {
                    //console.log("no existe");
                }

            }
        }
        var total = favssave.length;
        var paginas = Math.ceil(total / 12);

        if (total > 12) {
            for (j = 1; j <= paginas; j++) {
                var txt = `<button class="page" id="page${j}" onclick="pagefav(${j - 1}*12)">${j}</button>`;
                pages.insertAdjacentHTML("beforeend", txt);
                if ((j - 1) * 12 == valorpasado) {
                    document.getElementById(`page${j}`).classList.add("actualpage");
                }

            }
        }

    }
}



function pagefav(off) {
    containerfavs = document.getElementById("imagesfavs");
    containerfavs.innerHTML = "";
    drawFavorites(favssave, off);

}