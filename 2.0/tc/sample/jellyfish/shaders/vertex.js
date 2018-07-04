var shader = "precision highp float;\
attribute vec3 aVertexPosition;\
attribute vec3 aVertexNormal;\
attribute vec3 aVertexColor;\
attribute vec3 aTextureCoord;\
attribute vec4 aSkinWeight;\
uniform mat4 uWorld;\
uniform mat4 uViewInv;\
uniform mat4 uWorldView;\
uniform mat4 uWorldViewProj;\
uniform mat4 uJoint0;\
uniform mat4 uJoint1;\
uniform mat4 uJoint2;\
uniform mat4 uJoint3;\
uniform mat4 uJoint0InvTranspose;\
uniform float uCurrentJellyfishTime;\
varying mediump vec4 vWorld;\
varying mediump vec3 vTextureCoord;\
varying mediump vec3 vDiffuse;\
varying mediump vec3 vFresnel;\
void main(void) {\
  float dpi = 6.2831853;\
  float pi = 3.14159265;\
  float hpi = 1.570796325;\
  float time = mod(uCurrentJellyfishTime+aVertexPosition.y, dpi);\
  float offset = smoothstep(0.0,1.,max(0.,-aVertexPosition.y-0.8)/10.);\
  highp vec3 anim = (vec3(aVertexColor.x,aVertexColor.y,aVertexColor.z)/8.0*sin(time) * (1.-offset));\
  highp vec3 pos = aVertexPosition + anim;\
  pos = vec3(uJoint0 * vec4(pos, 1.0))*aSkinWeight.x +\
        vec3(uJoint1 * vec4(pos, 1.0))*aSkinWeight.y +\
        vec3(uJoint2 * vec4(pos, 1.0))*aSkinWeight.z +\
        vec3(uJoint3 * vec4(pos, 1.0))*aSkinWeight.w;\
  vec3 nrm = vec3(uJoint0InvTranspose * vec4(aVertexNormal, 1.0));\
  vWorld =               uWorld * vec4(pos, 1.0);\
  highp vec4 WorldViewProj =       uWorldViewProj * vec4(pos, 1.0);\
  vec3 VertexNormal = normalize(nrm);\
  vec3 WorldEyeVec = normalize(vWorld.xyz - uViewInv[3].xyz);\
  vec3 lightDir = vec3(0.0,1.0,0.0);\
  vec3 lightCol = vec3(0.6,0.4,0.1);\
  vec3 ambientCol = vec3(0.5,0.2,0.1);\
  float diffuseProduct = max(dot(normalize(VertexNormal.xyz), lightDir), 0.0);\
  vDiffuse = lightCol * vec3(diffuseProduct) + ambientCol;\
  vec3 fresnelColor = vec3(0.2,0.5,0.6);\
  float fresnelProduct = pow(1.0-max(abs(dot(VertexNormal, -WorldEyeVec)), 0.0), 2.0);\
  vFresnel = fresnelColor * vec3(fresnelProduct);\
  vTextureCoord = aTextureCoord;\
  gl_Position = WorldViewProj;\
}";

module.exports={
  "shader":shader
}
