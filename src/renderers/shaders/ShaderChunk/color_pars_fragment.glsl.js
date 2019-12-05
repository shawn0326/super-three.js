export default /* glsl */`
#ifdef USE_COLOR

	varying vec3 vColor;

#endif

// @THREE-Modification
// add alpha attribute support

#ifdef USE_ALPHAINDEX

	varying float vAlpha;

#endif
`;
