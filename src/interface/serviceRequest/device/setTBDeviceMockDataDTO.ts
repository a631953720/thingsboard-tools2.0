export default class SetTBDeviceMockDataDTO {
    name: string;

    data: object;

    constructor(data: { name: string; data: object }) {
        this.name = data.name.toString();
        this.data = data.data;
    }
}
