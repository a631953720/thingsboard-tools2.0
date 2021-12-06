import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';
import { SearchTenantAdminRes } from '../../../types/user';

const loggers = new WinstonLogger({ type: 'Tenant' });

export default async function searchTenantAdmin(token: string, tenantAdminName: string) {
    loggers.debug({ tenantAdminName }, 'Get Tenant admin list');
    return APICaller({
        method: 'get',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/tenants?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC&textSearch=${tenantAdminName}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    }) as Promise<SearchTenantAdminRes>;
}
