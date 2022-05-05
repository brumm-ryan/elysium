
uniform float dots;
uniform float radius;
uniform float blur;
uniform float disp;
float fdot(vec2 uv) {
    float x = uv.x * dots;
    float y = uv.y * dots;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    float a = blur;
    float dc = 1.0-smoothstep(radius-a,radius+a,d);

    return dc;
}
varying vec2 v_uv;
varying vec3 l_normal;
varying vec3 v_world_position;

void main() {
    v_uv = uv;
    float d = fdot(uv);
    vec4 world_pos = (modelMatrix * vec4(position + disp * d * normal,1.0));
    v_world_position = world_pos.xyz;
    gl_Position = projectionMatrix * viewMatrix * world_pos;
    l_normal = (modelMatrix * vec4(normal,0)).xyz;
}