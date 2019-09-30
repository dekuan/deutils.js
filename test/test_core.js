const assert		= require( 'assert' );
const { DeUtilsCore }	= require( '../src/deutils.core' );



describe( 'DeUtilsCore.test', () =>
{
	it( 'isNumeric', () =>
	{
		assert.equal( true, DeUtilsCore.isNumeric( 1 ) );
		assert.equal( false, DeUtilsCore.isNumeric( '11111112323' ) );
		assert.equal( false, DeUtilsCore.isNumeric( 'xxx' ) );
	});
	it( 'isString', () =>
	{
		assert.equal( false, DeUtilsCore.isString( 1 ) );
		assert.equal( false, DeUtilsCore.isString( null ) );
		assert.equal( false, DeUtilsCore.isString( undefined ) );
		assert.equal( false, DeUtilsCore.isString( NaN ) );
		assert.equal( true, DeUtilsCore.isString( '11111112323' ) );
		assert.equal( true, DeUtilsCore.isString( 'xxx' ) );
	});
	it( 'isExistingString', () =>
	{
		assert.equal( false, DeUtilsCore.isExistingString( 1 ) );
		assert.equal( false, DeUtilsCore.isExistingString( null ) );
		assert.equal( false, DeUtilsCore.isExistingString( undefined ) );
		assert.equal( false, DeUtilsCore.isExistingString( NaN ) );
		assert.equal( false, DeUtilsCore.isExistingString( '' ) );
		assert.equal( true, DeUtilsCore.isExistingString( '11111112323' ) );
		assert.equal( true, DeUtilsCore.isExistingString( 'xxx' ) );
	});
	it( 'isFunction', () =>
	{
		assert.equal( false, DeUtilsCore.isFunction( 1 ) );
		assert.equal( false, DeUtilsCore.isFunction( null ) );
		assert.equal( false, DeUtilsCore.isFunction( undefined ) );
		assert.equal( false, DeUtilsCore.isFunction( NaN ) );
		assert.equal( false, DeUtilsCore.isFunction( '' ) );
		assert.equal( true, DeUtilsCore.isFunction( function() {} ) );
		assert.equal( true, DeUtilsCore.isFunction( DeUtilsCore.isFunction ) );
	});
	it( 'isPlainObject', () =>
	{
		assert.equal( false, DeUtilsCore.isPlainObject( 1 ) );
		assert.equal( false, DeUtilsCore.isPlainObject( null ) );
		assert.equal( false, DeUtilsCore.isPlainObject( undefined ) );
		assert.equal( false, DeUtilsCore.isPlainObject( NaN ) );
		assert.equal( false, DeUtilsCore.isPlainObject( '' ) );
		assert.equal( false, DeUtilsCore.isPlainObject( DeUtilsCore.isFunction ) );
		assert.equal( true, DeUtilsCore.isPlainObject( {} ) );
		assert.equal( true, DeUtilsCore.isPlainObject( { 'k' : 1 } ) );
		assert.equal( true, DeUtilsCore.isPlainObject( [] ) );
	});
	it( 'isPlainObjectWithKeys', () =>
	{
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( 1 ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( null ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( undefined ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( NaN ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( '' ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( DeUtilsCore.isFunction ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( [] ) );
		assert.equal( true, DeUtilsCore.isPlainObjectWithKeys( {} ) );
		assert.equal( true, DeUtilsCore.isPlainObjectWithKeys( { 'k' : 1 }, 'k' ) );
	});

	it( 'isValidEMail(supported), should be valid', () =>
	{
		const arrValidSupported =
			[
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org",
				"01234567890@numbers-in-local.net",
				"&'*+-./=?^_{}~@other-valid-characters-in-local.net",
				"mixed-1234-in-{+^}-local@sld.net",
				"a@single-character-in-local.org",
				"one-character-third-level@a.example.com",
				"single-character-in-sld@x.org",
				"local@dash-in-sld.com",
				"letters-in-sld@123.com",
				"one-letter-sld@x.org",
				"test@test--1.com",
				"uncommon-tld@sld.museum",
				"uncommon-tld@sld.travel",
				"uncommon-tld@sld.mobi",
				"country-code-tld@sld.uk",
				"country-code-tld@sld.rw",
				"local@sld.newTLD",
				"the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-254-characters-exactly.so-it-should-be-valid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-bla.org",
				"the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-three-characters-so-it-is-valid-blah-blah.com",
				"local@sub.domains.com",
				"backticks`are`legit@test.com",
				"digit-only-domain@123.com",
				"digit-only-domain-with-subdomain@sub.123.com"
			];

		arrValidSupported.forEach( sEMail =>
		{
			assert.equal( true, DeUtilsCore.isValidEMail( sEMail ) );
		});
	});

	it( 'isValidEMail(unsupported), should be invalid', () =>
	{
		const arrValidUnsupported =
			[
				"\"quoted\"@sld.com",
				"\"\\e\\s\\c\\a\\p\\e\\d\"@sld.com",
				"\"quoted-at-sign@sld.org\"@sld.com",
				"\"escaped\\\"quote\"@sld.com",
				"\"back\\slash\"@sld.com",
				"punycode-numbers-in-tld@sld.xn--3e0b707e",
				"bracketed-IP-instead-of-domain@[127.0.0.1]"
			];

		arrValidUnsupported.forEach( sEMail =>
		{
			assert.equal( false, DeUtilsCore.isValidEMail( sEMail ) );
		});
	});

	it( 'isValidEMail(supported), should be invalid', () =>
	{
		const arrInvalidSupported =
			[
				"@missing-local.org",
				"! #$%`|@invalid-characters-in-local.org",
				"(),:;`|@more-invalid-characters-in-local.org",
				"<>@[]\\`|@even-more-invalid-characters-in-local.org",
				".local-starts-with-dot@sld.com",
				"local-ends-with-dot.@sld.com",
				"two..consecutive-dots@sld.com",
				"partially.\"quoted\"@sld.com",
				"the-local-part-is-invalid-if-it-is-longer-than-sixty-four-characters@sld.net",
				"missing-sld@.com",
				"sld-starts-with-dashsh@-sld.com",
				"sld-ends-with-dash@sld-.com",
				"invalid-characters-in-sld@! \"#$%(),/;<>_[]`|.org",
				"missing-dot-before-tld@com",
				"missing-tld@sld.",
				"invalid",
				"the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-255-characters-exactly.so-it-should-be-invalid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-bl.org",
				"the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-four-characters-so-it-is-invalid-blah-blah.com",
				"missing-at-sign.net",
				"unbracketed-IP@127.0.0.1",
				"invalid-ip@127.0.0.1.26",
				"another-invalid-ip@127.0.0.256",
				"IP-and-port@127.0.0.1:25",
				"trailing-dots@test.de.",
				"dot-on-dot-in-domainname@te..st.de",
				"dot-first-in-domain@.test.de",
				"mg@ns.i"
			];

		arrInvalidSupported.forEach( sEMail =>
		{
			assert.equal( false, DeUtilsCore.isValidEMail( sEMail ) );
		});
	});

	it( 'isValidChinaPhoneNumber', () =>
	{
		assert.equal( true, DeUtilsCore.isValidChinaPhoneNumber( '18811009090' ) );
		assert.equal( false, DeUtilsCore.isValidChinaPhoneNumber( '28811009090' ) );
		assert.equal( false, DeUtilsCore.isValidChinaPhoneNumber( '12811009090' ) );
	});
});