var canvas;
var ctx;                     //canvas context for drawing the fish
var ctx3;
// var startFish = 500;         //number of fish to start with
var startFish = 2000;         //number of fish to start with

var fish = [];               //array of fish
var fishW = 100;             //fish width
var fishH = 103;             //fish height
var velocity = 100;          //base velocity
var power = 0;
var backgroundImage;         //background image
var backgroundImageW = 981;  //background image width
var backgroundImageH = 767;  //background image height
var imageStrip;              //fish image strip
var WIDTH = 0;
var HEIGHT = 0;
var fpsMeter = new runtime.wxhelper.FPSMeter();

var assets = {
	background:"background-flip2.jpg",
	fish:"fishstrip.png"
};

var getBaseURL = function(){
    return "tc/sample/fishie/";
}

function createFish(max) {
    if (fish.length < max) {
        //add fish
        for (var i = fish.length; i < max; i++) {
            fish.push(new Fish());
        }
    } else {
        //remove fish
        fish.splice(max, fish.length - max);
    }
}

function drawBackground() {
    //console.log("background, width="+WIDTH+",height="+HEIGHT);
    ctx3.clearRect(0, 0, WIDTH, HEIGHT);
    ctx3.drawImage(backgroundImage, 0, 0, WIDTH, HEIGHT);
    
//    ctx3.drawImage(imageStrip, 1200, fishH, fishW, fishH, 800, 800, fishW, fishH);

}

function draw() {
    //set velocity of fish as a function of FPS
	var fps = fpsMeter.getFramerate();
    power = Math.min(fps, 60);
		if(isNaN(power)) power = 1;

    //velocity = 100 + 100 * (power * power / 3600); //exponential curve between 100-200
    velocity = Math.floor((power * power * .5) / 3) < 1 ? 1 : Math.floor((power * power * .5) / 3);  //exponential curve between 1 and 600.
    // velocity = 200;
//     velocity = 100;
//    console.log("velocity:"+velocity+",fps:"+fps);
    // Draw each fish
    for (var fishie in fish) {
        fish[fishie].swim();
  	}
}

