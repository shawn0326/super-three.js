// @THREE-Modification
// for color mapping
export default /* glsl */`
#ifdef COLOR_MAPPING
	
	#if COLOR_MAPPING == 1

    	float gray = clamp( dot( diffuseColor.rgb, vec3(0.333, 0.333, 0.333) ), 0.0, 1.0 );
		diffuseColor.rgb = texture2D( colorMapping, vec2( gray, 0.5 ) ).rgb;

	#elif COLOR_MAPPING == 2

		float hue = rgb2hsb( diffuseColor.rgb ).x;
		diffuseColor.rgb = texture2D( colorMapping, vec2( hue, 0.5 ) ).rgb;

	#endif

#endif	  
`;
