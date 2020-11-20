
//-------------------------------------------------------API CONNECTION GIFS TRENDIGS----------------------------------
var screen = window.innerWidth;
var ids = JSON.parse(localStorage.getItem("ids"));
var buttonLeft = document.getElementById("left");
var buttonRight = document.getElementById("right");
var index = 0;

function gifTrendings(limit, offset) {
    var urlGifTrendigs = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`;
    console.log(urlGifTrendigs);
    fetch(urlGifTrendigs)
        .then(r => r.json())
        .then((rsp) => {
            var contGif = document.getElementById("sliderimages");
            console.log(rsp);
            for (i = 0; i < rsp.data.length; i++) {
                var txt =
                    `<div class="card">
                    <div class="contGif">
                        <img src="${rsp.data[i].images.original.url}" alt="Avatar" class="imgGif" 
                        onclick="agrandar('${rsp.data[i].images.original.url}','${rsp.data[i].username}','${rsp.data[i].title}','${rsp.data[i].id}')">
                        </div>
                    <div class="overlay">
                        <div class="buttons">
                            <button class='heart' id='heartfav${i}' onclick="favorites(${i},'${rsp.data[i].id}')">
                            </button>
                            <button class="download" onclick="downloadGif('${rsp.data[i].id}')">  </button>
                            <button class='max' 
                            onclick="agrandar('${rsp.data[i].images.original.url}','${rsp.data[i].username}','${rsp.data[i].title}','${rsp.data[i].id}')">
                            </button>
                        </div>
                        <div class="text">${rsp.data[i].username}<br> ${rsp.data[i].title}
                        </div>
                    </div>
                </div>`;
                contGif.insertAdjacentHTML('afterbegin', txt);
                if (ids != null) {
                    var searchid = ids.includes(rsp.data[i].id);
                    if (searchid) {
                        var x = document.getElementById("heartfav"+i);
                        x.classList.add("heartactive")
                    }
                    else {
                        console.log("no existe");
                    }

                }
            }

            if (offset<=0){
                buttonLeft.style.visibility="hidden";
            }
            else{
                buttonLeft.style.visibility="visible";
            }
        })
};


if (window.innerWidth > 768) {
    var limit = 3;
    var offset = 0;
    gifTrendings(limit, offset);
}
else {
    var limit = 15;
    var offset = 0;
    gifTrendings(limit, offset);

}
//------------------------------------------------BOTONES CARUSEL ------------------------------------------------

function moveslides(n) {
    var cant = index += n;
    var contGif = document.getElementById("sliderimages");
    console.log("offset " + cant);
    contGif.style.transition = "all 2s ease-out 2s"
    if (cant >= 0) {

        contGif.innerHTML = "";
        //console.log ("valor n " + cont);
        gifTrendings(3, cant)
    }
}

