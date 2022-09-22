export const Zibox2Status = {};
export const Zibox2Error = {
    MIC_CON_ERROR1: `Permission denied`,
    MIC_CON_ERROR2: `Requested device not found`,
    MIC_CON_ERROR3: `Failed to execute 'getUserMedia' on 'MediaDevices': At least one of audio and video must be requested`,
    MIC_CON_ERROR4: `OverconstrainedError`, //1번쨰 마이크로 녹취 후, 1번째 마이크 언플러그 후 녹취시작 시 발생 혹은 연결할 마이크없을때 발생?

    SECURITY_ERROR1: `SecurityError`,
};
export const Zibox2ErrorMsg = {
    MIC_CON_ERROR1: `마이크 권한 설정을 허용해 주세요.[Error Code:1]`,
    MIC_CON_ERROR2: `마이크 연결을 확인해 주세요.[Error Code:2]`,
    MIC_CON_ERROR3: `마이크 장치를 Zibox2로 설정해 주세요.[Error Code:3]`,
    MIC_CON_ERROR4: `마이크 장치를 Zibox2로 설정해 주세요.[Error Code:4]`,

    SECURITY_ERROR1: `You need to use HTTPS for selecting audio output device`,
};

export const DeviceLabel = {
    //   ZIBOX2 : "USB Audio Device",
    ZIBOX2: "ZIBOX2", // 여기 수정
    DEFAULT: "default",
    COMMUNICATIONS: "communications",
};

export const DeviceKind = {
    AUDIO_INPUT: "audioinput",
    AUDIO_OUTPUT: "audiooutput",
    VIDEO_INPUT: "videoinput",
};

export const MimeType = {
    AUDIO_WAV: "audio/wav",
    AUDIO_PCM: "audio/pcm",
    AUDIO_WEBM: "audio/webm",
};

export const DeviceEvent = {
    DEVICE_CHANGE: "devicechange",
    CHANGE: "change",
};
