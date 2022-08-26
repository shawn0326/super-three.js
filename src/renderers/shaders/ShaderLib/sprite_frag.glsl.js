export default /* glsl */`
uniform vec3 diffuse;
uniform float opacity;

uniform vec3 highlightColor; // @THREE-Modification highlight color
uniform float highlightIntensity; // @THREE-Modification highlight color

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	outgoingLight = diffuseColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

	// @THREE-Modification highlight color
	gl_FragColor.rgb = gl_FragColor.rgb * ( 1.0 - highlightIntensity ) + highlightColor * highlightIntensity;
}
`;
