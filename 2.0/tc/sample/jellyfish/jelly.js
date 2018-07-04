// <template>
//   <div ref="test">
// 		<gcanvas ref="canvas_holder" style="top: 0; width:750;height:750;background-color:#2d445b;" ></gcanvas>
// 	</div>
// </template>
// <script>
// var GCanvas=require('../../js-weex/gcanvas'); //调试使用


var V3 = require('./js/mjs').V3;
var M4x4 = require('./js/mjs').M4x4;
var Param = require('./js/params');
var LocalParam = require('./js/local_param');
// var GCanvasImage = require('../../js-weex/gcanvasimage');
var getBaseURL = require('./js/base-url').getBaseURL;

var cw = 750;
var ch = 750;

var jelly1 = require('./meshes/jelly1.json').data;
var jelly2 = require('./meshes/jelly2.json').data;
var jelly3 = require('./meshes/jelly3.json').data;
var jelly4 = require('./meshes/jelly4.json').data;
var vertex = require('./shaders/vertex').shader;
var fragment = require('./shaders/fragment').shader;

var viewportWidth = 750;
var viewportHeight = 750;

var baseURL = getBaseURL('');
console.log("----------------" + baseURL);
var vertexPositionBuffer = {};
var vertexNormalBuffer = {};
var vertexColorBuffer = {};
var vertexTextureCoordBuffer = {};
var vertexIndexBuffer = {};
var skinWeightBuffer = {};

// var vertexPositionBufferInfo = {};
// var vertexNormalBufferInfo = {};
// var vertexColorBufferInfo = {};
// var vertexTextureCoordBufferInfo = {};
// var vertexIndexBufferInfo = {};
// var skinWeightBufferInfo = {};

var bufferOK = {};
var localParam = new LocalParam();
var param = new Param();
//var ref = this.$refs.canvas_holder;
// var gcanvas = GCanvas.start(ref);
var gcanvas = tbplay.createCanvas();
var currentProgram;
var shaderProgram = {};
var j_texture = {};
var j_textureOK = {};
var mWorld = new M4x4.$();
var mViewInv = new M4x4.$();
var mProjection = new M4x4.$();
var mWorldView = new M4x4.$();
var mWorldViewProj = new M4x4.$();
var mTemp = new M4x4.$();
var jellyfishTargets = {};

var joint0 = new M4x4.$();
var joint1 = new M4x4.$();
var joint2 = new M4x4.$();
var joint3 = new M4x4.$();
var delta = new V3.$(0,0,0);
var deltaNorm = new V3.$(0,0,0);
var force = new V3.$(0,0,0);
var accel = new V3.$(0,0,0);
var eyeDist = new V3.$(0,0,0);

var jellyfish = {};
jellyfish.count = 0;
jellyfish.order = [];
var joint0InvTranspose = new M4x4.$();
var delta;
var dist;
var dir;
var force;
var s1,s2;

var gl = gcanvas.getContext("webgl");

viewportWidth = gcanvas.width * tbplay.devicePixelRatio;
viewportHeight = gcanvas.height * tbplay.devicePixelRatio;

console.log("-------------------------gcanvas, w:"+viewportWidth+",h"+viewportHeight);
console.log("gl="+gl);
gl.viewport(0, 0, viewportWidth, viewportHeight);

function initBuffers(){
  initBuffer("jellyfish1", jelly1);
  initBuffer("jellyfish2", jelly2);
  initBuffer("jellyfish3", jelly3);
  initBuffer("jellyfish4", jelly4);
}

function initBuffer(name, data) {
  vertexPositionBuffer[name] = gl.createBuffer();
  vertexNormalBuffer[name] = gl.createBuffer();
  vertexColorBuffer[name] = gl.createBuffer();
  vertexTextureCoordBuffer[name] = gl.createBuffer();
  skinWeightBuffer[name] = gl.createBuffer();
  vertexIndexBuffer[name] = gl.createBuffer();

  // vertexPositionBufferInfo[name] = {};
  // vertexNormalBufferInfo[name] = {};
  // vertexColorBufferInfo[name] = {};
  // vertexTextureCoordBufferInfo[name] = {};
  // skinWeightBufferInfo[name] = {};
  // vertexIndexBufferInfo[name] = {};

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexPositions), gl.STATIC_DRAW);
  vertexPositionBuffer[name].itemSize = 3;
  vertexPositionBuffer[name].numItems = data.vertexPositions.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexNormals), gl.STATIC_DRAW);
  vertexNormalBuffer[name].itemSize = 3;
  vertexNormalBuffer[name].numItems = data.vertexNormals.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexColors), gl.STATIC_DRAW);
  vertexColorBuffer[name].itemSize = 3;
  vertexColorBuffer[name].numItems = data.vertexColors.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexTextureCoords), gl.STATIC_DRAW);
  vertexTextureCoordBuffer[name].itemSize = 3;
  vertexTextureCoordBuffer[name].numItems = data.vertexTextureCoords.length/3;

