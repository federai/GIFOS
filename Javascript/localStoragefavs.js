 

function favorites(valor, id) {
    changeHeart(valor, id);
    addId(id);
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
        console.log("Existe");
        const index = ids.indexOf(numero);
        if (index > -1){
            ids.splice(index,1);
        }
    }
    else {
        //si no existe lo mete en el array
        ids.push(numero);
    }
    localStorage.setItem('ids', JSON.stringify(ids));
}


 function changeHeart(contador, id) {
      //Paso a Array ids de localstorage
       console.log("en la funcion changeHeart");
       let ids = localStorage.getItem('ids');
       ids = JSON.parse(ids);
    
       var x = document.getElementById("heartfav" + contador);
        if (ids!=null){
       var searchid = ids.includes(id);
       if(searchid){
           x.classList.remove("heartactive");
       }
       else{
           x.classList.add("heartactive");
       }
    }
    else{
        x.classList.add("heartactive");
    }
//     console.log(x);
//     if (x.classList.contains('heartactive')) {
//         x.classList.remove('heartactive');
//         for (var i = 0; i < ids.length; i++) {
//             if (ids[i] == id) {
//                 ids.splice(i, 1);
//             }
//         }
//         localStorage.setItem('ids', JSON.stringify(ids));
//     }
//     else {
//         console.log(x);
//         x.classList.add("heartactive");
//     }
 }




