import checkStatusError from '../../helpers/checkStatusError';
import { TB_USER } from '../../constants/env';
import WinstonLogger from '../../helpers/loggers';
import { HTTPError } from '../../constants/defaultHTTPCode';
import {
    createTenantAdmin,
    loginSystemAdmin,
    searchTenant,
    searchTenantAdmin,
} from '../../library/thingsboardConnecter/user';
import checkTenantAdminOrTenantExist from './helpers/checkTenantAdminOrTenantExist';
import { SystemAdminProfileProps, TenantAdminsProfileProps } from '../../interface/user';

const loggers = new WinstonLogger({ type: 'User component' });

const { tenantAdminName, tenantEmail, systemAdminEmail } = TB_USER;
const defaultAdminProfile: SystemAdminProfileProps = {
    username: TB_USER.systemAdminEmail,
    password: TB_USER.systemAdminPassword,
};

async function getFirstTenantAdminId(token: string, searchName: string) {
    const tenantAdminsInfo = await searchTenantAdmin(token, searchName);
    // if (checkStatusError(tenantAdminsInfo)) return '';
    loggers.debug({ tenantAdminsInfo }, 'Get tenant admin id success');
    if (checkTenantAdminOrTenantExist(tenantAdminsInfo)) {
        // const DTO = new GetFirstTenantAdminIdDTO({
        //     ...tenantAdminsInfo,
        //     errorMessage: 'Tenant admin list length is 0',
        // });
        return tenantAdminsInfo;
    }
    return {
        ...tenantAdminsInfo,
        errorMessage: 'Tenant admin list length is 0',
    };
}

async function getFirstTenantId(token: string, tenantAdminId: string, searchEmail: string) {
    const tenantsInfo = await searchTenant(token, tenantAdminId, searchEmail);
    loggers.debug({ tenantsInfo }, 'Get tenant id success');
    if (checkTenantAdminOrTenantExist(tenantsInfo)) {
        // const DTO = new GetFirstTenantIdDTO({
        //     ...tenantsInfo,
        //     errorMessage: 'Tenant admin list length is 0',
        // });
        return tenantsInfo;
    }
    return {
        ...tenantsInfo,
        errorMessage: 'Tenant list length is 0',
    };
}

interface GetTenantTokenRes {
    status: number;
    systemAdminEmail: string;
    tenantAdminName: string;
    tenantEmail: string;
    token: string;
}

class GetTenantTokenDTO implements GetTenantTokenRes {
    status: number;

    systemAdminEmail: string;

    tenantAdminName: string;

    tenantEmail: string;

    token: string;

    constructor(data: any) {
        this.status = data.status;
        this.systemAdminEmail = data.systemAdminEmail;
        this.tenantAdminName = data.tenantAdminName;
        this.tenantEmail = data.tenantEmail;
        this.token = data.token;
    }
}

export default async function getOrCreateNewTenantToGetToken(
    adminProfile?: SystemAdminProfileProps,
    tenantAdminProfile?: TenantAdminsProfileProps
) {
    
}
