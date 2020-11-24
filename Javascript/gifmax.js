//-----------------------------------------FUNCION AGRANDAR GIF-----------------------------------------



function agrandar(gifmax, user, title, idmax) {
    
    document.getElementById("max").innerHTML = "";
    document.getElementById("max").style.display = "unset";
    var cont = document.getElementById("max");
    var txt = `<div id="contbutton">
                <button id="cross" onclick=volver()></button>
                </div>
                <div class="contimagemax"> 
                    <img src="${gifmax}" alt="" class="imgGifmax">
                         <div id="legend">
                              <div id="titleMaxGif">
                                    <div class="userGifMax"> ${user}</div>
                                    <div class="titleGifMax">${title}</div> 
                                </div>
                                <div class="buttonsMaxGif">
                                <button class='heartMax' id='heartfav777' onclick="favorites(777,'${idmax}')">
                                <button class="download" id="download" onclick="downloadGif('${idmax}')">  </button>
                                </div> 
                         </div>    
                 </div>`;
    cont.insertAdjacentHTML("afterbegin", txt);
    document.getElementById("all").style.display = "none";
    ids = localStorage.getItem('ids');
    ids = JSON.parse(ids);
    var search = ids.includes(idmax);
    if (search){
        document.getElementById("heartfav777").classList.add("heartactive");
    }

};

//Cuando aprieto la cruz del GIF agrandado vuelve a la pagina principal
function volver() {
    document.getElementById("all").style.display = "unset";
    document.getElementById("max").style.display = "none";
}
