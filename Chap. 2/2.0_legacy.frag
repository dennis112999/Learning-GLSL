#version 300 es
precision highp float;
out vec4 fragColor;
uniform float u_time;
uniform vec2 u_resolution;

const float RANDOM_SCALE_1D = 1000.0;

const vec2 RANDOM_OFFSET_2D = vec2(12.9898, 78.233);
const float RANDOM_SCALE_2D = 43758.5453123;

int channel;

// 疑似ランダム関数 - 「fract + sin + 1次元入力 → 1次元出力」という意味
float fractSin11 (float x)
{
    return fract(RANDOM_SCALE_1D * sin(x));
}

// 疑似ランダム関数 - 「fract + sin + 2次元入力 → 1次元出力」という意味
float fractSin21(vec2 xy)
{
    return fract(sin(dot(xy, RANDOM_OFFSET_2D)) * RANDOM_SCALE_2D);
}

void main()
{
    vec2 pos = gl_FragCoord.xy;
    pos += floor(60.0 * u_time);
    channel = int (2.0 * gl_FragCoord.x / u_resolution.x);

    if(channel == 0)
    {
        fragColor = vec4(fractSin11(pos.x));
    }
    else
    {
        fragColor = vec4(fractSin21(pos.xy / u_resolution.xy));
    }

    fragColor.a = 1.0;

}