var weightData = new Array();
  for(var i=0; i<data.vertexPositions.length; i=i+3){
    var ypos = -data.vertexPositions[i+1]/3;
    var w0 = Math.max(Math.min(-ypos+1,1),0);
    var w1 = Math.max(Math.min(ypos,-ypos+2),0);
    var w2 = Math.max(Math.min(ypos-1,-ypos+3),0);
    var w3 = Math.max(Math.min(ypos-2,1),0);
    weightData.push(w0);
    weightData.push(w1);
    weightData.push(w2);
    weightData.push(w3);
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, skinWeightBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(weightData), gl.STATIC_DRAW);
  skinWeightBuffer[name].itemSize = 4;
  skinWeightBuffer[name].numItems = weightData.length/4;

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer[name]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.indices), gl.STREAM_DRAW);
  vertexIndexBuffer[name].itemSize = 1;
  vertexIndexBuffer[name].numItems = data.indices.length;
}

function setTimeUniform(time){
  gl.uniform1f(currentProgram.currentTime, time);
}
function setjTimeUniform(time){
  gl.uniform1f(currentProgram.currentJellyfishTime, time);
}

function setJointUniforms(){
  gl.uniformMatrix4fv(currentProgram.joint0, gl.FALSE, new Float32Array(joint0));
  gl.uniformMatrix4fv(currentProgram.joint1, gl.FALSE, new Float32Array(joint1));
  gl.uniformMatrix4fv(currentProgram.joint2, gl.FALSE, new Float32Array(joint2));
  gl.uniformMatrix4fv(currentProgram.joint3, gl.FALSE, new Float32Array(joint3));

  M4x4.inverseOrthonormal(joint0,joint0InvTranspose);
  M4x4.transpose(joint0InvTranspose,joint0InvTranspose);
  gl.uniformMatrix4fv(currentProgram.joint0InvTranspose, gl.FALSE, new Float32Array(joint0InvTranspose));
}

function setMatrixUniforms(){
  // Set necessary matrices
  M4x4.mul(mView,mWorld,mWorldView);
  M4x4.mul(mProjection,mWorldView,mWorldViewProj);
  M4x4.inverseOrthonormal(mView,mViewInv);

  // Set Uniforms
  gl.uniformMatrix4fv(currentProgram.world, gl.FALSE, new Float32Array(mWorld));
  gl.uniformMatrix4fv(currentProgram.worldView, gl.FALSE, new Float32Array(mWorldView));
  gl.uniformMatrix4fv(currentProgram.worldViewProj, gl.FALSE, new Float32Array(mWorldViewProj));
  gl.uniformMatrix4fv(currentProgram.viewInv, gl.FALSE, new Float32Array(mViewInv));
}

function JellyfishTarget(tx,ty,tz,scl,id,time){
  this.pos = V3.$(tx,ty,tz);
  this.scl = scl;
  this.id = id;
  this.time = Math.random()*100;
  this.speed = Math.random()+0.5;
  this.alive = 1;
};


function drawBuffer(name){
  //console.log('vertexPositionBuffer===>' + JSON.stringify(vertexPositionBuffer));
//  console.log('name===>' + name);
  if(vertexPositionBuffer[name]){
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer[name]);
    gl.vertexAttribPointer(currentProgram.vertexPositionAttribute, vertexPositionBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer[name]);
    gl.vertexAttribPointer(currentProgram.vertexNormalAttribute, vertexNormalBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer[name]);
    gl.vertexAttribPointer(currentProgram.vertexColorAttribute, vertexColorBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer[name]);
    gl.vertexAttribPointer(currentProgram.textureCoordAttribute, vertexTextureCoordBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, skinWeightBuffer[name]);
    gl.vertexAttribPointer(currentProgram.skinWeightAttribute, skinWeightBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer[name]);

    gl.drawElements(gl.TRIANGLES, vertexIndexBuffer[name].numItems, gl.UNSIGNED_SHORT, 0);

    //console.log('draw buffer -----> ' + name);
  }
}

