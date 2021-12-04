import env from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';
import { SearchTenantRes } from '../../../types/user';

const loggers = new WinstonLogger({ type: 'Tenant' });

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
    }) as Promise<SearchTenantRes>;
}
