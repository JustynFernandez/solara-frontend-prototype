precision highp float;

uniform float uTime;
uniform float uIntro;
uniform vec2 uMouse;
uniform float uDisplaceFrequencyX;
uniform float uDisplaceFrequencyZ;
uniform float uDisplaceAmount;
uniform float uTwistFrequencyX;
uniform float uTwistFrequencyY;
uniform float uTwistFrequencyZ;
uniform float uTwistPowerX;
uniform float uTwistPowerY;
uniform float uTwistPowerZ;

attribute vec4 tangent;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vViewDirection;
varying vec3 vPosition;
varying vec4 vClipPosition;
varying float vElevation;

mat3 rotateX(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, -s,
    0.0, s, c
  );
}

mat3 rotateY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
}

mat3 rotateZ(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, -s, 0.0,
    s, c, 0.0,
    0.0, 0.0, 1.0
  );
}

void main() {
  vUv = uv;

  float intro = smoothstep(0.0, 1.0, uIntro);
  float time = uTime * 0.18;
  vec3 transformed = position;

  vec2 anchor = vec2(0.84, 0.34);
  float foldBias = smoothstep(0.48, 1.0, uv.x);
  float faceBias = smoothstep(0.08, 0.82, uv.x) * (1.0 - smoothstep(0.92, 1.0, uv.x));
  float crestBias = smoothstep(0.14, 0.94, uv.y);
  float shoulderBias = smoothstep(0.22, 0.72, uv.x) * (1.0 - smoothstep(0.82, 0.95, uv.x)) * crestBias;
  float bodyBias = faceBias * smoothstep(0.1, 0.86, uv.y);

  float waveA = sin(position.y * uDisplaceFrequencyX * 0.08 + time);
  float waveB = cos(position.x * 0.052 + position.y * uDisplaceFrequencyZ * 0.06 - time * 0.62);
  float waveC = sin((uv.x * 1.7 + uv.y * 0.76) * 3.14159265 - time * 0.26);
  float drift = waveA * 0.42 + waveB * 0.38 + waveC * 0.2;

  transformed.z += drift * uDisplaceAmount * (0.035 + bodyBias * 0.18 + foldBias * 0.52) * intro;
  transformed.z += sin((uv.y * 0.66 + time * 0.025) * 3.14159265) * uDisplaceAmount * 0.048 * shoulderBias * intro;
  transformed.x += waveB * uDisplaceAmount * 0.038 * shoulderBias * intro;
  transformed.x -= waveC * uDisplaceAmount * 0.016 * faceBias * (1.0 - foldBias) * intro;
  transformed.y += waveA * uDisplaceAmount * 0.024 * (0.08 + faceBias * 0.24) * intro;
  transformed.y -= waveC * uDisplaceAmount * 0.018 * foldBias * intro;

  vec2 mouseDelta = (uMouse - anchor) * 2.0;
  transformed.x += mouseDelta.x * (0.02 + foldBias * 0.082) * intro;
  transformed.y += mouseDelta.y * (0.01 + faceBias * 0.038) * intro;
  transformed.z += (mouseDelta.x * 0.03 + mouseDelta.y * 0.022) * foldBias * intro;

  float twistX = sin((uv.y + time * 0.05) * 3.14159265 * uTwistFrequencyX) * uTwistPowerX * (0.1 + faceBias * 0.42) * intro;
  float twistY = cos((uv.x - time * 0.04) * 3.14159265 * uTwistFrequencyY) * uTwistPowerY * (0.14 + foldBias * 0.56) * intro;
  float twistZ = sin((uv.x + uv.y + time * 0.03) * 3.14159265 * uTwistFrequencyZ) * uTwistPowerZ * (0.12 + shoulderBias * 0.48) * intro;
  mat3 twistMatrix = rotateZ(twistZ) * rotateY(twistY) * rotateX(twistX);

  transformed = twistMatrix * transformed;
  vec3 rotatedNormal = normalize(twistMatrix * normal);
  vec3 rotatedTangent = normalize(twistMatrix * tangent.xyz);

  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
  vec4 viewPosition = viewMatrix * worldPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;

  vViewDirection = normalize(cameraPosition - worldPosition.xyz);
  vNormal = normalize(normalMatrix * rotatedNormal);
  vTangent = normalize(normalMatrix * rotatedTangent);
  vPosition = transformed;
  vClipPosition = clipPosition;
  vElevation = transformed.z;

  gl_Position = clipPosition;
}
