import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Tenant' });

type LoginTenantRes = {
    status: number
    token: string
    refreshToken: string
};

export default function loginByTenantId(token: string, tenantId: string) {
    loggers.debug({ tenantId }, 'Login tenant account');
    return APICaller({
        method: 'get',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/user/${tenantId}/token`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    }) as Promise<LoginTenantRes>;
}
