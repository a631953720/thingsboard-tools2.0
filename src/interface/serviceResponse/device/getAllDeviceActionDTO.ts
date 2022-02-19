type Devices = Array<{
    name: string;
    type: string;
    action?: Array<string>;
}>;

export default class GetAllDeviceActionDTO {
    devices: Devices;

    constructor(data: any) {
        if (Array.isArray(data)) {
            this.devices = data.map((d) => ({
                name: d.name,
                type: d.type,
                action: d.action,
            }));
        } else {
            this.devices = [];
        }
    }
}
