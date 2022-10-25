import Record from './Record';

// require('./Record');

export default class ReordSingleton {
  static recordInstance = null;

  static getInstance() {
    console.log('Record getInstance');
    if (ReordSingleton.recordInstance) {
      return ReordSingleton.recordInstance;
    }

    ReordSingleton.recordInstance = new Record();
    return ReordSingleton.recordInstance;
  }
}
