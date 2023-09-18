const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { version } = require('../package.json');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false,
		},
		icon: path.join(__dirname, 'favicon.ico'),
		resizable: false,

		title: `MSU-Net auto connect ${version}`,
	});

	win.setMenu(null);
	win.loadFile('index.html');
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
