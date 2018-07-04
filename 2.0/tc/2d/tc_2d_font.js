var gcanvas = tbplay.createCanvas();
var ctx = gcanvas.getContext('2d');

var r = tbplay.devicePixelRatio;
var w = gcanvas.width * r;
var h = gcanvas.height * r;

var offsetX = 0;
var handler = setInterval(function(){

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.font="20px Verdana";
    ctx.fillStyle = 'red'
    ctx.fillText("GCanvas很牛逼", offsetX, 350);
    ctx.restore();

    ctx.save();
    ctx.font="24px Verdana";
    ctx.fillStyle = 'red'
    ctx.fillText("GCanvas 666",offsetX+200, 350);
    ctx.restore();

    ctx.save();
    ctx.font="30px Georgia";
    ctx.fillText("Hello World GCanvas",offsetX, 400);
    ctx.restore();

    ctx.save();
    ctx.font="40px italic bold arial";
    ctx.fillText("Hello World",offsetX, 450);
    ctx.restore();
    
    ctx.save();
    ctx.font="bold 50px Verdana";
    ctx.fillText("Hello World",offsetX, 500);
    ctx.restore();

   

    ctx.save();
    ctx.font="italic 70px 微软雅黑";
    ctx.fillText("italic 70 号", offsetX, 620);
    ctx.restore();

    ctx.save();
    ctx.font="60px 微软雅黑";
    ctx.fillText("Helvetica 60号", offsetX, 700);
    ctx.restore();

    ctx.save();
    ctx.font="50px 微软雅黑";
    ctx.fillText("Helvetica 50号", offsetX, 770);
    ctx.restore();

    ctx.save();
    ctx.font="italic bold 40px Verdana";
    ctx.strokeText("stroke Verdana 40号字", offsetX, 830);
    ctx.restore();

    //gradient
    ctx.save();
    ctx.font="bold 60px Verdana";
    var gradient=ctx.createLinearGradient(offsetX,0, offsetX+750, 0);
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop(1.0, "red");
    ctx.fillStyle = gradient;
    ctx.fillText("GCanvas Fast Engine",offsetX, 900);
    ctx.restore();
                          
    ctx.save();
    ctx.font="bold 30px Verdana";
    ctx.fillText("Verdana 30号字", offsetX, 80);
    ctx.restore();

    offsetX = (offsetX + 1 ) % gcanvas.width;

}, 16);

