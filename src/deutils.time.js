const { DeUtilsCore }	= require( './deutils.core' );



/**
 *	DeUtilsTime
 */
class DeUtilsTime
{
	constructor()
	{
	}

	/**
	 * 	check if oDate is a valid Date object
	 *
	 *	@param	{}		oDate
	 *	@return	{boolean}
	 */
	static isValidDate( oDate )
	{
		return Boolean( oDate && "[object Date]" === Object.prototype.toString.call( oDate ) && ! isNaN( oDate ) );
	}


	/**
	 *	get power week day
	 *
	 *	@param	{number}	nWeekDay	- 0~6
	 *	@return {number|null}
	 * 		nWeekDay	- 0, 1, 2, 3, 4, 5, 6
	 *		success		- 1, 2, 4, 8, 16, 32, 64
	 *		failed		- null
	 */
	static getPowerWeekDay( nWeekDay )
	{
		if ( ! Number.isInteger( nWeekDay ) || nWeekDay < 0 || nWeekDay > 6 )
		{
			return null;
		}

		return Math.pow( 2, nWeekDay );
	}

	/**
	 *	check if the nPower is valid
	 *
	 *	@param	{number}	nPower
	 *	@return {boolean}
	 */
	static isValidPowerWeekDay( nPower )
	{
		return Number.isInteger( nPower ) &&
			nPower > 0 &&
			nPower <= 127 &&
			127 === ( 127 | nPower )
		;
	}


	/**
	 * 	get date by yyyymmdd "20190901"
	 *
	 *	@param	{string}	sDateYmd
	 *	@return {Date}
	 */
	static getUTCDateBy8digit( sDateYmd )
	{
		if ( ! DeUtilsCore.isExistingString( sDateYmd ) || sDateYmd.length < 6 )
		{
			return null;
		}

		//
		//	sDateYmd	= "20190810"
		//
		const nYear	= parseInt( sDateYmd.substring( 0, 4 ) );
		const nMonth	= parseInt( sDateYmd.substring( 4, 6 ) );
		const nDay	= parseInt( sDateYmd.substring( 6, 8 ) );

		return new Date( `${ nYear }-${ nMonth }-${ nDay } UTC` );
	}


	/**
	 *	check if the sDateYmd is a valid ymd date string
	 *
	 *	@param	{}		sDateYmd
	 *	@return {boolean}
	 */
	static isValid8digit( sDateYmd )
	{
		return Boolean
		(
			DeUtilsCore.isExistingString( sDateYmd ) && 8 === sDateYmd.length &&
			sDateYmd === this.get8digitDate( this.getUTCDateBy8digit( sDateYmd ) )
		);
	}


	/**
	 *	check if the sISODate is a valid ISO date string
	 *
	 *	@param	{}	sISODate	- "yyyy-mm-dd"
	 *	@return {boolean}
	 */
	static isValidISODate( sISODate )
	{
		if ( ! DeUtilsCore.isExistingString( sISODate ) )
		{
			return false;
		}

		let bRet	= false;
		let arrParts	= sISODate.split( `-` );
		let oDataObj	= new Date( `${ sISODate } UTC` );

		if ( this.isValidDate( oDataObj ) && 3 === arrParts.length )
		{
			let nYear	= parseInt( arrParts[ 0 ] );
			let nMonth	= parseInt( arrParts[ 1 ] );
			let nDay	= parseInt( arrParts[ 2 ] );
			if ( nYear === oDataObj.getFullYear() &&
				nMonth === ( oDataObj.getMonth() + 1 ) &&
				nDay === oDataObj.getDate() )
			{
				bRet = true;
			}
		}

		return bRet;
	}


	/**
	 *	check the sTime is a valid HHMM OR HHMMSS
	 *
	 *	@param	{string}	sTime
	 *	@return	{boolean}
	 */
	static isValidTime( sTime )
	{
		return this.isValidTimeHHMM( sTime ) || this.isValidTimeHHMMSS( sTime );
	}


	/**
	 *	check the sTime is a valid HHMM
	 *
	 *	@param	{string}	sTime
	 *	@return	{boolean}
	 */
	static isValidTimeHHMM( sTime )
	{
		return DeUtilsCore.isExistingString( sTime ) &&
			/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test( sTime );
	}


	/**
	 *	check the sTime is a valid HHMMSS
	 *
	 *	@param	{string}	sTime
	 *	@return	{boolean}
	 */
	static isValidTimeHHMMSS( sTime )
	{
		return DeUtilsCore.isExistingString( sTime ) &&
			/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test( sTime );
	}


	/**
	 *	get local 8-digit date
	 *
	 *	@param	{object}	oDate		- Date object
	 *	@return	{string}
	 */
	static get8digitDate( oDate )
	{
		if ( ! this.isValidDate( oDate ) )
		{
			return '';
		}

		//	...
		let sFullYear	= oDate.getFullYear().toString();
		let sFullMonth	= String( oDate.getMonth() + 1 ).padStart( 2, "0" );
		let sFullDay	= oDate.getDate().toString().padStart( 2, "0" );

		//	...
		return `${ sFullYear }${ sFullMonth }${ sFullDay }`;
	}


	/**
	 *	get ISO/UTC date string
	 *
	 *	@param	{object}	oDate	- Date object
	 *	@return	{string}
	 */
	static getISODateString( oDate )
	{
		if ( ! this.isValidDate( oDate ) )
		{
			return '';
		}

		//	...
		let sFullYear	= oDate.getUTCFullYear().toString();
		let sFullMonth	= String( oDate.getUTCMonth() + 1 ).padStart( 2, "0" );
		let sFullDay	= oDate.getUTCDate().toString().padStart( 2, "0" );

		return `${ sFullYear }-${ sFullMonth }-${ sFullDay }`;
	}


	/**
	 *	get UTC short date
	 *
	 *	@param	{object}	oDate		- Date object
	 *	@return	{string}
	 */
	static getShortEnUsDate( oDate )
	{
		if ( ! this.isValidDate( oDate ) )
		{
			return '';
		}

		let oLocDate		= new Date( oDate.getTime() );
		let sLocDateMon		= oLocDate.toLocaleString( "en-US", { timeZone : 'UTC', month : "short" } );
		let sLocDateDay		= oLocDate.toLocaleString( "en-US", { timeZone : 'UTC', day : "2-digit" } );
		let sLocDateYear	= oLocDate.toLocaleString( "en-US", { timeZone : 'UTC', year : "numeric" } );

		//	...
		return `${ sLocDateMon } ${ sLocDateDay }, ${ sLocDateYear }`;
	}


	/**
	 *	get utc date object by enus date string
	 *
	 *	@param	{}		sEnUsDate	"Agu 10, 2018"
	 *	@return	{Date}
	 */
	static getUTCDateObjectByEnUsDate( sEnUsDate )
	{
		if ( ! DeUtilsCore.isExistingString( sEnUsDate ) )
		{
			return null;
		}

		return new Date( `${ sEnUsDate } UTC` );
	}

	/**
	 *	get utc time by enus date string
	 *
	 *	@param	{}		sEnUsDate	"Agu 10, 2018"
	 *	@return	{number}
	 */
	static getUTCTimeByEnUsDate( sEnUsDate )
	{
		let oDate = this.getUTCDateObjectByEnUsDate( sEnUsDate );
		return this.isValidDate( oDate ) ? oDate.getTime() : 0;
	}
}





/**
 *	exports
 */
module.exports	=
{
	DeUtilsTime	: DeUtilsTime
};