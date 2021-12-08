import checkTenantAdminOrTenantExist from './helpers/checkTenantAdminOrTenantExist';
import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import { TenantEntity } from '../../interface/thingsboardConnector/TBUserInterface';
import TBSearchTenantDTO from '../../interface/thingsboardConnector/TBSearchTenantDTO';

const loggers = new WinstonLogger({ type: 'User component' });

interface GetFirstTenantIdRes {
    status: number;
    firstTenant: TenantEntity;
    tenantId: string;
    errorMessage?: any;
}

class GetFirstTenantIdDTO implements GetFirstTenantIdRes {
    status: number;

    firstTenant: TenantEntity;

    tenantId: string;

    errorMessage?: any;

    constructor(data: TBSearchTenantDTO) {
        const TenantArray = data.data;
        this.status = data.status;
        // eslint-disable-next-line prefer-destructuring
        this.firstTenant = TenantArray[0];
        this.tenantId = TenantArray[0].id.id;
        this.errorMessage = data.errorMessage;
    }
}

export default async function getFirstTenantId(
    token: string,
    tenantAdminId: string,
    tenantEmail: string
) {
    const tenantsInfo = await TBUserConnecter.searchTenant(token, tenantAdminId, tenantEmail);
    loggers.debug({ tenantsInfo }, 'Get tenant id success');
    if (checkTenantAdminOrTenantExist(tenantsInfo)) {
        const DTO = new GetFirstTenantIdDTO({
            ...tenantsInfo,
            errorMessage: 'Tenant admin list length is 0',
        });
        return DTO;
    }
    const DTO = new GetFirstTenantIdDTO(tenantsInfo);
    return DTO;
}
