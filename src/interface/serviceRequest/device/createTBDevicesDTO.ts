interface CreateTBDeviceReq {
    deviceCount: number;
    name: string;
    type: string;
    label?: string;
}
export default class CreateTBDeviceReqDTO implements CreateTBDeviceReq {
    deviceCount: number;

    name: string;

    type: string;

    label?: string;

    constructor(data: any) {
        this.deviceCount = data.deviceCount;
        this.name = data.deviceName;
        this.type = data.deviceType;
        this.label = data.deviceLabel;
    }
}
