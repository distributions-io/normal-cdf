'use strict';

// MODULES //

var partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( out, arr, mu, sigma, accessor )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cdf( y, x, mu, sigma, clbk ) {
	var len = x.length,
		fcn,
		v, i;

	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = fcn( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
