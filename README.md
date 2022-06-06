# MyDcrn

[![Build Status](https://github.com/decred/MyDcrn/workflows/Build%20and%20Test/badge.svg)](https://github.com/decred/MyDcrn/actions)
[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg)](http://copyfree.org)

MyDcrn is a cross-platform GUI for decred written in node.js using
Electron.

## Installation

Currently MyDcrn is available on Windows, Linux, and macOS.

MyDcrn will NOT use or in any way disrupt the CLI wallet file you may
already be using at this time.

Download the MyDcrn release for your operating system on [decred/decred-binaries](https://github.com/decred/decred-binaries/releases).

On macOS, Ubuntu (14.04 LTS kernel 3.16 and later), and recent Debians, there should be
no additional dependencies needed (exception: Ubuntu 18.04+, see [issue #1404](https://github.com/decred/MyDcrn/issues/1404)).

On Fedora or similar distros you may need to install the libXScrnSaver
package if you see this error:
```
error while loading shared libraries: libXss.so.1
```

You can install this on a recent Fedora with the command:

```bash
sudo dnf -y install libXScrnSaver
```

On linux you will need to decompress the package:
```bash
tar -xvzf MyDcrn-X.X.X.tar.gz
```
and then run the file:
```bash
./MyDcrn
```

This will start dcrnd and dcrnwallet for you.

On macOS, double-click the .dmg file, drag the .app to your
Applications folder.  Double click on MyDcrn.app to start.

You can also install via [brew cask](https://caskroom.github.io):
```bash
brew cask install MyDcrn
```

From there follow the on screen instructions to setup your wallet.

### Options

When running a release version, there are a few options available.

To see additional debug information (including the output of dcrnd and dcrnwallet) run:

```
MyDcrn --debug
```

To pass additional arguments to dcrnwallet (such as to increase the logging level run:

```
MyDcrn --extrawalletargs='-d=debug'
```

## Development Setup

### Node and Electron Versions

You need to use compatible node and electron versions to build native modules
and in general to ensure the code you're working on will behave correctly in
production.

The current recommended versions for the main tools are:

  - Node: 10.2+
  - Npm: 6.4+
  - Yarn: 1.12+
  - Electron: 3.0.6

To ease node version management, install all top-level tools (node/npm/yarn) using nvm ([linux/mac](https://github.com/creationix/nvm), [windows](https://github.com/creationix/nvm)).


### Decred binaries

Development using the master version of MyDcrn usually requires using a
corresponding master version of dcrnd/dcrnwallet.

Follow the instructions to install dcrnd, dcrnwallet and dcrnctl from source from
their respective repos:

- [dcrnd/dcrnctl installation instructions](https://github.com/decred/dcrnd#updating)
- [dcrnwallet installation instructions](https://github.com/decred/dcrnwallet#installation-and-updating)


### Basic Development Setup

These steps are usually the only ones required for basic development on
linux/macOS (after compiling dcrnd/dcrnwallet/dcrnctl from source).

For Windows users, it's usually a good idea to use
[MSYS2](https://www.msys2.org/) instead of the standard cmd.exe (see below for
more Windows tips).

```bash
git clone https://github.com/decred/MyDcrn.git
cd MyDcrn
mkdir bin/
cp $GOPATH/bin/dcr* bin/
yarn
yarn dev
```

### Keeping up with dcrnd/dcrnwallet changes

If you're developing MyDcrn improvements on a daily basis, you need to also keep up to date with dcrnd/dcrnwallet changes (specially when developing things like new grpc calls).

In that case, instead of copying the binaries to `/bin` it's better to symlink
them so that you only need a single step (go install) to run newer versions of
these tools:

```bash
cd bin
ln -s `which dcrnd` dcrnd
ln -s `which dcrnctl` dcrnctl
ln -s `which dcrnwallet` dcrnwallet
```

### Advanced Daemon Mode

This step is only recommended if you're constantly restarting MyDcrn. If
you're not developing on a daily basis, you can safely ignore this for the
moment.

When starting MyDcrn in RPC (or "normal") mode, it automatically runs dcrnd
in the backgound to gather blockchain data. If you need to constantly restart
MyDcrn, loading the node every time may be time consuming.

In that case, it's helpful to run the dcrnd node in a separate process and simply
attach to it between MyDcrn restarts. In order to see the advanced daemon
configuration options either start MyDcrn with the ```--advanced``` option or open ```config.json``` and set the
```daemon_start_advanced``` flag to ```true``` as follows:

```"daemon_start_advanced": true,```

Note: Your config.json file is located in the following directories:

Windows - ```C:\Users\<your-username>\AppData\Local\MyDcrn\config.json```

macOS - ```$HOME/Library/Application\ Support/MyDcrn/config.json```

Linux - ```~/.config/MyDcrn/config.json```

Run the following to start the Decred daemon in a standalone terminal window:

Windows - ```dcrnd --testnet -u USER -P PASSWORD --rpclisten=127.0.0.1:19119 --rpccert=C:\Users\<username>\AppData\Local\dcrnd\rpc.cert```

macOS - ```dcrnd --testnet -u USER -P PASSWORD --rpclisten=127.0.0.1:19119 --rpccert=$HOME/Library/Application\ Support/dcrnd/rpc.cert```

Linux - ```dcrnd --testnet -u USER -P PASSWORD --rpclisten=127.0.0.1:19119 --rpccert=~/.dcrnd/rpc.cert```

Once you restart MyDcrn, you should be presented with a screen to specify
the node parameters. Note that all of them are present in the command you used
to start the node for your respective system.

CLI options (including ```--advanced```) when running `yarn dev` are currently not supported.

## Platform-specific instructions

### macOS

To start MyDcrn from command-line (assuming it is installed in `/Applications`):

```$ /Applications/MyDcrn.app/Contents/MacOS/MyDcrn```


### Windows

Windows is tricky, due to some things working better on MSYS2, while some things
only working on cmd.exe, and native module building being very tough to get
right.

On a day-to-day basis, for development and testing (of general MyDcrn
functionality) MSYS2 is fine, and usually useful for providing GNU-like CLI
tools.

However, for building native modules, you'll need to use the cmd.exe prompt.

First, from an *administrative prompt* (cmd.exe), install `windows-build-tools`:

```bash
npm install --global --production windows-build-tools
```

This _usually_ works, but sometimes bugs out. If it does, try manually
installing the vs tools by going opening an explorer window to
`c:\users\[user]\.windows-build-tools`, then running `vs_BuildTools.exe`.

After installing windows-build-tools, open a *non-administrative* prompt
(cmd.exe) and then try recompiling the native modules:

```bash
yarn
yarn rebuild-natives
```

If you have multiple versions of VS Build Tools installed, you may need to
configure which version to use:

```bash
npm config set msvs_version 2015 -g
```

Sometimes you have to nuke `/node_modules` and `/app/node_modules` for the
native modules to be forced to rebuild.

You might also run into trouble when compiling or trying to use modules compiled
with a different version of node than the one that electron internally uses. In
that case, switch to the same version of node from electron (check the
electron/node version [here](https://github.com/electron/node)) then try
everything again.

The end result for module compilation should be the following files:

- `app/node_modules/blake-hash/bin/win32-x64-64/blake-hash.node`
- `app/node_modules/win32ipc/build/Release/win32ipc.node`
- `app/node_modules/grpc/src/node/extension_binary/electron-v3.0-win32-x64/grpc_node.node`

*Note*: `yarn start` does _not_ currently correctly load the win32ipc module, so
testing with yarn build/start will fail to correctly unload dcrnd/dcrnwallet when
closing.


### Raspberry Pi & Other Platforms

Building on a Raspberry Pi (and other less common platforms) requires rebuilding
the native modules, given that most of them (specially grpc) do not come with
precompiled binaries for them.

Do note that for the moment, support for this platform is experimental, so you
might need to tweak stuff (in particular, you'll need to disable hardware
acceleration and ui animations) to run MyDcrn on it.

```bash
yarn rebuild-natives
```


## Building release versions

You need the binaries _copied_ into the `bin/` directly (note that symlinks
don't work for production builds: you need to actually copy the executables).

You can test the production version (without most of the debugging info and with
compiled and minified code) by using:

```bash
yarn build
yarn start
```

And finally, a packaged version (including the final standalone electron
binaries) for the current platform can be built with:

```bash
yarn package
```

### Linux

You need to make sure you have the following packages installed for the building to work:

- icns2png
- graphicsmagick
- rpm-build

```bash
yarn package-linux
```

After it is finished it will have the built rpm, deb and tar.gz in the releases/ directory.

If you're only interested in a tar.gz, you can alternatively use:

```bash
yarn package-dev-linux
```

## Contact

If you have any further questions you can find us at:

- irc.freenode.net (channel #decred)
- [webchat](https://webchat.freenode.net/?channels=decred)
- forum.decred.org
- decred.slack.com

## Issue Tracker

The
[integrated github issue tracker](https://github.com/decred/MyDcrn/issues)
is used for this project.

## License

MyDcrn is licensed under the [copyfree](http://copyfree.org) ISC License.
