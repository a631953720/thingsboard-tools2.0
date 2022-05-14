import { GetDeviceTokenRes } from './TBDeviceInterface';

export default class TBGetDeviceDTO implements GetDeviceTokenRes {
  status: number;

  createdTime: number;

  credentialsId: string;

  credentialsType: string;

  errorMessage?: any;

  constructor(data: any) {
    this.status = data.status;
    this.createdTime = data.createdTime;
    this.credentialsId = data.credentialsId;
    this.credentialsType = data.credentialsType;
    this.errorMessage = data.errorMessage;
  }
}