function getShader(type, str) {
  var shader;
  if (type == "fragment") {
	shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (type == "vertex") {
	shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
	return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//     	alert(gl.getShaderInfoLog(shader));
	return null;
  }

  return shader;
}

function interpolateTargets(){
  while(jellyfish.count != jellyfishTargets.count){
    //console.log('jellyfish.count------------' + jellyfish.count + ",  jellyfishTargets.count--" + jellyfishTargets.count);
    if(jellyfish.count<jellyfishTargets.count){
      jellyfish[jellyfish.count] = new JellyfishInstance(
              jellyfishTargets[jellyfish.count].pos,
              jellyfishTargets[jellyfish.count].scl,
              jellyfishTargets[jellyfish.count].time);
      jellyfish.count += 1;
    }
    else if(jellyfish.count>jellyfishTargets.count){
      jellyfish.count -= 1;
      delete jellyfish[jellyfish.count];
    }
    jellyfish.order = jellyfishTargets.order;
  }

  for(var i=0; i < jellyfish.count; i++){
    jellyfish[i].pos[0] = jellyfishTargets[i].pos[0];
    jellyfish[i].pos[1] = jellyfishTargets[i].pos[1];
    jellyfish[i].pos[2] = jellyfishTargets[i].pos[2];
    if (jellyfishTargets[i].scl<jellyfish[i].scl) {
      jellyfish[i].scl = jellyfishTargets[i].scl;
    }
    jellyfish[i].scl = jellyfishTargets[i].scl;
    jellyfish[i].time = jellyfishTargets[i].time;

    jellyfish.order[i][0] = i;
    jellyfish.order[i][1] = jellyfish[i].pos;
  }
}

function Spring3D(xpos, ypos, zpos){
  this.veloc = new V3.$(0,0,0);
  this.pos = new V3.$(xpos, ypos, zpos);
  this.gravity = -0.005;
  this.spring = 2;
  this.mass = 0.1;
  this.stiffness = 0.2;
  this.damping = 0.1;
  this.lookat = new M4x4.$();

  this.update = function(target){
      V3.sub(target,this.pos,delta);

      V3.normalize(delta, deltaNorm);
      V3.scale(deltaNorm, this.spring, deltaNorm);
      V3.sub(delta, deltaNorm, delta);

      V3.scale(delta,this.stiffness,force);
      force[1] += this.gravity;
      V3.scale(force,1/this.mass,accel);
      V3.add(force,accel,this.veloc);
      V3.scale(this.veloc,this.damping,this.veloc);
      V3.add(this.pos,this.veloc,this.pos);

    M4x4.makeLookAt(this.pos,target,localParam.camera.eye,this.lookat);
  };

}

function JellyfishInstance(pos,scl,time){
  this.pos = pos;
  this.scl = scl;
  this.time = time;
  this.lod = 0;
  this.propel = 1;

  this.s = {};
  this.s[0] = new Spring3D(pos[0],pos[1]-1,pos[2]);
  for (var j=1;j<=3;j++){
    this.s[j] = new Spring3D(pos[0],pos[1]-1-1*j*this.scl,pos[2]);
  }

  this.draw = function(){
      setShader("jellyfish");
      this.propel = (Math.sin(this.time+Math.PI)+0.6)*0.2;
      setjTimeUniform(this.time);
      setJointUniforms();
      drawBuffer('jellyfish'+this.lod);
      //console.log('jelly fish draw------------');
  };

  this.setLOD = function(){
    V3.sub(this.pos,V3.neg(localParam.camera.eye),eyeDist);
    this.lod = 1;//Math.max(3-Math.floor(4/this.scl/2),0);
  };

  this.simulate = function(){
    this.s[0].spring = 1.295 * this.scl * (2-this.propel);
    this.s[0].update(this.pos);
    this.s[0].gravity = -0.01;

    M4x4.makeTranslate(this.s[0].pos,joint0);
    M4x4.mul(joint0,this.s[0].lookat,joint0);
    M4x4.scale1(this.scl,joint0,joint0);

    for (j=1;j<=3;j++){
      this.s[j].spring = 2.95 * this.scl;
      this.s[j].update(this.s[j-1].pos);
      this.s[j].gravity = -0.02;
      if (j==1){
        M4x4.makeTranslate(this.s[j].pos,joint1);
        M4x4.mul(joint1,this.s[j].lookat, joint1);
        M4x4.scale1(this.scl,joint1,joint1);
        M4x4.translate3(0,3*j,0,joint1,joint1);
      }
      if (j==2){	
        M4x4.makeTranslate(this.s[j].pos,joint2);
        M4x4.mul(joint2,this.s[j].lookat, joint2);
        M4x4.scale1(this.scl,joint2,joint2);
        M4x4.translate3(0,3*j,0,joint2,joint2);
      }
      if (j==3){
        M4x4.makeTranslate(this.s[j].pos,joint3);
        M4x4.mul(joint3,this.s[j].lookat, joint3);
        M4x4.scale1(this.scl,joint3,joint3);
        M4x4.translate3(0,3*j,0,joint3,joint3);
      }
    }
  }

}

function drawJellyfish(){
  interpolateTargets();
  setMatrixUniforms();
  bindTexture('jellyfish', 0);
  bindTexture('luminescence', 2);
  bindTexture('caustics'+localParam.cycle32, 1);
  jellyfish.order.sort(sort3D);
  for (var i=0; i < jellyfish.count; i++) {
// 		for (var i=0; i < 3; i++) {
    var k = jellyfish.order[i][0];
    //console.log('-------jellyfish[k]' + JSON.stringify(jellyfish[k]));
    if (jellyfish[k]){
      jellyfish[k].simulate();
      jellyfish[k].setLOD();
      jellyfish[k].draw();
    }
  }
}
function sort3D(a,b){

  var eye = V3.$(-localParam.camera.eye[0],-localParam.camera.eye[1]+20,-localParam.camera.eye[2]);
  return (V3.length(V3.sub(eye,a[1])) > V3.length(V3.sub(eye,b[1])) ? -1 : ((V3.length(V3.sub(eye,a[1])) < V3.length(V3.sub(eye,b[1]))) ? 1 : 0));
}

function createProgram(fragmentShaderID, vertexShaderID) {
  var fragmentShader = getShader("fragment", fragmentShaderID);
  var vertexShader = getShader("vertex", vertexShaderID);

  // var programWrap = {};
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
     throw "Could not initialise shaders";
  }
  program.vertexPositionAttribute = gl.getAttribLocation(program,   "aVertexPosition");
  gl.enableVertexAttribArray(program.vertexPositionAttribute);
  program.vertexNormalAttribute = gl.getAttribLocation(program,     "aVertexNormal");
  gl.enableVertexAttribArray(program.vertexNormalAttribute);
  program.vertexColorAttribute = gl.getAttribLocation(program,      "aVertexColor");
  gl.enableVertexAttribArray(program.vertexColorAttribute);
  program.textureCoordAttribute = gl.getAttribLocation(program,     "aTextureCoord");
  gl.enableVertexAttribArray(program.textureCoordAttribute);

  program.skinWeightAttribute = gl.getAttribLocation(program,     "aSkinWeight");
  gl.enableVertexAttribArray(program.skinWeightAttribute);

  program.world = gl.getUniformLocation(program,              "uWorld");
  program.worldView = gl.getUniformLocation(program,          "uWorldView");
  program.worldViewProj = gl.getUniformLocation(program,      "uWorldViewProj");
  program.viewInv = gl.getUniformLocation(program,            "uView");
  program.viewInv = gl.getUniformLocation(program,            "uViewInv");

  program.sampler = [];
  program.sampler[0] = gl.getUniformLocation(program,           "uSampler0");
  program.sampler[1] = gl.getUniformLocation(program,           "uSampler1");
  program.sampler[2] = gl.getUniformLocation(program,           "uSampler2");

  program.joint0 = gl.getUniformLocation(program,             "uJoint0");
  program.joint1 = gl.getUniformLocation(program,             "uJoint1");
  program.joint2 = gl.getUniformLocation(program,             "uJoint2");
  program.joint3 = gl.getUniformLocation(program,             "uJoint3");
  program.joint0InvTranspose = gl.getUniformLocation(program, "uJoint0InvTranspose");

  program.currentTime = gl.getUniformLocation(program,          "uCurrentTime");
  program.currentJellyfishTime = gl.getUniformLocation(program, "uCurrentJellyfishTime");

  // programWrap = { "program":program, "programInfo":programInfo };

  return program;
}

