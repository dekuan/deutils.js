const assert		= require( 'assert' );
const { DeUtilsWait }	= require( '../src/deutils.wait' );



describe( 'DeUtilsWait.test', () =>
{
	it( 'will wait for 5 seconds', ( pfnDone ) =>
	{
		let oDeUtilsWait	= new DeUtilsWait();

		// console.log( `will wait for 5 seconds.` );
		oDeUtilsWait.waitFor( 5000, 5000 ).then( v =>
		{
			// console.log( `time is over: `, v );
			assert.equal( true, true );

			//	...
			pfnDone();

		}).catch( err =>
		{
			console.error( err );
		});
	});

	it( 'plan to wait for 10 seconds, but aborted in 3 seconds', ( pfnDone ) =>
	{
		let oDeUtilsWait	= new DeUtilsWait();

		// console.log( `will wait for 5 seconds.` );
		oDeUtilsWait.waitFor( 10000, 10000 ).then( v =>
		{
			// console.log( `time is over: `, v );
			assert.equal( true, true );

			//	...
			pfnDone();

		}).catch( err =>
		{
			console.error( err );
		});

		setTimeout( () =>
		{
			oDeUtilsWait.wakeup();

		}, 3000 );

	});
});