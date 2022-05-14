import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { TenantAdminsProfileProps } from '../../../interface/user';
import TBCreateTenantAdminDTO from '../../../interface/thingsboardConnector/user/TBCreateTenantAdminDTO';

const loggers = new WinstonLogger({ type: 'Tenant' });

export default async function createTenantAdmin(adminToken: string, tenantAdminsProfile: TenantAdminsProfileProps) {
  const response = await APICaller({
    method: 'post',
    url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/tenant`,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${adminToken}`,
    },
    data: jsonStringify(tenantAdminsProfile),
  });
  const DTO = new TBCreateTenantAdminDTO(response);
  loggers.debug({ tenantAdminsProfile, DTO }, 'Creat Tenant admin');
  return DTO;
}
