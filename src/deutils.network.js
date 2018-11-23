const _child_process	= require( 'child_process' );
const _dns		= require( 'dns' );

const { IpRegEx }	= require( './libs/ip.regex.js' );
const { DeUtilsCore }	= require( './deutils.core' );



/**
 *	Library
 */
class DeUtilsNetwork
{
	constructor()
	{
	}


	/**
	 *	check if the given number is a valid socket listen port number
	 *	@public
	 *	@param nPort
	 *	@returns {boolean}
	 */
	static isValidPort( nPort )
	{
		return ( Number.isInteger( nPort ) &&
			Number.isSafeInteger( nPort ) &&
			nPort > 0 && nPort <= 65535 );
	}

	/**
	 *	check if the vValue is a valid ip v4 address
	 */
	static isValidIpV4( vValue )
	{
		return IpRegEx.v4( { exact : true } ).test( vValue );
	}

	/**
	 *	check if the vValue is a valid ip v6 address
	 */
	static isValidIpV6( vValue )
	{
		return IpRegEx.v6( { exact : true } ).test( vValue );
	}

	/**
	 * 	resolve local hostname
	 *
	 *	@param	{function}	pfnCallback( err, sAddress, nFamily )
	 *	@return	{void}
	 */
	static resolveLocalHostname( pfnCallback )
	{
		//
		//	this is an ugly hack to get the hostname of the local machine
		//	we don't listen on any ip because it's important that we listen
		//	on the same ip that the server identifies itself as
		//
		_child_process.exec
		(
			'hostname',
			( error, sStdOut, stderr ) =>
			{
				//
				//	sStdOut		- 'Xing-MacBook-Pro.local'
				//
				if ( DeUtilsCore.isExistingString( sStdOut ) )
				{
					let sHostname	= sStdOut.slice( 0, sStdOut.length - 1 );
					_dns.lookup( sHostname, 4, pfnCallback );
				}
				else
				{
					pfnCallback( `failed to lookup hostname of the local machine: ${ JSON.stringify( error ) }` );
				}
			}
		);
	}
}



/**
 *	exports
 */
module.exports	=
{
	DeUtilsNetwork	: DeUtilsNetwork
};