// @THREE-Modification
// for color mapping
export default /* glsl */`
  #ifdef COLOR_MAPPING
    uniform sampler2D colorMapping;
  #endif
`;
