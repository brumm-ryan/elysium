
varying vec2 v_uv;
uniform vec3 light;
uniform vec3 dark;
uniform float dots;
uniform float radius;
uniform float blur;
const float ambient = .4;
const vec3 lightDir = normalize(vec3(1,1,1));

varying vec3 l_normal;

float fdot(vec2 uv) {
    float x = uv.x * dots;
    float y = uv.y * dots;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    float a = blur > -.5 ? blur: fwidth(d);
    float dc = 1.0-smoothstep(radius-a,radius+a,d);

    return dc;
}

void main()
{
    float dc = fdot(v_uv);
    vec3 baseColor = mix(light,dark,dc);
    vec3 nhat = normalize(l_normal);

    float bright = clamp(dot(nhat, lightDir),0.0,1.0);
    bright = clamp(bright+ambient,0.0,1.0);
    gl_FragColor = vec4(bright * baseColor,1);
}