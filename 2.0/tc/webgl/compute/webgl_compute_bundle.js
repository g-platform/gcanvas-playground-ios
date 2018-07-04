/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wxhelper_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wxhelper_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__wxhelper_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Vector3D_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Vector3D_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Vector3D_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Boid_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Boid_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Boid_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webgl_utils_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webgl_utils_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__webgl_utils_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webgl_debug_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webgl_debug_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__webgl_debug_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cuon_utils_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cuon_utils_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__cuon_utils_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__guimark3_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__guimark3_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__guimark3_js__);













/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
    console.log("======1");
  if (WX_GAME_ENV) {
      console.log("======1.1");

    // windowWidth = SystemInfo.windowWidth;
    // windowHeight = SystemInfo.windowHeight;
    // dpr = SystemInfo.pixelRatio;
    windowWidth = tbplay.screenWidth;
    windowHeight = tbplay.screenHeight;
    dpr = tbplay.devicePixelRatio;
      console.log("w:"+windowWidth+",h:"+windowHeight+",dpr:"+dpr)
      
  } else {
      console.log("======1.2");

    windowWidth = window.outerWidth;
    windowHeight = window.outerHeight;
    dpr = window.devicePixelRatio;
  }

  var windowWidthPx = windowWidth * dpr;
  var windowHeightPx = windowHeight * dpr;

    console.log("windowWidthPx:"+windowWidthPx+",windowHeightPx:"+windowHeightPx)

    
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




