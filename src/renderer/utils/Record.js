const toWav = require('audiobuffer-to-wav');
require('../zibox-packet-bundle');

const SAMPLE_RATE = 48000;

class Record {
  constructor() {
    console.log('=================================Record.js constructor');

    this.micCtx = null;

    this.micBuffer = [];

    this.recording = false;

    this.startDate = null;

    this.ziboxPacket = new window.ZiBoxPlayer('http://localhost:5001');

    this.onSTTEvent();
  }

  onSTTEvent() {
    this.ziboxPacket.onSTTEventListener = (channel, script, isFinal) => {
      console.log('onSTTEventListener..');
      console.log(channel, script, isFinal); // 여기가 결과 값
    };

    this.ziboxPacket.onSocketEventListener = (data, type) => {
      console.log('onSocketEventListener..');
      console.log(data, type);

      switch (type) {
        case 'connect':
          if (data === 'success') {
            try {
              this.ziboxPacket.initialize('1234');
            } catch (error) {
              console.log(error);
            }
          }
          break;
        case 'initialize':
          if (data === 'success') {
            console.log('연결 성공');
            // alert('초기 설정 완료');
          }
          break;
        default:
          break;
      }
    };
  }

  connect(ctx, stream, buffer) {
    console.log('=================================Record.js connect');

    const source = ctx.createMediaStreamSource(stream);

    const processor = ctx.createScriptProcessor();

    let closed = false;

    let count = 0;
    let leftBuffer = [];
    let rightBuffer = [];

    processor.onaudioprocess = (e) => {
      if (this.recording) {
        const left = [...e.inputBuffer.getChannelData(0)];
        const right = [...e.inputBuffer.getChannelData(1)];
        buffer.push([left, right]);

        console.log('--------------left.length: ', left.length);
        console.log('--------------right.length: ', right.length);
        console.log('--------------count: ', count);

        leftBuffer = leftBuffer.concat(left);
        rightBuffer = rightBuffer.concat(right);
        console.log('--------------leftBuffer.length: ', leftBuffer.length);
        console.log('--------------rightBuffer.length: ', rightBuffer.length);

        // if (count < 10) {
        //   count += 1;
        // } else {
        //   const packet = {
        //     left: leftBuffer,
        //     right: rightBuffer,
        //   };
        //   console.log('--------------packet:', packet);
        //   this.ziboxPacket.sendSTTPacket(packet, true);

        //   leftBuffer.length = 0;
        //   rightBuffer.length = 0;
        //   count = 0;
        // }

        const packet = {
          left,
          right,
        };

        this.ziboxPacket.sendSTTPacket(packet, true);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (!closed) {
          closed = true;

          processor.disconnect(ctx.destination);
          source.disconnect(processor);

          ctx.close();
        }
      }
      // console.log('>>>>>>>>>buffer length: ', buffer.length);
      // console.log('>>>>>>>>>buffer: ', buffer);
    };

    source.connect(processor);
    processor.connect(ctx.destination);
  }

  createWav(fileName) {
    // console.log('!@#$!@#$createWav');
    const length = this.micBuffer
      .map((lrBuffer) => lrBuffer[0])
      .reduce((p, c) => {
        return p + c.length;
      }, 0);

    const resAudioBuffer = new AudioContext().createBuffer(
      2,
      length,
      SAMPLE_RATE
    );

    for (let channel = 0; channel < 2; channel += 1) {
      let i = 0;
      const channelData = resAudioBuffer.getChannelData(channel); // [0], [1] l,r
      // eslint-disable-next-line no-restricted-syntax
      for (const lrData of this.micBuffer) {
        const buf = lrData[channel];
        for (let j = 0; j < buf.length; j += 1) {
          channelData[i] = buf[j];
          i += 1;
        }
      }
    }

    const wav = toWav(resAudioBuffer);
    const filePath = `\\zibox2-standard-test\\zibox2-standard\\public/${fileName}.wav`;
    // console.log(`*&^$%!@$!@$save path : ${filePath}`);
    window
      // .saveFile(`${fileName}.wav`, wav)
      .saveFile(filePath, wav)
      .then(() => {
        // console.log('!@#$!@#$file saved');
        return true;
      })
      .catch((err) => {
        // console.log('!@#$!@#$file save failed');
        console.error(err);
      });
  }

  stop(fileName) {
    console.log('=================================Record.js stop');
    this.recording = false;
    this.ziboxPacket.stopSTT();
    setTimeout(() => {
      this.createWav(fileName);
    }, 0);
  }

  async start() {
    console.log('=================================Record.js start');
    this.startDate = new Date();
    this.ziboxPacket.startSTT();

    this.micCtx = new AudioContext({
      sampleRate: SAMPLE_RATE,
    });

    this.micBuffer = [];

    this.recording = true;

    let targetDeviceId = null;
    const devicesInfo = await navigator.mediaDevices.enumerateDevices();
    devicesInfo.forEach((device) => {
      if (
        device.kind === 'audioinput' &&
        // device.label.indexOf('ZIBOX2') >= 0 &&
        device.label.indexOf('USB') >= 0 &&
        device.deviceId.indexOf('default') < 0 &&
        device.deviceId.indexOf('communications') < 0
      ) {
        console.log(
          '지박스2 Device로 판단:',
          device.kind,
          device.label,
          device.deviceId
        );
        targetDeviceId = device.deviceId;
      }
    });

    // if (targetDeviceId === null) throw new Error();

    const [/* speakerStream, */ micStream] = await Promise.all([
      // navigator.mediaDevices.getUserMedia(desktopConfig),
      navigator.mediaDevices.getUserMedia({
        audio: {
          mandatory: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            channelCount: 2,
            deviceId: targetDeviceId,
          },
          optional: [],
        },
        video: false,
      }),
    ]);

    console.log(micStream.getTracks()[0].getCapabilities());

    // this.connect(this.speakerCtx, speakerStream, this.speakerBuffer);
    this.connect(this.micCtx, micStream, this.micBuffer);
  }
}

export default Record;
