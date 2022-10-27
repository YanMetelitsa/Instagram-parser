class YMParser {
	static version = '0.0.1';

	/**
	 * Create Parser
	 */
	constructor ( args ) {
		console.log( `YM Parse v${YMParser.version} start with settings:` );
		console.table( args );

		this.options = args;

		this.elements = {
			usersListBox: document.querySelector( this.options.usersListBoxTag ),
			usersListScrollBox: document.querySelector( this.options.usersListScrollBoxTag ),
		};
		this.usersList = [];

		this.getUsersList();
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

			if ( theSameHeightIterations > 0 ) {
				clearInterval( interval );

				const usersElementsList = this.elements.usersListBox.querySelectorAll( this.options.userElementTag );
				usersElementsList.forEach( userElement => {
					this.pushUserData( userElement );
				});

				console.log( `Scroll interval successfully stopped and got ${usersElementsList.length} users` );

				this.showData();
			}
		}, this.options.scrollDelay );
	}

	/**
	 * Push user data into main users array
	 */
	pushUserData ( userElement ) {
		const username = userElement.querySelector( this.options.userNameTag ).innerHTML;
		const link = userElement.querySelector( this.options.userLinkTag ).getAttribute( 'href' );

		this.usersList.push({
			username: username,
			link: link,
		});
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
		// console.table( this.usersList );
		console.log( this.usersList[ 0 ] );
	}

	/**
	 * Get height of users list scroll box
	 */
	get usersListScrollBoxHeight () {
		return this.elements.usersListScrollBox.offsetHeight;
	}
}
new YMParser({
	scrollDelay:           1000,

	usersListBoxTag:       '._aano',
	usersListScrollBoxTag: '._aano > div',

	userElementTag:        '[ aria-labelledby ]',
	userNameTag:           'div > span > a > span > div',
	userLinkTag:           'div > span > a',

	checkLoadingTag:       '._aanq',
});