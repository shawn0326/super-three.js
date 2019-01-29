export default /* glsl */`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

// @THREE-Modification
uniform mat4 colorMatrix;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	// @THREE-Modification
	gl_FragColor = colorMatrix * mapTexelToLinear( texColor );
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`;
