#version 300 es // GLSL のバージョン指定 (GLSL ES3.0)
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;
int channel;

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

    // 階調数
    float n = 5.0;

    // フラグメント座標範囲を [0,n] 区間にスケート
    pos *= n;

    // ビューポートを分けます
    channel = int(2.0 * gl_FragCoord.x / u_resolution.x);

    if (channel == 0) 
    {
        // 左 : 階段関数を使った補間
        // 床関数というは最大の整数値 = [nx] ==> [4.2] = 4, [-0.2] = -1
        // [nx] + step(0.5, fract(nx)) / n
        // 例 
        pos = floor(pos) + step(0.5, fract(pos));
    }
    else
    {
        // 右 : 滑らかな階段関数を使った補間
        // 範囲の始点と終点を動かすパラメータ
        float thr = 0.25 * sin(u_time);
        pos = floor(pos) + smoothstep(0.25 + thr, 0.75 - thr, fract(pos));
    }

    pos /= n;
    vec3 col = mix(mix(col4[0], col4[1], pos.x), mix(col4[2], col4[3], pos.x), pos.y);
    fragColor = vec4(col, 1.0);
}