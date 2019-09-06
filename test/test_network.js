const assert			= require( 'assert' );
const { DeUtilsNetwork }	= require( '../src/deutils.network' );



describe( 'DeUtilsNetwork.test', () =>
{
	it( 'isValidPort', () =>
	{
		assert.equal( true, DeUtilsNetwork.isValidPort( 1 ) );
		assert.equal( true, DeUtilsNetwork.isValidPort( 65535 ) );
		assert.equal( true, DeUtilsNetwork.isValidPort( '50000' ) );
		assert.equal( true, DeUtilsNetwork.isValidPort( '50001' ) );
		assert.equal( true, DeUtilsNetwork.isValidPort( '65535' ) );
		assert.equal( false, DeUtilsNetwork.isValidPort( 65536 ) );
		assert.equal( false, DeUtilsNetwork.isValidPort( '65536' ) );
		assert.equal( false, DeUtilsNetwork.isValidPort( '11111112323' ) );
		assert.equal( false, DeUtilsNetwork.isValidPort( 'xxx' ) );
	});
	it( 'isValidIpV4', () =>
	{
		assert.equal( false, DeUtilsNetwork.isValidIpV4( 1 ) );
		assert.equal( false, DeUtilsNetwork.isValidIpV4( null ) );
		assert.equal( false, DeUtilsNetwork.isValidIpV4( undefined ) );
		assert.equal( false, DeUtilsNetwork.isValidIpV4( NaN ) );
		assert.equal( false, DeUtilsNetwork.isValidIpV4( '' ) );
		assert.equal( false, DeUtilsNetwork.isValidIpV4( '1.1.1.256' ) );
		assert.equal( true, DeUtilsNetwork.isValidIpV4( '0.0.0.0' ) );
		assert.equal( true, DeUtilsNetwork.isValidIpV4( '1.1.1.0' ) );
		assert.equal( true, DeUtilsNetwork.isValidIpV4( '1.1.1.0' ) );
		assert.equal( true, DeUtilsNetwork.isValidIpV4( '255.255.255.255' ) );
		assert.equal( true, DeUtilsNetwork.isValidIpV4( '1.1.1.1' ) );
	});
	it( 'resolveLocalHostname', pfnDone =>
	{
		DeUtilsNetwork.resolveLocalHostname( ( err, sAddress, nFamily ) =>
		{
			//console.log( err, sAddress, nFamily );

			assert.equal( null, err );
			assert.equal( 'string', typeof sAddress );
			assert.equal( 'number', typeof nFamily );

			pfnDone();
		});
	});
});