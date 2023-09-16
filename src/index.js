const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const ipc = ipcMain;

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
		frame: false,
	});

	win.setMenu(null);
	win.loadFile('index.html');

	ipc.on('closeApp', () => {
		win.close();
	});

	ipc.on('minimizeApp', () => {
		win.minimize();
	});
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
