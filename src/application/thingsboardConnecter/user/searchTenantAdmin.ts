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
    title: string
}

type Response = {
    status: number
    data: Array<TenantEntity>
    hasNext: boolean
    totalElements: number
    totalPages: number
}

export default async function searchTenantAdmin(token: string, tenantAdminName: string) {
    loggers.debug({ tenantAdminName }, 'Get Tenant admin id');
    return APICaller({
        method: 'get',
        url: `http://${env.TB.ip}:${env.TB.port}/api/tenants?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC&textSearch=${tenantAdminName}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    }) as Promise<Response>;
}
