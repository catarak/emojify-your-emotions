var clmTracker;
var webcam;

$(function() {
  init();

  $("#start-button").click(function(e) {
    $(this).hide();
    clmTracker.startVideo();
    loop();
  });
});

function init() {
  clmTracker = new ClmTracker();
  clmTracker.init();
}

function loop() {
  requestAnimationFrame(loop); 
  clmTracker.update();
  clmTracker.drawEmoji();
}