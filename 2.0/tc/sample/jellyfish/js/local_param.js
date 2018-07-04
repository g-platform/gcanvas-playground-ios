function LocalParam(){
  this.camera = new Object;
  this.camera.near = 5;
  this.camera.far = 530;
  this.camera.fov = 27;

  this.camera.rotate = [-0.3,0,0];
  this.camera.translate = [0,0,-280];
  this.camera.eye = [0,0,-64];

  this.LODBias = 8.0;
  this.millis = 0.0;
  this.elapsed = 1.0;
  this.timeNow = 0.0;
  this.currentTime = 0.0;
  this.lastTime = 0.0;
  this.fps = 60.0;
  this.fpsAverage = 60.0;
  this.cycle32 = 0.0;
}

module.exports = LocalParam;
