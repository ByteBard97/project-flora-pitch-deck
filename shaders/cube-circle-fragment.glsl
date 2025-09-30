#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

// Common helper functions from common.glsl

// Hexagon vertices (from common.glsl)
vec2[6] vID = vec2[6](vec2(-.5, -2./6.)/vec2(.5, 1), vec2(-.5, 2./6.)/vec2(.5, 1), vec2(0, 2./3.)/vec2(.5, 1),
                      vec2(.5, 2./6.)/vec2(.5, 1), vec2(.5, -2./6.)/vec2(.5, 1), vec2(0, -2./3.)/vec2(.5, 1));

// Standard 2D rotation formula.
mat2 rot2(in float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// IQ's vec2 to float hash.
float hash21(vec2 p){
    return fract(sin(mod(dot(p, vec2(27.619, 57.583)), 6.2831589))*43758.5453);
}

// Compact, self-contained version of IQ's 2D value noise function.
float n2D(vec2 p){
    const vec2 s = vec2(1, 113);
    vec2 ip = floor(p); p -= ip;
    vec4 h = vec4(0., s.x, s.y, s.x + s.y) + dot(ip, s);
    p = p*p*(3. - 2.*p);
    h = fract(sin(mod(h, 6.2831589))*43758.5453);
    h.xy = mix(h.xy, h.zw, p.y);
    return mix(h.x, h.y, p.x);
}

// FBM -- 4 accumulated noise layers of modulated amplitudes and frequencies.
float fbm(vec2 p){ return n2D(p)*.533 + n2D(p*2.)*.267 + n2D(p*4.)*.133 + n2D(p*8.)*.067; }

// This will draw a box (no caps) of width "ew" from point "a "to "b".
float lBox(vec2 p, vec2 a, vec2 b, float ew){
    float ang = atan(b.y - a.y, b.x - a.x);
    p = rot2(ang)*(p - mix(a, b, .5));
   vec2 l = vec2(length(b - a), ew);
   vec2 d = abs(p) - (l + ew)/2.;
   return min(max(d.x, d.y), 0.) + length(max(d, 0.));
}

// IQ's distance to a regular polygon - takes array like ShaderToy
float sdPoly4(in vec2 p, in vec2[4] v){
    float d = dot(p - v[0], p - v[0]);
    float s = 1.0;

    int j = 3;
    for(int i = 0; i < 4; i++){
        vec2 e = v[j] - v[i];
        vec2 w = p - v[i];
        vec2 b = w - e*clamp(dot(w, e)/dot(e, e), 0., 1.);
        d = min(d, dot(b,b));

        bvec3 cond = bvec3(p.y >= v[i].y, p.y < v[j].y, e.x*w.y > e.y*w.x);
        if(all(cond) || all(not(cond))) s *= -1.0;
        j = i;
    }
    return s*sqrt(d);
}

// Signed distance to a regular hexagon
float sdHexagon(in vec2 p, in float r){
    const vec3 k = vec3(-.8660254, .5, .57735);
    p = abs(p);
    p -= 2.*min(dot(k.xy, p), 0.)*k.xy;
    return length(p - vec2(clamp(p.x, -k.z*r, k.z*r), r))*sign(p.y - r);
}

vec3 pencil(vec3 col, vec2 p){
    vec2 q = p*4.;
    const vec2 sc = vec2(1, 12);
    q += (vec2(n2D(q*4.), n2D(q*4. + 7.3)) - .5)*.03;
    q *= rot2(-3.14159/2.5);
    col = min(col, 1.);
    float gr = (dot(col, vec3(.299, .587, .114)));
    float ns = (n2D(q*sc)*.66 + n2D(q*2.*sc)*.34);
    q *= rot2(3.14159/2.);
    float ns2 = (n2D(q*sc)*.66 + n2D(q*2.*sc)*.34);
    q *= rot2(-3.14159/5.);
    float ns3 = (n2D(q*sc)*.66 + n2D(q*2.*sc)*.34);
    const float contrast = 1.;
    ns = (.5 + (gr - (max(max(ns, ns2), ns3)))*contrast);
    return vec3(clamp(ns, 0., 1.));
}

// Main cube-circle shader (from ShaderToy)
{{SHADER:shaders/cube-circle.glsl}}

void main() {
    mainImage(fragColor, gl_FragCoord.xy);
}
