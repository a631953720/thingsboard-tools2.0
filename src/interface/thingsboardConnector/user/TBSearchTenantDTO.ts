import { SearchTenantRes, TenantEntity } from './TBUserInterface';

export default class TBSearchTenantDTO implements SearchTenantRes {
  status: number;

  data: Array<TenantEntity>;

  hasNext: boolean;

  totalElements: number;

  totalPages: number;

  errorMessage?: any;

  constructor(data: any) {
    this.status = data.status;
    this.hasNext = data.hasNext;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.data = data.data;
    this.errorMessage = data.errorMessage;
  }
}
