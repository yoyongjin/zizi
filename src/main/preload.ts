/* eslint-disable no-console */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('getDisplayMediaId', () => {
  return new Promise((resolve) => {
    ipcRenderer.once('get-media-source-id', (_, displayMediaId) => {
      resolve(displayMediaId); // 스피커 캡쳐 용도 필요 없어짐
    });
    ipcRenderer.send('get-media-source-id');
  });
});

contextBridge.exposeInMainWorld(
  'saveFile',
  (fileName: string, data: ArrayBuffer) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('save-file', (_, err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
      ipcRenderer.send('save-file', fileName, new Int16Array(data));
    });
  }
);

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});

export type IpcDbChannel = 'ipcDbChannel';

contextBridge.exposeInMainWorld('ipcDbChannel', {
  sendQureyToMain: (query: string, callback: any) => {
    ipcRenderer.once('send-run-query', (_, data) => {
      // console.log(`send-run-query - preload data: ${data}`);
      callback(data);
    });
    ipcRenderer.send('send-run-query', query);
  },
  searchQureyToMain: (
    startDate: string,
    endDate: string,
    phonenumber: string,
    memo: string,
    callback: any
  ) => {
    ipcRenderer.once('send-search-query', (_, data) => {
      // console.log(`send-search-query - preload data: ${data}`); // 여기 렌더링 확인
      callback(data);
    });
    ipcRenderer.send(
      'send-search-query',
      startDate,
      endDate,
      phonenumber,
      memo
    );
  },
  insertMenualQureyToMain: (
    date: string,
    time: string,
    phonenumber: string,
    filename: string,
    memo: string,
    callback: any
  ) => {
    ipcRenderer.once('send-insert-query', (_, data) => {
      console.log(`send-insert-query - preload data: ${data}`);
      callback(data);
    });
    ipcRenderer.send(
      'send-insert-query',
      date,
      time,
      phonenumber,
      filename,
      memo
    );
  },
  updateMemoQureyToMain: (id: string, memo: string, callback: any) => {
    ipcRenderer.once('send-update-query', (_, data) => {
      console.log(`send-update-query - preload data: ${data}`);
      callback(data);
    });
    ipcRenderer.send('send-update-query', id, memo);
  },
  deleteCallQureyToMain: (ids: Array, callback: any) => {
    ipcRenderer.once('send-delete-query', (_, data) => {
      console.log(`send-delete-query - preload data: ${data}`);
      callback(data);
    });
    ipcRenderer.send('send-delete-query', ids);
  },
});

export type WindowChannel = 'windowChannel';

contextBridge.exposeInMainWorld('windowChannel', {
  windowCloseToMain: () => {
    ipcRenderer.once('send-window-close', () => {
      console.log(`preload send-window-close`);
    });
    ipcRenderer.send('send-window-close');
  },
  windowMinimizeToMain: () => {
    ipcRenderer.once('send-window-minimize', () => {
      console.log(`preload send-window-minimize`);
    });
    ipcRenderer.send('send-window-minimize');
  },
  windowFullScreenToMain: (mode: boolean) => {
    ipcRenderer.once('send-window-fullscreen', () => {
      console.log(`preload send-window-fullscreen:`);
    });
    ipcRenderer.send('send-window-fullscreen', mode);
  },
});

export type RecordChannel = 'recordChannel';

contextBridge.exposeInMainWorld('recordChannel', {
  // startRecord: (fileName: string, deviceId: string | number, callback: any) => {
  //   ipcRenderer.once('send-record-start', (_, data) => {
  //     callback(data);
  //   });
  //   // console.log(fileName);
  //   // console.log(deviceId);
  //   ipcRenderer.send('send-record-start', fileName, deviceId);
  // },
  // stopRecord: (callback: any) => {
  //   ipcRenderer.once('send-record-stop', (_, data) => {
  //     console.log('recordChannel - stopRecord - send-connect-y');
  //     callback(data);
  //   });
  //   ipcRenderer.send('send-record-stop');
  // },
  startRecord: (userKey: string | number, callback: any) => {
    ipcRenderer.on('send-record-start', (_, data) => {
      console.log(`recordChannel - startRecord - send-record-start: ${data}`);
      callback(data);
    });
  },
  stopRecord: (userKey: string | number, callback: any) => {
    ipcRenderer.on('send-record-stop', (_, data) => {
      console.log(`#################PRELOAD TIME: ${Date.now()}`);
      console.log(`#################userKey: ${userKey}`);
      console.log(`recordChannel - stopRecord - send-record-stop: ${data}`);
      callback(data);
    });
  },
});

export type ConnectChannel = 'connectChannel';

contextBridge.exposeInMainWorld('connectChannel', {
  sendSeverIp: (serverIp: string, callback: any) => {
    ipcRenderer.once('send-serverip', (_, data) => {
      console.log(`connectChannel - sendSeverIp - send-serverip: ${data}`);
      callback(data);
    });
    ipcRenderer.send('send-serverip', serverIp);
  },
  sendConnectY: (socketId: string | number, callback: any) => {
    ipcRenderer.on('send-connect-y', (_, data) => {
      console.log(`connectChannel - sendConnectY - send-connect-y: ${data}`);
      callback(data);
    });
  },
  sendConnectN: (socketId: string | number, callback: any) => {
    ipcRenderer.on('send-connect-n', (_, data) => {
      console.log(`connectChannel - sendConnectN - send-connect-n: ${data}`);
      callback(data);
    });
  },
});
