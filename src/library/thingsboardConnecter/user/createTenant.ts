import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { TenantProfileProps } from '../../../types/user';

const loggers = new WinstonLogger({ type: 'Tenant' });

type CreateTenantRes = {
    status: number
    id: { // API 成功才會有
        entityType: string
        id: string
    }
    name: string
    lastName: string
    firstName: string
    email: string
};

export default function createTenant(
    token: string,
    tenantAdminId: string,
    profile: TenantProfileProps,
) {
    loggers.debug({ targetTenantAdmin: tenantAdminId }, 'Creat Tenant account');
    return APICaller({
        method: 'post',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/user?sendActivationMail=false`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
        data: jsonStringify(profile),
    }) as Promise<CreateTenantRes>;
}