function setShader(name){
  currentProgram = shaderProgram[name];
  gl.useProgram(currentProgram);
}

function initShaders() {
  shaderProgram["jellyfish"] = createProgram(fragment, vertex);
  currentProgram = shaderProgram["jellyfish"];
  setShader("jellyfish");
  bindTexture('jellyfish', 0);
  bindTexture('luminescence', 2);
  bindTexture('caustics'+localParam.cycle32, 1);
}

function initTextures() {
  console.log('-----------initTextures');
  loadTexture('jellyfish', baseURL + '/images/jellyfish.png');
  loadTexture('luminescence', baseURL +'/images/luminescence.png');

  for (var i=1; i <= 32; i++) {
    loadTexture('caustics'+i, baseURL+ '/images/caustics/caustics7.'+pad2(i-1)+'.jpg');
  }
}

function loadTexture(label, path) {
  console.log('start load texture ----------- label:'+label+', path:' + path);
  j_textureOK[label] = 0;
  // var imageFile = new GCanvasImage();
  var imageFile = tbplay.createImage();
  imageFile.src = path;
  j_texture[label] = gl.createTexture();
  j_texture[label].image = imageFile;
  imageFile.onload = function() {
    handleLoadedTexture(j_texture[label], label);
  }
}

function handleLoadedTexture(textures, label) {
  console.log('handleLoadedTexture-----------' + label);
  //printObj(textures);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.bindTexture(gl.TEXTURE_2D, textures);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
  j_textureOK[label] = 1;
}

