const app = {
	name:       'YMInstagramParser',
	author:     'Yan Metelitsa',
	authorLink: 'https://yanmet.com/',
	gitHubLink: 'https://github.com/YanMetelitsa/Instagram-parser',
	version:    '1.0.1',

	style:      'background-color: #7C04FC; padding: 4px 8px;',

	hardStop:   false,
};

class YMInstagramParser {
	/**
	 * Create Parser
	 * 
	 * @param {object} params Parser settings
	 */
	constructor ( params ) {
		/** Load params in options */
		this.options = params;

		/** Get main script elements */
		this.elements = {
			usersListBox: document.querySelector( this.options.usersListBoxTag ),
			usersListScrollBox: document.querySelector( this.options.usersListScrollBoxTag ),
			loading: document.querySelector( this.options.loadingTag ),
		};
		this.usersList = [];

		console.clear();
		console.log( `%c${app.name} v${app.version}`, app.style, `started with settings:` );
		console.table( params );
		console.log( `%cDevelopment`, app.style, `${app.author} ${app.authorLink}` );
		console.log( `%cGitHub`, app.style, app.gitHubLink );

		console.log( `Click OK in the Instagram tab to start parsing` );

		/** Press OK to start */
		if ( window.confirm( 'Click OK to start parsing' ) ) {
			/** Get the start time of the script */
			this.startTime = new Date();

			this.getusersList();
		} else {
			console.warn( `${app.name} stopped by user` );
		}
	}

	/** Get users list */
	getusersList () {
		let iterations = 0;

		let lastusersListScrollBoxHeight = 0;
		let theSameHeightIterationsNum = 0;

		console.log( `Scroll interval started. Please wait...` );

		/** Scroll interval */
		const interval = setInterval( () => {
			/** Check every 2 times if last scroll box had the same height with current */
			if ( iterations % 2 == 0 ) {
				if ( lastusersListScrollBoxHeight == this.usersListScrollBoxHeight ) {
					theSameHeightIterationsNum++;
				} else {
					theSameHeightIterationsNum = 0;
				}

				lastusersListScrollBoxHeight = this.usersListScrollBoxHeight;
			}

			/** Scroll */
			this.usersListScroll();

			iterations++;

			const usersLimit = this.options.usersLimit;
			const usersParsed = this.usersListBoxElements.length;
			const parsingTime = Math.abs( new Date() - this.startTime ) / 1000;

			console.clear();
			console.log( iterations, `users parsed: ${usersParsed} / ${usersLimit} in ${parsingTime} seconds` );

			/** Check if scroll stopped */
			if ( app.hardStop || ( theSameHeightIterationsNum >= this.options.theSameHeightNum && !isFinite( usersLimit ) ) || usersLimit <= usersParsed ) {
				clearInterval( interval );

				/** Push data in main users array */
				this.usersListBoxElements.forEach( ( userElement, index ) => {
					if ( index < usersLimit ) {
						this.pushUserData( userElement );
					} else {
						return;
					}
				});

				console.log( `Scroll interval successfully stopped and got ${usersParsed} users` );

				/** Show data */
				this.showData();

				/** Download data */
				if ( this.options.download ) {
					this.downloadData();
				}

				app.hardStop = false;
			}
		}, this.options.scrollDelay );
	}

	/**  Scroll users list */
	usersListScroll () {
		this.elements.usersListBox.scroll( 0, this.usersListScrollBoxHeight );
	}

	/**
	 * Push user data in main users array
	 * 
	 * @param {Element} userElement User list element
	 */
	pushUserData ( userElement ) {
		/** Get data */
		let output = {
			username: userElement.querySelector( this.options.userNicknameTag ).textContent,
			name:     this.options.defaultUserName,
			link:     userElement.querySelector( this.options.userLinkTag ).getAttribute( 'href' ),
		};

		/** If user has name - set */
		if ( userElement.querySelector( this.options.userNameTag ) ) {
			output.name = userElement.querySelector( this.options.userNameTag ).textContent;
		}
		
		/** Remove symbols from output */
		this.options.removeSymbols.forEach( symbol => {
			Object.keys( output ).forEach( key => {
				output[ key ] = output[ key ].replaceAll( symbol, '' );
			});
		});

		/** Push */
		this.usersList.push( output );
	}

	/** Print users data */
	showData () {
		const parsingTime = Math.abs( new Date() - this.startTime ) / 1000;

		console.clear();
		console.table( this.usersList );
		console.log( `Parsed ${this.usersList.length} users in ${parsingTime} seconds` );
	}

	/**
	 * Download data to file
	 * 
	 * @param {string} filename Name of the output file
	 * @param {string} extension Extension of the output file
	 */
	downloadData ( filename = this.options.fileName, extension = this.options.fileExtension ) {
		/** Format data */
		let data = ``;
		this.usersList.forEach( user => {
			const tags = {
				'{$username}': user.username,
				'{$name}':     user.name,
				'{$link}':     user.link,
			};

			let row = this.options.outputFormat;
			for ( const tag in tags ) {
				row = row.replaceAll( tag, tags[ tag ] );
			}

			data += row;
		});

		/** Create download link element */
		const linkElement = document.createElement( 'a' );
		linkElement.setAttribute( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( data ) );
		linkElement.setAttribute( 'download', `${filename}.${extension}` );

		/** Download and remove link */
		document.body.appendChild( linkElement );
		linkElement.click();
		document.body.removeChild( linkElement );

		console.log( `File with parsed users downloaded` );
	}

	/** Get height of users list scroll box */
	get usersListScrollBoxHeight () {
		return this.elements.usersListScrollBox.offsetHeight;
	}

	/**  Get elements from users list box */
	get usersListBoxElements () {
		return this.elements.usersListScrollBox.querySelectorAll( this.options.userElementTag );
	}
}

/** Hard stop */
window.addEventListener( 'keydown', e => {
	if ( e.ctrlKey && e.shiftKey && e.key == 'ArrowUp' ) {
		app.hardStop = true;
	}
});

/** Create parser and start */
const parser = new YMInstagramParser({
	scrollDelay:               1000,
	theSameHeightNum:          1,
	usersLimit:                Infinity,

	usersListBoxTag:           '._aano',
	usersListScrollBoxTag:     '._aano > div',

	userElementTag:            '[ aria-labelledby ]',
	userNicknameTag:           'div > span > a > span > div',
	userNameTag:               '[ aria-labelledby ] > div:nth-child( 2 ) > div:nth-child( 2 )',
	userLinkTag:               'div > span > a',

	defaultUserName:           'no_name',

	loadingTag:                '._aanq',

	removeSymbols:             [ /* 'a', 'v', `'` */ ],

	download:                  true,
	fileName:                  'users',
	fileExtension:             '.txt',
	outputFormat:              `{$username} ({$name}) https://instagram.com{$link}\n`,
});