import env from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Tenant' });

export default function createTenant(token: string, tenantAdminId: string, profile: any) {
    loggers.debug({ targetTenantAdmin: tenantAdminId }, 'Creat Tenant account');
    return APICaller({
        method: 'post',
        url: `http://${env.TB.ip}:${env.TB.port}/api/user?sendActivationMail=false`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
        data: jsonStringify(profile),
    });
}
