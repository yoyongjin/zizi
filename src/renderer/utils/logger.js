import { pad } from './utils';

class Logger {
  static log(message, object) {
    if(process.env.NODE_ENV === 'development') {
      let current = new Date();
      let hour = pad(String(current.getHours()));
      let min = pad(String(current.getMinutes()));
      let sec = pad(String(current.getSeconds()));
      let millis = pad(String(current.getMilliseconds()), 3);
      let prefix = `[${hour}:${min}:${sec}.${millis}] `;

      if (object) console.log(prefix + message, object);
      else console.log(prefix + message);
    }
    // console.log(`[utils logger]노드ENV:${process.env.NODE_ENV}`)
  }
  
  static error(message, object) {
    if(process.env.NODE_ENV === 'development') {
      let current = new Date();
      let hour = pad(String(current.getHours()));
      let min = pad(String(current.getMinutes()));
      let sec = pad(String(current.getSeconds()));
      let millis = pad(String(current.getMilliseconds()), 3);
      let prefix = `[${hour}:${min}:${sec}.${millis}] `;

      if (object) console.error(prefix + message, object);
      else console.error(prefix + message);
    }
    // console.log(`[utils logger]노드ENV:${process.env.NODE_ENV}`)
  }

}


export default Logger;