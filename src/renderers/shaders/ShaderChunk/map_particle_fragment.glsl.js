export default /* glsl */`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	// vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	// @THREE-Modification

	vec2 uv;

	if ( imageRatio > 1.0 ) {

		uv = ( uvTransform * vec3( gl_PointCoord.x * imageRatio + ( 1.0 - imageRatio ) / 2.0, 1.0 - gl_PointCoord.y, 1.0 ) ).xy;

	} else {

		uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y / imageRatio - ( 1.0 - 1.0 / imageRatio ) / 2.0, 1.0 ) ).xy;

	}

#endif

#ifdef USE_MAP

	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`;
