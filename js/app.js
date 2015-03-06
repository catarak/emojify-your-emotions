var clmTracker;
var webcam;
var fps = 60;
var fpsInterval = 1000/fps;
var then;

$(function() {
  init();

  $("#start-button").click(function(e) {
    clmTracker.startVideo();
    then = Date.now();
    loop();
  });
});

function init() {
  clmTracker = new ClmTracker();
  clmTracker.init();
}

function loop() {
  requestAnimationFrame(loop); 
  var now = Date.now();
  var elapsed = now - then;

  clmTracker.update();

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    //other stuff
    clmTracker.drawEmoji();
    clmTracker.clear();
  }
}