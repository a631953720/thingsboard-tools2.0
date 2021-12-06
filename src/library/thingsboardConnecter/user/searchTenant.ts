import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Tenant' });

type TenantEntity = {
    id: {
        id: string
        entityType: string
    },
    name: string
    firstName: string
    lastName: string
}

interface SearchTenantRes {
    status: number
    data?: Array<TenantEntity>
    hasNext?: boolean
    totalElements?: number
    totalPages?: number
}

class SearchTenantDTO implements SearchTenantRes {
    status: number;

    data: Array<TenantEntity>;

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

export default async function searchTenant(
    token: string,
    tenantAdminId: string,
    tenantEmail: string,
) {
    const response = await APICaller({
        method: 'get',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/tenant/${tenantAdminId}/users?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC&textSearch=${tenantEmail}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    });
    const DTO = new SearchTenantDTO(response);
    loggers.debug({
        targetTenantAdminId: tenantAdminId,
        targetTenantEmail: tenantEmail,
        DTO,
    }, 'Search Tenant account');
    return DTO;
}
