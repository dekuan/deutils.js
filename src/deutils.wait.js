const _events		= require( 'events' );
const { DeUtilsCore }	= require( './deutils.core' );




/**
 *	DeUtilsWait
 */
class DeUtilsWait
{
	constructor()
	{
		this.m_oEventEmitter	= new _events.EventEmitter();
	}


	/**
	 *	wait for
	 *
	 * 	@param	{number}	nMinWaitInMs
	 * 	@param	{number}	nMaxWaitInMs	optional
	 *	@return	{Promise<void>}
	 *	@public
	 */
	waitFor( nMinWaitInMs, nMaxWaitInMs )
	{
		return new Promise( ( pfnR, pfnReject ) =>
		{
			if ( ! DeUtilsCore.isNumeric( nMinWaitInMs ) || nMinWaitInMs <= 0 )
			{
				return pfnReject( `invalid parameter nMinWaitInMillisecond: must be a number greater than zero.` );
			}

			//
			//	wait
			//
			let nSleepInMs	= nMinWaitInMs;
			if ( DeUtilsCore.isNumeric( nMaxWaitInMs ) && nMaxWaitInMs > nMinWaitInMs )
			{
				nSleepInMs = this._getRandom( nMinWaitInMs, nMinWaitInMs );
			}

			//	...
			let nTimer = setTimeout( pfnR, nSleepInMs );
			this.m_oEventEmitter.on( 'wakeup', () =>
			{
				clearTimeout( nTimer );
				nTimer = null;

				//	...
				pfnR();
			});
		});
	}

	/**
	 *	wakeup
	 *	@public
	 */
	wakeup()
	{
		this.m_oEventEmitter.emit( 'wakeup' );
	}



	/**
	 *	get random number
	 *
	 *	@param	{number}	nMin
	 *	@param	{number}	nMax
	 *	@return	{number}
	 *	@private
	 */
	_getRandom( nMin, nMax )
	{
		return Math.random() * ( nMax - nMin ) + nMin;
	}
}






/**
 *	exports
 */
module.exports	=
{
	DeUtilsWait	: DeUtilsWait
};