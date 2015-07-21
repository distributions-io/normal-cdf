'use strict';

// MODULES //

var partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( out, matrix, mu, sigma )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Matrix} output matrix
*/
function cdf( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'cdf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
