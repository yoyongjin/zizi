/* eslint-disable import/prefer-default-export */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, IpcMainEvent } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import sqlite from 'sqlite3';
import isDev from 'electron-is-dev';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

io.on('connection', (socket: any) => {
  console.log('a user connected');
  console.log(`connection state: ${socket.connected}`);

  socket.on('message', (msg: any) => {
    console.log(`message: ${JSON.stringify(msg)}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const sqlite3 = sqlite.verbose();
console.log(`__dirname: ${__dirname}`);
console.log(
  `path join __dirname: ${path.join(
    __dirname,
    './extraResources/standard_database.db'
  )}`
);
console.log(`process.resourcesPath: ${process.resourcesPath}`);
console.log(
  `path join process.resourcesPath: ${path.join(
    process.resourcesPath,
    'extraResources/standard_database.db'
  )}`
);
const db = new sqlite3.Database(
  isDev
    ? path.join('', './extraResources/standard_database.db') // my root folder if in dev mode
    : path.join(process.resourcesPath, 'extraResources/standard_database.db'), // the resources path if in production build
  (err) => {
    if (err) {
      console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@Database Error: ${err}`);
    } else {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@Database Loaded');
    }
  }
);

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 650,
    minWidth: 370,
    minHeight: 470,
    maxWidth: 1200,
    maxHeight: 650,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.on('send-run-query', (event: IpcMainEvent, query: string) => {
  console.log('send-selectAll => query from renderer : ', query);
  console.log('select result');

  db.all(query, (err, data) => {
    event.reply('send-run-query', data);
  });
});

ipcMain.on(
  'send-record-start',
  (event: IpcMainEvent, fileName: string, deviceId: string | number) => {
    console.log('start recording');
    event.reply('send-record-start', true);
  }
);

ipcMain.on('send-record-stop', (event: IpcMainEvent) => {
  console.log('stop recording');
  event.reply('send-record-stop', true);
});
