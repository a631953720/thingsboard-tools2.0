interface DeleteTBDeviceReq {
    deviceList: Array<string>;
}

export default class DeleteTBDeviceReqDTO implements DeleteTBDeviceReq {
    deviceList: string[];

    constructor(data: any) {
        this.deviceList = data.deviceList;
    }
}
