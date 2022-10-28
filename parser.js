const app = {
	name:       'YMInstagramParser',
	author:     'Yan Metelitsa',
	authorLink: 'https://yanmet.com/',
	version:    '1.0.0',

	style:      'background-color: #7C04FC; padding: 4px 8px;',
};

const settings = {
	scrollDelay:               1000,
	theSameHeightNum:          1,
	followersLimit:            Infinity,

	followersListBoxTag:       '._aano',
	followersListScrollBoxTag: '._aano > div',

	followerElementTag:        '[ aria-labelledby ]',
	followerNameTag:           'div > span > a > span > div',
	followerLinkTag:           'div > span > a',

	checkLoadingTag:           '._aanq',

	removeSymbols:             [],

	download:                  true,
	fileName:                  'followers',
	fileExtension:             '.txt',
	outputFormat:              `{$username} https://instagram.com{$link}\n`,
};

class YMInstagramParser {
	/** Create Parser */
	constructor ( params ) {
		/** Get the start time of the script */
		this.startTime = new Date();
		
		/** Load params in options */
		this.options = params;

		/** Get main script elements */
		this.elements = {
			followersListBox: document.querySelector( this.options.followersListBoxTag ),
			followersListScrollBox: document.querySelector( this.options.followersListScrollBoxTag ),
		};
		this.followersList = [];

		console.clear();
		console.log( `%c${app.name} v${app.version}`, app.style, `started with settings:` );
		console.table( params );
		console.log( `%cDevelopment`, app.style, `${app.author} ${app.authorLink}` );

		console.log( `Click OK in the Instagram tab to start parsing` );

		/** Press OK to start */
		if ( window.confirm( 'Click OK to start parsing' ) ) {
			this.getFollowersList();
		} else {
			console.warn( `${app.name} stopped by user` );
		}
	}

	/** Get followers list */
	getFollowersList () {
		let iterations = 0;

		let lastFollowersListScrollBoxHeight = 0;
		let theSameHeightIterationsNum = 0;

		console.log( `Scroll interval started. Please wait...` );

		/** Scroll interval */
		const interval = setInterval( () => {
			/** Check every 2 times if last scroll box had the same height with current */
			if ( iterations % 2 == 0 ) {
				if ( lastFollowersListScrollBoxHeight == this.followersListScrollBoxHeight ) {
					theSameHeightIterationsNum++;
				} else {
					theSameHeightIterationsNum = 0;
				}

				lastFollowersListScrollBoxHeight = this.followersListScrollBoxHeight;
			}

			/** Scroll */
			this.followersListScroll();

			iterations++;

			const followersLimit = this.options.followersLimit;
			const followersParsed = this.followersListBoxElements.length;
			const parsingTime = Math.abs( new Date() - this.startTime ) / 1000;

			console.clear();
			console.log( iterations, `Followers parsed: ${followersParsed} / ${followersLimit} in ${parsingTime} seconds` );

			/** Check if scroll stopped */
			if ( ( theSameHeightIterationsNum >= this.options.theSameHeightNum && !isFinite( followersLimit ) ) || followersLimit < followersParsed ) {
				clearInterval( interval );

				/** Push data in main followers array */
				this.followersListBoxElements.forEach( ( followerElement, index ) => {
					if ( index <= followersLimit ) {
						this.pushFollowerData( followerElement );
					} else {
						return;
					}
				});

				console.log( `Scroll interval successfully stopped and got ${followersParsed} followers` );

				/** Show data */
				this.showData();

				/** Download data */
				if ( this.options.download ) {
					this.downloadData();
				}
			}
		}, this.options.scrollDelay );
	}

	/**  Scroll followers list */
	followersListScroll () {
		this.elements.followersListBox.scroll( 0, this.followersListScrollBoxHeight );
	}

	/**
	 * Push follower data in main followers array
	 * 
	 * @param {Element} followerElement Followers list element
	 */
	pushFollowerData ( followerElement ) {
		/** Get data */
		let output = {
			username: followerElement.querySelector( this.options.followerNameTag ).innerText,
			link:     followerElement.querySelector( this.options.followerLinkTag ).getAttribute( 'href' ),
		};
		
		/** Remove symbols from output */
		this.options.removeSymbols.forEach( symbol => {
			Object.keys( output ).forEach( key => {
				output[ key ] = output[ key ].replaceAll( symbol, '' );
			});
		});

		this.followersList.push( output );
	}

	/** Print followers data */
	showData () {
		const parsingTime = Math.abs( new Date() - this.startTime ) / 1000;

		console.clear();
		console.table( this.followersList );
		console.log( `Parsed ${this.followersList.length} followers in ${parsingTime} seconds` );
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
		this.followersList.forEach( follower => {
			const tags = {
				'{$username}': follower.username,
				'{$link}':     follower.link,
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

		console.log( `File with parsed followers downloaded` );
	}

	/** Get height of followers list scroll box */
	get followersListScrollBoxHeight () {
		return this.elements.followersListScrollBox.offsetHeight;
	}

	/**  Get elements from followers list box */
	get followersListBoxElements () {
		return this.elements.followersListScrollBox.querySelectorAll( this.options.followerElementTag );
	}
}

/** Create parser and start */
const parser = new YMInstagramParser( settings );