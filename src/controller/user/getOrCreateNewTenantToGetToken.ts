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
import { HTTPStatusRes, HTTP2xx, HTTP5xx } from '../../constants/defaultHTTPCode';

const loggers = new WinstonLogger({ type: 'User component' });

const { tenantAdminName, tenantEmail, systemAdminEmail } = TB_USER;

interface GetTenantTokenRes {
    systemAdminEmail: string
    tenantAdminName: string
    tenantEmail: string
    tenantToken: string
}

class GetTenantTokenDTO implements GetTenantTokenRes {
    systemAdminEmail: string;

    tenantAdminName: string;

    tenantEmail: string;

    tenantToken: string;

    message?: string;

    constructor(data: any) {
        this.systemAdminEmail = data.systemAdminEmail || '';
        this.tenantAdminName = data.tenantAdminName || '';
        this.tenantEmail = data.tenantEmail || '';
        this.tenantToken = data.tenantToken || '';
    }
}

export default async function getOrCreateNewTenantToGetToken(): Promise<HTTPStatusRes> {
    const adminToken = await getSystemAdminToken();
    if (!adminToken) return HTTP5xx({ errorMessage: 'Get system admin token error' });

    // 1. 取得搜尋到的第一個Tenant admin id，若不存在就會嘗試create新的
    let tenantAdminId = await getFirstTenantAdminId(adminToken, tenantAdminName);
    if (!tenantAdminId) {
        loggers.warning('Tenant is not exist, try to create new tenant', 'Check Tenant');
        tenantAdminId = await createTenantAdmin(adminToken);
    }
    if (!tenantAdminId) return HTTP5xx({ errorMessage: 'Get Tenant token error' });

    // 2. 取得搜尋到的第一個Tenant id，若不存在就會嘗試create新的
    let tenantId = await getFirstTenantId(adminToken, tenantAdminId, tenantEmail);
    if (!tenantId) {
        loggers.warning('Tenant admin is not exist, try to create new tenant admin', 'Check Tenant admin');
        tenantId = await createTenant(adminToken, tenantAdminId);
    }
    if (!tenantId) return HTTP5xx({ errorMessage: 'Get Tenant token error' });

    // 3. 取得Tenant token
    const tenantToken = await getTenantToken(adminToken, tenantId);

    if (!tenantToken) {
        return HTTP5xx({ errorMessage: 'Get Tenant token error' });
    }
    const DTO = new GetTenantTokenDTO({
        systemAdminEmail,
        tenantAdminName,
        tenantEmail,
        tenantToken,
    });
    return HTTP2xx({ data: DTO });
}
