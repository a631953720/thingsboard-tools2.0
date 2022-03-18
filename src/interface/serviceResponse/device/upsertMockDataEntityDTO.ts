export default class UpsertMockDataEntityDTO {
    status: number;

    name: string;

    config: object;

    errorMessage?: any;

    constructor(data: any) {
        this.status = data.status;
        this.name = data.name;
        this.config = data.config;
        this.errorMessage = data.errorMessage;
    }
}
