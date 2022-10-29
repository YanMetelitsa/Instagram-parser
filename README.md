# Instagram followers parser

Use this parser to collect a list of followers on instagram.

## Features

- Instagram followers username and links parsing
- Download followers formatted data to file 
- Simple and convenient work with console
- Shortcut key <kbd>Crtl</kbd> + <kbd>Shift</kbd> + <kbd>Up</kbd> to stop parsing

## Usage

1. Go to https://instagram.com/username/followers/
2. Press <kbd>F12</kbd> to open browser development panel
3. Open the `Console` tab
4. Copy code from [parser.js](parser.js)
5. Insert code to command line in `Console`
6. Enter the required settings or leave the default
7. Press <kbd>Enter</kbd>
8. Press <kbd>Enter</kbd> again or click `OK` in alert from Instagram tab
9. Wait while parser is working...
10. You can use shortcut key <kbd>Crtl</kbd> + <kbd>Shift</kbd> + <kbd>Up</kbd> to stop parsing
11. Done! You got followers data

## Settings

| Option | Description | Type |
| --- | --- | --- |
| scrollDelay | Time before next scroll | `integer` |
| theSameHeightNum | After how many matches scroll height script stops | `integer` |
| followersLimit | At what number of followers to stop the script | `integer` |
| followersListBoxTag | Tag name of followers list box element | `string` |
| followersListScrollBoxTag | Tag name of followers list box scroll element | `string` |
| followerElementTag | Tag name of follower element | `string` |
| followerNameTag | Tag name of follower name element | `string` |
| followerLinkTag | Tag name of follower link element | `string` |
| checkLoadingTag | Tag name of loading element | `string` |
| removeSymbols | Symbols to remove from all output data rows | `array (string)` |
| download | Is it necessary to download the data to a file | `boolean` |
| fileName | Name of the file | `string` |
| fileExtension | Extension of the file | `string` |
| outputFormat | Download file data format | `string` |

## Output format

| Tag | Description |
| --- | --- |
| `{$username}` | Follower username |
| `{$link}` | Follower link slug |
| `\n` | New line |

## Output examples

### Excel output

Creates an excel file with two columns

```javascript
const settings = {
  fileExtension: '.csv',
  outputFormat:  `{$username};https://instagram.com{$link}\n`,
};
```
