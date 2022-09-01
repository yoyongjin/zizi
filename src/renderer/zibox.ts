// import { Zibox2 } from './zibox2-bundle';
require('./zibox2-bundle');

declare global {
  interface Window {
    Zibox2: any;
    ZiBox: any;
  }
}

export default class ZiBox {
  // private instance = null;

  // private ziboxInstance: any = null;
  static ziboxInstance: any = null;

  // constructor() {
  //     console.log('ZiBox constructor');
  //     if (this.instance) {
  //         return this.instance;
  //     }

  //     this.instance = this;
  // }

  static getInstance() {
    console.log('ZiBox getInstance');
    if (ZiBox.ziboxInstance) {
      return ZiBox.ziboxInstance;
    }

    ZiBox.ziboxInstance = new window.Zibox2();
    // ZiBox.ziboxInstance = new Zibox2();
    return ZiBox.ziboxInstance;
  }
}
