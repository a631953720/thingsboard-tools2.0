import { TB_USER } from '../../constants/env';
import {
    getSystemAdminToken,
    getFirstTenantAdminId,
    getFirstTenantId,
    getTenantToken,
    createTenantAdmin,
    createTenant,
} from '../../service/user';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'User component' });

const { tenantAdminName, tenantEmail, systemAdminEmail } = TB_USER;

interface GetTenantTokenRes {
    status: number
    systemAdminEmail: string
    tenantAdminName: string
    tenantEmail: string
    tenantToken: string
    message?: string
}

class GetTenantTokenDTO implements GetTenantTokenRes {
    status: number;

    systemAdminEmail: string;

    tenantAdminName: string;

    tenantEmail: string;

    tenantToken: string;

    message?: string;

    constructor(data: any) {
        this.status = data.status;
        this.systemAdminEmail = data.systemAdminEmail || '';
        this.tenantAdminName = data.tenantAdminName || '';
        this.tenantEmail = data.tenantEmail || '';
        this.tenantToken = data.tenantToken || '';
        this.message = data.message;
    }
}

export default async function getOrCreateNewTenantToGetToken(): Promise<GetTenantTokenRes> {
    const adminToken = await getSystemAdminToken();
    if (!adminToken) return new GetTenantTokenDTO({ status: 500, message: 'Get system admin token error' });

    // 1. 取得搜尋到的第一個Tenant admin id，若不存在就會嘗試create新的
    let tenantAdminId = await getFirstTenantAdminId(adminToken, tenantAdminName);
    if (!tenantAdminId) {
        loggers.warning('Tenant is not exist, try to create new tenant', 'Check Tenant');
        tenantAdminId = await createTenantAdmin(adminToken);
    }
    if (!tenantAdminId) return new GetTenantTokenDTO({ status: 500, message: 'Get Tenant token error' });

    // 2. 取得搜尋到的第一個Tenant id，若不存在就會嘗試create新的
    let tenantId = await getFirstTenantId(adminToken, tenantAdminId, tenantEmail);
    if (!tenantId) {
        loggers.warning('Tenant admin is not exist, try to create new tenant admin', 'Check Tenant admin');
        tenantId = await createTenant(adminToken, tenantAdminId);
    }
    if (!tenantId) return new GetTenantTokenDTO({ status: 500, message: 'Get Tenant token error' });

    // 3. 取得Tenant token
    const tenantToken = await getTenantToken(adminToken, tenantId);

    if (!tenantToken) {
        return new GetTenantTokenDTO({ status: 500, message: 'Get Tenant token error' });
    }
    return new GetTenantTokenDTO({
        status: 200,
        systemAdminEmail,
        tenantAdminName,
        tenantEmail,
        tenantToken,
    });
}
