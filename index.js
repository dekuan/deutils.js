const { DeUtilsCore }		= require( './src/deutils.core.js' );
const { DeUtilsNetwork }	= require( './src/deutils.network.js' );
const { DeUtilsWait }		= require( './src/deutils.wait' );
const { DeUtilsTime }		= require( './src/deutils.time' );
const { DeUtilsCluster }	= require( './src/deutils.cluster' );




/**
 *	@exports
 */
module.exports	=
{
	DeUtilsCore	: DeUtilsCore,
	DeUtilsNetwork	: DeUtilsNetwork,
	DeUtilsWait	: DeUtilsWait,
	DeUtilsTime	: DeUtilsTime,
	DeUtilsCluster	: DeUtilsCluster,
};