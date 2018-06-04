# chronochat-electron

Chronochat-electron is an NDN chat application built on top of electron.js

This is a minimal chat application built off of [chronochat-js](https://github.com/named-data/ChronoChat-js).

Here is a brief description of the files and folders in this repository:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `src/main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `src/html/electron.html` - A web page to render. This is the app's **renderer process**.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/H-Huang/chronochat-electron
# Go into the repository
cd chronochat-electron
# Download electron development dependency
npm install electron --save-dev --save-exact
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## To Deploy

```bash
# package called electron-packager to create the OS-specific builds of ChronoChat electron app
npm install electron-packager --save-dev
# create release builds for windows, mac, or linux
npm run package-win (or package-mac, package-linux)
```

## License

[CC0 1.0 (Public Domain)](LICENSE.md)

