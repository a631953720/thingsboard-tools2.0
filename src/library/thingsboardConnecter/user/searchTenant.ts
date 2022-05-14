import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';
import SearchTenantDTO from '../../../interface/thingsboardConnector/user/TBSearchTenantDTO';

const loggers = new WinstonLogger({ type: 'Tenant' });

export default async function searchTenant(token: string, tenantAdminId: string, tenantEmail: string) {
  const response = await APICaller({
    method: 'get',
    url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/tenant/${tenantAdminId}/users?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC&textSearch=${tenantEmail}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${token}`,
    },
  });
  const DTO = new SearchTenantDTO(response);
  loggers.debug(
    {
      targetTenantAdminId: tenantAdminId,
      targetTenantEmail: tenantEmail,
      DTO,
    },
    'Search Tenant account'
  );
  return DTO;
}
