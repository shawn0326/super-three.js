export default /* glsl */`
#ifdef USE_COLOR

	diffuseColor.rgb *= vColor;

#endif

// @THREE-Modification
// add alpha attribute support

#ifdef USE_ALPHAINDEX

	diffuseColor.a *= vAlpha;

#endif
`;
