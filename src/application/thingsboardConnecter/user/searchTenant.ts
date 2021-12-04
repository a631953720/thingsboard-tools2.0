import env from '../../../constants/env';
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

type Response = {
    status: number
    data: Array<TenantEntity>
    hasNext: boolean
    totalElements: number
    totalPages: number
}

export default function searchTenant(token: string, tenantAdminId: string, tenantEmail: string) {
    loggers.debug({
        targetTenantAdminId: tenantAdminId,
        targetTenantEmail: tenantEmail,
    }, 'Search Tenant account');
    return APICaller({
        method: 'get',
        url: `http://${env.TB.ip}:${env.TB.port}/api/tenant/${tenantAdminId}/users?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC&textSearch=${tenantEmail}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    }) as Promise<Response>;
}
