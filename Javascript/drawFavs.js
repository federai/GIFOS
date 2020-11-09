
var contfav= document.getElementById("containerfavs");
var favs = JSON.parse(localStorage.getItem("favoritos"));
for (i=0 ; i<favs.length ;i++){
    
    var txt =  "<div class='imagesfav'>" +
                "<img src='"+ favs[i] + " alt='' class='imagesfavresults'>" +
                "</div>";
    contfav.insertAdjacentHTML("afterbegin",txt);
}