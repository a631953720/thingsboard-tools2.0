export default class GetDeviceDTO {
    status: number;

    data: Array<{
        id: string;
        name: string;
        type: string;
        label: string;
        createdTime: number;
    }>;

    totalElements: number;

    errorMessage?: any;

    constructor(data: any) {
        this.status = data.status;
        this.data = data.data;
        this.totalElements = data.totalElements;
        this.errorMessage = data.errorMessage;
    }
}
