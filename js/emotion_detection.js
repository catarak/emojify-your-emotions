function ClmTracker() {
  //this.init();
}

ClmTracker.prototype.init = function() {
  this.ctracker = new clm.tracker({
      useWebGL: true
  });
  this.ctracker.init(pModel);

  this.ec = new emotionClassifier();
  this.ec.init(emotionModel);
  this.emotionData = this.ec.getBlank();

  this.maxEmotion = null;
}

ClmTracker.prototype.startVideo = function() {
  var video = document.getElementById("videoElement");
  this.ctracker.start(video);
}

ClmTracker.prototype.update = function() {
  var params = this.ctracker.getCurrentParameters();
  var er = this.ec.meanPredict(params);
  this.maxEmotion = null;
  var maxVal = 0.3;
  if (er.length > 0) {
    var _this = this;
    er.forEach(function (item) {
      if (item.value > maxVal) {
        _this.maxEmotion = item.emotion;
        maxVal = item.value;
      }
    });
  }
}
