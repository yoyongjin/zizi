const toWav = require('audiobuffer-to-wav');

const SAMPLE_RATE = 48000;

class Record {
  constructor() {
    // console.log('!@#$!@#$constructor');
    this.micCtx = null;

    this.micBuffer = [];

    this.recording = false;

    this.startDate = null;

    // console.log(
    //   `!@#$!@#$micCtx:${this.micCtx}, micBuffer.length:${this.micBuffer.length}, recording:${this.recording}`
    // );
  }

  connect(ctx, stream, buffer) {
    // console.log('!@#$!@#$connect');
    const source = ctx.createMediaStreamSource(stream);

    const processor = ctx.createScriptProcessor(4096, 2, 2);

    let closed = false;

    processor.onaudioprocess = (e) => {
      if (this.recording) {
        buffer.push([
          [...e.inputBuffer.getChannelData(0)],
          [...e.inputBuffer.getChannelData(1)],
        ]);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (!closed) {
          closed = true;

          processor.disconnect(ctx.destination);
          source.disconnect(processor);

          ctx.close();
        }
      }
    };

    source.connect(processor);
    processor.connect(ctx.destination);
  }

  createWav(fileName) {
    console.log('!@#$!@#$createWav');
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
      // console.log('!@#$!@#$channel:', channel);
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
    const filePath = `D:\\Zibox2Standard\\${fileName}.wav`;
    console.log(`*&^$%!@$!@$save path : ${filePath}`);
    window
      .saveFile(`${fileName}.wav`, wav)
      // .saveFile(filePath, wav)
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
    // console.log('!@#$!@#$stop');
    this.recording = false;

    setTimeout(() => {
      this.createWav(fileName);
    }, 0);
  }

  async start() {
    this.startDate = new Date();

    console.log('!@#$!@#$start');
    this.micCtx = new AudioContext({
      sampleRate: SAMPLE_RATE,
    });

    this.micBuffer = [];

    this.recording = true;

    let targetDeviceId = null;
    const devicesInfo = await navigator.mediaDevices.enumerateDevices();
    // console.log('!@#$!@#$deviceInfo:', devicesInfo);
    devicesInfo.forEach((device) => {
      if (
        device.kind === 'audioinput' &&
        device.label.indexOf('ZIBOX2') >= 0 &&
        device.deviceId.indexOf('default') < 0 &&
        device.deviceId.indexOf('communications') < 0
      ) {
        console.log(
          '!@#$!@#$지박스2 Device로 판단:',
          device.kind,
          device.label,
          device.deviceId
        );
        targetDeviceId = device.deviceId;
      }
    });

    // if (targetDeviceId === null) throw new Error();

    // console.log('!@#$!@#$deviceId2:', targetDeviceId);
    const [/* speakerStream, */ micStream] = await Promise.all([
      // navigator.mediaDevices.getUserMedia(desktopConfig),
      navigator.mediaDevices.getUserMedia({
        // 특정 device를 선택하는 방법 있을듯.
        // api 문서 확인해서 사용, ctrl 클릭
        audio: {
          mandatory: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            channelCount: 2,
            deviceId: targetDeviceId,
            // {
            // exact:
            //   '8a1037c366e13f21c6e466d72a36fb23fd12fa390bb02e5ac9120ee914c313eb',
            // exact: targetDeviceId,
            // targetDeviceId,
            // },
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
