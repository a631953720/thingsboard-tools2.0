import { CreateDeviceRes } from './TBDeviceInterface';

export default class TBCreateDeviceDTO implements CreateDeviceRes {
  status: number;

  name: string;

  type: string;

  label?: string;

  deviceProfileId: {
    entityType: string;
    id: string;
  };

  id: {
    entityType: string;
    id: string;
  };

  additionalInfo: any;

  errorMessage?: any;

  constructor(data: any) {
    this.status = data.status;
    this.name = data.name;
    this.type = data.type;
    this.label = data.label;
    this.deviceProfileId = data.deviceProfileId;
    this.id = data.id;
    this.errorMessage = data.errorMessage;
    this.additionalInfo = data.additionalInfo;
  }
}
