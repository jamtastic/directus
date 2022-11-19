oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @jamtastic/directus-bunny-cli
$ bunny COMMAND
running command...
$ bunny (--version)
@jamtastic/directus-bunny-cli/0.0.0 darwin-x64 node-v18.9.1
$ bunny --help [COMMAND]
USAGE
  $ bunny COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bunny hello PERSON`](#bunny-hello-person)
* [`bunny hello world`](#bunny-hello-world)
* [`bunny help [COMMAND]`](#bunny-help-command)
* [`bunny plugins`](#bunny-plugins)
* [`bunny plugins:install PLUGIN...`](#bunny-pluginsinstall-plugin)
* [`bunny plugins:inspect PLUGIN...`](#bunny-pluginsinspect-plugin)
* [`bunny plugins:install PLUGIN...`](#bunny-pluginsinstall-plugin-1)
* [`bunny plugins:link PLUGIN`](#bunny-pluginslink-plugin)
* [`bunny plugins:uninstall PLUGIN...`](#bunny-pluginsuninstall-plugin)
* [`bunny plugins:uninstall PLUGIN...`](#bunny-pluginsuninstall-plugin-1)
* [`bunny plugins:uninstall PLUGIN...`](#bunny-pluginsuninstall-plugin-2)
* [`bunny plugins update`](#bunny-plugins-update)

## `bunny hello PERSON`

Say hello

```
USAGE
  $ bunny hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/jamtastic/directus/blob/v0.0.0/dist/commands/hello/index.ts)_

## `bunny hello world`

Say hello world

```
USAGE
  $ bunny hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ bunny hello world
  hello world! (./src/commands/hello/world.ts)
```

## `bunny help [COMMAND]`

Display help for bunny.

```
USAGE
  $ bunny help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for bunny.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.18/src/commands/help.ts)_

## `bunny plugins`

List installed plugins.

```
USAGE
  $ bunny plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ bunny plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/index.ts)_

## `bunny plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bunny plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ bunny plugins add

EXAMPLES
  $ bunny plugins:install myplugin 

  $ bunny plugins:install https://github.com/someuser/someplugin

  $ bunny plugins:install someuser/someplugin
```

## `bunny plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ bunny plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ bunny plugins:inspect myplugin
```

## `bunny plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bunny plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ bunny plugins add

EXAMPLES
  $ bunny plugins:install myplugin 

  $ bunny plugins:install https://github.com/someuser/someplugin

  $ bunny plugins:install someuser/someplugin
```

## `bunny plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ bunny plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ bunny plugins:link myplugin
```

## `bunny plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bunny plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bunny plugins unlink
  $ bunny plugins remove
```

## `bunny plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bunny plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bunny plugins unlink
  $ bunny plugins remove
```

## `bunny plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bunny plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bunny plugins unlink
  $ bunny plugins remove
```

## `bunny plugins update`

Update installed plugins.

```
USAGE
  $ bunny plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
