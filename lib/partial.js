'use strict';

// FUNCTIONS //


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

	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function (CDF) for a Normal distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	return function cdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
