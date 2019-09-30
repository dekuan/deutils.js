/**
 *	Library
 */
class DeUtilsCore
{
	constructor()
	{
	}

	/**
	 *	check if the vValue is a valid number
	 *	@param vValue
	 *	@return {boolean}
	 */
	static isNumeric( vValue )
	{
		return Boolean( ! isNaN( vValue ) && 'number' === typeof vValue );
	}

	static isString( vValue )
	{
		return Boolean( vValue && 'string' === typeof vValue );
	}

	static isExistingString( vValue )
	{
		return this.isString( vValue ) && vValue.length > 0;
	}

	static isFunction( vValue )
	{
		return Boolean( vValue && 'function' === typeof vValue );
	}

	/**
	 *	check if the vValue is a plain JavaScript object
	 *
	 *	@return {boolean}
	 */
	static isPlainObject( vValue )
	{
		return null !== vValue && 'object' === typeof vValue;
	}

	/**
	 *	check if a plain object have specified keys
	 *	@param	{object}		vValue
	 *	@param	{array|string|number}	vKeys
	 *	@return {boolean}
	 */
	static isPlainObjectWithKeys( vValue, vKeys = null )
	{
		let bRet;
		let sKey;

		if ( ! this.isPlainObject( vValue ) || Array.isArray( vValue ) )
		{
			return false;
		}

		//	...
		bRet	= false;

		if ( this.isString( vKeys ) || Number.isInteger( vKeys ) )
		{
			vKeys	= [ vKeys ];
		}

		if ( Array.isArray( vKeys ) && vKeys.length > 0 )
		{
			bRet	= true;
			for ( sKey of vKeys )
			{
				if ( ! vValue.hasOwnProperty( sKey ) )
				{
					bRet	= false;
					break;
				}
			}
		}
		else
		{
			bRet = true;
		}

		return bRet;
	}


	/**
	 *	get random integer
	 *
	 *	@public
	 *	@param	{number}	nMin
	 *	@param	{number}	nMax
	 *	@returns {number}
	 */
	static getRandomInt( nMin, nMax )
	{
		return Math.floor( Math.random() * ( nMax + 1 - nMin ) ) + nMin;
	}

	/**
	 * 	get all methods from a class or its instance
	 *
	 * 	@public
	 *	@param	{object}	objObject
	 *	@return {array}
	 */
	static exportMethodsFromClass( objObject )
	{
		let setRet;
		let arrKeys;

		try
		{
			setRet = new Set();
			while ( true )
			{
				objObject = Reflect.getPrototypeOf( objObject );
				if ( ! objObject )
				{
					break;
				}

				//	...
				arrKeys	= Reflect.ownKeys( objObject );
				if ( Array.isArray( arrKeys ) && arrKeys.length > 0 )
				{
					arrKeys.forEach( sKey => setRet.add( sKey ) );
				}
			}
		}
		catch ( vError )
		{
		}

		return Array.from( setRet );
	}

	/**
	 *	check if the sEMail is a valid email address
	 *
	 *	@param	{string}	sEMail
	 *	@return {boolean|*}
	 */
	static isValidEMail( sEMail )
	{
		if ( ! this.isExistingString( sEMail ) )
		{
			return false;
		}
		if ( sEMail.length > 254 )
		{
			return false;
		}

		//	...
		const oRegExp	= /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
		if ( ! oRegExp.test( sEMail ) )
		{
			return false;
		}

		//	Further checking of some things regex can't handle
		const arrParts	= sEMail.split( "@" );
		if ( arrParts[ 0 ].length > 64 )
		{
			return false;
		}

		const arrDomainParts = arrParts[ 1 ].split( "." );
		if ( arrDomainParts.some( ( sPart ) => sPart.length > 63 ) )
		{
			return false;
		}

		return true;
	}


	/**
	 *	check if the sPhoneNumber is a valid china cell phone number
	 *
	 *	@param	{string}	sPhoneNumber
	 *	@return {boolean|*}
	 */
	static isValidChinaPhoneNumber( sPhoneNumber )
	{
		return ( this.isNumeric( sPhoneNumber ) || this.isExistingString( sPhoneNumber ) ) && /^1[3456789]\d{9}$/.test( sPhoneNumber );
	}

	/**
	 *	get the length in bytes of a string
	 *
	 *	@param	{string}	sString
	 *	@return {Number}
	 */
	static getByteLength( sString )
	{
		return Buffer.byteLength( String( sString ), 'utf8' );
	}
}




/**
 *	exports
 */
module.exports	=
{
	DeUtilsCore	: DeUtilsCore
};
