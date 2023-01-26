#define saturate(i) clamp(i,0.,1.)

varying vec2 textureCoord;
varying vec2 imageCoord;

uniform vec2 textureSize;
uniform vec2 imageSize;

uniform float howGray;

uniform sampler2D sampler0;

float rand(float x)
{
 return fract(sin(x) * 43758.5453);
}

float gray( vec3 _i ) {
  return dot( _i, vec3( 0.299, 0.587, 0.114 ) );
}

vec3 lerp( vec3 col1, vec3 col2, float t )
{
	return (1 - t) * col1 + t * col2;
}

//float3 GrayscalePass( float4 vpos : SV_Position, float2 texcoord : TexCoord ) : SV_Target {
void main(void)
{
  
  vec3 tex = texture2D(sampler0, imageCoord).xyz;
  vec3 col = lerp(
    tex,
    gray( tex ),
    howGray
  );

	gl_FragColor = vec4(saturate( col ), 1.0);
}
