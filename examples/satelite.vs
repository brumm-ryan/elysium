/*
 * Displacement Map Dot Shader
 * implements a basic displacement map on the vertices
 * uses the dot pattern as the map
 */
/* number of dots over the UV range */
uniform float dots;
/* how big are the circles */
uniform float radius;
/* amount of blur - -1 means do it "correctly" */
uniform float blur;

/* amount to displace */
uniform float disp;

// dot pattern function - returns 1 if inside of a dot, 0 if outside of a dot
// does various forms of anti-aliasing based on the blur parameter
float fdot(vec2 uv) {
    float x = uv.x * dots;
    float y = uv.y * dots;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    // if the blur is positive, use it for blurring
    // if the blur is negative - compute the amount of bluring using fwidth
    float a = blur;
    float dc = 1.0-smoothstep(radius-a,radius+a,d);

    return dc;
}

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// in vec3 position;
// in vec3 normal;

// The varying is the "output" to the fragment shader
// I call it v_normal to remind myself that it is for the vertex
// the fragment shader will get interpolated values
/* pass interpolated variables to the fragment */
varying vec2 v_uv;
varying vec3 l_normal;
varying vec3 v_world_position;

void main() {
    v_uv = uv;

    // compute the map value (the amount of displacement for the displacement map)
    float d = fdot(uv);

    // displacement map...
    // we move the position in the direction of the normal
    vec4 world_pos = (modelMatrix * vec4(position + disp * d * normal,1.0));
    v_world_position = world_pos.xyz;
    
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * viewMatrix * world_pos;
    
    // compute the normal and pass it to fragment
    // note - this is in world space, but uses a hack that
    // assumes the model matrix is its own adjoint 
    // (which is true, sometimes)
    // note: this normal is wrong! we use the normal from the original
    // object before displacement mapping as a simple approximation to
    // the resulting normal
    // actually computing the real normal for the displacement map is hard
    l_normal = (modelMatrix * vec4(normal,0)).xyz;
}