/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Module to be tested:
	cdf = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array cdf', function tests() {
	var validationData = require( './fixtures/typedarray.json' ),
		mu = validationData.mu,
		sigma = validationData.sigma;

	it( 'should export a function', function test() {
		expect( cdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Normal cdf', function test() {
		var data, actual, expected, i;

		data = new Float64Array( validationData.data );
		actual = new Float64Array( data.length );

		actual = cdf( actual, data, mu, sigma );

		expected = new Float64Array( validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}) );

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] )&& isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
			}
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( cdf( new Int8Array(), new Int8Array(), mu, sigma ), new Int8Array() );
	});

});
