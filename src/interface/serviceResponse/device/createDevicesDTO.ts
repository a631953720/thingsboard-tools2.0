import { SetDeviceActionErrorResult } from 'service/device/setDeviceAction';

interface CreateDevicesRes {
  status: number;
  list: Array<{
    id: string;
    name: string;
    token: string;
  }>;
  errorMessage?: any;
  errorDeviceResult: SetDeviceActionErrorResult;
}

export default class CreateDevicesDTO implements CreateDevicesRes {
  status: number;

  list: Array<{
    id: string;
    name: string;
    token: string;
  }>;

  errorMessage?: any;

  errorDeviceResult: SetDeviceActionErrorResult;

  constructor(data: any) {
    this.status = data.status;
    this.list = data.list;
    this.errorMessage = data.errorMessage;
    this.errorDeviceResult = data.errorDeviceResult;
  }
}
