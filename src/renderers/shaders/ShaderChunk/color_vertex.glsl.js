export default /* glsl */`
#ifdef USE_COLOR

	vColor.xyz = color.xyz;

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
