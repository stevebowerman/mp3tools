mp3tools
========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mp3tools.svg)](https://npmjs.org/package/mp3tools)
[![Downloads/week](https://img.shields.io/npm/dw/mp3tools.svg)](https://npmjs.org/package/mp3tools)
[![License](https://img.shields.io/npm/l/mp3tools.svg)](https://github.com/stevebowerman/mp3tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g mp3tools
$ mp3tools COMMAND
running command...
$ mp3tools (-v|--version|version)
mp3tools/0.0.0 darwin-x64 node-v12.14.1
$ mp3tools --help [COMMAND]
USAGE
  $ mp3tools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mp3tools help [COMMAND]`](#mp3tools-help-command)
* [`mp3tools pivi`](#mp3tools-pivi)
* [`mp3tools query`](#mp3tools-query)
* [`mp3tools rebuild`](#mp3tools-rebuild)

## `mp3tools help [COMMAND]`

display help for mp3tools

```
USAGE
  $ mp3tools help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.5/src/commands/help.ts)_

## `mp3tools pivi`

Updates title tag with (DISC-TRACK) in the title to accommodate JLR Pivi Pro issue of not using track number for ordering music on USB

```
USAGE
  $ mp3tools pivi

OPTIONS
  -s, --source=source  [default: ./test] Source of mp3 files

DESCRIPTION
  ...
  Workaround for JLR's PiviPro system that doesn't recognise id3 "track" tag and orders tracks alphabetically
```

_See code: [src/commands/pivi.js](https://github.com/stevebowerman/mp3tools/blob/v0.0.0/src/commands/pivi.js)_

## `mp3tools query`

Run queries on the mp3 DB

```
USAGE
  $ mp3tools query

OPTIONS
  --album=album      Album
  --artist=artist    Artist
  --genre=genre      Genre
  --missing=missing  Missing
  --title=title      Title

DESCRIPTION
  Run queries on the mp3 DB
```

_See code: [src/commands/query.js](https://github.com/stevebowerman/mp3tools/blob/v0.0.0/src/commands/query.js)_

## `mp3tools rebuild`

Indexes mp3 source and creates JSON file DB

```
USAGE
  $ mp3tools rebuild

OPTIONS
  -s, --source=source  [default: ./test] Source of mp3 files

DESCRIPTION
  ...
  TO-DO
```

_See code: [src/commands/rebuild.js](https://github.com/stevebowerman/mp3tools/blob/v0.0.0/src/commands/rebuild.js)_
<!-- commandsstop -->
