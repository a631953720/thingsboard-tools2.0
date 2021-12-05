import env from '../../constants/env';
import getSystemAdminToken from './getSystemAdminToken';
import getFirstTenantAdminId from './getFirstTenantAdminId';
import getFirstTenantId from './getFirstTenantId';
import getTenantToken from './getTenantToken';

const { tenantAdminName, tenantEmail } = env.TB_User;

type GetTenantTokenRes = {
    status: number
    tenantToken: string
}

export default async function getOrCreateNewTenantToGetToken(): Promise<GetTenantTokenRes> {
    const adminToken = await getSystemAdminToken();

    // 1. 取得搜尋到的第一個Tenant admin id
    const tenantAdminId = await getFirstTenantAdminId(adminToken, tenantAdminName);

    // 2. 取得搜尋到的第一個Tenant id
    const tenantId = await getFirstTenantId(adminToken, tenantAdminId, tenantEmail);

    // 3. 取得Tenant token
    const tenantToken = await getTenantToken(adminToken, tenantId);

    if (tenantToken) return { status: 200, tenantToken };
    return { status: 500, tenantToken: '' };
}
