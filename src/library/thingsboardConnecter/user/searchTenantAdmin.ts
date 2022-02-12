import SearchTenantAdminDTO from '../../../interface/thingsboardConnector/user/TBSearchTenantAdminDTO';
import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Tenant' });

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
