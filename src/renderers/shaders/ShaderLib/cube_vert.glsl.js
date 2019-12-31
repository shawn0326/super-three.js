export default /* glsl */`
// @THREE-Modification
uniform vec4 cubeQuat;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 cubeDir = transformDirection( position, modelMatrix );
	vWorldDirection = applyQuaternion( cubeDir, cubeQuat ); // @THREE-Modification

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`;
