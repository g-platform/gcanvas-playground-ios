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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guimark3_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guimark3_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__guimark3_js__);









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
	this.color = "";
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

var STAGE = { width:1080, height:1920 };
var FRAMERATE = 60;
var context = null;
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
var boids = [];

function init() {
	canvas = runtime.wxhelper.GetMainCanvas("world");

	var windowSize = runtime.wxhelper.GetWindowSizeInPx();
	canvas.width = windowSize.width;
	canvas.height = windowSize.height;

	STAGE.width = windowSize.width;
	STAGE.height = windowSize.height;

	if (canvas && canvas.getContext) {
		//setup page
		context = canvas.getContext('2d');

		//initialize test variables
		createBoids();

		// raf to start the render loop
		requestAnimationFrame(loop);
	}
	console.log("GM3 Compute init, canvas " + canvas.width + "x" + canvas.height);
}

function createBoids(){
	for (var i = 0;i < config.numBoids; i++){
		var boid = new Boid();
		boid.color = "rgb("+Math.floor(random(100, 255))
			+","+Math.floor(random(100, 255))+","+Math.floor(random(100, 255))+")";
		boid.edgeBehavior = Boid.EDGE_BOUNCE;
		boid.maxForce = random(config.minForce, config.maxForce);
		boid.maxForceSQ = boid.maxForce*boid.maxForce;
		boid.maxSpeed = random(config.minSpeed, config.maxSpeed);
		boid.maxSpeedSQ = boid.maxSpeed*boid.maxSpeed;
		boid.wanderDistance = random(config.minWanderDistance,
			config.maxWanderDistance);
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
	context.fillStyle = "rgb(50,50,50)";
  	context.fillRect(0, 0, STAGE.width, STAGE.height);


	for (var i = 0;i < boids.length; i++){
		var boid = boids[i];
		boid.wander(0.3);
		// Add a mild attraction to the centre to keep them on screen
		boid.seek(boid.boundsCentre, 0.1);
		// Flock
		//boid.flock(boids);
		boid.update();

		if(drawEnabled) {
			context.strokeStyle = boid.color;
			context.beginPath();
			context.moveTo(boid.oldPosition.x, boid.oldPosition.y);
			context.lineTo(boid.position.x, boid.position.y);
			context.closePath();
			context.stroke();
			++drawCount;
		}
	}
	var result = meter.update();
	if (result.framerate > 0) {
		var framedrawcount = drawCount / result.frames;
		drawCount = 0;
		console.log("GM3 Compute framerate: " + result.framerate
			+ "fps, draw line per frame: " + framedrawcount);
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