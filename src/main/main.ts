import { execSync } from 'child_process';
/* eslint-disable consistent-return */
/* eslint-disable func-names */
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
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  IpcMainEvent,
  IpcMainInvokeEvent,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import sqlite from 'sqlite3';
import isDev from 'electron-is-dev';
import fs, { unwatchFile } from 'fs';
import { exec } from 'child_process';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import Record from './utils/record';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
// const { remote } = require('electron').remote;
// const currentWindow = remote.getCurrentWindow();

// function window_close() {
//   currentWindow.close();
// }

// function window_minimize() {
//   currentWindow.minimize();
// }

const sqlite3 = sqlite.verbose();
// console.log(`__dirname: ${__dirname}`);
// console.log(
//   `path join __dirname: ${path.join(
//     __dirname,
//     './extraResources/standard_database.db'
//   )}`
// );
// console.log(`process.resourcesPath: ${process.resourcesPath}`);
// console.log(
//   `path join process.resourcesPath: ${path.join(
//     process.resourcesPath,
//     'extraResources/standard_database.db'
//   )}`
// );
const db = new sqlite3.Database(
  isDev
    ? path.join('', './extraResources/standard_database.db') // my root folder if in dev mode
    : path.join(process.resourcesPath, 'extraResources/standard_database.db'), // the resources path if in production build
  (err) => {
    if (err) {
      console.log(`Database Error: ${err}`);
    } else {
      console.log('Database Loaded');
    }
  }
);

let mainWindow: BrowserWindow | null = null;
// let childWindow: BrowserWindow | null = null;

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
    // width: 1215,
    // height: 665,
    width: 1200,
    height: 600,
    // minWidth: 370,
    // minHeight: 470,
    // maxWidth: 1200,
    // maxHeight: 650,
    icon: getAssetPath('icon.png'),
    resizable: false, // ?????? ?????? ?????? ??????
    center: true, // ?????? ???????????? ??????
    autoHideMenuBar: true, // ????????? ????????? ?????? ??????
    frame: false, // ????????? ??????
    // enableLargerThanScreen: true,
    // useContentSize: true,
    webPreferences: {
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  // childWindow = new BrowserWindow({
  //   show: false,
  //   // width: 1215,
  //   // height: 665,
  //   width: 900,
  //   height: 600,
  //   // minWidth: 370,
  //   // minHeight: 470,
  //   // maxWidth: 1200,
  //   // maxHeight: 650,
  //   // icon: getAssetPath('icon.png'),
  //   resizable: true, // ?????? ?????? ?????? ??????
  //   center: true, // ?????? ???????????? ??????
  //   autoHideMenuBar: false, // ????????? ????????? ?????? ??????
  //   frame: false, // ????????? ??????
  //   fullscreen: false,
  //   webPreferences: {
  //     sandbox: false,
  //     preload: app.isPackaged
  //       ? path.join(__dirname, 'preload.js')
  //       : path.join(__dirname, '../../.erb/dll/preload.js'),
  //   },
  // });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  // console.log(resolveHtmlPath('/src/renderer/index2.ejs'));
  // childWindow.loadURL(resolveHtmlPath('/src/renderer/index2.ejs'));

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
    console.log('mainwindow close');
    db.close();
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    console.log('&&&&&&&&edata.url: ', edata.url);
    if (edata.url === 'about:blank') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          modal: true,
          frame: true,
          // fullscreenable: false,
          fullscreen: false,
          backgroundColor: 'white',
          webPreferences: {
            preload: 'my-child-window-preload-script.js',
          },
        },
      };
    }
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, { pingInterval: 1000, pingTimeout: 2000 });

let clients = {};

const dateFormat = (nowDate: Date) => {
  console.log('type:', typeof nowDate);
  return `${nowDate.getFullYear()}${
    nowDate.getMonth() + 1 < 10
      ? `0${nowDate.getMonth() + 1}`
      : nowDate.getMonth() + 1
  }${nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()}${
    nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours()
  }${
    nowDate.getMinutes() < 10
      ? `0${nowDate.getMinutes()}`
      : nowDate.getMinutes()
  }${
    nowDate.getSeconds() < 10
      ? `0${nowDate.getSeconds()}`
      : nowDate.getSeconds()
  }`;
};

