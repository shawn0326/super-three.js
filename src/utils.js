function arrayMin( array ) {

	if ( array.length === 0 ) return Infinity;

	let min = array[ 0 ];

	for ( let i = 1, l = array.length; i < l; ++ i ) {

		if ( array[ i ] < min ) min = array[ i ];

	}

	return min;

}

function arrayMax( array ) {

	if ( array.length === 0 ) return - Infinity;

	let max = array[ 0 ];

	for ( let i = 1, l = array.length; i < l; ++ i ) {

		if ( array[ i ] > max ) max = array[ i ];

	}

	return max;

}

function isEmptyObject( obj ) {	// @THREE-Modification optimize userData clone.

	if ( ! obj ) {

		return false;

	}

	for ( const prop in obj ) {

		if ( Object.hasOwn( obj, prop ) ) {

			return false;

		}

	}

	return true;

}

export { arrayMin, arrayMax, isEmptyObject };
