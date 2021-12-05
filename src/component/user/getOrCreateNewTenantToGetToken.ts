import env from '../../constants/env';
import * as TBUserConnecter from '../../interface/thingsboardConnecter/user';
import checkStatusError from '../../helpers/checkStatusError';
import getSystemAdminToken from './getSystemAdminToken';
import getFirstTenantAdminId from './getFirstTenantAdminId';
import getFirstTenantId from './getFirstTenantId';
import getTenantToken from './getTenantToken';

const { tenantAdminName, tenantEmail } = env.TB_User;
const {
    searchTenantAdmin,
    searchTenant,
} = TBUserConnecter;

type GetTenantTokenRes = {
    status: number
    tenantToken: string
}

export default async function getOrCreateNewTenantToGetToken(): Promise<GetTenantTokenRes> {
    const adminToken = await getSystemAdminToken();

    // 1. 搜尋tenant admin是否存在
    const tenantAdminsInfo = await searchTenantAdmin(adminToken, tenantAdminName);
    if (checkStatusError(tenantAdminsInfo)) return { status: 500, tenantToken: '' };

    // 2. 取得Tenant admin id
    const tenantAdminId = await getFirstTenantAdminId(adminToken, tenantAdminsInfo);

    // 3. 搜尋Tenant是否存在
    const searchTenantInfo = await searchTenant(adminToken, tenantAdminId, tenantEmail);
    if (checkStatusError(searchTenantInfo)) return { status: 500, tenantToken: '' };

    // 4. 取得Tenant id
    const tenantId = await getFirstTenantId(adminToken, searchTenantInfo, tenantAdminId);

    // 5. 取得Tenant token
    const tenantToken = await getTenantToken(adminToken, tenantId);

    return { status: 200, tenantToken };
}
