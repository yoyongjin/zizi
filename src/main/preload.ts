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
    console.log('send-selectAll..');
    ipcRenderer.once('send-run-query', (_, data) => {
      callback(data);
    });
    ipcRenderer.send('send-run-query', query);
  },
});

export type RecordChannel = 'recordChannel';

contextBridge.exposeInMainWorld('recordChannel', {
  send: (channel: RecordChannel, args: boolean) => {
    const validChannels = ['send-recordStart'];
    if (validChannels.includes(channel)) {
      console.log('send-recordStart..');
      ipcRenderer.send(channel, args);
    }
  },
  receive: (channel: RecordChannel, func: any) => {
    const validChannels = ['receive-selectAll'];
    if (validChannels.includes(channel)) {
      console.log('receive-selectAll..');
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  removeListeners: (channel: RecordChannel) => {
    const validChannels = ['receive-selectAll'];
    if (validChannels.includes(channel)) {
      console.log('remove receive-selectAll..');
      ipcRenderer.removeAllListeners(channel);
    }
  },
});
