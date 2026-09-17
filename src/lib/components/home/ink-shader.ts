export const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/** A screen, not a texture: a dark surface with a drifting dot matrix and one
 *  slow bloom. Organic turbulence read as a lava lamp, which is why it is gone. */
export const FRAG = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uBase;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float aspect = iResolution.x / max(iResolution.y, 1.0);

  // The matrix drifts rather than scrolls, so nothing in it reads as a direction.
  float drift = iTime * 0.012;
  vec2 g = (uv + vec2(drift, drift * 0.55)) * vec2(aspect, 1.0) * 52.0;
  vec2 cell = fract(g) - 0.5;
  float matrix = 1.0 - smoothstep(0.1, 0.3, length(cell));

  // One bloom, breathing on a long period so the surface is never flat.
  vec2 at = vec2(0.3 + 0.04 * sin(iTime * 0.09), 0.76 + 0.03 * cos(iTime * 0.07));
  float bloom = smoothstep(1.05, 0.0, length((uv - at) * vec2(1.35, 1.0)));

  vec3 base = uBase * 0.12;
  vec3 lit = uBase * 0.44;
  vec3 col = mix(base, lit, bloom * 0.6);
  col += matrix * 0.05 * uBase;

  fragColor = vec4(col, 1.0);
}
`;
