import env from '../../constants/env';
import getSystemAdminToken from './getSystemAdminToken';
import getFirstTenantAdminId from './getFirstTenantAdminId';
import getFirstTenantId from './getFirstTenantId';
import getTenantToken from './getTenantToken';
import createTenantAdmin from './createTenantAdmin';
import createTenant from './createTenant';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'User component' });

const { tenantAdminName, tenantEmail } = env.TB_User;

type GetTenantTokenRes = {
    status: number
    tenantToken: string
}

export default async function getOrCreateNewTenantToGetToken(): Promise<GetTenantTokenRes> {
    const adminToken = await getSystemAdminToken();

    // 1. 取得搜尋到的第一個Tenant admin id，若不存在就會嘗試create新的
    let tenantAdminId = await getFirstTenantAdminId(adminToken, tenantAdminName);
    if (!tenantAdminId) {
        loggers.warning('Tenant is not exist, try to create new tenant', 'Check Tenant');
        tenantAdminId = await createTenantAdmin(adminToken);
    }

    // 2. 取得搜尋到的第一個Tenant id，若不存在就會嘗試create新的
    let tenantId = await getFirstTenantId(adminToken, tenantAdminId, tenantEmail);
    if (!tenantId) {
        loggers.warning('Tenant admin is not exist, try to create new tenant admin', 'Check Tenant admin');
        tenantId = await createTenant(adminToken, tenantAdminId);
    }

    // 3. 取得Tenant token
    const tenantToken = await getTenantToken(adminToken, tenantId);

    if (tenantToken) return { status: 200, tenantToken };
    return { status: 500, tenantToken: '' };
}
