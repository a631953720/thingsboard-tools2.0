interface DeleteDeviceRes {
    status: number;
    errorMessage?: any;
}

export default class DeleteDeviceDTO implements DeleteDeviceRes {
    status: number;

    errorMessage?: any;

    constructor(data: any) {
        this.status = data.status;
        this.errorMessage = data.errorMessage;
    }
}