io.on('connection', (socket: any) => {
  console.log('a user connected');
  console.log(`connection state: ${socket.connected}`);
  console.log(`connected socket id: ${socket.id}`);

  if (mainWindow != null) {
    // console.log('%%%%%%%%%%send connect y');
    mainWindow.webContents.send('send-connect-y', socket.id);
    // childWindow?.show();
  }

  ipcMain.on('check-connect', async (event: IpcMainEvent) => {
    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    console.log('ipcMain.on - check-connect result: ', socket.connected);
    // event.reply('check-connect', true);
    if (socket.connected) event.reply('check-connect', true);
    else event.reply('check-connect', false);
  });

  /*
  (io : O / ?????? state)
  ?????? ?????? (2 : OFFHOOK)
  ?????? ?????? (3 : CONNECTED)
  ?????? ?????? (0 : IDLE)

  (io : I / ?????? state)
  ?????? ?????? (2 : OFFHOOK)
  ?????? ?????? (3 : CONNECTED)
  ?????? ?????? (0 : IDLE)
  */
  let cnt = 0;
  socket.on('message', (msg: any) => {
    console.log(
      '====================================================================================================================================='
    );

    // console.log(`original message: ${msg}`);
    // const str = JSON.stringify(msg);
    // console.log(`stringify message: ${str}`);
    // console.log(`stringify replaceAll message: ${str.replaceAll('\\', '')}`);
    // const obj = JSON.parse(msg);
    // const message = JSON.parse(obj.message);
    // console.log(
    //   `parse message: ${obj.key}, ${obj.message},${message.volume},${message.type}`
    // );
    // console.log(
    //   `stringify replaceAll message: ${JSON.stringify(msg).replaceAll(
    //     '\\',
    //     ''
    //   )}`
    // );
    const originalObj = JSON.parse(msg);
    const messageObj = JSON.parse(originalObj.message);

    if (messageObj.type === 'state') {
      console.log(`cnt:${cnt++}`);
      const callObj = JSON.parse(messageObj.filename);
      switch (messageObj.state) {
        case 2:
          console.log(
            `[${callObj.callStartDateTime}] Call start: ${originalObj.key} -> ${callObj.remoteNumber}`
          );
          break;
        case 3:
          console.log(
            `[${callObj.callConnectedDateTime}] Call connected: ${originalObj.key} -> ${callObj.remoteNumber}`
          );
          if (mainWindow != null) {
            console.log('ipcMain.on - send-record-start');
            mainWindow.webContents.send('send-record-start', originalObj.key);
          }
          break;
        case 0:
          console.log(
            `[${callObj.callEndDateTime}] Call stop: ${originalObj.key} -> ${callObj.remoteNumber} / ${callObj.talkTime} sec (${callObj.callTime} sec)`
          );
          if (mainWindow != null) {
            console.log('ipcMain.on - send-record-stop');
            // console.log(`#################MAIN TIME: ${Date.now()}`);
            // mainWindow.webContents.send('send-record-stop', originalObj.key);
            const fileName = dateFormat(new Date());
            mainWindow.webContents.send('send-record-stop', fileName);
            // ipcMain.on('send-file-name', async (fileName) => {
            //   console.log(
            //     '-------------------------------------------send-file-name : ',
            //     fileName
            //   );
            // });
            // console.log(callObj.callType);
            // console.log(callObj.remoteNumber);
            // console.log(callObj.callStartDateTime);
            // console.log(callObj.callConnectedDateTime);
            // console.log(callObj.callEndDateTime);
            // console.log(callObj.callTime);
            // console.log(callObj.talkTime);
            const callDate = callObj.callStartDateTime.substring(0, 8);
            const callTime = callObj.callStartDateTime.substring(8, 14);
            // console.log(
            //   `${callObj.callType}, ${callObj.remoteNumber},${callObj.callStartDateTime},${callObj.callConnectedDateTime},${callObj.callEndDateTime},${callObj.callTime},${callObj.talkTime}`
            // );
            // console.log(
            //   `${callObj.remoteNumber.substring(
            //     0,
            //     3
            //   )}-${callObj.remoteNumber.substring(
            //     3,
            //     7
            //   )}-${callObj.remoteNumber.substring(7, 11)}`
            // );
            db.run(
              'INSERT INTO tb_call(date, time, phoneNumber, filename, memo) VALUES(?, ?, ?, ?, ?)',
              [
                `${callDate.substring(0, 4)}.${callDate.substring(
                  4,
                  6
                )}.${callDate.substring(6, 8)}`,
                `${callTime.substring(0, 2)}:${callTime.substring(
                  2,
                  4
                )}:${callTime.substring(4, 6)}`,
                // `${callObj.remoteNumber.substring(
                //   0,
                //   3
                // )}-${callObj.remoteNumber.substring(
                //   3,
                //   7
                // )}-${callObj.remoteNumber.substring(7, 11)}`,
                `${callObj.remoteNumber}`,
                `${fileName}`,
                '',
              ],
              function (err) {
                if (err) {
                  return console.log(err.message);
                }
                console.log(
                  `A row has been inserted with rowid ${this.lastID}`
                );
              }
            );
          }
          break;
        default:
          break;
      }
    }

    console.log(
      '====================================================================================================================================='
    );
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.id}`);

    if (mainWindow != null) {
      mainWindow.webContents.send('send-connect-n', socket.id);
    }
    // delete socket;
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

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

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('send-serverip', async (event: IpcMainEvent) => {
  require('dns').lookup(
    require('os').hostname(),
    function (err: any, add: any, fam: any) {
      console.log(`ipcMain.on - send-serverip : ${add}`);
      if (mainWindow != null) {
        event.reply('send-serverip', add);
      }
    }
  );
});

ipcMain.on('send-run-query', (event: IpcMainEvent, query: string) => {
  console.log('ipcMain.on - send-selectAll => query from renderer : ', query);

  db.all(query, (err, data) => {
    console.log('db select success..');
    event.reply('send-run-query', data);
  });
});

ipcMain.on(
  'send-search-query',
  (
    event: IpcMainEvent,
    startDate: string,
    endDate: string,
    phonenumber: string,
    memo: string
  ) => {
    console.log(
      'ipcMain.on - send-selectSearch => query from renderer : ',
      startDate,
      endDate,
      phonenumber,
      memo
    );
    let query = 'select * from tb_call ';

    if (!startDate && !endDate && !phonenumber && !memo) {
      console.log(query);
    } else {
      let toggleAnd = false;
      query += ` where `;
      query += ` ${
        startDate
          ? (function () {
              toggleAnd = true;
              return `date>='${startDate}' `;
            })()
          : ''
      }`;
      query += ` ${
        endDate
          ? `${
              toggleAnd
                ? ' and '
                : (function () {
                    toggleAnd = true;
                    return '';
                  })()
            } date<='${endDate}' `
          : ''
      }`;
      query += ` ${
        phonenumber
          ? `${
              toggleAnd
                ? ' and '
                : (function () {
                    toggleAnd = true;
                    return '';
                  })()
            } phonenumber like '%${phonenumber}%' `
          : ''
      }`;
      query += ` ${
        memo
          ? `${
              toggleAnd
                ? ' and '
                : (function () {
                    toggleAnd = true;
                    return '';
                  })()
            } memo like '%${memo}%' `
          : ''
      }`;
    }
    // console.log(`###################${query}`);
    db.all(query, (err, data) => {
      console.log('db select success..');
      console.log(data.length);
      event.reply('send-search-query', data);
    });
  }
);

ipcMain.on(
  'send-insert-query',
  (
    event: IpcMainEvent,
    date: string,
    time: string,
    phonenumber: string,
    filename: string,
    memo: string
  ) => {
    console.log(
      'ipcMain.on - send-insertMenualInfo => param from renderer : ',
      date,
      time,
      phonenumber,
      filename,
      memo
    );

    db.run(
      'INSERT INTO tb_call(date, time, phoneNumber, filename, memo) VALUES(?, ?, ?, ?, ?)',
      [date, time, phonenumber, filename, memo],
      function (this, err) {
        console.log('this.changes:', this.changes);
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been updated with rowid ${this.lastID}`);
        event.reply('send-update-query', this.changes);
      }
    );
  }
);

ipcMain.on(
  'send-update-query',
  (event: IpcMainEvent, id: string, memo: string) => {
    console.log(
      'ipcMain.on - send-updateMemo => param from renderer : ',
      id,
      memo
    );

    db.run(
      'UPDATE tb_call SET memo=? WHERE id=?',
      [memo, id],
      function (this, err) {
        console.log('this.changes:', this.changes);
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been updated with rowid ${id}`);
        event.reply('send-update-query', this.changes);
      }
    );
  }
);

