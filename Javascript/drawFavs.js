const apiKey = "Uc1F9kfal68vQWzdRi60gLKD2i59hyw0";
var contfav= document.getElementById("containerfavs");
var favs = JSON.parse(localStorage.getItem("favoritos"));
var ids = JSON.parse(localStorage.getItem("ids"));




console.log(favs);
if (ids!=null){
    async function drawFavorites(array) {
        var urlBusqueda = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${array}`;
        console.log(urlBusqueda);
        resp = await fetch(urlBusqueda);
        info = await resp.json();
        console.log(info);
        containerfavs = document.getElementById("imagesfavs");
        if (info.pagination.count - info.pagination.offset > 12) {
            for (i = 0; i < 12; i++) {
    
                var txt = `<div class="cardsearch">
                <div class="contGifsearch">
                    <img src="${info.data[i].images.original.url}" alt="Avatar" class="imgsearchresult" 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username.user}','${info.data[i].title}')">
                    </div>
                <div class="overlaysearch">
                    <div class="buttons">
                        <button class='heart' onclick=favorites('${info.data[i].images.original.url}','${info.data[i].id}')>
                        </button>
                        <button class="download">
                        </button>
                        <button class='max' 
                        onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username.user}','${info.data[i].title}')">
                        </button>
                    </div>
                    <div class="text">${info.data[i].username.user}<br> ${info.data[i].title}
                    </div>
                </div>
            </div>`;
                containerfavs.insertAdjacentHTML("afterbegin", txt);
    
            }
           
    
            //cuento la cantidad de paginas y redondeo para arriba
            var total = info.pagination.count;
            var paginas = Math.ceil(total / 12);
            //dibujo la cantidad de botones necesarios
            for (j = 1; j <= paginas; j++) {
                var txt = `<button class="page" id="page" onclick="page('${busqueda}',${j - 1}*12)">${j}</button>`;
                pages.insertAdjacentHTML('beforeend', txt);
            }
    
        }
        //Cuando no es mayor a 12 hago lo mismo y le sumo condicion del total>12 para que si es menor no dibuje los botones
        else {
            for (i = 0; i < info.pagination.count - info.pagination.offset; i++) {
                var txt = `<div class="cardsearch">
                <div class="contGifsearch">
                    <img src="${info.data[i].images.original.url}" alt="Avatar" class="imgsearchresult" 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username.user}','${info.data[i].title}')">
                    </div>
                <div class="overlaysearch">
                    <div class="buttons">
                        <button class='heart' onclick=favorites('${info.data[i].images.original.url}','${info.data[i].id}')>
                        </button>
                        <button class="download">
                        </button>
                        <button class='max' 
                        onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username.user}','${info.data[i].title}')">
                        </button>
                    </div>
                    <div class="text">${info.data[i].username.user}<br> ${info.data[i].title}
                    </div>
                </div>
            </div>`;
                containerfavs.insertAdjacentHTML("afterbegin", txt);
            }
            var total = info.pagination.count;
            var paginas = Math.ceil(total / 12);
            if (total > 12) {
                for (j = 1; j <= paginas; j++) {
                    var txt = `<button class="page" id="buttonpagination" onclick="page('${busqueda}',${j - 1}*12)">${j}</button>`;
                    pages.insertAdjacentHTML("beforeend", txt);
                }
            }
    
        }
    }

drawFavorites(ids);
 }

 if (ids== null){
    var iconheartpage = document.getElementById("iconheartpage");
  iconheartpage.src="/images/icon-fav-sin-contenido.svg"
   iconheartpage.classList.add("heartfavempty");
   var titlefav = document.getElementById("title-fav");
  titlefav.innerHTML="¡Guarda tu primer GIFO en Favoritos <br> para que se muestre aquí!";
   titlefav.classList.add("titlefavempty");
}
