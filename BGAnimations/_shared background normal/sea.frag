#version 120

uniform float t;

varying vec2 textureCoord;
varying vec2 sea_uv_1;
varying vec2 sea_uv_2;
varying vec2 stars_uv;
uniform sampler2D sampler0;
uniform float daytime;

varying vec3 WATER_COL;
varying vec3 WATER2_COL;
varying vec3 FOAM_COL;
varying vec3 BEACH_WATER_COLOR;
varying vec3 DEEP_WATER_COLOR;

void main(void) {
    float deepwater_base = step((textureCoord.y * 8.0) + abs(fract(t * 0.1) * 4.0 - 2.0), sin(textureCoord.x * 3.0 + t * 0.5) * 2.0 + 20.0);
    vec3 mix_water_2 = mix(DEEP_WATER_COLOR, WATER_COL, deepwater_base);
    vec3 mix_water = mix(mix_water_2, WATER2_COL, step(0.9, texture2D(sampler0, sea_uv_1).g) * mix(0.54, deepwater_base, smoothstep(0.5, 1., daytime)));
    float beach_water_section = step((textureCoord.y * 8.0) + abs(fract(t * 0.1) * 4.0 - 2.0), sin(textureCoord.x * 3.0 + t * 0.5) + 7.0);
    vec3 ret = mix(mix_water, BEACH_WATER_COLOR, beach_water_section * 0.28);
    ret = mix(ret, FOAM_COL, step(0.9, texture2D(sampler0, sea_uv_2).g));
    ret = mix(ret, vec3(0.7608, 0.8549, 0.9843), step(0.72, texture2D(sampler0, stars_uv).a) * (1. - beach_water_section) * smoothstep(0.5, 1., daytime));
    gl_FragColor = vec4(ret, 1.0);
}