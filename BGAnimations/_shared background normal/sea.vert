#version 120

attribute vec4 TextureMatrixScale;
varying vec2 textureCoord;
uniform mat4 textureMatrix;
uniform vec2 offsetBack;
varying vec2 sea_uv_1;
varying vec2 sea_uv_2;
varying vec2 stars_uv;
uniform float t;
uniform sampler2D colormap;
uniform float daytime;

varying vec3 WATER_COL;
varying vec3 WATER2_COL;
varying vec3 FOAM_COL;
varying vec3 BEACH_WATER_COLOR;
varying vec3 DEEP_WATER_COLOR;

void main() {
    gl_Position = (gl_ModelViewProjectionMatrix * gl_Vertex);
    textureCoord = ((textureMatrix * gl_MultiTexCoord0 * TextureMatrixScale) + (gl_MultiTexCoord0 * (vec4(1)-TextureMatrixScale))).xy * 10.5;
    
    // Texture distortion
    float d1 = t * 0.07 + mod(textureCoord.x + textureCoord.y, 6.283185307);
    float d2 = t * 0.5 + mod((textureCoord.x + textureCoord.y + 0.25) * 1.3, 18.84955592);
    vec2 dist = vec2(
        sin(d1) * 0.15 + sin(d2) * 0.05,
        cos(d1) * 0.15 + cos(d2) * 0.05
    );
    sea_uv_1 = textureCoord + dist.xy + offsetBack+ vec2(t * -0.005);
    sea_uv_2 = vec2(1.0) - textureCoord - dist.yx + vec2(t * -0.005);
    stars_uv = vec2(1.0) - textureCoord - dist.yx * 1.25 + vec2(0.1, 0.5);
    
    WATER_COL = texture2D(colormap, vec2(71. / 128., daytime)).xyz;
    WATER2_COL = texture2D(colormap, vec2(72. / 128., daytime)).xyz;
    FOAM_COL = texture2D(colormap, vec2(73. / 128., daytime)).xyz;
    BEACH_WATER_COLOR = texture2D(colormap, vec2(74. / 128., daytime)).xyz;
    DEEP_WATER_COLOR = texture2D(colormap, vec2(75. / 128., daytime)).xyz;
}