ipcMain.on('send-delete-query', (event: IpcMainEvent, ids: Array) => {
  console.log('ipcMain.on - send-deleteCall => param from renderer : ', ids);
  let result = 0;
  ids.map((id: any, index: number) => {
    db.run('DELETE FROM tb_call WHERE id=?', [id], function (this, err) {
      console.log('this.changes:', this.changes);
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been deleted with rowid ${id}`);
      result += this.changes;

      if (index === ids.length - 1) {
        console.log('final result:', result);
        event.reply('send-delete-query', result);
      }
    });
  });
});

ipcMain.on('get-media-source-id', async (event) => {
  const mediaSourceId = await Record.getDisplayMediaSourceId();
  event.reply('get-media-source-id', mediaSourceId);
});

ipcMain.on('save-file', async (event, fileName, buffer) => {
  fs.writeFile(fileName, buffer, (err) => {
    event.reply('save-file', err);
  });
});

// let sttLeftData = '';
// let sttRightData = '';

ipcMain.on('save-stt-file', async (event, fileName, sttBuffer) => {
  console.log('save-stt-file : filePath: ', fileName);
  console.log(sttBuffer);

  let content = '';
  sttBuffer.map(
    (sttData: { ts: any; channel: string; script: any }, index: number) => {
      content += `${sttData.ts}|${
        sttData.channel === 'left' ? 'speaker1' : 'speaker2'
      }|${sttData.script.trim()}`;
      if (index !== sttBuffer.length - 1) content += `\r\n`;
    }
  );
  fs.writeFile(fileName, content, (err) => {
    event.reply('save-stt-file', err);
  });
});

// ipcMain.on('send-stt-data', async (event, channel, endTime, script) => {
//   console.log(`main: send-stt-data - ${channel}, ${endTime}, ${script}`);
//   if (channel === 'left') {
//     sttLeftData += `${script}\r\n`;
//   } else {
//     sttRightData += `${script}\r\n`;
//   }
//   if (mainWindow != null) {
//     const datas = { channel, endTime, script };
//     mainWindow.webContents.send('send-stt-full', datas);
//   }
// });

ipcMain.on('get-stt-data', async (event, fileName) => {
  console.log(`main: get-stt-data - ${fileName}`);
  console.log(`C:/ZiPhone/record/${fileName}`);

  // fs.readFile(`public\\${fileName}`, 'utf8', (err, data) => {
  fs.readFile(`C:/ZiPhone/record/${fileName}`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      const arrData = data.split('\r\n');
      const parseArr = [];
      arrData.map((d) => {
        // console.log('---------------------');
        // console.log(d);
        const arrD = d.split('|');
        const sttData = {
          channel: arrD[1],
          ts: arrD[0],
          script: arrD[2],
        };
        parseArr.push(sttData);
      });
      event.reply('get-stt-data', parseArr);
    }
  });
});
// const { exec } = require('child_process');
// const util = require('util');
// const execFile = util.promisify(require('child_process').execFile);

ipcMain.on('play-record', async (event, fileName) => {
  console.log(`main: play-record - ${fileName}`);
  console.log(`C:/ZiPhone/record/${fileName}`);

  // fs.readFile(`public\\${fileName}`, 'utf8', (err, data) => {
  // fs.open(`C:/ZiPhone/record/${fileName}`, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(data);
  //     event.reply('play-record', data);
  //   }
  // });

  // exec(
  //   `"C:\\Program Files\\Windows Media Player\\wmplayer.exe" "C:\\ZiPhone\\record\\${fileName}"`
  // );

  // execFile('C:\\Program Files\\Windows Media Player\\wmplayer.exe', 'C:\\ZiPhone\\record\\${fileName}');
  shell.openPath(`C:\\ZiPhone\\record\\${fileName}`);
});

ipcMain.on('send-window-close', async (event) => {
  // db.close();
  console.log('-------------------------------------------window close..');
  if (mainWindow) mainWindow.close();
  // mainWindow = null;
});

ipcMain.on('send-window-minimize', async (event) => {
  console.log('-------------------------------------------window minimize..');
  if (mainWindow) mainWindow.minimize();
  // if (childWindow) childWindow.show();
  // const childWindow2 = window.open('', 'modal');
  // childWindow2.document.write('<h1>Hello</h1>');
});

ipcMain.on('send-window-fullscreen', async (event, mode: boolean) => {
  console.log(
    '-------------------------------------------window fullscreen change'
  );
  if (mainWindow) mainWindow.setFullScreen(mode);
  // if (childWindow) childWindow.show();
  // const childWindow2 = window.open('', 'modal');
  // childWindow2.document.write('<h1>Hello</h1>');
});
// ipcMain.on(
//   'send-record-start',
//   (event: IpcMainEvent, fileName: string, deviceId: string | number) => {
//     console.log('ipcMain.on - send-record-start');
//     event.reply('send-record-start', true);
//   }
// );

// ipcMain.on('send-record-stop', (event: IpcMainEvent) => {
//   console.log('ipcMain.on - send-record-stop');
//   event.reply('send-record-stop', true);
// });
