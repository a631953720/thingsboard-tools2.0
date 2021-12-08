import { TB_USER } from '../../constants/env';
import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import { TenantProfileProps } from '../../interface/user';
import TBCreateTenantDTO from '../../interface/thingsboardConnector/TBCreateTenantDTO';

const loggers = new WinstonLogger({ type: 'User component' });

const getTenantProfile = (tenantAdminId: string): TenantProfileProps => ({
    authority: 'TENANT_ADMIN',
    email: TB_USER.tenantEmail,
    tenantId: {
        entityType: 'TENANT',
        id: tenantAdminId,
    },
    firstName: 'test',
    lastName: TB_USER.tenantName,
});

interface CreateTenantRes {
    status: number;
    id: string;
    name: string;
    lastName: string;
    firstName: string;
    email: string;
    errorMessage?: any;
}

class CreateTenantDTO implements CreateTenantRes {
    status: number;

    id: string;

    name: string;

    lastName: string;

    firstName: string;

    email: string;

    errorMessage?: any;

    constructor(data: TBCreateTenantDTO) {
        this.status = data.status;
        this.id = data.id.id;
        this.name = data.name;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.errorMessage = data.errorMessage;
    }
}

export default async function createTenant(
    token: string,
    tenantAdminId: string,
    profile?: TenantProfileProps
) {
    const newTenantInfo = await TBUserConnecter.createTenant(
        token,
        tenantAdminId,
        profile || getTenantProfile(tenantAdminId)
    );
    loggers.debug({ newTenantInfo }, 'Create new tenant');
    const DTO = new CreateTenantDTO(newTenantInfo);
    return DTO;
}
