var gcanvas = tbplay.createCanvas();
var ctx = gcanvas.getContext('2d');

var r = tbplay.devicePixelRatio;
var w = gcanvas.width * r;
var h = gcanvas.height * r;


//image
var image = tbplay.createImage();
image.onload = function(e){
    console.log("image.width=" + image.width + ",image.height="+ image.height);
}
image.src = "https://gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png";

var offsetX = 0;
var loop = function(){
    ctx.clearRect(0, 0, w, h);
    //rect
    ctx.fillStyle = 'red';
    ctx.fillRect(offsetX, 200, 100, 100);
    //image
    if( image.complete ){
        ctx.drawImage(image, offsetX, 400);
    }
    offsetX = (offsetX + 1 ) % gcanvas.width;
    requestAnimationFrame(loop);
}

loop();

