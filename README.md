# Instagram followers parser YMParser

Use this parser to collect a list of followers on instagram.

# Features

- Instagram followers username and links parsing
- Download followers formatted data to file 
- Simple and convenient work with console

# Usage

1. Go to https://instagram.com/username/followers/
2. Press <kbd>F12</kbd> to open browser development panel
3. Open the `Console` tab
4. Copy code from `parser.js`
5. Insert code to command line in `Console`
6. Enter the required settings or leave the default
7. Press <kbd>Enter</kbd>
8. Press <kbd>Enter</kbd> again or click `OK` in alert from Instagram tab
9. Wait while parser is working...
10. Done! You got followers data

# Settings

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| scrollDelay | Time before next scroll | `integer` | 1000 |
| theSameHeightNum | After how many matches scroll height script stops | `integer` | 1 |
| followersLimit | At what number of followers to stop the script | `integer` | Infinity |

| followersListBoxTag | Tag name of followers list box element | `string` | ._aano |
| followersListScrollBoxTag | Tag name of followers list box scroll element | `string` | ._aano > div |

| followerElementTag | Tag name of follower element | `string` | [ aria-labelledby ] |
| followerNameTag | Tag name of follower name element | `string` | div > span > a > span > div |
| followerLinkTag | Tag name of follower link element | `string` | div > span > a |

| checkLoadingTag | Tag name of loading element | `string` | ._aanq |

| removeSymbols | Symbols to remove from all output data rows | `array (string)` | [] |

| download | Is it necessary to download the data to a file | `boolean` | true |
| fileName | Name of the file | `string` | followers |
| fileExtension | Extension of the file | `string` | .txt |
| outputFormat | Download file data format | `string` | {$username} https://instagram.com{$link}\n |

# Output format

`{$username}` - Follower username
`{$link}` - Follower link slug
`\n` - New line