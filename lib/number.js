'use strict';

// MODULES //

var erf = require( 'compute-erf/lib/number.js' );


// FUNCTIONS //

var sqrt = Math.sqrt;


// CDF //

/**
* FUNCTION: cdf( x, mu, sigma )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number} evaluated CDF
*/
function cdf( x, mu, sigma ) {
	if( sigma === 0 ) {
		return (x < mu) ? 0 : 1;
	}
	var A = 1 / 2,
		B = sigma * sqrt( 2 ),
		C = x - mu;
	return A * ( 1 + erf( C / B ) );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
