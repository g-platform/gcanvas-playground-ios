var gcanvas = tbplay.createCanvas();
var gl = gcanvas.getContext('webgl');

gl = gcanvas.getContext('webgl');
                     
/*========== Defining and storing the geometry ==========*/

var vertices = [ -1,-1,-1, 1,-1,-1, 1, 1,-1 ];
var colors = [ 1,1,1, 1,1,1, 1,1,1 ];
var indices = [ 0,1,2 ];

//Create and store data into vertex buffer
var vertex_buffer = gl.createBuffer ();
console.log("gl.createBuffer()= "+vertex_buffer+", error ="+gl.getError())

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
console.log("gl.bindBuffer(gl.ARRAY_BUFFER,"+vertex_buffer+"), error ="+gl.getError())

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
console.log("gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW), error ="+gl.getError())


//Create and store data into color buffer
var color_buffer = gl.createBuffer ();
console.log("gl.createBuffer()= "+color_buffer+", error ="+gl.getError())

gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
console.log("gl.bindBuffer(gl.ARRAY_BUFFER,"+color_buffer+"), error ="+gl.getError())

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
console.log("gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW), error ="+gl.getError())


//Create and store data into index buffer
var index_buffer = gl.createBuffer ();
console.log("gl.createBuffer()= "+index_buffer+", error ="+gl.getError())

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
console.log("gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,"+index_buffer+"), error ="+gl.getError())

gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(indices), gl.STATIC_DRAW);
console.log("gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(indices), gl.STATIC_DRAW), error ="+gl.getError())


/*==========================Shaders=========================*/

var vertCode = 'attribute vec3 position;'+
'uniform mat4 Pmatrix;'+
'uniform mat4 Vmatrix;'+
'uniform mat4 Mmatrix;'+
'attribute vec3 color;'+//the color of the point
'varying vec3 vColor;'+

'void main(void) { '+//pre-built function
   'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);'+
   'vColor = color;'+
'}';

var fragCode = 'precision mediump float;'+
'varying vec3 vColor;'+
'void main(void) {'+
   'gl_FragColor = vec4(vColor, 1.);'+
'}';

var vertShader = gl.createShader(gl.VERTEX_SHADER);
console.log("error 1="+gl.getError())
gl.shaderSource(vertShader, vertCode);
console.log("error 2="+gl.getError())
gl.compileShader(vertShader);
console.log("error 3="+gl.getError())

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
console.log("error 4="+gl.getError())

gl.shaderSource(fragShader, fragCode);
console.log("error 5="+gl.getError())

gl.compileShader(fragShader);
console.log("error 6="+gl.getError())


var shaderProgram = gl.createProgram();
console.log("error 7="+gl.getError())

gl.attachShader(shaderProgram, vertShader);
console.log("error 8="+gl.getError())

gl.attachShader(shaderProgram, fragShader);
console.log("error 9="+gl.getError())

gl.linkProgram(shaderProgram);
console.log("error 10="+gl.getError())

/*===========associating attributes to vertex shader ============*/
var Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
console.log("error 11="+gl.getError())

var Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
console.log("error 12="+gl.getError())

var Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");
console.log("error 13="+gl.getError())

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
console.log("error 14="+gl.getError())


var position = gl.getAttribLocation(shaderProgram, "position");
console.log("error 15="+gl.getError())

gl.vertexAttribPointer(position, 3, gl.FLOAT, false,0,0) ; //position
console.log("error 16="+gl.getError())

gl.enableVertexAttribArray(position);
console.log("error 17="+gl.getError())

gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
console.log("error 18="+gl.getError())


var color = gl.getAttribLocation(shaderProgram, "color");
console.log("error 19="+gl.getError())

gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ; //color
console.log("error 20="+gl.getError())

gl.enableVertexAttribArray(color);
console.log("error 21="+gl.getError())

gl.useProgram(shaderProgram);
console.log("error 22="+gl.getError())


/*========================= MATRIX ========================= */

function get_projection(angle, a, zMin, zMax) {
    var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
    return [
       0.5/ang, 0 , 0, 0,
       0, 0.5*a/ang, 0, 0,
       0, 0, -(zMax+zMin)/(zMax-zMin), -1,
       0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
    ];
}

var width = gcanvas.width * tbplay.devicePixelRatio;
var height = gcanvas.height * tbplay.devicePixelRatio;
var proj_matrix = get_projection(40, width/height, 1, 100);
var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

//translating z
view_matrix[14] = view_matrix[14]-6; //zoom

/*=======================rotation========================*/
function rotateZ(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv0 = m[0], mv4 = m[4], mv8 = m[8]; 

    m[0] = c*m[0]-s*m[1];
    m[4] = c*m[4]-s*m[5];
    m[8] = c*m[8]-s*m[9];
    m[1] = c*m[1]+s*mv0;
    m[5] = c*m[5]+s*mv4;
    m[9] = c*m[9]+s*mv8;
}

/*=================Drawing===========================*/

var time_old = 0;   
var time = 0;

// setInterval(function() {
var draw = function(){
    var dt = time-time_old;
    rotateZ(mov_matrix, dt*0.002);
    time_old = time;
    time += 16;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.clearDepth(1.0);
    gl.viewport(0.0, 0.0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(draw);
}

draw();