function Fish() {

    var angle = Math.PI * 2 * Math.random();                            //set the x,y direction this fish swims
    var xAngle = Math.cos(angle);                                       //set the x value of the angle
    var yAngle = Math.sin(angle);                                       //set the y value of the angle
    var zAngle = 1+-2*Math.round(Math.random());                        //set if the fish is swimming toward us or away. 1 = toward us; -1 = away from us
    var x = Math.floor(Math.random() * (WIDTH - fishW) + fishW / 2);    //set the starting x location
    var y = Math.floor(Math.random() * (HEIGHT - fishH) + fishH / 2);   //set the starting y location
    var zFar = 100;                                                     //set how far away can a fish go
    var zFarFactor = 1;                                                 //set the max size the fish can be. 1=100%
    var zClose = 0;                                                     //set how near a fish can come
    var z = Math.floor(Math.random() * ((zFar - zClose)));              //set the starting z location
    var scale = .3;                                                     //set the rate of scaling each frame
    var flip = 1;                                                       //set the direction of the fish. 1=right; -1=left
    var cellCount = 16;                                                 //set the number of cells (columns) in the image strip animation
    var cell = Math.floor(Math.random() * (cellCount-1));               //set the first cell (columns) of the image strip animation
    var cellReverse = -1;                                               //set which direction we go through the image strip
    var species = Math.floor(Math.random() * 3);                        //set which species of fish this fish is. each species is a row in the image strip

    // stop fish from swimming straight up or down
    if (angle > Math.PI * 4 / 3 && angle < Math.PI * 5 / 3 || angle > Math.PI * 1 / 3 && angle < Math.PI * 2 / 3) {
        angle = Math.PI * 1 / 3 * Math.random();
        xAngle = Math.cos(angle);
        yAngle = Math.sin(angle);
    }
    // face the fish the right way if angle is between 6 o'clock and 12 o'clock
    if (angle > Math.PI / 2 && angle < Math.PI / 2 * 3) {
        flip = -1;
    }

    // draw the fish each frame -------------------------------------------------------------------------------
    function swim() {
    
        //console.log("[Fish swim],"+xAngle+","+velocity+","+fpsMeter.getTimeDelta());

        // Calculate next position of fish
        var nextX = x + xAngle * velocity * fpsMeter.getTimeDelta();
        var nextY = y + yAngle * velocity * fpsMeter.getTimeDelta();
        var nextZ = z + zAngle * .1 * velocity * fpsMeter.getTimeDelta();
        var nextScale = Math.abs(nextZ) * 3 / (zFar - zClose);
        //console.log("[Fish swim Next], nextX:"+nextX+",nextY:"+nextY+",nextZ:"+nextZ+",nextScale:"+nextScale);

        // If fish is going to move off right side of screen
        if (nextX + fishW / 2 * scale > WIDTH) {
            // If angle is between 3 o'clock and 6 o'clock
            if ((angle >= 0 && angle < Math.PI / 2)) {
                angle = Math.PI - angle;
                xAngle = Math.cos(angle);
                yAngle = Math.sin(angle) * Math.random();
                flip = -flip;
            }
            // If angle is between 12 o'clock and 3 o'clock
            else if (angle > Math.PI / 2 * 3) {
                angle = angle - (angle - Math.PI / 2 * 3) * 2
                xAngle = Math.cos(angle);
                yAngle = Math.sin(angle) * Math.random();
                flip = -flip;
            }
        }

        // If fish is going to move off left side of screen
        if (nextX - fishW / 2 * scale < 0) {
            // If angle is between 6 o'clock and 9 o'clock
            if ((angle > Math.PI / 2 && angle < Math.PI)) {
                angle = Math.PI - angle;
                xAngle = Math.cos(angle);
                yAngle = Math.sin(angle) * Math.random();
                flip = -flip;
            }
            // If angle is between 9 o'clock and 12 o'clock
            else if (angle > Math.PI && angle < Math.PI / 2 * 3) {
                angle = angle + (Math.PI / 2 * 3 - angle) * 2
                xAngle = Math.cos(angle);
                yAngle = Math.sin(angle) * Math.random();
                flip = -flip;
            }
        }

        // If fish is going to move off bottom side of screen
        if (nextY + fishH / 2 * scale > HEIGHT) {
            // If angle is between 3 o'clock and 9 o'clock
            if ((angle > 0 && angle < Math.PI)) {
                angle = Math.PI * 2 - angle;
                xAngle = Math.cos(angle);
                yAngle = Math.sin(angle) * Math.random();
            }
        }

        // If fish is going to move off top side of screen
        if (nextY - fishH / 2 * scale < 0) {
            // If angle is between 9 o'clock and 3 o'clock
            if ((angle > Math.PI && angle < Math.PI * 2)) {
                angle = angle - (angle - Math.PI) * 2;
                xAngle = Math.cos(angle);
                yAngle = Math.sin(angle);
            }
        }

        // If fish is going too far (getting too small)
        if (nextZ <= zClose && zAngle < 0) {
            zAngle = -zAngle;

        }
        // If fish is getting to close (getting too large)
        if (((WIDTH / fishW) * 10) < ((fishW * fish.length) / WIDTH)) {
            zFarFactor = .3
        }
        else if (((WIDTH / fishW) * 2) < ((fishW * fish.length) / WIDTH)) {
            zFarFactor = .5
        }
        else { zFarFactor = 1 }

        if (nextZ >= zFar * zFarFactor && zAngle > 0) {
            zAngle = -zAngle;

        }
        if (scale < .1) { scale = .1 }; //don't var fish get too tiny

//        console.log("x="+x+",y="+y+",flip="+flip+",scale="+scale+",cell="+cell+",species="+species);

        //draw the fish
        //locate the fish
        ctx.save();
        ctx.translate(x, y);

        // make the fish bigger or smaller depending on how far away it is.
        ctx.transform(flip * scale, 0, 0, scale, 0, 0); //make the fish face the way he's swimming.
        //console.log("drawImage(imageStrip,"+(fishW * cell)+","+(fishH * species)+","+(fishW)+","+(fishH)+","+(-fishW / 2)+","+(-fishH / 2)+","+fishW+","+fishH+")");
        ctx.drawImage(imageStrip, fishW * cell, fishH * species, fishW, fishH, -fishW / 2, -fishH / 2, fishW, fishH); //draw the fish

        ctx.restore();

        scale = nextScale // increment scale for next time

        //increment to next state
        x = nextX;
        y = nextY;
        z = nextZ;
        if (cell >= cellCount-1 || cell <= 0) { cellReverse = cellReverse * -1; } //go through each cell in the animation
        cell = cell + 1 * cellReverse; //go back down once we hit the end of the animation
    }
    return {
        swim: swim
    }
}

