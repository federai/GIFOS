function trendings() {
    var urlTrendings = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    fetch(urlTrendings)
        .then(r => r.json())
        .then((rsp) => {
            console.log(rsp);
            var contTrendings = document.getElementById("TT");
            for (i = 0; i < 5; i++) {
                var txt = `<div class="mostsearch" id="mostsearch" onclick="clickTT('${rsp.data[i]}')">
                ${rsp.data[i]},
                </div>`;
                contTrendings.insertAdjacentHTML("afterbegin", txt);
            }

        })
};
trendings();

function clickTT(a) {
    search(a);
    clickbotonbusqueda();

}