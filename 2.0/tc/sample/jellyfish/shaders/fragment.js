var shader = "precision mediump float;\
uniform sampler2D uSampler0;\
uniform sampler2D uSampler1;\
uniform sampler2D uSampler2;\
uniform float uCurrentTime;\
varying vec4 vWorld;\
varying vec3 vTextureCoord;\
varying vec3 vDiffuse;\
varying vec3 vFresnel;\
void main(void) {\
  vec3 caustics = texture2D(uSampler1, vec2((vWorld.x)/48.+uCurrentTime/12., (vWorld.z-vWorld.y)/95.)).rgb;\
  vec4 colorMap = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));\
  gl_FragColor = vec4(((vDiffuse + caustics)*colorMap.rgb) + vFresnel, colorMap.a);\
}"

module.exports={
  "shader": shader
}
