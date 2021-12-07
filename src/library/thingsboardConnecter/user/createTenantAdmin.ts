import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { TenantAdminsProfileProps } from '../../../interface/user';

const loggers = new WinstonLogger({ type: 'Tenant' });

interface CreateTenantAdminRes {
    status: number
    id?: { // API 成功才會有
        entityType: string
        id: string
    },
    name?: string
    email?: string
}

class CreateTenantAdminDTO implements CreateTenantAdminRes {
    status: number;

    id: {
        entityType: string,
        id: string
    };

    name: string;

    email: string;

    constructor(data: any) {
        this.status = data.status;
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }
}

export default async function createTenantAdmin(
    adminToken: string,
    tenantAdminsProfile: TenantAdminsProfileProps,
) {
    const response = await APICaller({
        method: 'post',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/tenant`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${adminToken}`,
        },
        data: jsonStringify(tenantAdminsProfile),
    }) as Promise<CreateTenantAdminRes>;
    const DTO = new CreateTenantAdminDTO(response);
    loggers.debug({ tenantAdminsProfile, DTO }, 'Creat Tenant admin');
    return DTO;
}
