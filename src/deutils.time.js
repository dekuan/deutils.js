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
	 * 	get date by yyyymmdd "20190901"
	 *
	 *	@param	{string}	sDateYmd
	 *	@return {Date}
	 */
	static getDateBy8digit( sDateYmd )
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
			sDateYmd === this.get8digitDate( this.getDateBy8digit( sDateYmd ) )
		);
	}


	/**
	 *	get 8-digit date
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

		let oLocDate	= new Date( oDate.getTime() );
		let sFullYear	= oLocDate.getFullYear().toString();
		let sFullMonth	= String( oLocDate.getMonth() + 1 ).padStart( 2, "0" );
		let sFullDay	= oLocDate.getDate().toString().padStart( 2, "0" );

		//	...
		return `${ sFullYear }${ sFullMonth }${ sFullDay }`;
	}


	/**
	 *	get short date
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
	 *	get utc time by enus date string
	 *
	 *	@param	{}		sEnUsDate	"Agu 10, 2018"
	 *	@return	{number}
	 */
	static getUTCTimeByEnUsDate( sEnUsDate )
	{
		if ( ! DeUtilsCore.isExistingString( sEnUsDate ) )
		{
			return 0;
		}

		let oDate = new Date( `${ sEnUsDate } UTC` );
		return this.isValidDate( oDate ) ? oDate.getTime() : 0;
	}

	/**
	 * 	get random number with a range
	 *
	 *	@param	{number}	nMin
	 *	@param	{number}	nMax
	 *	@return {number}
	 */
	static getRandom( nMin, nMax )
	{
		return Math.random() * ( nMax - nMin ) + nMin;
	}
}





/**
 *	exports
 */
module.exports	=
{
	DeUtilsTime	: DeUtilsTime
};