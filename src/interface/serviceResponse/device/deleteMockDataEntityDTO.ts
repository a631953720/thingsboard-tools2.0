export default class DeleteMockDataEntityDTO {
  status: number;

  errorMessage?: any;

  constructor(data: any) {
    this.status = data.status;
    this.errorMessage = data.errorMessage;
  }
}
