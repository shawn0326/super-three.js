// @THREE-Modification
// for color mapping
export default /* glsl */`
  #ifdef COLOR_MAPPING
    float gray = clamp( dot( diffuseColor.rgb, vec3(0.333, 0.333, 0.333) ), 0.0, 1.0 );
    diffuseColor.rgb = texture2D( colorMapping, vec2( gray, 0.5 ) ).rgb;
  #endif
`;
