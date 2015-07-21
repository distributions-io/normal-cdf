'use strict';

// MODULES //

var erf = require( 'compute-erf/lib/number.js' );


// FUNCTIONS //

var sqrt = Math.sqrt;


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma )
*	Partially applies mean `mu` and standard deviation `sigma` and returns a function for evaluating the cumulative distribution function (CDF) for a Normal distribution.
*
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Function} CDF
*/
function partial( mu, sigma ) {
	var A = 1 / 2,
		B = sigma * sqrt( 2 );
	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function (CDF) for a Normal distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	if( sigma === 0 ) {
		return function cdf( x ) {
			return (x < mu) ? 0 : 1;
		};
	}
	return function cdf( x ) {
		var C = x - mu;
		return A * ( 1 + erf( C / B ) );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
