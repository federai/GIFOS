
var contfav= document.getElementById("containerfavs");
var favs = JSON.parse(localStorage.getItem("favoritos"));
console.log(favs);
if (favs!=null){
for (i=0 ; i<favs.length ;i++){
    
    var txt =  "<div class='imagesfav'>" +
                "<img src='"+ favs[i] + " alt='' class='imagesfavresults'>" +
                "</div>";
    contfav.insertAdjacentHTML("afterbegin",txt);
}
}


    var favs = JSON.parse(localStorage.getItem("favoritos"));
    if (favs== null){
        var iconheartpage = document.getElementById("iconheartpage");
        iconheartpage.src="/images/icon-fav-sin-contenido.svg"
        iconheartpage.classList.add("heartfavempty");
        var titlefav = document.getElementById("title-fav");
        titlefav.innerHTML="¡Guarda tu primer GIFO en Favoritos <br> para que se muestre aquí!";
        titlefav.classList.add("titlefavempty");
        

    }

