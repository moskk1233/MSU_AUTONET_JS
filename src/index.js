const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const Swal = require('sweetalert2');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		icon: path.join(__dirname, 'favicon.ico'),
		resizable: false,
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
