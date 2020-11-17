// localStorage.clear();

function favorites(valor, id) {
    addId(id);
    changeHeart(valor, id);
}

function addId(numero) {
    console.log("id= " + numero)
    ids = localStorage.getItem('ids');
    if (ids == null) {
        ids = [];
    } else {
        ids = JSON.parse(ids);
    }
    var searchid = ids.includes(numero);
    if (searchid) {
        console.log("Existe");
    }
    else {
        ids.push(numero);
    }
    localStorage.setItem('ids', JSON.stringify(ids));
}


function changeHeart(contador, id) {
    ids = localStorage.getItem('ids');
    ids = JSON.parse(ids);
    var x = document.getElementById("heartfav" + contador);

    if (x.classList.contains('heartactive')) {
        x.classList.remove('heartactive');
        for (var i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                ids.splice(i, 1);
            }
        }
        localStorage.setItem('ids', JSON.stringify(ids));
    }
    else {
        console.log(x);
        x.classList.add("heartactive");
    }
}


