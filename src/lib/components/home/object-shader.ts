export const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/** Four machined slabs stacked with a lit sliver in every gap: separate parts,
 *  one sealed object, light escaping only between them. Raymarched, no mesh. */
export const FRAG = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uAccent;
uniform vec3 uPanel;
uniform vec2 uPointer;
uniform vec2 uShift;
uniform float uZoom;

out vec4 fragColor;

const int MAX_STEPS = 90;
const float MAX_DIST = 16.0;
const float SURF = 0.002;
const float PITCH = 0.88;
const float SLAB_H = 0.34;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float sdRoundBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

/** x is distance, y is 0 for a slab and 1 for the light in a gap. */
vec2 mapScene(vec3 p) {
  vec3 q = p - vec3(0.0, -1.32, 0.0);
  q.xz *= rot(0.06);
  float d = sdRoundBox(q, vec3(1.18, SLAB_H, 1.18), 0.03);

  q = p - vec3(0.0, -0.44, 0.0);
  q.xz *= rot(-0.11);
  d = min(d, sdRoundBox(q, vec3(1.04, SLAB_H, 1.04), 0.03));

  q = p - vec3(0.0, 0.44, 0.0);
  q.xz *= rot(0.14);
  d = min(d, sdRoundBox(q, vec3(0.9, SLAB_H, 0.9), 0.03));

  q = p - vec3(0.0, 1.32, 0.0);
  q.xz *= rot(-0.07);
  d = min(d, sdRoundBox(q, vec3(0.76, SLAB_H, 0.76), 0.03));

  // The gaps are lit from inside. Inset, so a slab edge always frames the light
  // instead of the light spilling past the silhouette.
  float e = sdRoundBox(p - vec3(0.0, -0.88, 0.0), vec3(1.05, 0.05, 1.05), 0.04);
  e = min(e, sdRoundBox(p, vec3(0.92, 0.05, 0.92), 0.04));
  e = min(e, sdRoundBox(p - vec3(0.0, 0.88, 0.0), vec3(0.78, 0.05, 0.78), 0.04));

  return d < e ? vec2(d, 0.0) : vec2(e, 1.0);
}

vec3 normalAt(vec3 p) {
  vec2 e = vec2(0.0018, 0.0);
  return normalize(vec3(
    mapScene(p + e.xyy).x - mapScene(p - e.xyy).x,
    mapScene(p + e.yxy).x - mapScene(p - e.yxy).x,
    mapScene(p + e.yyx).x - mapScene(p - e.yyx).x
  ));
}

float ambient(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float h = 0.02 + 0.09 * float(i);
    occ += (h - mapScene(p + n * h).x) * sca;
    sca *= 0.82;
  }
  return clamp(1.0 - 1.6 * occ, 0.0, 1.0);
}

/** Distance to the nearest gap between two slabs. */
float seamDistance(vec3 p) {
  return abs(p.y - PITCH * floor(p.y / PITCH + 0.5));
}

void main() {
  float aspect = iResolution.x / max(iResolution.y, 1.0);
  vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / max(iResolution.y, 1.0);
  // The shift is a fraction of the half-extent, so the form sits in the same
  // part of the frame whatever shape the box is.
  uv += vec2(uShift.x * aspect, uShift.y);

  vec3 ro = vec3(0.0, 0.0, 6.1);
  vec3 rd = normalize(vec3(uv, -uZoom));

  // The object turns, the camera never does: inverse-rotating the ray keeps the
  // whole shade in object space, so the seams stay fixed to the slabs.
  float spin = iTime * 0.11 + uPointer.x * 0.45;
  float tilt = 0.1 + uPointer.y * 0.2;
  ro.xz *= rot(spin);
  rd.xz *= rot(spin);
  ro.yz *= rot(tilt);
  rd.yz *= rot(tilt);

  float t = 0.0;
  float id = -1.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    vec2 s = mapScene(ro + rd * t);
    if (s.x < SURF) {
      id = s.y;
      break;
    }
    t += s.x;
    if (t > MAX_DIST) break;
  }

  // The background is never tone mapped: it has to equal the CSS panel colour
  // exactly, or the canvas shows as a lighter rectangle on the stage.
  vec3 col = uPanel + uAccent * 0.03 * smoothstep(2.1, 0.2, length(uv * vec2(0.8, 1.0)));

  if (id > 0.5) {
    // The light itself. Held under 1.0 so the accent stays violet: gained past
    // that it clips the red channel and turns magenta.
    col = uAccent * 0.88;
  } else if (id > -0.5) {
    vec3 p = ro + rd * t;
    vec3 n = normalAt(p);
    vec3 key = normalize(vec3(0.55, 0.85, 0.45));

    float diff = max(dot(n, key), 0.0);
    float occ = ambient(p, n);
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.4);
    float spec = pow(max(dot(reflect(rd, n), key), 0.0), 56.0);

    // Machined graphite: the albedo stays near black and the edges do the work.
    vec3 body = vec3(0.05) * (0.28 + 0.72 * diff) * occ;
    body += vec3(0.92) * fres * 0.42 * occ;
    body += vec3(1.0) * spec * 0.7;

    // Faked bounce off the lit gap. Tight and weak: any more and the graphite
    // reads as a violet object rather than a lit one.
    body += uAccent * exp(-11.0 * seamDistance(p)) * 0.16 * occ;

    body = body / (body + 0.82);
    col = pow(body, vec3(0.4545));
  }

  fragColor = vec4(col, 1.0);
}
`;
