precision highp float;

#include <common>

uniform float uTime;
uniform float uIntro;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform sampler2D uRibbonTexture;
uniform sampler2D uBlueNoiseTexture;
uniform float uColorSaturation;
uniform float uColorContrast;
uniform float uColorHueShift;
uniform float uLineAmount;
uniform float uLineThickness;
uniform float uLineDerivativePower;
uniform float uGlowAmount;
uniform float uGlowPower;
uniform float uGlowRamp;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vViewDirection;
varying vec3 vPosition;
varying vec4 vClipPosition;
varying float vElevation;

vec3 applyContrast(vec3 color, float contrast) {
  return (color - 0.5) * contrast + 0.5;
}

vec3 applySaturation(vec3 color, float saturation) {
  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  return mix(vec3(luma), color, saturation);
}

vec3 applyHueShift(vec3 color, float hue) {
  float angle = hue * 6.2831853;
  float s = sin(angle);
  float c = cos(angle);
  mat3 rotation = mat3(
    0.299 + 0.701 * c + 0.168 * s, 0.587 - 0.587 * c + 0.330 * s, 0.114 - 0.114 * c - 0.497 * s,
    0.299 - 0.299 * c - 0.328 * s, 0.587 + 0.413 * c + 0.035 * s, 0.114 - 0.114 * c + 0.292 * s,
    0.299 - 0.300 * c + 1.250 * s, 0.587 - 0.588 * c - 1.050 * s, 0.114 + 0.886 * c - 0.203 * s
  );
  return clamp(rotation * color, 0.0, 1.0);
}

float sampleBlueNoise(vec2 uv) {
  vec2 noiseUv = fract(uv + vec2(fract(uTime * 0.009), fract(uTime * 0.011)));
  return texture2D(uBlueNoiseTexture, noiseUv).r - 0.5;
}

