import { DeleteDeviceRes } from './TBDeviceInterface';

export default class TBDeleteDeviceDTO implements DeleteDeviceRes {
    status: number;

    errorMessage?: any;

    constructor(data: any) {
        this.status = data.status;
        this.errorMessage = data.errorMessage;
    }
}
