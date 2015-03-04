var Webcam = {
  init: function() {
    this.video = document.querySelector("#videoElement");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {       
      navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

    var _this = this;

    function handleVideo(stream) {
      _this.video = document.querySelector("#videoElement");
      _this.video.src = window.URL.createObjectURL(stream);
      _this.video.play();
    }

    function videoError(e) {
      alert("Ur camera is fucked lol");
    }
  }
}

Webcam.init();