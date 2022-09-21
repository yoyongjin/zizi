import { Channels, RecordChannel } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
    myApi: {
      send(channel: string, data: string): void;
      receive(
        channel: string,
        func: (...args: unknown[]) => void
      ): (() => void) | undefined;
      removeListeners(channel: string): void;
    };
    ipcDbChannel: {
      sendQureyToMain(query: string, callback: any): void;
      updateMemoQureyToMain(
        id: string,
        memoContent: string,
        callback: any
      ): void;
      deleteCallQureyToMain(id: Array, callback: any): void;
      receive(
        channel: string,
        func: (...args: unknown[]) => void
      ): (() => void) | undefined;
      removeListeners(channel: string): void;
    };
    recordChannel: {
      // startRecord(
      //   fileName: string,
      //   deviceId: string | number,
      //   callback: any
      // ): void;
      // stopRecord(callback: any): void;
      startRecord(userKey: string, callback: any): void;
      stopRecord(userKey: string, callback: any): void;
    };
    connectChannel: {
      sendSeverIp(serverIp: string, callback: any): void;
      sendConnectY(socketId: string, callback: any): void;
      sendConnectN(socketId: string, callback: any): void;
    };
  }
}

export {};
