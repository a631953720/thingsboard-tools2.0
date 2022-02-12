interface CreateDevicesRes {
    status: number;
    list: Array<{
        id: string;
        name: string;
    }>;
    errorMessage?: any;
}

export default class CreateDevicesDTO implements CreateDevicesRes {
    status: number;

    list: Array<{
        id: string;
        name: string;
    }>;

    errorMessage?: any;

    constructor(data: any) {
        this.status = data.status;
        this.list = data.list;
        this.errorMessage = data.errorMessage;
    }
}
