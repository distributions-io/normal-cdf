options( digits = 16 )
library( jsonlite )

mu = 0
sigma = 4
x = seq( -1000, 1000, 0.5 )
y = pnorm( x, mu,sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/accessor.json" )
