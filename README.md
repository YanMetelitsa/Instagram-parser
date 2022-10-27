# Instagram followers parser YMParser

You can use this parser to get list of instagram account followers.

# Features

- Instagram followers username and links parsing
- Download followers data to .txt file
- Simple and convenient work with console

# Usage

1. Go to https://instagram.com/username/followers/
2. Press <kbd>F12</kbd> to open browser development panel
3. Open the 'Console' tab
4. Copy the code from parser.js
5. Insert code to command line in 'Console'
6. Press <kbd>Enter</kbd>
7. Press <kbd>Enter</kbd> again or 'OK' in alert from instagram tab
8. Wait while parser is working
9. Done! You got followers data

# Settings

| Option | Description | type | Default |
| --- | --- | --- | --- |
| scrollDelay | Time before next scroll | `integer` | 1000 |
| theSameHeightNum | — | `integer` | 1 |
| usersListBoxTag | Tag name of users list box element | `string` | ._aano |
| usersListScrollBoxTag | Tag name of users list box scroll element | `string` | ._aano > div |
| userElementTag | Tag name of user element | `string` | [ aria-labelledby ] |
| userNameTag | Tag name of user name element | `string` | div > span > a > span > div |
| userLinkTag | Tag name of user link element | `string` | div > span > a |
| checkLoadingTag | Tag name of loading element | `string` | ._aanq |
| removeSymbols | Symbols to remove from all output data rows | `array (string)` | [] |
| download | True if you need to download data to .txt file | `boolean` | true |

# To-Do

- Parsing while followers number not equal constant variable
- Change output sctructure functionality
