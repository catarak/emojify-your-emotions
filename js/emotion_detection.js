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

  this.maxEmotion = "happy";

  this.overlay = document.getElementById('overlay');
  this.overlayCC = this.overlay.getContext('2d');
}

ClmTracker.prototype.startVideo = function() {
  var video = document.getElementById("videoElement");
  this.ctracker.start(video);
}

ClmTracker.prototype.update = function() {
  this.currentParams = this.ctracker.getCurrentParameters();
}

ClmTracker.prototype.drawEmoji = function() {
  var er = this.ec.meanPredict(this.currentParams);
  //this.maxEmotion = null;
  var maxVal = 0.3;
  if (er.length > 0) {
    var _this = this;
    var maxEr = _.max(er, function(item) { return item.value });
    if (maxEr.value > maxVal) {
      this.maxEmotion = maxEr.emotion;
    }
    console.log(this.maxEmotion);
  }

  this.overlayCC.clearRect(0, 0, 500, 375);

  var positions = this.ctracker.getCurrentPosition();
  if (positions) {
    //maybe need to not use this.maxEmotiom?
    var imgWidth = (positions[13][0] - positions[1][0]) * 1.20;
    var centerX = positions[62][0];
    var centerY = positions[62][1];
    var img = document.getElementById(this.maxEmotion);
    this.overlayCC.drawImage(img, centerX - imgWidth/2, centerY - imgWidth/2, imgWidth, imgWidth);
    this.ctracker.draw(this.overlay);
  }
}
