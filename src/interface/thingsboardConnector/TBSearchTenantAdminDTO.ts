import { SearchTenantAdminRes, TenantAdminEntity } from './TBUserInterface';

export default class TBSearchTenantAdminDTO implements SearchTenantAdminRes {
    status: number;

    data: Array<TenantAdminEntity>;

    hasNext: boolean;

    totalElements: number;

    totalPages: number;

    errorMessage?: any;

    constructor(data: any) {
        this.status = data.status;
        this.hasNext = data.hasNext;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.data = data.data; // TB把列表放在Data內
        this.errorMessage = data.data; // APICaller 的錯誤訊息也會放在Data內
    }
}
