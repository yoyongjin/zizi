import { desktopCapturer } from 'electron';

class Record {
  static async getDisplayMediaSourceId() {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    return sources[0].id;
  }
}

export default Record;
