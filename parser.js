class YMParser {
	static version = '0.0.1';

	/**
	 * Create Parser
	 */
	constructor ( args ) {
		this.options = args;

		this.elements = {
			usersListBox: document.querySelector( this.options.usersListBoxTag ),
			usersListScrollBox: document.querySelector( this.options.usersListScrollBoxTag ),
		};
		this.usersList = [];

		this.startTime = new Date();

		console.clear();
		console.log( `YM Parser v${YMParser.version} started with settings:` );
		console.table( args );

		console.log( `Press OK in instagram window to start parsing` );

		if ( window.confirm( 'Press OK to start parsing' ) ) {
			this.getUsersList();
		} else {
			console.log( `YMParser stopped by user` );
		}
	}

	/**
	 * Get users
	 */
	getUsersList () {
		let iterations = 0;

		let lastUsersListScrollBoxHeight = 0;
		let theSameHeightIterations = 0;

		console.log( `Scroll interval started. Please wait...` );

		const interval = setInterval( () => {
			if ( iterations % 2 == 0 ) {
				if ( lastUsersListScrollBoxHeight == this.usersListScrollBoxHeight ) {
					theSameHeightIterations++;
				} else {
					theSameHeightIterations = 0;
				}

				lastUsersListScrollBoxHeight = this.usersListScrollBoxHeight;
			}

			this.usersListScroll();

			iterations++;

			console.clear();
			console.log( iterations, `Users parsed: ${this.usersListBoxElements.length}` );

			if ( theSameHeightIterations >= this.options.theSameHeightNum ) {
				clearInterval( interval );

				let usersElementsList = this.usersListBoxElements;
				usersElementsList.forEach( userElement => {
					this.pushUserData( userElement );
				});

				console.log( `Scroll interval successfully stopped and got ${usersElementsList.length} users` );

				this.showData();

				if ( this.options.download ) {
					this.downloadData();
				}
			}
		}, this.options.scrollDelay );
	}

	/**
	 * Push user data into main users array
	 */
	pushUserData ( userElement ) {
		let output = {
			username: userElement.querySelector( this.options.userNameTag ).innerHTML,
			link: userElement.querySelector( this.options.userLinkTag ).getAttribute( 'href' ),
		};
		
		this.options.removeSymbols.forEach( symbol => {
			Object.keys( output ).forEach( key => {
				output[ key ] = output[ key ].replaceAll( symbol, '' );
			});
		});

		this.usersList.push( output );
	}

	/**
	 * Scroll users list
	 */
	usersListScroll () {
		this.elements.usersListBox.scroll( 0, this.usersListScrollBoxHeight );
	}

	/**
	 * Print users data
	 */
	showData () {
		const parsingTime = Math.abs( new Date() - this.startTime ) / 1000;

		console.table( this.usersList );
		console.log( `Parsed ${this.usersList.length} users in ${parsingTime} seconds` );
	}

	/**
	 * Download data to txt file
	 */
	downloadData () {
		const linkElement = document.createElement( 'a' );
		const data = 'test';

		linkElement.setAttribute( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( data ) );
		linkElement.setAttribute( 'download', 'YMParser.txt' );

		linkElement.style.display = 'none';
		document.body.appendChild( linkElement );

		linkElement.click();

		document.body.removeChild( linkElement );

		console.log( `File with parsed users downloaded` );
	}

	/**
	 * Get height of users list scroll box
	 */
	get usersListScrollBoxHeight () {
		return this.elements.usersListScrollBox.offsetHeight;
	}

	/**
	 * Get elements from users list box
	 */
	get usersListBoxElements () {
		return this.elements.usersListBox.querySelectorAll( this.options.userElementTag );
	}
}

const parser = new YMParser({
	scrollDelay:           1000,
	theSameHeightNum:      1,

	usersListBoxTag:       '._aano',
	usersListScrollBoxTag: '._aano > div',

	userElementTag:        '[ aria-labelledby ]',
	userNameTag:           'div > span > a > span > div',
	userLinkTag:           'div > span > a',

	checkLoadingTag:       '._aanq',

	removeSymbols:         [ `'` ],

	download:              true,
});