/***/ }),
/* 2 */
/***/ (function(module, exports) {

// JavaScript Document
window.Vector3D = function Vector3D(x, y, z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}
Vector3D.distance = function(vector1, vector2){
	var xdiff = vector1.x - vector2.x;
	var ydiff = vector1.y - vector2.y;
	var zdiff = vector1.z - vector2.z;
	return Math.sqrt((xdiff * xdiff) + (ydiff * ydiff) + (zdiff * zdiff));
}
Vector3D.prototype.length = function(){
	return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
}
Vector3D.prototype.lengthSquared = function(){
	return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
}
Vector3D.prototype.normalize = function(){
	var len = this.length();
	this.x /= len;
	this.y /= len;
	this.z /= len;
	return len;
}
Vector3D.prototype.incrementBy = function(vector3d){
	this.x += vector3d.x;
	this.y += vector3d.y;
	this.z += vector3d.z;
}
Vector3D.prototype.decrementBy = function(vector3d){
	this.x -= vector3d.x;
	this.y -= vector3d.y;
	this.z -= vector3d.z;
}
Vector3D.prototype.scaleBy = function(scalar){
	this.x *= scalar;
	this.y *= scalar;
	this.z *= scalar;
}
Vector3D.prototype.negate = function(){
	this.x *= -1;
	this.y *= -1;
	this.z *= -1;
}
Vector3D.prototype.equals = function(vector3d){
	return this.x == vector3d.x && this.y == vector3d.y && this.z == vector3d.z;
}
Vector3D.prototype.clone = function(){
	return new Vector3D(this.x, this.y, this.z);
}
Vector3D.prototype.add = function(vector3d){
	return new Vector3D(this.x+vector3d.x, this.y+vector3d.y, this.z+vector3d.z);
}
Vector3D.prototype.subtract = function(vector3d){
	return new Vector3D(this.x-vector3d.x, this.y-vector3d.y, this.z-vector3d.z);
}
Vector3D.prototype.fastSubtract = function(vector3d, toCache){
	toCache.x = this.x-vector3d.x;
	toCache.y = this.y-vector3d.y;
	toCache.z = this.z-vector3d.z;
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// JavaScript Document

window.Boid = function Boid( maxForce, maxSpeed, edgeBehavior ) {
	this.color_r = 0;
	this.color_g = 0;
	this.color_b = 0;
	this.maxForce = maxForce || 1;
	this.maxForceSQ = this.maxForce*this.maxForce;
	this.maxSpeed = maxSpeed || 10;
	this.maxSpeedSQ = this.maxSpeed*this.maxSpeed;
	this.edgeBehavior = edgeBehavior || Boid.EDGE_NONE;
	
	this.boundsCentre = new Vector3D();
	this.radius = 10.0;
	this.wanderTheta = 0.0;
	this.wanderPhi = 0.0;
	this.wanderPsi = 0.0;
	this.wanderRadius = 16.0;
	this.wanderDistance = 60.0;
	this.wanderStep = 0.25;
	this.lookAtTarget = true;
		
	this.reset();
	
}

Boid.EDGE_BOUNCE = 1;
Boid.EDGE_WRAP = 2;
Boid.EDGE_NONE = 0;
Boid.ZERO = new Vector3D(0, 0, 0);

/**
 * Resets the Boid's position, velocity, acceleration and 
 * current steering force to zero
 */

Boid.prototype.reset = function() {
	this.velocity = new Vector3D();
	this.position = new Vector3D();
	this.oldPosition = new Vector3D();
	this.acceleration = new Vector3D();
	this.steeringForce = new Vector3D();
}
/**
 * Generates a random wandering force for the Boid. 
 * The results of this method can be controlled by the 
 * _wanderDistance, _wanderStep and _wanderRadius parameters
 * 
 * @param	multiplier
 * 
 * By multiplying the force generated by this behavior, 
 * more or less weight can be given to this behavior in
 * comparison to other behaviors being calculated by the 
 * Boid. To increase the weighting of this behavior, use 
 * a number above 1.0, or to decrease it use a number 
 * below 1.0
 */

Boid.prototype.wander = function( multiplier) {
	//multiplier = multiplier || 1;
	
	this.wanderTheta += -this.wanderStep + Math.random() * this.wanderStep * 2;
	this.wanderPhi += -this.wanderStep + Math.random() * this.wanderStep * 2;
	this.wanderPsi += -this.wanderStep + Math.random() * this.wanderStep * 2;
	
	if ( Math.random() < 0.5 )
	{
		this.wanderTheta = -this.wanderTheta;
	}
	
	var pos = this.velocity.clone();
	
	pos.normalize();
	pos.scaleBy(this.wanderDistance);
	pos.incrementBy(this.position);
	
	var offset = new Vector3D();
	
	offset.x = this.wanderRadius * Math.cos(this.wanderTheta);
	offset.y = this.wanderRadius * Math.sin(this.wanderPhi);
	offset.z = this.wanderRadius * Math.cos(this.wanderPsi);
	
	this.steeringForce = this.steer(pos.add(offset));
	
	if ( multiplier != 1.0 )
	{
		this.steeringForce.scaleBy(multiplier);
	}
	
	this.acceleration.incrementBy(this.steeringForce);
	
}
/**
 * Seeks the Boid towards the specified target
 * 
 * @param	target
 * 
 * The target for the Boid to seek
 * 
 * @param	multiplier
 * 
 * By multiplying the force generated by this behavior, 
 * more or less weight can be given to this behavior in
 * comparison to other behaviors being calculated by the 
 * Boid. To increase the weighting of this behavior, use 
 * a number above 1.0, or to decrease it use a number 
 * below 1.0
 */

Boid.prototype.seek = function( target, multiplier ) {
	this.steeringForce = this.steer(target);
	if ( multiplier != 1 ) {
		this.steeringForce.scaleBy(multiplier);
	}
	this.acceleration.incrementBy(this.steeringForce);
}

/**
 * Use this method to simulate flocking movement in a 
 * group of Boids. Flock will combine the separate, 
 * align and cohesion steering behaviors to produce 
 * the flocking effect. Adjusting the weighting of each 
 * behavior, as well as the distance values for each 
 * can produce distinctly different flocking behaviors
 * 
 * @param	boids
 * 
 * An Array of Boids to consider when calculating the 
 * flocking behavior
 * 
 * @param	separationWeight
 * 
 * The weighting given to the separation behavior
 * 
 * @param	alignmentWeight
 * 
 * The weighting given to the alignment bahavior
 * 
 * @param	cohesionWeight
 * 
 * The weighting given to the cohesion bahavior
 * 
 * @param	separationDistance
 * 
 * The distance which each Boid will attempt to maintain
 * between itself and any other Boid in the flock
 * 
 * @param	alignmentDistance
 * 
 * If another Boid is within this distance, this Boid will 
 * consider the other Boid's heading when adjusting it's own
 * 
 * @param	cohesionDistance
 * 
 * If another Boid is within this distance, this Boid will 
 * consider the other Boid's position when adjusting it's own
 * 
 * @param	multiplier
 * 
 * By multiplying the force generated by this behavior, 
 * more or less weight can be given to this behavior in
 * comparison to other behaviors being calculated by the 
 * Boid. To increase the weighting of this behavior, use 
 * a number above 1.0, or to decrease it use a number 
 * below 1.0
 */

Boid.prototype.flock = function( boids , separationWeight, alignmentWeight, cohesionWeight, separationDistance, alignmentDistance, cohesionDistance ) {
	separationWeight = separationWeight || 0.5;
	alignmentWeight = alignmentWeight || 0.1;
	cohesionWeight = cohesionWeight || 0.2;
	separationDistance = separationDistance || 100;
	alignmentDistance = alignmentDistance || 200;
	cohesionDistance = cohesionDistance || 200;
	
	this.separate(boids, separationDistance, separationWeight);
	this.align(boids, alignmentDistance, alignmentWeight);
	this.cohesion(boids, cohesionDistance, cohesionWeight);
}

/**
 * Separation will attempt to ensure that a certain distance 
 * is maintained between any given Boid and others in the flock
 * 
 * @param	boids
 * 
 * An Array of Boids to consider when calculating the behavior
 * 
 * @param	separationDistance
 * 
 * The distance which the Boid will attempt to maintain between 
 * itself and any other Boid in the flock
 * 
 * @param	multiplier
 * 
 * By multiplying the force generated by this behavior, 
 * more or less weight can be given to this behavior in
 * comparison to other behaviors being calculated by the 
 * Boid. To increase the weighting of this behavior, use 
 * a number above 1.0, or to decrease it use a number 
 * below 1.0
 */

Boid.prototype.separate = function( boids, separationDistance, multiplier) {
	this.steeringForce = this.getSeparation(boids, separationDistance);
	
	if ( multiplier != 1.0 ) {
		this.steeringForce.scaleBy(multiplier);
	}
	
	this.acceleration.incrementBy(this.steeringForce);
}
/**
 * Align will correct the Boids heading in order for it 
 * to point in the average direction of the flock
 * 
 * @param	boids
 * 
 * An Array of Boids to consider when calculating the behavior
 * 
 * @param	neighborDistance
 * 
 * If another Boid is within this distance, this Boid will 
 * consider the other Boid's heading when adjusting it's own
 * 
 * @param	multiplier
 * 
 * By multiplying the force generated by this behavior, 
 * more or less weight can be given to this behavior in
 * comparison to other behaviors being calculated by the 
 * Boid. To increase the weighting of this behavior, use 
 * a number above 1.0, or to decrease it use a number 
 * below 1.0
 */

Boid.prototype.align = function( boids, neighborDistance, multiplier ) {
	this.steeringForce = this.getAlignment(boids, neighborDistance);
	
	if ( multiplier != 1.0 ) {
		this.steeringForce.scaleBy(multiplier);
	}
	
	this.acceleration.incrementBy(this.steeringForce);
}

/**
 * Cohesion will attempt to make all Boids in the flock converge 
 * on a point which lies at the centre of the flock
 * 
 * @param	boids
 * 
 * An Array of Boids to consider when calculating the behavior
 * 
 * @param	neighborDistance
 * 
 * If another Boid is within this distance, this Boid will 
 * consider the other Boid's position when adjusting it's own
 * 
 * @param	multiplier
 * 
 * By multiplying the force generated by this behavior, 
 * more or less weight can be given to this behavior in
 * comparison to other behaviors being calculated by the 
 * Boid. To increase the weighting of this behavior, use 
 * a number above 1.0, or to decrease it use a number 
 * below 1.0
 */

Boid.prototype.cohesion = function( boids, neighborDistance, multiplier ) {
	this.steeringForce = this.getCohesion(boids, neighborDistance);
	
	if ( multiplier != 1.0 ) {
		this.steeringForce.scaleBy(multiplier);
	}
	
	this.acceleration.incrementBy(this.steeringForce);
}

/**
 * After calling one or more of the Boid's steering methods, 
 * call the update method in order to set the Boid's position 
 * in relation to the force being applied to it as a result of 
 * it's steering behaviors. If the Boid's edgeBehavior property 
 * is anything other than EDGE_NONE (no edge behavior) then the 
 * Boid's position will be modified accordingly after the 
 * steering forces have been applied
 */

Boid.prototype.update = function() {
	this.oldPosition.x = this.position.x;
	this.oldPosition.y = this.position.y;
	this.oldPosition.z = this.position.z;
	
	this.velocity.incrementBy(this.acceleration);
	
	if ( this.velocity.lengthSquared() > this.maxSpeedSQ )
	{
		this.velocity.normalize();
		this.velocity.scaleBy(this.maxSpeed);
	}
	
	this.position.incrementBy(this.velocity);
	
	this.acceleration.x = 0;
	this.acceleration.y = 0;
	this.acceleration.z = 0;
	
	if( !this.position.equals(this.oldPosition) ) {
		var distance = Vector3D.distance(this.position, this.boundsCentre);
		
		if( distance > this.boundsRadius + this.radius ) {
			
			if( this.edgeBehavior == Boid.EDGE_BOUNCE ){
				
				this.position.decrementBy(this.boundsCentre);
				this.position.normalize();
				this.position.scaleBy(this.boundsRadius + this.radius);
				
				this.velocity.scaleBy(-1);
				this.position.incrementBy(this.velocity);
				this.position.incrementBy(this.boundsCentre);
				
			}else{

				this.position.decrementBy(this.boundsCentre);
				this.position.negate();
				this.position.incrementBy(this.boundsCentre);

			}
		}
	}
}




// private methods

Boid.prototype.steer = function( target, ease, easeDistance) {
	
	ease = ease || false;
	easeDistance = easeDistance || 100;
	
	this.steeringForce = target.clone();
	this.steeringForce.decrementBy(this.position);
	
	this.distance = this.steeringForce.normalize();

	if ( this.distance > 0.00001 ) {
		if ( this.distance < easeDistance && ease ) {
			this.steeringForce.scaleBy(this.maxSpeed * ( this.distance / easeDistance ));
		} else {
			this.steeringForce.scaleBy(this.maxSpeed);
		}
		
		this.steeringForce.decrementBy(this.velocity);
		if ( this.steeringForce.lengthSquared() > this.maxForceSQ ) {
			this.steeringForce.normalize();
			this.steeringForce.scaleBy(this.maxForce);
		}
	}
	return this.steeringForce;
}

Boid.prototype.getSeparation = function( boids, separation) {
	var force = new Vector3D();
	var difference = new Vector3D();
	var distance;
	var count = 0;
	var boid;
	
	for (var i = 0; i < boids.length; i++) 
	{
		boid = boids[i];
		
		distance = Vector3D.distance(this.position, boid.position);
		
		if ( distance > 0 && distance < separation )
		{
			this.position.fastSubtract(boid.position, difference);
			difference.normalize();
			difference.scaleBy(1 / distance);
			
			force.incrementBy(difference);
			count++;
		}
	}
	
	if ( count > 0 )
	{
		force.scaleBy(1 / count);
	}
	
	return force;
}

Boid.prototype.getAlignment = function( boids, neighborDistance ) {
	var force = new Vector3D();
	var distance;
	var count = 0;
	var boid;
	
	for (var i = 0; i < boids.length; i++) 
	{
		boid = boids[i];
		distance = Vector3D.distance(this.position, boid.position);
		
		if ( distance > 0 && distance < neighborDistance )
		{
			force.incrementBy(boid.velocity);
			count++;
		}
	}
	
	if ( count > 0 )
	{
		force.scaleBy(1 / count);
		
		if ( force.lengthSquared() > this.maxForceSQ )
		{
			force.normalize();
			force.scaleBy(this.maxForce);
		}
	}
	
	return force;
}

Boid.prototype.getCohesion = function( boids, neighborDistance ) {
	var force = new Vector3D();
	var distance;
	var count = 0;
	var boid;
	
	for (var i = 0; i < boids.length; i++) {
		boid = boids[i];
		distance = Vector3D.distance(this.position, boid.position);
		
		if ( distance > 0 && distance < neighborDistance ) {
			force.incrementBy(boid.position);
			count++;
		}
	}
	
	if ( count > 0 ) {
		force.scaleBy(1 / count);
		force = this.steer(force);
		
		return force;
	}
	
	return force;
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimationFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

window.WebGLUtils = function() {

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
var makeFailHTML = function(msg) {
  return '' +
        '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
  return '' +
    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
    '<td align="center">' +
    '<div style="display: table-cell; vertical-align: middle;">' +
    '<div style="">' + msg + '</div>' +
    '</div>' +
    '</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' +
  'This page requires a browser that supports WebGL.<br/>' +
  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' +
  "It doesn't appear your computer can support WebGL.<br/>" +
  '<a href="http://get.webgl.org">Click here for more information.</a>';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} opt_attribs Any
 *     creation attributes you want to pass in.
 * @param {function:(msg)} opt_onError An function to call
 *     if there is an error during creation.
 * @return {WebGLRenderingContext} The created context.
 */
var setupWebGL = function(canvas, opt_attribs, opt_onError) {
    console.log("----setupWebGL----");

  function handleCreationError(msg) {
//      var container = document.getElementsByTagName("body")[0];
//    //var container = canvas.parentNode;
//    if (container) {
//      var str = window.WebGLRenderingContext ?
//           OTHER_PROBLEM :
//           GET_A_WEBGL_BROWSER;
//      if (msg) {
//        str += "<br/><br/>Status: " + msg;
//      }
//      container.innerHTML = makeFailHTML(str);
//    }
  };

  opt_onError = opt_onError || handleCreationError;

  if (canvas.addEventListener) {
    canvas.addEventListener("webglcontextcreationerror", function(event) {
          opt_onError(event.statusMessage);
        }, false);
  }
  var context = create3DContext(canvas, opt_attribs);
    console.log("----create3DContext----");
  if (!context) {
      console.log("----create3DContext fail----");
    if (!window.WebGLRenderingContext) {
      opt_onError("");
    } else {
      opt_onError("");
    }
  }
    console.log("----create3DContext success----");

  return context;
};

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
var create3DContext = function(canvas, opt_attribs) {
  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
  var context = null;
  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], opt_attribs);
    } catch(e) {}
    if (context) {
      break;
    }
  }
  return context;
}

return {
  create3DContext: create3DContext,
  setupWebGL: setupWebGL
};
}();

