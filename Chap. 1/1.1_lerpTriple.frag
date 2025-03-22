#version 300 es // GLSL のバージョン指定 (GLSL ES3.0)
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;

void main()
{
    // フラグメント座標を正規化
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;
    vec3[3] col3 = vec3[]
    (
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0)
    );
    pos.x *= 2.0;
    int ind = int(pos.x);

    // fract(x) = x - [x] --> fract(2.3) = 0.3, fract(-1.8) = 0.2
    vec3 col = mix(col3[ind], col3[ind + 1], fract(pos.x));
    fragColor = vec4(col, 1.0);
}