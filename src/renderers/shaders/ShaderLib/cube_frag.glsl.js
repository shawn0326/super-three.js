export default /* glsl */`
#include <envmap_common_pars_fragment>
uniform float opacity;

// @THREE-Modification
uniform mat4 colorMatrix;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>

	// @THREE-Modification
	gl_FragColor = colorMatrix * envColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`;
