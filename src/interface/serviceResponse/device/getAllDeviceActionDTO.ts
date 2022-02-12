type Devices = Array<{
    name: string;
    action?: Array<string>;
}>;

export default class GetAllDeviceActionDTO {
    devices: Devices;

    constructor(data: any) {
        this.devices = data;
    }
}
