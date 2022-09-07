/* eslint-disable no-console */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

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
      callback(data);
    });
    ipcRenderer.send('send-run-query', query);
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
});
