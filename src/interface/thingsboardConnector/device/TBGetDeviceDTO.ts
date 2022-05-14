import { GetDeviceRes } from './TBDeviceInterface';

export default class TBGetDeviceDTO implements GetDeviceRes {
  status: number;

  data: Array<{
    createdTime: number;
    id: {
      id: string;
      entityType: string;
    };
    name: string;
    type: string;
    label: string;
    tenantId: {
      entityType: string;
      id: string;
    };
  }>;

  hasNext: boolean;

  totalElements: number;

  totalPages: number;

  errorMessage?: any;

  constructor(data: any) {
    this.status = data.status;
    this.data = data.data;
    this.hasNext = data.hasNext;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.errorMessage = data.errorMessage;
  }
}
