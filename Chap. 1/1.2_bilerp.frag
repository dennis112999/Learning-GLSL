#version 300 es // GLSL のバージョン指定 (GLSL ES3.0)
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;

void main()
{
    // フラグメント座標を正規化
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;
    vec3[4] col4 = vec3[]
    (
        vec3(1.0, 0.0, 0.0), // 赤
        vec3(0.0, 0.0, 1.0), // 青
        vec3(0.0, 1.0, 0.0), // 緑
        vec3(1.0, 1.0, 0.0)  // 黃
    );

    // 双線型補間 (bilinear interpolation) - 2変数にすることで、二次元区間上での補間を行います
    // f(x,y) = mix(mix(a,b,x), mix(c,d,x), y);
    // 例 f(0,0) = a, 
    //    f(1,0) = b, 
    //    f(0,1) = c, 
    //    f(1,1) = d
    // 
    // val1 = x軸上で赤と青を補間した値
    // val2 = x軸上で緑と黄色を補間した値
    // col  = y軸上で val1 と val2 を補間した結果
    vec3 col = mix(mix(col4[0], col4[1], pos.x), mix(col4[2], col4[3], pos.x), pos.y);
    fragColor = vec4(col, 1.0);
}