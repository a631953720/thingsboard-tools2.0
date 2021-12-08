import { TB_USER } from '../../constants/env';
import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import { TenantAdminsProfileProps } from '../../interface/user';
import TBCreateTenantAdminDTO from '../../interface/thingsboardConnector/TBCreateTenantAdminDTO';

const loggers = new WinstonLogger({ type: 'User component' });

interface CreateTenantAdminRes {
    status: number;
    id: string;
    name: string;
    email: string;
    errorMessage?: any;
}

class CreateTenantAdminDTO implements CreateTenantAdminRes {
    status: number;

    id: string;

    name: string;

    email: string;

    errorMessage?: any;

    constructor(data: TBCreateTenantAdminDTO) {
        this.status = data.status;
        this.id = data.id.id;
        this.name = data.name;
        this.email = data.email;
        this.errorMessage = data.errorMessage;
    }
}

export default async function createTenantAdmin(
    token: string,
    tenantAdminProfile?: TenantAdminsProfileProps
) {
    const newTenantAdminInfo = await TBUserConnecter.createTenantAdmin(
        token,
        tenantAdminProfile ? { ...tenantAdminProfile } : { title: TB_USER.tenantAdminName }
    );
    loggers.debug({ newTenantAdminInfo }, 'Create new tenant admin');
    const DTO = new CreateTenantAdminDTO(newTenantAdminInfo);
    return DTO;
}