function bindTexture(name, i) {
  if(j_textureOK[name] == 1){
    if (i==0) gl.activeTexture(gl.TEXTURE0);
    if (i==1) gl.activeTexture(gl.TEXTURE1);
    if (i==2) gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, j_texture[name]);
    gl.uniform1i(currentProgram.sampler[i], i);
  }
}

function pad2(number) {
  return (parseInt(number) < 10 ? '0' : '') + parseInt(number)
}

function simulate(){
  var serverTime = new Date();
  var serverMilis = serverTime.getTime()%100000000/1000;
  serverTime.hours = (serverTime.getHours()+6)%24;
  serverTime.minutes = serverTime.getMinutes();
  serverTime.seconds = serverTime.getSeconds();
  serverTime.total = serverTime.hours*3600 + serverTime.minutes*60 + serverTime.seconds;

  var i = 0;
  if(jellyfishTargets.count< param.jCount){
    jellyfishTargets[jellyfishTargets.count] = new JellyfishTarget(
            Math.random(i)*2*param.pBbox[0]-param.pBbox[0],
            Math.random(i)*2*param.pBbox[1]-param.pBbox[1]-40,
            Math.random(i)*2*param.pBbox[2]-param.pBbox[2],
            Math.random(i)*param.jScaleRandom+param.jScale,
            jellyfishTargets.count,
            serverMilis
    );
    jellyfishTargets.order.push([jellyfishTargets.count,0]);
    jellyfishTargets.order3D.push([jellyfishTargets.count,0]);
    jellyfishTargets.count += 1;
    i++;
    //console.log('------------jellyfishTargets.count ====>' + jellyfishTargets.count + ", param.jCount =====> " + param.jCount);
  }
  else if(jellyfishTargets.count>param.jCount){
    jellyfishTargets.order3D.pop();
    jellyfishTargets.order.pop();
    jellyfishTargets.count -= 1;
    delete jellyfishTargets[jellyfishTargets.count];
  }

  for(var i=0; i < jellyfishTargets.count; i++){

    //SET TIME
    jellyfishTargets[i].time += (param.jSpeed*16/(jellyfishTargets[i].scl+1))*jellyfishTargets[i].speed;

    //MOVE
    var time = new Date().getTime();
    var speed = jellyfishTargets[i].scl*param.jSpeed*2.8;
    var flow = V3.$(
            speed*Math.sin((jellyfishTargets[i].pos[2]+jellyfishTargets[i].id+time/10000)*param.jTurb),
            speed*Math.sin((jellyfishTargets[i].pos[0]+jellyfishTargets[i].id+time/10000)*param.jTurb),
            speed*Math.sin((jellyfishTargets[i].pos[1]+jellyfishTargets[i].id+time/10000)*param.jTurb)
    );

    V3.add(jellyfishTargets[i].pos, flow, jellyfishTargets[i].pos);

    //REPEL
    for(var j=0; j < jellyfishTargets.count; j++){
      if (i != j){
        s1 = jellyfishTargets[i].scl*4;
        s2 = jellyfishTargets[j].scl*4;
        delta = V3.sub(jellyfishTargets[i].pos, jellyfishTargets[j].pos);
        dist = V3.length(delta);// - (jellyfishTargets[i].scl+jellyfishTargets[j].scl)*6;
        dir = V3.normalize(delta);
        //if (dist < 12+s1+s2){

        //force = V3.scale(dir,Math.pow(Math.max(0,(4-dist+s1+s2)),3)*0.25);

        force = V3.scale(dir, Math.pow(1/dist, 3)*20000);


        V3.add(jellyfishTargets[i].pos, force, jellyfishTargets[i].pos);
        //}
      }
    }

    //CENTER
    jellyfishTargets[i].pos[0] *= 0.995;
    jellyfishTargets[i].pos[1] *= 0.995;
    jellyfishTargets[i].pos[2] *= 0.995;

  }

  //console.log('--------jellyfishTargets' + JSON.stringify(jellyfishTargets));
}

