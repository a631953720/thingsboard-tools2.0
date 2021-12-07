import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { TenantProfileProps } from '../../../interface/user';

const loggers = new WinstonLogger({ type: 'Tenant' });

interface CreateTenantRes {
    status: number
    id?: { // API 成功才會有
        entityType: string
        id: string
    }
    name?: string
    lastName?: string
    firstName?: string
    email?: string
}

class CreateTenantDTO implements CreateTenantRes {
    status: number;

    id: {
        entityType: string
        id: string
    };

    name: string;

    lastName: string;

    firstName: string;

    email: string;

    constructor(data: any) {
        this.status = data.status;
        this.id = data.id;
        this.name = data.name;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
    }
}

export default async function createTenant(
    token: string,
    tenantAdminId: string,
    profile: TenantProfileProps,
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
