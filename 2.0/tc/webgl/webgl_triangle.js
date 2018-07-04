var gcanvas = tbplay.createCanvas();
var gl = gcanvas.getContext('webgl');
var w = gcanvas.width * tbplay.devicePixelRatio;
var h = gcanvas.height * tbplay.devicePixelRatio;
gl.viewport(0, 0, w, h);
console.log("glViewport(0, 0, "+w+","+h+")");

var fragmentShaderStr = "void main() { gl_FragColor = vec4(0.8, 0.8, 0.0, 1.0); }";
var vertexShaderStr = "attribute vec3 position; uniform mat4 mv; uniform mat4 proj; void main() { gl_Position = proj * mv * vec4(position, 1.0); }";


var vertexShader = gl.createShader(gl.VERTEX_SHADER);
console.log("error ="+gl.getError())

gl.shaderSource(vertexShader, vertexShaderStr);
console.log("error ="+gl.getError())

gl.compileShader(vertexShader);
console.log("error ="+gl.getError())

//var status = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
//console.log("glGetShaderParameter(GL_COMPILE_STATUS)="+status);


var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
console.log("error ="+gl.getError())

gl.shaderSource(fragmentShader, fragmentShaderStr);
console.log("error ="+gl.getError())

gl.compileShader(fragmentShader);
console.log("error ="+gl.getError())

//status = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);

var program = gl.createProgram();
console.log("error ="+gl.getError())

gl.attachShader(program, vertexShader);
console.log("error ="+gl.getError())

gl.attachShader(program, fragmentShader);
console.log("error ="+gl.getError())

gl.linkProgram(program);
console.log("error ="+gl.getError())

//status = gl.getProgramParameter(program, gl.LINK_STATUS);
//console.log("error ="+gl.getError())

//console.log("glGetProgramParameter(GL_LINK_STATUS)="+status);

// if (!gl.getProgramParameter(program, gl.LINK_STATUS))
// {
//     alert("Unable to link shaders");
//     gl.deleteProgram(program);
//     gl.deleteProgram(vertexShader);
//     gl.deleteProgram(fragmentShader);
//     return;
// }

gl.clearColor(0.2, 0.4, 0.6, 1.0);
console.log("error ="+gl.getError())

gl.clearDepth(1.0);
console.log("error ="+gl.getError())

gl.enable(gl.DEPTH_TEST);
console.log("error ="+gl.getError())

gl.depthFunc(gl.LEQUAL);
console.log("error ="+gl.getError())

var vertexBuffer = gl.createBuffer();  
console.log("error ="+gl.getError())

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
console.log("error ="+gl.getError())

var vertices = new Float32Array([
                                 0.0,   1.0, 1.0,
                                 -1.0, -1.0, 1.0,
                                 1.0,  -1.0, 1.0
                                 ]);

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
console.log("error ="+gl.getError())

gl.useProgram(program);
console.log("error ="+gl.getError())

var vertexPosition = gl.getAttribLocation(program, "position");
console.log("error ="+gl.getError())

gl.enableVertexAttribArray(vertexPosition);
console.log("error ="+gl.getError())

gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
console.log("error ="+gl.getError())


gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
console.log("error ="+gl.getError())



var fov = 90.0;
var aspect = 1;
var nearPlane = 1.0;
var farPlane = 100.0;
var top = nearPlane * Math.tan(fov / 2 * Math.PI / 180);
var bottom = -top;
var right = top * aspect;
var left = -right;

var a = (right + left) / (right - left);
var b = (top + bottom) / (top - bottom);
var c = (farPlane + nearPlane) / (farPlane - nearPlane);
var d = (2 * farPlane * nearPlane) / (farPlane - nearPlane);
var x = (2 * nearPlane) / (right - left);
var y = (2 * nearPlane) / (top - bottom);
var perspectiveMatrix = new Float32Array([
                                          x, 0, a, 0,
                                          0, y, b, 0,
                                          0, 0, c, d,
                                          0, 0, -1, 0
                                          ]);

var modelViewMatrix = new Float32Array([
                                        1, 0, 0, 0,
                                        0, 1, 0, 0,
                                        0, 0, 1, 0,
                                        0, 0, 0, 1
                                        ]);

var loc = gl.getUniformLocation(program, "proj")
//console.log("proj location ="+loc)
console.log("error 10="+gl.getError())

gl.uniformMatrix4fv(loc, false, perspectiveMatrix);
console.log("error 11="+gl.getError())

loc = gl.getUniformLocation(program, "mv")
//console.log("mv loc="+loc)
console.log("error 12="+gl.getError())

gl.uniformMatrix4fv(loc, false, modelViewMatrix);
console.log("error 13="+gl.getError())

gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
console.log("error 14="+gl.getError())

