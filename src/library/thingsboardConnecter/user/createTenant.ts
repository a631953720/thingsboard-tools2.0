import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { TenantProfileProps } from '../../../interface/user';
import CreateTenantDTO from '../../../interface/thingsboardConnector/TBCreateTenantDTO';

const loggers = new WinstonLogger({ type: 'Tenant' });

export default async function createTenant(
    token: string,
    tenantAdminId: string,
    profile: TenantProfileProps
) {
    const response = await APICaller({
        method: 'post',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/user?sendActivationMail=false`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
        data: jsonStringify(profile),
    });

    const DTO = new CreateTenantDTO(response);
    loggers.debug({ targetTenantAdmin: tenantAdminId, DTO }, 'Creat Tenant account');
    return DTO;
}
