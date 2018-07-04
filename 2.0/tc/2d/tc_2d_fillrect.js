///////////////////////////
// Test console
///////////////////////////
var canvas = tbplay.createCanvas();
var ctx = canvas.getContext("2d");

var ratio = tbplay.devicePixelRatio;

ctx.fillStyle = 'red';
ctx.fillRect(10,200*ratio,100*ratio,50*ratio);


