export default /* glsl */`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float fogDepth;
	// @THREE-Modification
	uniform float fogAlpha;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`;