function loadAssetsAndStart() {
    console.log("-----------------3");

	var preloaded = 0;
	var count = 0;
	for(var asset in assets) {
		count++;
		var img = runtime.wxhelper.CreateImage();
		if (asset == "background") {
            console.log("-----------------3 background");
			backgroundImage = img;
		}
		if (asset == "fish") {
            console.log("-----------------3 fish");
			imageStrip = img;
		}
		img.onload = function() {
			preloaded++;
			if(preloaded == count){
				init();
			}
		}
        
		img.src = getBaseURL() + assets[asset];
        console.log("-----------------3 img.src:" + img.src);
        assets[asset] = img;
	}
}

function init() {
    console.log("-----------------5");
	canvas = runtime.wxhelper.GetMainCanvas("world");
    console.log("-----------------5.1");

    console.log("canvas.id=" + canvas.ID)
    console.log("canvas.width=" + canvas.width + ",canvas.height=" + canvas.height)

	var windowSize = runtime.wxhelper.GetWindowSizeInPx();
    console.log("windowSize.width:" + windowSize.width)
    console.log("windowSize.height:" + windowSize.height)

	canvas.width = windowSize.width;
	canvas.height = windowSize.height;
    console.log("-----------------6");

//    WIDTH = canvas.width/canvas.devicePixelRatio;
//    HEIGHT = canvas.height/canvas.devicePixelRatio;
    

    // WIDTH = canvas.width;
    // HEIGHT = canvas.height;

    WIDTH = windowSize.width;
    HEIGHT = windowSize.height;

    console.log("WIDTH="+WIDTH+",HEIGHT="+HEIGHT);


	if (canvas && canvas.getContext) {
        console.log("-----------------7");

		//setup page
		ctx = canvas.getContext('2d');
		ctx3 = ctx;

		// create fish
        createFish(startFish);

		// raf to start the render loop
        // setTimeout(function(){
		  // requestAnimationFrame(loop);
        // }, 2000);
        // setTimeout(loop, 16);
        setInterval(loop, 16);
	}
	console.log("FishIE Tank init, canvas " + canvas.width + "x" + canvas.height
		+ ", fish number:" + startFish);
}


function loop() {
    // tbplay.getPerformance().now()
	drawBackground();
	draw();

	var result = fpsMeter.update();
	if (result.framerate > 0) {
		console.log("FishIE Tank framerate:" + result.framerate + "fps");
	}

    // setTimeout(loop, 16);

    // requestAnimationFrame(loop);
    // setTimeout(loop, 16);
}



// Load assets and start the game
if (runtime.wxhelper.IsWxGameEnv()) {
	loadAssetsAndStart();
    console.log("-----------------4");

} else {
	window.loadAssetsAndStart = loadAssetsAndStart;
}

