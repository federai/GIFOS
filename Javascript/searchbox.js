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
                    li.setAttribute('onclick','search("'+item[i]+'",0)');
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