/**
 * Provides requestAnimationFrame in a cross browser
 * way.
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
             window.setTimeout(callback, 1000/60);
           };
  })();
}

/** * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec. 
 * 
 * Cancels an animation frame request. 
 * Checks for cross-browser support, falls back to clearTimeout. 
 * @param {number}  Animation frame request. */
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

//Copyright (c) 2009 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.

// Various functions for helping debug WebGL apps.

window.WebGLDebugUtils = function() {

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
    window.console.log(msg);
  }
};

/**
 * Which arguements are enums.
 * @type {!Object.<number, string>}
 */
var glValidEnumContexts = {

  // Generic setters and getters

  'enable': { 0:true },
  'disable': { 0:true },
  'getParameter': { 0:true },

  // Rendering

  'drawArrays': { 0:true },
  'drawElements': { 0:true, 2:true },

  // Shaders

  'createShader': { 0:true },
  'getShaderParameter': { 1:true },
  'getProgramParameter': { 1:true },

  // Vertex attributes

  'getVertexAttrib': { 1:true },
  'vertexAttribPointer': { 2:true },

  // Textures

  'bindTexture': { 0:true },
  'activeTexture': { 0:true },
  'getTexParameter': { 0:true, 1:true },
  'texParameterf': { 0:true, 1:true },
  'texParameteri': { 0:true, 1:true, 2:true },
  'texImage2D': { 0:true, 2:true, 6:true, 7:true },
  'texSubImage2D': { 0:true, 6:true, 7:true },
  'copyTexImage2D': { 0:true, 2:true },
  'copyTexSubImage2D': { 0:true },
  'generateMipmap': { 0:true },

  // Buffer objects

  'bindBuffer': { 0:true },
  'bufferData': { 0:true, 2:true },
  'bufferSubData': { 0:true },
  'getBufferParameter': { 0:true, 1:true },

  // Renderbuffers and framebuffers

  'pixelStorei': { 0:true, 1:true },
  'readPixels': { 4:true, 5:true },
  'bindRenderbuffer': { 0:true },
  'bindFramebuffer': { 0:true },
  'checkFramebufferStatus': { 0:true },
  'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
  'framebufferTexture2D': { 0:true, 1:true, 2:true },
  'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
  'getRenderbufferParameter': { 0:true, 1:true },
  'renderbufferStorage': { 0:true, 1:true },

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': { 0:true },
  'depthFunc': { 0:true },
  'blendFunc': { 0:true, 1:true },
  'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
  'blendEquation': { 0:true },
  'blendEquationSeparate': { 0:true, 1:true },
  'stencilFunc': { 0:true },
  'stencilFuncSeparate': { 0:true, 1:true },
  'stencilMaskSeparate': { 0:true },
  'stencilOp': { 0:true, 1:true, 2:true },
  'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

  // Culling

  'cullFace': { 0:true },
  'frontFace': { 0:true },
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? name :
      ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  return value.toString();
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 */
function makeDebugContext(ctx, opt_onErrorFunc) {
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        for (var ii = 0; ii < args.length; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
              glFunctionArgToString(functionName, ii, args[ii]);
        }
        log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
            "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
     } else {
       wrapper[propertyName] = ctx[propertyName];
     }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow[err]) {
        glErrorShadow[err] = false;
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

function resetToInitialState(ctx) {
  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
  var tmp = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
  for (var ii = 0; ii < numAttribs; ++ii) {
    ctx.disableVertexAttribArray(ii);
    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
    ctx.vertexAttrib1f(ii, 0);
  }
  ctx.deleteBuffer(tmp);

  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    ctx.activeTexture(ctx.TEXTURE0 + ii);
    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    ctx.bindTexture(ctx.TEXTURE_2D, null);
  }

  ctx.activeTexture(ctx.TEXTURE0);
  ctx.useProgram(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
  ctx.disable(ctx.BLEND);
  ctx.disable(ctx.CULL_FACE);
  ctx.disable(ctx.DEPTH_TEST);
  ctx.disable(ctx.DITHER);
  ctx.disable(ctx.SCISSOR_TEST);
  ctx.blendColor(0, 0, 0, 0);
  ctx.blendEquation(ctx.FUNC_ADD);
  ctx.blendFunc(ctx.ONE, ctx.ZERO);
  ctx.clearColor(0, 0, 0, 0);
  ctx.clearDepth(1);
  ctx.clearStencil(-1);
  ctx.colorMask(true, true, true, true);
  ctx.cullFace(ctx.BACK);
  ctx.depthFunc(ctx.LESS);
  ctx.depthMask(true);
  ctx.depthRange(0, 1);
  ctx.frontFace(ctx.CCW);
  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
  ctx.lineWidth(1);
  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  // TODO: Delete this IF.
  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
  }
  ctx.polygonOffset(0, 0);
  ctx.sampleCoverage(1, false);
  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
  ctx.stencilMask(0xFFFFFFFF);
  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
  ctx.viewport(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

  // TODO: This should NOT be needed but Firefox fails with 'hint'
  while(ctx.getError());
}

function makeLostContextSimulatingContext(ctx) {
  var wrapper_ = {};
  var contextId_ = 1;
  var contextLost_ = false;
  var resourceId_ = 0;
  var resourceDb_ = [];
  var onLost_ = undefined;
  var onRestored_ = undefined;
  var nextOnRestored_ = undefined;

  // Holds booleans for each GL error so can simulate errors.
  var glErrorShadow_ = { };

  function isWebGLObject(obj) {
    //return false;
    return (obj instanceof WebGLBuffer ||
            obj instanceof WebGLFramebuffer ||
            obj instanceof WebGLProgram ||
            obj instanceof WebGLRenderbuffer ||
            obj instanceof WebGLShader ||
            obj instanceof WebGLTexture);
  }

  function checkResources(args) {
    for (var ii = 0; ii < args.length; ++ii) {
      var arg = args[ii];
      if (isWebGLObject(arg)) {
        return arg.__webglDebugContextLostId__ == contextId_;
      }
    }
    return true;
  }

  function clearErrors() {
    var k = Object.keys(glErrorShadow_);
    for (var ii = 0; ii < k.length; ++ii) {
      delete glErrorShdow_[k];
    }
  }

  // Makes a function that simulates WebGL when out of context.
  function makeLostContextWrapper(ctx, functionName) {
    var f = ctx[functionName];
    return function() {
      // Only call the functions if the context is not lost.
      if (!contextLost_) {
        if (!checkResources(arguments)) {
          glErrorShadow_[ctx.INVALID_OPERATION] = true;
          return;
        }
        var result = f.apply(ctx, arguments);
        return result;
      }
    };
  }

  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper_[propertyName] = makeLostContextWrapper(ctx, propertyName);
     } else {
       wrapper_[propertyName] = ctx[propertyName];
     }
  }

  function makeWebGLContextEvent(statusMessage) {
    return {statusMessage: statusMessage};
  }

  function freeResources() {
    for (var ii = 0; ii < resourceDb_.length; ++ii) {
      var resource = resourceDb_[ii];
      if (resource instanceof WebGLBuffer) {
        ctx.deleteBuffer(resource);
      } else if (resource instanceof WebctxFramebuffer) {
        ctx.deleteFramebuffer(resource);
      } else if (resource instanceof WebctxProgram) {
        ctx.deleteProgram(resource);
      } else if (resource instanceof WebctxRenderbuffer) {
        ctx.deleteRenderbuffer(resource);
      } else if (resource instanceof WebctxShader) {
        ctx.deleteShader(resource);
      } else if (resource instanceof WebctxTexture) {
        ctx.deleteTexture(resource);
      }
    }
  }

  wrapper_.loseContext = function() {
    if (!contextLost_) {
      contextLost_ = true;
      ++contextId_;
      while (ctx.getError());
      clearErrors();
      glErrorShadow_[ctx.CONTEXT_LOST_WEBGL] = true;
      setTimeout(function() {
          if (onLost_) {
            onLost_(makeWebGLContextEvent("context lost"));
          }
        }, 0);
    }
  };

  wrapper_.restoreContext = function() {
    if (contextLost_) {
      if (onRestored_) {
        setTimeout(function() {
            freeResources();
            resetToInitialState(ctx);
            contextLost_ = false;
            if (onRestored_) {
              var callback = onRestored_;
              onRestored_ = nextOnRestored_;
              nextOnRestored_ = undefined;
              callback(makeWebGLContextEvent("context restored"));
            }
          }, 0);
      } else {
        throw "You can not restore the context without a listener"
      }
    }
  };

  // Wrap a few functions specially.
  wrapper_.getError = function() {
    if (!contextLost_) {
      var err;
      while (err = ctx.getError()) {
        glErrorShadow_[err] = true;
      }
    }
    for (var err in glErrorShadow_) {
      if (glErrorShadow_[err]) {
        delete glErrorShadow_[err];
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  var creationFunctions = [
    "createBuffer",
    "createFramebuffer",
    "createProgram",
    "createRenderbuffer",
    "createShader",
    "createTexture"
  ];
  for (var ii = 0; ii < creationFunctions.length; ++ii) {
    var functionName = creationFunctions[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return null;
        }
        var obj = f.apply(ctx, arguments);
        obj.__webglDebugContextLostId__ = contextId_;
        resourceDb_.push(obj);
        return obj;
      };
    }(ctx[functionName]);
  }

  var functionsThatShouldReturnNull = [
    "getActiveAttrib",
    "getActiveUniform",
    "getBufferParameter",
    "getContextAttributes",
    "getAttachedShaders",
    "getFramebufferAttachmentParameter",
    "getParameter",
    "getProgramParameter",
    "getProgramInfoLog",
    "getRenderbufferParameter",
    "getShaderParameter",
    "getShaderInfoLog",
    "getShaderSource",
    "getTexParameter",
    "getUniform",
    "getUniformLocation",
    "getVertexAttrib"
  ];
  for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
    var functionName = functionsThatShouldReturnNull[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return null;
        }
        return f.apply(ctx, arguments);
      }
    }(wrapper_[functionName]);
  }

  var isFunctions = [
    "isBuffer",
    "isEnabled",
    "isFramebuffer",
    "isProgram",
    "isRenderbuffer",
    "isShader",
    "isTexture"
  ];
  for (var ii = 0; ii < isFunctions.length; ++ii) {
    var functionName = isFunctions[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return false;
        }
        return f.apply(ctx, arguments);
      }
    }(wrapper_[functionName]);
  }

  wrapper_.checkFramebufferStatus = function(f) {
    return function() {
      if (contextLost_) {
        return ctx.FRAMEBUFFER_UNSUPPORTED;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.checkFramebufferStatus);

  wrapper_.getAttribLocation = function(f) {
    return function() {
      if (contextLost_) {
        return -1;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.getAttribLocation);

  wrapper_.getVertexAttribOffset = function(f) {
    return function() {
      if (contextLost_) {
        return 0;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.getVertexAttribOffset);

  wrapper_.isContextLost = function() {
    return contextLost_;
  };

  function wrapEvent(listener) {
    if (typeof(listener) == "function") {
      return listener;
    } else {
      return function(info) {
        listener.handleEvent(info);
      }
    }
  }

  wrapper_.registerOnContextLostListener = function(listener) {
    onLost_ = wrapEvent(listener);
  };

  wrapper_.registerOnContextRestoredListener = function(listener) {
    if (contextLost_) {
      nextOnRestored_ = wrapEvent(listener);
    } else {
      onRestored_ = wrapEvent(listener);
    }
  }

  return wrapper_;
}

return {
  /**
   * Initializes this module. Safe to call more than once.
   * @param {!WebGLRenderingContext} ctx A WebGL context. If
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" +
   *            funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a WebGL context returns a wrapped context that adds 4
   * functions.
   *
   * ctx.loseContext:
   *   simulates a lost context event.
   *
   * ctx.restoreContext:
   *   simulates the context being restored.
   *
   * ctx.registerOnContextLostListener(listener):
   *   lets you register a listener for context lost. Use instead
   *   of addEventListener('webglcontextlostevent', listener);
   *
   * ctx.registerOnContextRestoredListener(listener):
   *   lets you register a listener for context restored. Use
   *   instead of addEventListener('webglcontextrestored',
   *   listener);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   */
  'makeLostContextSimulatingContext': makeLostContextSimulatingContext,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();



/***/ }),
/* 6 */
/***/ (function(module, exports) {

// cuon-utils.js (c) 2012 kanda and matsuda
/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current 
 */
window.initShaders = function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
window.createProgram = function createProgram(gl, vshader, fshader) {
  // Create shader object
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
window.loadShader = function loadShader(gl, type, source) {
  // Create shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/** 
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
window.getWebGLContext = function getWebGLContext(canvas, opt_debug) {
  // Get the rendering context for WebGL
    console.log("----getWebGLContext----");
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }

  return gl;
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var STAGE = { width:1080, height:1920 };
var FRAMERATE = 60;
var gl = null;
var canvas = null;
var meter = new runtime.wxhelper.FPSMeter();
var drawCount = 0;

var config = {
	minForce:3,
	maxForce:6,
	minSpeed:6,
	maxSpeed:12,
	minWanderDistance:10,
	maxWanderDistance:100,
	minWanderRadius:5,
	maxWanderRadius:20,
	minWanderStep:0.1,
	maxWanderStep:0.9,
	numBoids:500
};

var drawEnabled = true;
var firstDraw = true;
var boids = [];

// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

var a_Position;
var a_Color;
var verticesColors;
var vertexColorBuffer;

function initVertexBuffers(gl, first) {
  // Bind the buffer object to target
  if (first) {
  	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  }

  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.DYNAMIC_DRAW);

  if (first) {
	  var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
	  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

	  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
	  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object
  }

  // Unbind the buffer object
  // gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function init(){
	canvas = runtime.wxhelper.GetMainCanvas("world");

	var windowSize = runtime.wxhelper.GetWindowSizeInPx();
   canvas.width = windowSize.width;
   canvas.height = windowSize.height;
    
    console.log("windowSize.width:"+windowSize.width+",windowSize.height:"+windowSize.height)
    
	STAGE.width = windowSize.width;
	STAGE.height = windowSize.height;

	if (canvas && canvas.getContext) {
		//setup page
		// Get the rendering context for WebGL
		gl = getWebGLContext(canvas);
		if (!gl) {
			console.log('Failed to get the rendering context for WebGL');
			return;
		}

		// Initialize shaders
		if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
			console.log('Failed to intialize shaders.');
			return;
		}

		// // Get the storage location of a_Position
		a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		if (a_Position < 0) {
			console.log('Failed to get the storage location of a_Position');
			return;
		}

		// Get the storage location of a_Color
		a_Color = gl.getAttribLocation(gl.program, 'a_Color');
		if (a_Color < 0) {
			console.log('Failed to get the storage location of a_Color');
			return;
		}

		// Specify the color for clearing <canvas>
		gl.clearColor(0.2, 0.2, 0.2, 1);

		//initialize test variables
		createBoids();

		// Allocate buffer for position and color
		verticesColors = new Float32Array(boids.length * 5);

		// Create a buffer object
		vertexColorBuffer = gl.createBuffer();
		if (!vertexColorBuffer) {
			console.log('Failed to create the buffer object');
			return false;
		}

		requestAnimationFrame(loop);
	}
	console.log("WebGL Compute init, canvas " + canvas.width + "x" + canvas.height);
}

function createBoids(){
	for (var i = 0;i < config.numBoids; i++){
		var boid = new Boid();
		boid.color_r = Math.floor(random(100, 255)) / 255;
		boid.color_g = Math.floor(random(100, 255)) / 255;
		boid.color_b = Math.floor(random(100, 255)) / 255;
		boid.edgeBehavior = Boid.EDGE_BOUNCE;
		boid.maxForce = random(config.minForce, config.maxForce);
		boid.maxForceSQ = boid.maxForce*boid.maxForce;
		boid.maxSpeed = random(config.minSpeed, config.maxSpeed);
		boid.maxSpeedSQ = boid.maxSpeed*boid.maxSpeed;
		boid.wanderDistance = random(config.minWanderDistance, config.maxWanderDistance);
		boid.wanderRadius = random(config.minWanderRadius, config.maxWanderRadius);
		boid.wanderStep = random(config.minWanderStep, config.maxWanderStep);
		boid.boundsRadius = STAGE.width/2;
		boid.boundsCentre = new Vector3D(STAGE.width/2, STAGE.height/2, 0.0);
		boid.radius = 16;
		//add positoin and velocity
		boid.position.x = boid.boundsCentre.x + random(-100, 100);
		boid.position.y = boid.boundsCentre.y + random(-100, 100);
		boid.position.z = random(-100, 100);
		var vel = new Vector3D(random(-2, 2), random(-2, 2), random(-2, 2));
		boid.velocity.incrementBy(vel);

		boids.push(boid);
	}
}

function loop() {
	for (var i = 0;i < boids.length; i++){
		var boid = boids[i];
		boid.wander(0.3);
		// Add a mild attraction to the centre to keep them on screen
		boid.seek(boid.boundsCentre, 0.1);
		// Flock
		//boid.flock(boids);
		boid.update();

		verticesColors[i * 5] = (boid.position.x - canvas.width/2)/(canvas.width/2);
		verticesColors[i * 5 + 1] =
			(canvas.height/2 - boid.position.y)/(canvas.height/2);
		verticesColors[i * 5 + 2] = boid.color_r;
		verticesColors[i * 5 + 3] = boid.color_g;
		verticesColors[i * 5 + 4] = boid.color_b;
	}

	if (drawEnabled){
		// Clear <canvas>
		gl.clear(gl.COLOR_BUFFER_BIT);

		initVertexBuffers(gl, firstDraw);
		gl.drawArrays(gl.POINTS, 0, boids.length);

		firstDraw = false;
	}

	var result = meter.update();
	if (result.framerate > 0) {
		console.log("WebGL Compute framerate: " + result.framerate + "fps");
	}
	requestAnimationFrame(loop);
}

function toggleDraw() {
	drawEnabled = !drawEnabled;
	context.fillStyle = "rgb(0,0,0)";
	context.fillRect(0, 0, STAGE.width, STAGE.height);
}

//helper classes
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// Load assets and start the game
if (runtime.wxhelper.IsWxGameEnv()) {
	init();
} else {
	window.init = init;
}



/***/ })
/******/ ]);