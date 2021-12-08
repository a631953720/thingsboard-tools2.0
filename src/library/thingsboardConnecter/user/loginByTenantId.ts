import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';
import LoginTenantDTO from '../../../interface/thingsboardConnector/TBLoginTenantDTO';

const loggers = new WinstonLogger({ type: 'Tenant' });

export default async function loginByTenantId(token: string, tenantId: string) {
    const reponse = await APICaller({
        method: 'get',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/user/${tenantId}/token`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    });
    const DTO = new LoginTenantDTO(reponse);
    loggers.debug({ tenantId, DTO }, 'Login tenant account');
    return DTO;
}
