export default /* glsl */`
#ifdef ALPHATEST

	if ( diffuseColor.a < ALPHATEST ) {

		discard;

	} else {

		// @THREE-Modification
		// Prevent alpha test edge gradient
		diffuseColor.a = opacity;

	}

#endif
`;