var mView;
function drawScene() {
    gl.viewport(0, 0, viewportWidth, viewportHeight);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    mProjection = M4x4.makePerspective(localParam.camera.fov, viewportWidth / viewportHeight, localParam.camera.near, localParam.camera.far);

    mWorld = M4x4.makeTranslate3(0,0,0);
    mView = M4x4.makeTranslate3(0,0,0);

    mView = M4x4.translate3(localParam.camera.translate[0],0,0,mView);
    mView = M4x4.translate3(0,-localParam.camera.translate[1],0,mView);
    mView = M4x4.translate3(0,0,localParam.camera.translate[2],mView);
    mView = M4x4.rotate(localParam.camera.rotate[0],V3.$(1,0,0),mView);
    mView = M4x4.rotate(localParam.camera.rotate[1],V3.$(0,1,0),mView);

	  localParam.camera.eye = V3.$(-mViewInv[12],-mViewInv[13],-mViewInv[14]);

    simulate();
    drawJellyfish();

     gl.flush();
}

jellyfishTargets.objName = "targets";
jellyfishTargets.count = 0;
jellyfishTargets.order = [];
jellyfishTargets.order3D = [];

// JellyfishTarget = function(tx,ty,tz,scl,id,time){
//   this.pos = V3.$(tx,ty,tz);
//   this.scl = scl;
//   this.id = id;
//   this.time = Math.random()*100;
//   this.speed = Math.random()+0.5;
//   this.alive = 1;
// };
// JavaScript Document
function getCurrentTime() {
  localParam.millis = new Date().getTime();
  localParam.timeNow = new Date().getTime();
  if (localParam.lastTime != 0) {
    localParam.elapsed = localParam.timeNow - localParam.lastTime;
    localParam.currentTime =localParam.millis%100000000 / 1000;
  }
  localParam.lastTime = localParam.timeNow;

  localParam.cycle32 = parseInt(localParam.currentTime*30 % 32 + 1);
  localParam.fps = 1000.0/localParam.elapsed;
  localParam.fpsAverage = (localParam.fpsAverage*9+localParam.fps)/10;
}

function tick(){
  getCurrentTime();
  setTimeUniform(localParam.currentTime);
}

function animate(){
  tick();
  drawScene();
}

initBuffers();
initShaders();
initTextures();

gl.clearColor(45/255, 68/255, 91/255, 1);
//     gl.clearColor(0.,0.,0.,0.);
gl.clearDepth(1.);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.enable(gl.BLEND);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
// setInterval(animate, 1000);
setInterval(function() {
	animate();
}, 16);
