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

  this.clear();
}

ClmTracker.prototype.startVideo = function() {
  var video = document.getElementById("videoElement");
  this.ctracker.start(video);
}

ClmTracker.prototype.update = function() {
  this.windowCycles += 1;

  var params = this.ctracker.getCurrentParameters();
  var _this = this;
  this.averageParams = _.map(this.averageParams, function(param, i) {
    return (param + params[i])/_this.windowCycles;
  });
}

ClmTracker.prototype.drawEmoji = function() {
  var er = this.ec.meanPredict(this.averageParams);
  //this.maxEmotion = null;
  var maxVal = 0.3;
  if (er.length > 0) {
    var _this = this;
    var maxEr = _.max(er, function(item) { return item.value });
    this.maxEmotion = maxEr.emotion;
    console.log(this.maxEmotion);
  }

  this.overlayCC.clearRect(0, 0, 500, 375);

  var positions = this.ctracker.getCurrentPosition();
  if (positions) {
    //maybe need to not use this.maxEmotiom?
    var img = document.getElementById(this.maxEmotion);
    this.overlayCC.drawImage(img, positions[62][0] - 80, positions[62][1]- 80);
    //this.ctracker.draw(this.overlay);
  }
}

ClmTracker.prototype.clear = function() {
  this.windowCycles = 0;
  this.averageParams = Array.apply(null, Array(24)).map(function() { return 0.0 });
}
