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
      searchQureyToMain(
        startDate: string,
        endDate: string,
        phonenumber: string,
        memo: string,
        callback: any
      ): void;
      insertMenualQureyToMain(
        date: string,
        time: string,
        phonenumber: string,
        filename: string,
        memo: string,
        callback: any
      ): void;
      updateMemoQureyToMain(id: string, memo: string, callback: any): void;
      deleteCallQureyToMain(id: Array, callback: any): void;
      receive(
        channel: string,
        func: (...args: unknown[]) => void
      ): (() => void) | undefined;
      removeListeners(channel: string): void;
    };
    windowChannel: {
      windowCloseToMain(): void;
      windowMinimizeToMain(): void;
      windowFullScreenToMain(mode: boolean): void;
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
      checkConnect(callback: any): void;
    };
    sttChannel: {
      sendSttFull(
        // channel: string,
        // endTime: string,
        datas: any,
        callback: any
      ): void;
      getSttData(fileName: string, callback: any): void;
    };
  }
}

export {};
