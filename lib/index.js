'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var cdf1 = require( './number.js' ),
	cdf2 = require( './array.js' ),
	cdf3 = require( './accessor.js' ),
	cdf4 = require( './deepset.js' ),
	cdf5 = require( './matrix.js' ),
	cdf6 = require( './typedarray.js' );


// CDF //

/**
* FUNCTION: cdf( x[, opts] )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Number} [opts.mu=0] - mean
* @param {Number} [opts.sigma=1] - standard deviation
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} evaluated CDF
*/
function cdf( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts.mu = typeof opts.mu !== 'undefined' ? opts.mu : 0;
	opts.sigma = typeof opts.sigma !== 'undefined' ? opts.sigma : 1;

	if ( isNumber( x ) ) {
		return cdf1( x, opts.mu, opts.sigma );
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return cdf5( out, x, opts.mu, opts.sigma );
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( x.length );
		}
		return cdf6( out, x, opts.mu, opts.sigma );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return cdf4( x, opts.mu, opts.sigma, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return cdf3( out, x, opts.mu, opts.sigma, opts.accessor );
		}
		return cdf2( out, x, opts.mu, opts.sigma );
	}
	return NaN;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
