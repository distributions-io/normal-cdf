'use strict';

// MODULES //

var partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( out, arr, mu, sigma )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cdf( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial ( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		y[ i ] = fcn( x[ i ] );
	}
	return y;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
