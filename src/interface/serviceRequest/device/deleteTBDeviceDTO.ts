interface DeleteTBDeviceReq {
    deviceList: Array<string> | Array<object>;
}

export default class DeleteTBDeviceReqDTO implements DeleteTBDeviceReq {
    deviceList: string[] | object[];

    constructor(data: any) {
        this.deviceList = data.deviceList;
    }
}
