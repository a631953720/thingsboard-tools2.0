import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Tenant' });

type TenantAdminEntity = {
    id: {
        id: string
        entityType: string
    },
    name: string
    title: string
}

interface SearchTenantAdminRes {
    status: number
    data?: Array<TenantAdminEntity>
    hasNext?: boolean
    totalElements?: number
    totalPages?: number
}

class SearchTenantAdminDTO implements SearchTenantAdminRes {
    status: number;

    data: Array<TenantAdminEntity>;

    hasNext: boolean;

    totalElements: number;

    totalPages: number;

    constructor(data: any) {
        this.status = data.status;
        this.hasNext = data.hasNext;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.data = data.data;
    }
}

export default async function searchTenantAdmin(token: string, tenantAdminName: string) {
    const response = await APICaller({
        method: 'get',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/tenants?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC&textSearch=${tenantAdminName}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    });
    const DTO = new SearchTenantAdminDTO(response);
    loggers.debug({ tenantAdminName, DTO }, 'Get Tenant admin list');
    return DTO;
}
