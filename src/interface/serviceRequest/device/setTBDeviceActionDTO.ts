export type Actions = 'sendData' | 'subscribeRPC';

export type Devices = Array<{
    id: string;
    name: string;
    token: string;
    action?: Array<Actions>;
}>;
interface SetTBDeviceActionReq {
    deviceList: Devices;
}

export default class SetTBDeviceActionReqDTO implements SetTBDeviceActionReq {
    deviceList: Devices;

    constructor(data: any) {
        this.deviceList = data.deviceList;
    }
}
