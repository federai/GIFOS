var favssave = JSON.parse(localStorage.getItem("ids"));
var contfav = document.getElementById("containerfavs");
var x = document.getElementById("heartfav2");
var conttitlefav = document.getElementById("conttitlefav");
var titlefav = document.getElementById("title-fav");
var iconheartpage = document.getElementById("iconheartpage");
var iconsincontenido = document.getElementById("iconsincontenido");
var titlefavempty = document.getElementById("titlefavempty")



if (favssave != null && favssave != "") {
    if (titlefavempty != null) {
        titlefavempty.style.display = "none";
        iconsincontenido.style.display = "none"
        titlefav.style.display = "block";
        iconheartpage.style.display = "unset";
        drawFavorites(favssave, 0)
    }
}
if (favssave == null || favssave == "") {
    if (titlefav != null) {
        titlefav.style.display = "none";
        iconheartpage.style.display = "none";
        titlefavempty.style.display = "block";
        iconsincontenido.style.display = "unset"
    }
}

function favorites(valor, id) {
    changeHeart(valor, id);
    addId(id);
    var x = document.getElementById("heartfav" + valor);

}

//Agrega ID a LocalStorage
function addId(numero) {
    console.log("id= " + numero)
    let ids = localStorage.getItem('ids');
    if (ids == null) {
        ids = [];
    } else {
        ids = JSON.parse(ids);
    }
    //Busca numero en array de ids guardados. includes devuelve TRUE o False 
    var searchid = ids.includes(numero);
    if (searchid) {
        //Si ya existe no hace nada
        const index = ids.indexOf(numero);
        if (index > -1) {
            ids.splice(index, 1);
        }
    }
    else {
        //si no existe lo mete en el array
        ids.push(numero);
    }
    localStorage.setItem('ids', JSON.stringify(ids));
    
    if (ids != null && ids != "") {
        if (titlefavempty != null) {
            titlefavempty.style.display = "none";
            iconsincontenido.style.display = "none"
            titlefav.style.display = "block";
            iconheartpage.style.display = "unset";
            //titlefav.innet
            drawFavorites(ids, 0);
            
        }
    }
    else {
        if (titlefavempty != null) {
            titlefavempty.style.display = "block";
            iconsincontenido.style.display = "unset"
            titlefav.style.display = "none";
            iconheartpage.style.display = "none";
            //titlefav.innet
            contfav.innerHTML = "";
        }
    }
}


function changeHeart(contador, id) {
    //Paso a Array ids de localstorage
    var x = document.getElementById("heartfav" + contador);
    var y = document.getElementById("heartfavcarrusel" + contador);
    let ids = localStorage.getItem('ids');
    ids = JSON.parse(ids);


    if (ids != null) {
        var searchid = ids.includes(id);
        if (searchid) {
            if (x != null) {
                x.classList.remove("heartactive");
                if (y != null) {
                    y.classList.remove("heartactive");
                }
            }
            else {
                y.classList.remove("heartactive");
            }
        }
        else {
            if (x != null) {
                x.classList.add("heartactive");
                if (y != null) {
                    y.classList.add("heartactive");
                }
            }
            else {
                y.classList.add("heartactive");
            }
        }
    }
    else {
        if (x != null) {

            x.classList.add("heartactive");
            if (y != null) {
                y.classList.add("heartactive");
            }
        }
        else {
            y.classList.add("heartactive");
        }
    }
}




