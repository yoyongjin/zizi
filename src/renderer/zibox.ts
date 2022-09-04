/* eslint-disable no-console */
require('./zibox2-bundle');

declare global {
  interface Window {
    Zibox2: any;
    ZiBox: any;
  }
}

export default class ZiBox {
  static ziboxInstance: any = null;

  static getInstance() {
    console.log('ZiBox getInstance');
    if (ZiBox.ziboxInstance) {
      return ZiBox.ziboxInstance;
    }

    ZiBox.ziboxInstance = new window.Zibox2();
    return ZiBox.ziboxInstance;
  }
}
