const { DeUtilsCore }	= require( './deutils.core' );






/**
 *	DeUtilsCluster
 */
class DeUtilsCluster
{
	constructor()
	{
	}


	/**
	 *	request info from master process
	 *
	 *	@param	{string}	sType
	 *	@param	{object}	oMessage
	 *	@return {Promise<object>}
	 */
	requestInfoFromMaster( sType, oMessage )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! DeUtilsCore.isExistingString( sType ) )
				{
					return pfnReject( `call requestInfoFromMaster with invalid sType: ${ JSON.stringify( sType ) }` );
				}

				let pfnHandleMessage = ( oReceivedMessage ) =>
				{
					pfnR( oReceivedMessage );
				};

				// console.log( process.listeners( 'message' ).length );
				process.setMaxListeners( 1000 );
				process.once( 'message', pfnHandleMessage );
				process.send({
					type	: sType,
					pid	: process.pid,
					message	: oMessage
				});

				//	...
				setTimeout( () =>
				{
					pfnR( null );

				}, 300 );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}


	/**
	 *	handle Workers Message
	 *
	 *	@param	{array}		arrWorkers
	 *	@param	{object}	oWorkerMessage
	 *	@param	{string}	oWorkerMessage.type
	 *	@param	{number}	oWorkerMessage.pid
	 *	@param	{object}	oWorkerMessage.message
	 *	@return	{Promise<object>}
	 */
	static handleWorkersMessage( arrWorkers, oWorkerMessage )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrWorkers ) || 0 === arrWorkers.length )
				{
					return pfnReject( `invalid arrWorkers` );
				}
				if ( ! DeUtilsCore.isPlainObjectWithKeys( oWorkerMessage, [ 'type', 'pid', 'message' ] ) ||
					! DeUtilsCore.isExistingString( oWorkerMessage.type ) ||
					! DeUtilsCore.isNumeric( oWorkerMessage.pid ) ||
					oWorkerMessage.pid <= 0 )
				{
					return pfnReject( `invalid oWorkerMessage : ${ JSON.stringify( oWorkerMessage ) }` );
				}

				//
				//	find who sent this message
				//
				let oSender = DeUtilsCluster.findWorkerByPId( arrWorkers, oWorkerMessage.pid );
				pfnR({
					sender	: oSender,
					message	: oWorkerMessage,
				});
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}


	/**
	 *	find worker by process id
	 *
	 *	@param	{array}		arrWorkers
	 *	@param	{number}	nPId
	 *	@return {*}
	 */
	static findWorkerByPId( arrWorkers, nPId )
	{
		if ( ! Array.isArray( arrWorkers ) || 0 === arrWorkers.length )
		{
			return null;
		}
		if ( ! DeUtilsCore.isNumeric( nPId ) || nPId <= 0 )
		{
			return null;
		}

		//	...
		let oSender	= null;
		for ( let i = 0; i < arrWorkers.length; i ++ )
		{
			if ( DeUtilsCore.isPlainObjectWithKeys( arrWorkers[ i ], 'process' ) &&
				DeUtilsCore.isPlainObjectWithKeys( arrWorkers[ i ][ 'process' ], 'pid' ) &&
				DeUtilsCore.isNumeric( arrWorkers[ i ][ 'process' ][ 'pid' ] ) &&
				arrWorkers[ i ][ 'process' ][ 'pid' ] > 0 &&
				arrWorkers[ i ][ 'process' ][ 'pid' ] === nPId )
			{
				oSender = arrWorkers[ i ];
			}
		}

		return oSender;
	}

}






/**
 *	exports
 */
module.exports	=
{
	DeUtilsCluster	: DeUtilsCluster
};