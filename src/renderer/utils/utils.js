import { DeviceLabel, DeviceKind } from "./code";
class Utils {
    static getCurrentDate() {
        const date = new Date();
        const yyyy = date.getFullYear().toString();
        let MM = date.getMonth() + 1;
        let dd = date.getDate();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();

        MM = MM < 10 ? "0" + MM : MM.toString();
        dd = dd < 10 ? "0" + dd : dd.toString();
        hh = hh < 10 ? "0" + hh : hh.toString();
        mm = mm < 10 ? "0" + mm : mm.toString();
        ss = ss < 10 ? "0" + ss : ss.toString();

        return yyyy + MM + dd + hh + mm + ss;
    }

    static async getConstraints() {
        let deviceId = null;
        const devicesInfo = await navigator.mediaDevices.enumerateDevices();
        devicesInfo.forEach((device) => {
            if (
                device.kind === DeviceKind.AUDIO_INPUT &&
                device.label.indexOf(DeviceLabel.ZIBOX2) >= 0 &&
                device.deviceId.indexOf(DeviceLabel.DEFAULT) < 0 &&
                device.deviceId.indexOf(DeviceLabel.COMMUNICATIONS) < 0
            ) {
                console.log(
                    "지박스2 Device로 판단:",
                    device.kind,
                    device.label,
                    device.deviceId
                );
                deviceId = device.deviceId;
            }
        });
        return deviceId
            ? {
                  audio: {
                      deviceId: deviceId ? { exact: deviceId } : undefined,
                  },
              }
            : null;
    }
    static pad(data, defaultLength = 2) {
        if (data.length < defaultLength) {
            return "0" + data;
        }
        return data;
    }
}

export default Utils;

export const pad = (data, defaultLength = 2) => {
    if (data.length < defaultLength) {
        return "0" + data;
    }
    return data;
};
