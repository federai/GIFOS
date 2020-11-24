const apiKey = "Uc1F9kfal68vQWzdRi60gLKD2i59hyw0";
var video = document.getElementById("video")
var titlemygif = document.getElementById("titlemygif");
var subtitle = document.getElementById("subtitle");
var firststep = document.getElementById("firststep");
var secondstep = document.getElementById("secondstep");
var thirdstep = document.getElementById("thirdstep");
var button_start = document.getElementById("buttonstart");
var button_record = document.getElementById("buttonrecord");
var button_end = document.getElementById("buttonend");
var button_upload = document.getElementById("buttonupload");
var gifo_grabado = document.getElementById("gifograbado");
var repeatcapture = document.getElementById("repeat");
var containercamara = document.getElementById("activecamara");
var overlayGifUpload = document.getElementById("overlaygifupload");
var logoupload = document.getElementById("logoupload");
var logouploadsuccess = document.getElementById("logosuccess");
var titleupload = document.getElementById("titleupload");
var titleuploadsuccess = document.getElementById("titleuploadsuccess");
var counter_recording = document.getElementById("counter_recording");
var downloadmygifo = document.getElementById("downloadmygifo");
var linkmygifo = document.getElementById("linkmygifo");
var buttonsgifupload = document.getElementById("buttonsgifupload");

let form = new FormData();

function getStreamAndRecord() {
  firststep.classList.add("stepactive");
  titlemygif.innerHTML = '¿Nos das acceso a tu cámara?';
  subtitle.innerHTML = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.'
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: { max: 480 },
      width: { max: 480 }
    }

  })

    .then(function (stream) {
      document.getElementById("containertitle").style.display = "none";
      containercamara.style.display = "flex";
      button_start.style.display = "none";
      button_record.style.display = "unset";
      video.srcObject = stream;
      video.play();

      recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log('started')
        },
      });

    });
}

button_record.addEventListener("click", grabarGif);

function grabarGif() {
  counter_recording.style.display="unset";
  recorder.startRecording();
  button_record.style.display = "none";
  button_end.style.display = "unset";
  firststep.classList.remove("stepactive");
  secondstep.classList.add("stepactive");

  dateStarted = new Date().getTime();

  (function looper() {
    if (!recorder) {
      /*Validar*/
      return;
    }
    /*Iniciar contador*/
    counter_recording.innerHTML = calculateTimeDuration(
      (new Date().getTime() - dateStarted) / 1000
    );
    setTimeout(looper, 1000);
  })();
}




button_end.addEventListener("click", stopgifrecording);

function stopgifrecording() {
  counter_recording.style.display="none"
  repeatcapture.style.display = "unset";
  button_end.style.display = "none";
  button_upload.style.display = "unset";
  recorder.stopRecording(function () {
    video.style.display = "none";


    blob = recorder.getBlob();
    gifo_grabado.src = URL.createObjectURL(recorder.getBlob());
    gifo_grabado.style.display = "unset";

    form.append("file", recorder.getBlob(), "myGifo.gif");
    form.append("api_key", apiKey);

  })

}

/*calcular duración*/
function calculateTimeDuration(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return hr + ":" + min + ":" + sec;
}

button_upload.addEventListener("click", upload);

function upload() {
  button_upload.style.display="none";
  secondstep.classList.remove("stepactive");
  thirdstep.classList.add("stepactive");
  overlayGifUpload.style.display="unset";
  repeatcapture.style.display="none";
  fetch(`https://upload.giphy.com/v1/gifs`, {
    method: "POST",
    body: form,
  })
    .then((response) => {
      return response.json();
    })
    .then((gifo) => {
      logoupload.style.display="none";
      titleupload.style.display="none";
      logouploadsuccess.style.display="unset";
      titleuploadsuccess.style.display="unset";
      buttonsgifupload.style.display="unset";
      var myGifoId = gifo.data.id;
      linkmygifo.addEventListener("click",()=>{
        window.open("https://media.giphy.com/media/"+ myGifoId+ "/giphy.gif", "_blank");
      })
      downloadmygifo.addEventListener("click",()=>{
        downloadGif(myGifoId);
      });
      misgifos = localStorage.getItem('misgifos');
      if (misgifos == null) {
        misgifos = [];
      } else {
        misgifos = JSON.parse(misgifos);
      }
      misgifos.push(myGifoId);
      
      localStorage.setItem('misgifos', JSON.stringify(misgifos));

    })
   
};


downloadmygifo.addEventListener("click",()=>{
  // misgifos = localStorage.getItem('misgifos');
  // misgifos = JSON.parse(misgifos);
  // misgifossize = misgifos.length;
  // var gifagregado = misgifos[misgifossize-1];
  downloadGif(gifagregado);
});


repeatcapture.addEventListener("click", repeat);

function repeat() {

  recorder.clearRecordedData();
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: { max: 480 }
    }

  })
    .then(function (stream) {
      repeatcapture.style.display="none"
      document.getElementById("containertitle").style.display = "none";
      gifo_grabado.style.display = "none";
      video.style.display = "unset";
      containercamara.style.display = "flex";
      button_record.style.display = "unset";
      button_upload.style.display = "none";
      video.srcObject = stream;
      video.play();

      recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log('started')
        },
      });
    });
}


