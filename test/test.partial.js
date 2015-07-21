/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Check whether an element is `NaN`
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'partial cdf', function tests() {

	var	validationData = require( './fixtures/partial.json' ),
		data = validationData.data,
		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}),
		mu = validationData.mu,
		sigma = validationData.sigma;

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the Normal cdf for given parameter values', function test() {
		var cdf;
		cdf = partial( mu, sigma );
		expect( cdf ).to.be.a( 'function' );
	});

	it( 'should return a function which evaluates the probability density function', function test() {
		var cdf, actual;
		cdf = partial(  mu, sigma );
		for ( var i = 0; i < data.length; i++ ) {
			actual = cdf( data[ i ] );
			if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual, expected[ i ] , 1e-14 );
			}
		}
	});

	it( 'should return a function which which returns `NaN` if provided `NaN` as input', function test() {
		var cdf = partial(  mu, sigma );
		assert.isTrue( isnan( cdf( NaN ) ) );
	});

	it( 'should return a step-function function when sigma = 0', function test() {
		var cdf = partial(  mu, 0 );
		assert.strictEqual( cdf( mu - 0.01 , mu, 0 ), 0 );
		assert.strictEqual( cdf( mu + 0.01, mu, 0 ), 1 );
	});

});
