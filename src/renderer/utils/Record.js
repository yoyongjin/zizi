const toWav = require('audiobuffer-to-wav');

const SAMPLE_RATE = 48000;

class Record {
  constructor() {
    this.micCtx = null;
    this.speakerCtx = null;

    this.micBuffer = [];
    this.speakerBuffer = [];

    this.recording = false;
  }

  connect(ctx, stream, buffer) {
    const source = ctx.createMediaStreamSource(stream);
    const processor = ctx.createScriptProcessor(4096, 1, 1);

    let closed = false;

    processor.onaudioprocess = (e) => {
      if (this.recording) {
        buffer.push([...e.inputBuffer.getChannelData(0)]);
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
    const buffers = [this.micBuffer, this.speakerBuffer];

    const length = Math.min(
      ...buffers.map((buffer) =>
        buffer.reduce((p, c) => {
          return p + c.length;
        }, 0)
      )
    );

    const resAudioBuffer = new AudioContext().createBuffer(
      2,
      length,
      SAMPLE_RATE
    );

    for (let c = 0; c < 1; c += 1) {
      const buffer = buffers[c];
      const channel = resAudioBuffer.getChannelData(c);
      let i = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const buf of buffer) {
        for (let j = 0; j < buf.length; j += 1) {
          channel[i] = buf[j];
          i += 1;
        }
      }
    }

    const wav = toWav(resAudioBuffer);

    window
      .saveFile(`${fileName}.wav`, wav)
      .then(() => {
        console.log('file saved');
        return true;
      })
      .catch((err) => {
        console.log('file save failed');
        console.error(err);
      });
  }

  stop(fileName) {
    this.recording = false;

    setTimeout(() => {
      this.createWav(fileName);
    }, 0);
  }

  async start() {
    this.micCtx = new AudioContext({
      sampleRate: SAMPLE_RATE,
    });
    this.speakerCtx = new AudioContext({
      sampleRate: SAMPLE_RATE,
    });

    this.micBuffer = [];
    this.speakerBuffer = [];

    this.recording = true;
    const mediaSourceId = await window.getDisplayMediaId();

    let devicePromise = null;
    let desktopConfig;

    if (navigator.userAgent.indexOf('Mac') !== -1) {
      devicePromise = navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const device = devices.filter(
            (dev) =>
              dev.kind === 'audiooutput' &&
              dev.label === 'Soundflower (2ch)' &&
              dev.deviceId !== 'default'
          )[0];
          if (device) {
            desktopConfig = {
              audio: {
                deviceId: device.deviceId,
              },
            };
          }

          return true;
        });
    } else {
      desktopConfig = {
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: mediaSourceId,
          },
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: mediaSourceId,
          },
        },
      };
    }

    await Promise.resolve(devicePromise);

    const [outStream, inStream] = await Promise.all([
      navigator.mediaDevices.getUserMedia(desktopConfig),
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      }),
    ]);

    this.connect(this.speakerCtx, outStream, this.speakerBuffer);
    this.connect(this.micCtx, inStream, this.micBuffer);
  }
}

export default Record;
