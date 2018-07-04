/******************************************************************************
 *
 * WX Mini Game Adapter
 *
******************************************************************************/
var WX_GAME_ENV = typeof tbplay !== 'undefined';
var WX_GAME_DEVTOOLS = false;
var SystemInfo = null;
var MainCanvas = null;

// if (WX_GAME_ENV) {
//   // SystemInfo = tbplay.getSystemInfoSync();
//   // if (SystemInfo.platform == "devtools")
//   //   WX_GAME_DEVTOOLS = true;

//   // console.log("Game run in wx mini game env, devtools:" +  WX_GAME_DEVTOOLS
//   //   + ", window:" + SystemInfo.windowWidth + "x" + SystemInfo.windowHeight
//   //   + ", pixelRatio:" + SystemInfo.pixelRatio
//   //   + ", screen:" + SystemInfo.screenWidth + "x" + SystemInfo.screenHeight
//   //   + ", window " + typeof window + ", runtime " + typeof runtime);
// } else {
//   // console.log("Game run in browser env, window:"
//   //   + window.outerWidth + "x" + window.outerHeight
//   //   + ", dpr:" + window.devicePixelRatio
//   //   + ", screen:" + window.screen.width + "x" + window.screen.height);
// }

function IsWxGameEnv() { return WX_GAME_ENV; }
function IsWxGameDevTools() { return WX_GAME_DEVTOOLS; }

// Fxxk, wx performance.now return microsecond in device,
// return millisecond in devtools, we return millisecond in here!
function Now() {
  if (WX_GAME_ENV) {
    if (WX_GAME_DEVTOOLS){
      return runtime.getPerformanceNow();
    }
    else{
      return runtime.getPerformanceNow() / 1000;
    }
  } else {
    return performance.now();
  }
}

function CreateImage() {
  if (WX_GAME_ENV) {
    return tbplay.createImage();
  } else {
    return new Image();
  }
}

function GetMainCanvas(domId) {
  function GetMainCanvasImpl(domId) {
    console.log("-----------------1--1");

    if (WX_GAME_ENV) {
          console.log("-----------------1--2");
// 
      // if (typeof window === undefined && window != null && window.canvas != null){
      //       console.log("-----------------1--3");

      //   return window.canvas;
      // }
      // else{
            // console.log("-----------------1--4");

        return tbplay.createCanvas();
      // }
    } else {
      return document.getElementById(domId);
    }
  }

  if (MainCanvas != null)
    return MainCanvas;

  MainCanvas = GetMainCanvasImpl(domId);
  return MainCanvas;
}

function GetWindowSize() {
  var windowWidth = 0;
  var windowHeight = 0;
  if (WX_GAME_ENV) {
    windowWidth = SystemInfo.windowWidth;
    windowHeight = SystemInfo.windowHeight;
  } else {
    windowWidth = window.outerWidth;
    windowHeight = window.outerHeight;
  }
  return {"width":windowWidth, "height":windowHeight}
}

function GetWindowSizeInPx() {
  var windowWidth = 0;
  var windowHeight = 0;
  var dpr = 0;

  if (WX_GAME_ENV) {
    // windowWidth = SystemInfo.windowWidth;
    // windowHeight = SystemInfo.windowHeight;
    // dpr = SystemInfo.pixelRatio;
    windowWidth = tbplay.screenWidth;
    windowHeight = tbplay.screenHeight;
    dpr = tbplay.devicePixelRatio;

  } else {
    windowWidth = window.outerWidth;
    windowHeight = window.outerHeight;
    dpr = window.devicePixelRatio;
  }

  var windowWidthPx = windowWidth * dpr;
  var windowHeightPx = windowHeight * dpr;

  if (Math.abs(windowWidthPx - 1080) < dpr) {
    windowWidthPx = 1080;
  } else if (Math.abs(windowWidthPx - 1440) < dpr) {
    windowWidthPx = 1440;
  }

  if (Math.abs(windowHeightPx - 1920) < dpr) {
    windowHeightPx = 1920;
  } else if (Math.abs(windowHeightPx - 2560) < dpr) {
    windowHeightPx = 2560;
  }

  return {"width":windowWidthPx, "height":windowHeightPx}
}

function GetCanvasSizeUseWindowRatio(width) {
  var windowSize = GetWindowSizeInPx();
  var height = Math.round(width * windowSize.height / windowSize.width);
  return {"width":width, "height":height}
}

var TimeUtil = {
  startTime: Now(),
  getTimer: function() { 
    return Now() - TimeUtil.startTime; 
  }
}

function FPSMeter() {
  var lastFrameTime = TimeUtil.getTimer();
  var lastSampledTime = TimeUtil.getTimer();
  var sampleFrames = 0;
  var framerate = 0;
  var timeDeltaS = 0.1;

  this.formatNumber = function (val) {
    //format as XX.XX
    return Math.floor(val*100)/100;
  }

  this.update = function() {
    timeDeltaS = (TimeUtil.getTimer() - lastFrameTime) / 1000;
    lastFrameTime = TimeUtil.getTimer();
    // console.log("====lastFrameTime===:"+lastFrameTime+",===timeDeltaS"+timeDeltaS);

    if (++sampleFrames >= 600) {
      framerate = this.getFramerate();
      var frames = sampleFrames;
      sampleFrames = 0;
      lastSampledTime = TimeUtil.getTimer();
      return {"framerate": framerate, "frames": frames};
    }
    return {"framerate": 0};
  }

  this.getFramerate = function() {
    var diff = TimeUtil.getTimer() - lastSampledTime;
    var rawFPS = sampleFrames/(diff/1000);
      // console.log("====rawFPS===:"+rawFPS);
    var sampleFPS = this.formatNumber(rawFPS);
    return sampleFPS;
  }

  this.getTimeDelta = function() {
    return timeDeltaS;
  }
}

var wxhelper = {
  IsWxGameEnv,
  IsWxGameDevTools,
  Now,
  CreateImage,
  GetMainCanvas,
  GetWindowSize,
  GetWindowSizeInPx,
  GetCanvasSizeUseWindowRatio,
  TimeUtil,
  FPSMeter,
};


console.log("-----------------1");
/*if (typeof window !== 'undefined') {
  window.wxhelper = wxhelper;
} else*/ if (typeof runtime !== 'undefined') {
  console.log("-----------------2");

  runtime.wxhelper = wxhelper;
  runtime.window = runtime;
  // window.top = runtime.parent = window;
} else {
  console.log("Cannot find any runtime object!");
}


