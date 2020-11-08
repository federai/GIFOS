
var contfav= document.getElementById("containerfavs");
var favs = JSON.parse(localStorage.getItem("favoritos"));
for (i=0 ; i<favs.length ;i++){
    var img = document.createElement("img");
    img.setAttribute("src",favs[i]);
    img.classList.add("imagesresults");
    contfav.append(img);
}