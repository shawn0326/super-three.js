export default /* glsl */`
// @THREE-Modification Cartesian3 to webgl
#ifdef USE_CARTESIAN3
    vec3 transformed = czm_converPosition(position);
#else
    vec3 transformed = vec3( position );
#endif

`;
