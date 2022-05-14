export default class GetDeviceDTO {
  status: number;

  deviceList: Array<{
    id: string;
    name: string;
    type: string;
    label: string;
    createdTime: number;
    token: string;
  }>;

  totalElements: number;

  errorMessage?: any;

  constructor(data: any) {
    this.status = data.status;
    this.deviceList = data.data;
    this.totalElements = data.totalElements;
    this.errorMessage = data.errorMessage;
  }
}
