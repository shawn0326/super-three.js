export default /* glsl */`
#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor.xyz *= color.xyz;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif

// @THREE-Modification
// add alpha attribute support

#ifdef USE_ALPHAINDEX

	vAlpha = alphaIndex;

#endif

// @THREE-Modification
// INSTANCED

#ifdef INSTANCED

	#ifdef USE_COLOR

		vColor.xyz = instanceColor.xyz;

	#endif
	
#endif

`;
