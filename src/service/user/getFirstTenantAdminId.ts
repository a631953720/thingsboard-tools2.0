import checkTenantAdminOrTenantExist from './helpers/checkTenantAdminOrTenantExist';
import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import { TenantAdminEntity } from '../../interface/thingsboardConnector/TBUserInterface';
import TBSearchTenantAdminDTO from '../../interface/thingsboardConnector/TBSearchTenantAdminDTO';

const loggers = new WinstonLogger({ type: 'User component' });

interface GetFirstTenantAdminIdRes {
    status: number;
    firstTenantAdmin: TenantAdminEntity;
    tenantAdminId: string;
    errorMessage?: any;
}

class GetFirstTenantAdminIdDTO implements GetFirstTenantAdminIdRes {
    status: number;

    firstTenantAdmin: TenantAdminEntity;

    tenantAdminId: string;

    errorMessage?: any;

    constructor(data: TBSearchTenantAdminDTO) {
        const TenantAdminArray = data.data;
        this.status = data.status;
        // eslint-disable-next-line prefer-destructuring
        this.firstTenantAdmin = TenantAdminArray[0];
        this.tenantAdminId = TenantAdminArray[0].id.id;
        this.errorMessage = data.errorMessage;
    }
}

export default async function getFirstTenantAdminId(token: string, tenantAdminName: string) {
    const tenantAdminsInfo = await TBUserConnecter.searchTenantAdmin(token, tenantAdminName);
    // if (checkStatusError(tenantAdminsInfo)) return '';
    loggers.debug({ tenantAdminsInfo }, 'Get tenant admin id success');
    if (checkTenantAdminOrTenantExist(tenantAdminsInfo)) {
        const DTO = new GetFirstTenantAdminIdDTO({
            ...tenantAdminsInfo,
            errorMessage: 'Tenant admin list length is 0',
        });
        return DTO;
    }
    const DTO = new GetFirstTenantAdminIdDTO(tenantAdminsInfo);
    return DTO;
}
