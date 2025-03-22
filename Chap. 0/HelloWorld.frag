#version 300 es // GLSL のバージョン指定 (GLSL ES3.0)
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;

void main()
{
    // フラグメント座標を正規化
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;
    fragColor = vec4(1.0, pos, 1.0);
}