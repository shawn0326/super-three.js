export default /* glsl */`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		uniform float logDepthCameraNear; // @THREE-Modification modify log depth encoding
		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;
		uniform float logDepthCameraNear; // @THREE-Modification modify log depth encoding

	#endif

#endif
`;
