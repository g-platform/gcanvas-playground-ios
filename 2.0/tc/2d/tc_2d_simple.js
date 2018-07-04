var gcanvas = tbplay.createCanvas();
//var afunc = function(canvas){
//    if( !canvas.abc ){
//        canvas.abc = {};
//    }
//    printObj(canvas);
//}
//
//afunc(gcanvas);

var ctx = gcanvas.getContext('2d');

var r = tbplay.devicePixelRatio;
ctx.scale(r, r)

ctx.fillStyle = 'red';
ctx.fillRect(0, 200, 100, 100);

//rect
ctx.fillStyle = 'black';
ctx.fillRect(100, 300, 100, 100);
ctx.fillRect(25, 410, 414-50, 5);

//circle
ctx.fillStyle = 'blue';
ctx.arc(200, 600, 100, 0, Math.PI * 2, true);
ctx.fill();

//image
var image = tbplay.createImage();
image.onload = function(e){
    console.log(">>>>image.onload success");
    ctx.drawImage(image, 100, 200);
}
image.src = "https://gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png";

