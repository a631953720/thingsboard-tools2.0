import env from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Tenant' });

type Response = {
    status: number
    token: string
    refreshToken: string
};

export default function getTenantToken(token: string, tenantId: string) {
    loggers.debug({ tenantId }, 'Login tenant account');
    return APICaller({
        method: 'get',
        url: `http://${env.TB.ip}:${env.TB.port}/api/user/${tenantId}/token`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    }) as Promise<Response>;
}