void main() {
  float intro = smoothstep(0.0, 1.0, uIntro);
  vec3 normal = normalize(vNormal);
  vec3 tangent = normalize(vTangent);
  vec3 viewDirection = normalize(vViewDirection);

  vec2 ribbonUv = vUv;
  ribbonUv.x = mix(0.28, 0.985, pow(clamp(vUv.x, 0.0, 1.0), 0.84));
  ribbonUv.y = mix(0.03, 0.99, vUv.y);
  vec4 ribbon = texture2D(uRibbonTexture, ribbonUv);
  float baseAlpha = ribbon.a;
  vec3 baseColor = ribbon.rgb;
  float sampleX = ribbonUv.x;

  float facing = clamp(1.0 - max(dot(normal, viewDirection), 0.0), 0.0, 1.0);
  float fresnel = pow(facing, 1.24);
  float foldMask = smoothstep(0.8, 0.965, sampleX);
  float shoulderMask = smoothstep(0.24, 0.5, sampleX) * (1.0 - smoothstep(0.62, 0.78, sampleX));
  float coreMask = smoothstep(0.56, 0.78, sampleX) * (1.0 - smoothstep(0.8, 0.92, sampleX));
  float rimMask = smoothstep(0.9, 0.995, sampleX);
  float verticalFade = smoothstep(0.02, 0.22, vUv.y) * (1.0 - smoothstep(0.9, 1.0, vUv.y));
  float diagonalPresence = smoothstep(-0.08, 0.22, vUv.x - (1.0 - vUv.y) * 0.42);
  float structureMask = clamp(baseAlpha * verticalFade * diagonalPresence, 0.0, 1.0);

  float flowDirection = dot(normalize(tangent.xy + vec2(0.0001, 0.0001)), normalize(vec2(0.92, -0.4)));
  float linePhase =
    vUv.x * max(uLineAmount, 1.0)
    + vUv.y * (12.0 + flowDirection * 4.0)
    - uTime * 0.2
    + vElevation * 8.0;
  float lineSignal = abs(sin(linePhase));
  float lineWidth = fwidth(linePhase) * mix(0.72, 1.56, clamp(uLineThickness, 0.0, 1.0)) + 0.004;
  float primaryLine = 1.0 - smoothstep(1.0 - lineWidth, 1.0, lineSignal);

  float microPhase = vUv.x * (uLineAmount * 0.46) - vUv.y * 18.0 - uTime * 0.08 + vElevation * 4.0;
  float microSignal = abs(sin(microPhase));
  float microWidth = fwidth(microPhase) * 0.8 + 0.003;
  float microLine = 1.0 - smoothstep(1.0 - microWidth, 1.0, microSignal);

  float lineMask = clamp(shoulderMask * 0.46 + coreMask * 0.92 + foldMask * 0.88, 0.0, 1.0) * structureMask;
  float filament = max(primaryLine, microLine * 0.58);
  filament = pow(max(filament, 0.0), max(uLineDerivativePower, 0.001));
  filament *= lineMask;

  float uvCurve = length(dFdy(vUv)) + length(dFdx(vUv));
  float clipLift = clamp(1.0 - abs(vClipPosition.y / max(vClipPosition.w, 0.0001)) * 0.65, 0.0, 1.0);
  float glowSignal = clamp(fresnel * 0.6 + foldMask * 0.9 + rimMask * 0.38 + uvCurve * 18.0 + clipLift * 0.12, 0.0, 1.0);
  float glow = pow(glowSignal, max(uGlowPower, 0.001)) * uGlowAmount * structureMask;
  glow *= uGlowRamp;

  vec3 lineColor = mix(vec3(1.0, 0.89, 0.7), vec3(0.86, 0.93, 1.0), clamp(foldMask * 0.72 + rimMask * 0.56, 0.0, 1.0));
  vec3 glowColor = mix(vec3(1.0, 0.83, 0.52), vec3(0.66, 0.77, 1.0), clamp(foldMask * 0.6 + rimMask * 0.9, 0.0, 1.0));
  vec3 color = baseColor * mix(0.82, 1.0, diagonalPresence);
  color += lineColor * filament * 0.24;
  color += glowColor * glow * 0.16;
  color += vec3(1.0, 0.97, 0.92) * fresnel * foldMask * structureMask * 0.08;

  vec3 keyLightDirection = normalize(vec3(0.42, 0.54, 0.73));
  float nDotL = max(dot(normal, keyLightDirection), 0.0);
  vec3 halfVector = normalize(keyLightDirection + viewDirection);

  vec3 tangentCandidate = tangent - normal * dot(tangent, normal);
  if (dot(tangentCandidate, tangentCandidate) < 0.00001) {
    tangentCandidate = abs(normal.y) < 0.999 ? cross(vec3(0.0, 1.0, 0.0), normal) : cross(vec3(1.0, 0.0, 0.0), normal);
  }
  vec3 tangentDir = normalize(tangentCandidate);
  vec3 bitangentDir = normalize(cross(normal, tangentDir));

  float nDotH = max(dot(normal, halfVector), 0.0);
  float tDotH = dot(tangentDir, halfVector);
  float bDotH = dot(bitangentDir, halfVector);

  float broadAniso = pow(clamp(1.0 - abs(bDotH), 0.0, 1.0), 2.4) * pow(clamp(1.0 - abs(tDotH), 0.0, 1.0), 0.6);
  float tightAniso = pow(clamp(1.0 - abs(bDotH), 0.0, 1.0), 12.0) * pow(clamp(1.0 - abs(tDotH), 0.0, 1.0), 1.8);
  float broadSheen = broadAniso * pow(nDotH, 5.0) * 0.14;
  float tightSheen = tightAniso * pow(nDotH, 34.0) * 0.22;
  float sheenBias = mix(0.84, 1.2, clamp(fresnel * 0.72 + foldMask * 0.52 + rimMask * 0.34, 0.0, 1.0));
  float silkSpec = clamp((broadSheen + tightSheen) * nDotL * sheenBias * structureMask, 0.0, 0.28);
  vec3 specColor = mix(vec3(1.0, 0.91, 0.76), vec3(0.84, 0.93, 1.0), clamp(foldMask * 0.62 + rimMask * 0.9, 0.0, 1.0));
  color += specColor * silkSpec;

  float grain = sampleBlueNoise(gl_FragCoord.xy / max(uResolution.xy, vec2(1.0)));
  color += grain * 0.014;
  color = applyHueShift(color, uColorHueShift);
  color = applySaturation(color, uColorSaturation);
  color = applyContrast(color, uColorContrast);

  float alpha = baseAlpha;
  alpha += filament * 0.08;
  alpha += glow * 0.045;
  alpha += grain * 0.004;
  alpha = clamp(alpha * intro * diagonalPresence, 0.0, 0.98);

  gl_FragColor = vec4(max(color, vec3(0.0)), alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
