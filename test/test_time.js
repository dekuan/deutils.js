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

	it( 'getPowerWeekDay', () =>
	{
		assert.equal( null, DeUtilsTime.getPowerWeekDay( -1 ) );
		assert.equal( null, DeUtilsTime.getPowerWeekDay( null ) );
		assert.equal( null, DeUtilsTime.getPowerWeekDay( [] ) );
		assert.equal( 1, DeUtilsTime.getPowerWeekDay( 0 ) );
		assert.equal( 2, DeUtilsTime.getPowerWeekDay( 1 ) );
		assert.equal( 4, DeUtilsTime.getPowerWeekDay( 2 ) );
		assert.equal( 8, DeUtilsTime.getPowerWeekDay( 3 ) );
		assert.equal( 16, DeUtilsTime.getPowerWeekDay( 4 ) );
		assert.equal( 32, DeUtilsTime.getPowerWeekDay( 5 ) );
		assert.equal( 64, DeUtilsTime.getPowerWeekDay( 6 ) );
		assert.equal( null, DeUtilsTime.getPowerWeekDay( 7 ) );
	});

	it( 'isValidPowerWeekDay', () =>
	{
		assert.equal( false, DeUtilsTime.isValidPowerWeekDay( -1 ) );
		assert.equal( false, DeUtilsTime.isValidPowerWeekDay( null ) );
		assert.equal( false, DeUtilsTime.isValidPowerWeekDay( [] ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 1 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 2 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 4 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 8 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 16 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 32 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 64 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 65 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 67 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 68 ) );
		assert.equal( true, DeUtilsTime.isValidPowerWeekDay( 72 ) );
		assert.equal( false, DeUtilsTime.isValidPowerWeekDay( 128 ) );
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


	it( 'isValidTime', () =>
	{
		assert.equal( true, DeUtilsTime.isValidTime( '22:22' ) );
		assert.equal( true, DeUtilsTime.isValidTime( '23:59' ) );
		assert.equal( true, DeUtilsTime.isValidTime( '00:00' ) );
		assert.equal( false, DeUtilsTime.isValidTime( '24:00' ) );
		assert.equal( false, DeUtilsTime.isValidTime( '22:88' ) );
		assert.equal( true, DeUtilsTime.isValidTime( '22:22:00' ) );
		assert.equal( true, DeUtilsTime.isValidTime( '23:59:00' ) );
		assert.equal( true, DeUtilsTime.isValidTime( '00:00:55' ) );
		assert.equal( false, DeUtilsTime.isValidTime( '24:00:00' ) );
		assert.equal( false, DeUtilsTime.isValidTime( '22:88:00' ) );
		assert.equal( false, DeUtilsTime.isValidTime( '' ) );
		assert.equal( false, DeUtilsTime.isValidTime( null ) );
		assert.equal( false, DeUtilsTime.isValidTime( false ) );
		assert.equal( false, DeUtilsTime.isValidTime( true ) );
	});

	it( 'isValidTimeHHMM', () =>
	{
		assert.equal( true, DeUtilsTime.isValidTimeHHMM( '22:22' ) );
		assert.equal( true, DeUtilsTime.isValidTimeHHMM( '23:59' ) );
		assert.equal( true, DeUtilsTime.isValidTimeHHMM( '00:00' ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMM( '24:00' ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMM( '22:88' ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMM( '' ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMM( null ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMM( false ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMM( true ) );
	});

	it( 'isValidTimeHHMMSS', () =>
	{
		assert.equal( true, DeUtilsTime.isValidTimeHHMMSS( '22:22:00' ) );
		assert.equal( true, DeUtilsTime.isValidTimeHHMMSS( '23:59:00' ) );
		assert.equal( true, DeUtilsTime.isValidTimeHHMMSS( '00:00:55' ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMMSS( '24:00:00' ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMMSS( '22:88:00' ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMMSS( '' ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMMSS( null ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMMSS( false ) );
		assert.equal( false, DeUtilsTime.isValidTimeHHMMSS( true ) );
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