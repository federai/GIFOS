var contmisgifos = document.getElementById("misGifos");
var misgifos = JSON.parse(localStorage.getItem("misgifos"));



    async function drawmisgifos(array, valorpasado) {

        if (array == null || array=="") {
            contmisgifos.innerHTML="";
            var iconmisgifos = document.getElementById("iconmisgifos");
            iconmisgifos.src = "/images/icon-mis-gifos-sin-contenido.svg"
            iconmisgifos.classList.add("heartfavempty");
            var titlemisgifos = document.getElementById("titlemisgifos");
            titlemisgifos.innerHTML = "¡Anímate a crear tu primer GIFO!";
              titlemisgifos.classList.add("titlefavempty");
        }
else{
        var urlBusqueda = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${array}`;
        resp = await fetch(urlBusqueda);
        info = await resp.json();
        
        contmisgifos.innerHTML = `<div class="imagesfavs" id="imagesmisgifs"></div>
                                 <div class="pages" id="pages"></div>`;
        info.pagination.offset=valorpasado;
        containermisgifs = document.getElementById("imagesmisgifs");
        var pages = document.getElementById("pages");
        if (info.pagination.count - info.pagination.offset > 12) {

            for (i = 0; i < 12; i++) {

                var txt = `<div class="cardsearch">
                <div class="contGifsearch">
                    <img src="${info.data[i].images.original.url}" alt="Avatar" class="imgsearchresult" 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}')">
                    </div>
                <div class="overlaysearch">
                    <div class="buttons">
                    <button class='erase' id='erasemygif' onclick="erase('${info.data[i].id}')">
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
            containermisgifs.insertAdjacentHTML("beforeend", txt);
             
            }


            //cuento la cantidad de paginas y redondeo para arriba
            var total = info.pagination.count;
            var paginas = Math.ceil(total / 12);
            //dibujo la cantidad de botones necesarios
            for (j = 1; j <= paginas; j++) {
                var txt = `<button class="page" id="page${j}" onclick="pagefav(${j - 1}*12)">${j}</button>`;
                pages.insertAdjacentHTML('beforeend', txt);
                if ((j-1)*12 == valorpasado){
                    document.getElementById(`page${j}`).classList.add("actualpage");
                }
    
            }

        }
        //Cuando no es mayor a 12 hago lo mismo y le sumo condicion del total>12 para que si es menor no dibuje los botones
        else {
            for (i = valorpasado; i < info.pagination.count; i++) {
                var txt = `<div class="cardsearch">
                <div class="contGifsearch">
                    <img src="${info.data[i].images.original.url}" alt="Avatar" class="imgsearchresult" 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}')">
                    </div>
                <div class="overlaysearch">
                    <div class="buttons">
                    <button class='erase' id='erasemygif' onclick="erase('${info.data[i].id}')">
                    </button>
                    <button class="download" onclick="downloadGif('${info.data[i].id}')">  </button>
                    <button class='max' 
                        onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                        </button>
                    </div>
                    <div class="text">${info.data[i].user.username}<br> ${info.data[i].title}
                    </div>
                </div>
            </div>`;
            containermisgifs.insertAdjacentHTML("beforeend", txt);
                
            }
            var total = misgifos.length;
            var paginas = Math.ceil(total / 12);
            
            if (total > 12) {
                for (j = 1; j <= paginas; j++) {
                    var txt = `<button class="page" id="page${j}" onclick="pagefav(${j - 1}*12)">${j}</button>`;
                    pages.insertAdjacentHTML("beforeend", txt);
                    if ((j-1)*12 == valorpasado){
                        document.getElementById(`page${j}`).classList.add("actualpage");
                    }
        
                }
            }

        }
    }
}
    drawmisgifos(misgifos, 0);

    function pagefav(off) {
      
        contmisgifos.innerHTML = "";
        drawmisgifos(misgifos, off);

    }




 function erase(idmygif){
    //Busca numero en array de ids guardados. includes devuelve TRUE o False 
    var searchid = misgifos.includes(idmygif);
    if (searchid) {
        //Si ya existe no hace nada
        const index = misgifos.indexOf(idmygif);
        if (index > -1) {
            misgifos.splice(index, 1);
        }
    }
    localStorage.setItem('misgifos', JSON.stringify(misgifos));
    drawmisgifos(misgifos,0);
 }