const assert		= require( 'assert' );
const { DeUtilsTime }	= require( '../src/deutils.time' );



describe( 'DeUtilsTime.test', () =>
{
	it( 'isValidDate', () =>
	{
		assert.equal( true, DeUtilsTime.isValidDate( new Date() ) );
		assert.equal( false, DeUtilsTime.isValidDate( new RegExp( "11" ) ) );
		assert.equal( false, DeUtilsTime.isValidDate( null ) );
		assert.equal( false, DeUtilsTime.isValidDate( "" ) );
	});

	it( 'getUTCDateBy8digit', () =>
	{
		let oDate	= DeUtilsTime.getUTCDateBy8digit( '20190901' );

		assert.equal( 2019, oDate.getFullYear() );
		assert.equal( 8, oDate.getMonth() );
		assert.equal( 1, oDate.getDate() );

		//	...
		assert.equal( null, DeUtilsTime.getUTCDateBy8digit( '' ) );
	});

	it( 'isValid8digit', () =>
	{
		assert.equal( true, DeUtilsTime.isValid8digit( '20190901' ) );
		assert.equal( false, DeUtilsTime.isValid8digit( '2019090' ) );
		assert.equal( false, DeUtilsTime.isValid8digit( '' ) );
		assert.equal( false, DeUtilsTime.isValid8digit( null ) );
		assert.equal( false, DeUtilsTime.isValid8digit( false ) );
		assert.equal( false, DeUtilsTime.isValid8digit( true ) );
	});

	it( 'get8digitDate', () =>
	{
		assert.equal( '20190810', DeUtilsTime.get8digitDate( new Date( "Aug 10, 2019 UTC" ) ) );
		assert.equal( false, '20190810' === DeUtilsTime.get8digitDate( new Date( "Aug" ) ) );
	});

	it( 'getShortEnUsDate', () =>
	{
		assert.equal( 'Aug 10, 2019', DeUtilsTime.getShortEnUsDate( new Date( "Aug 10, 2019 UTC" ) ) );
		assert.equal( false, 'Aug 10, 2019' === DeUtilsTime.getShortEnUsDate( new Date( "Aug" ) ) );
	});

	it( 'getUTCTimeByEnUsDate', () =>
	{
		assert.equal( true, DeUtilsTime.getUTCTimeByEnUsDate( "Aug 10, 2019" ) > 0 );
		assert.equal( 0, DeUtilsTime.getUTCTimeByEnUsDate( "Aug" ) );
		assert.equal( 0, DeUtilsTime.getUTCTimeByEnUsDate( "" ) );
		assert.equal( 0, DeUtilsTime.getUTCTimeByEnUsDate( null ) );
	});
});