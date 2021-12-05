import env from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Tenant' });

type TenantAdminsProfileProps = {
    title: string
};

type CreateTenantAdminRes = {
    status: number
    id: { // API 成功才會有
        entityType: string
        id: string
    },
    name: string
    email: string
};

export default function createTenantAdmin(
    adminToken: string,
    tenantAdminsProfile: TenantAdminsProfileProps,
) {
    loggers.debug(tenantAdminsProfile, 'Creat Tenant admin');
    return APICaller({
        method: 'post',
        url: `http://${env.TB.ip}:${env.TB.port}/api/tenant`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${adminToken}`,
        },
        data: jsonStringify(tenantAdminsProfile),
    }) as Promise<CreateTenantAdminRes>;
}
