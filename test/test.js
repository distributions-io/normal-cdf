/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	cdf = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-normal-cdf', function tests() {

	it( 'should export a function', function test() {
		expect( cdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cdf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				cdf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				cdf( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				cdf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( cdf( values[ i ] ) ) );
		}
	});

	it( 'should compute the Normal cdf when provided a number', function test() {
		var	validationData = require( './fixtures/number.json' ),
			data = validationData.data,
			expected = validationData.expected.map( function( d ) {
				return d === 'Inf' ? Infinity : d;
			}),
			mu = validationData.mu,
		sigma = validationData.sigma;

			var actual;
			for ( var i = 0; i < data.length; i++ ) {
				actual =  cdf( data[ i ], {
					'mu': validationData.mu,
		'sigma': validationData.sigma
				});
				if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
					assert.closeTo( actual, expected[ i ] , 1e-14 );
				}
			}
	});

	it( 'should evaluate the Normal cdf when provided a plain array', function test() {

		var validationData = require( './fixtures/array.json' ),
			data,
			actual,
			expected,
			i;

		// make copy of data array to prevent mutation of validationData
		data = validationData.data.slice();
		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		});

		actual = cdf( data, {
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-15 );
			}
		}
		// Mutate...
		actual = cdf( data, {
			'copy': false,
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < data.length; i++ ) {
			if ( isFiniteNumber( data[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( data[ i ], expected[ i ], 1e-15 );
			}
		}
	});

	it( 'should evaluate the Normal cdf when provided a typed array', function test() {
		var validationData = require( './fixtures/typedarray.json' ),
			data,
			actual,
			expected,
			i;

		data = new Float32Array( validationData.data );

		expected = new Float64Array( validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}) );

		actual = cdf( data, {
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
			}
		}

		// Mutate:
		actual = cdf( data, {
			'copy': false,
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});
		expected = new Float32Array( validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}) );
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
			}
		}
	});

	it( 'should evaluate the Normal cdf element-wise and return an array of a specific type', function test() {

		var validationData = require( './fixtures/array.json' ),
			// make copy of data array to prevent mutation of validationData
			data = validationData.data.slice(),
			actual,
			expected,
			i;

		expected = new Float32Array( validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}) );

		actual = cdf( data, {
			'dtype': 'float32',
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});

		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 4 );

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
			}
		}
	});

	it( 'should evaluate the Normal cdf element-wise using an accessor', function test() {
		var validationData = require( './fixtures/accessor.json' ),
			data,
			actual,
			expected,
			i;

		data = validationData.data.map( function( e, i ) {
			return [ i, e ];
		});

		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		});

		actual = cdf( data, {
			'accessor': getValue,
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
			}
		}

		// Mutate:
		actual = cdf( data, {
			'accessor': getValue,
			'copy': false,
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
			}
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the Normal cdf element-wise and deep set', function test() {
		var validationData = require( './fixtures/deepset.json' ),
				data,
				actual,
				expected,
				i;

		data = validationData.data.map( function( e ) {
			return {'x': [ i, e ]};
		});

		actual = cdf( data, {
			'path': 'x.1',
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});

		expected = validationData.expected
			.map( function( d ) {
				return d === 'Inf' ? Infinity : d;
			})
			.map( function( e ) {
				return {'x': [ i, e ]};
			});

		assert.strictEqual( actual, data );

		for ( i = 0; i < data.length; i++ ) {
			if ( isFiniteNumber( data[ i ].x[ 1 ] ) && isFiniteNumber( expected[ i ].x[ 1 ] ) ) {
				assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-14 );
			}
		}

		// Specify a path with a custom separator...
		data = validationData.data.map( function( e ) {
			return {'x': [ i, e ]};
		});
		actual = cdf( data, {
			'path': 'x/1',
			'sep': '/',
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < data.length; i++ ) {
			if ( isFiniteNumber( data[ i ].x[ 1 ] ) && isFiniteNumber( expected[ i ].x[ 1 ] ) ) {
				assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-14, 'custom separator' );
			}
		}
	});

	it( 'should evaluate the Normal cdf element-wise when provided a matrix', function test() {
		var validationData = require( './fixtures/matrix.json' ),
			mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( validationData.data );
		d2 = new Float64Array( validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}) );

		mat = matrix( d1, [5,5], 'float64' );
		out = cdf( mat, {
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});

		for ( i = 0; i < out.length; i++ ) {
			if ( isFiniteNumber( out.data[ i ] ) && isFiniteNumber( d2[ i ] ) ) {
				assert.closeTo( out.data[ i ], d2[ i], 1e-14 );
			}
		}

		// Mutate...
		out = cdf( mat, {
			'copy': false,
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});
		assert.strictEqual( mat, out );

		for ( i = 0; i < out.length; i++ ) {
			if ( isFiniteNumber( out.data[ i ] ) && isFiniteNumber( d2[ i ] ) ) {
				assert.closeTo( out.data[ i ], d2[ i ], 1e-14 );
			}
		}
	});

	it( 'should evaluate the Normal cdf element-wise and return a matrix of a specific type', function test() {
		var validationData = require( './fixtures/matrix.json' ),
			mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( validationData.data );
		d2 = new Float32Array( validationData.expected );

		mat = matrix( d1, [5,5], 'float64' );
		out = cdf( mat, {
			'dtype': 'float32',
			'mu': validationData.mu,
		'sigma': validationData.sigma
		});

		assert.strictEqual( out.dtype, 'float32' );

		for ( i = 0; i < out.length; i++ ) {
			if ( isFiniteNumber( out.data[ i ] ) && isFiniteNumber( d2[ i ] ) ) {
				assert.closeTo( out.data[ i ], d2[ i ], 1e-14 );
			}
		}
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( cdf( [] ), [] );
		assert.deepEqual( cdf( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( cdf( new Int8Array() ), new Float64Array() );
	});

});
