import env from '../../constants/env';
import * as TBUserConnecter from '../../interface/thingsboardConnecter/user';
import WinstonLogger, { simpleMsg } from '../../helpers/loggers';
import checkStatusError from '../../helpers/checkStatusError';
import { SearchTenantAdminRes, SearchTenantRes } from '../../types/user';
import checkTenantAdminOrTenantExist from './checkTenantAdminOrTenantExist';
import createTenantAdmin from './createTenantAdmin';
import createTenant from './createTenant';

const loggers = new WinstonLogger({ type: 'User component' });
const { tenantAdminName, tenantEmail } = env.TB_User;
const {
    loginSystemAdmin,
    searchTenantAdmin,
    searchTenant,
    loginTenant,
} = TBUserConnecter;

async function getSystemAdminToken() {
    loggers.debug('Try to get admin token', 'Login system admin');
    const response = await loginSystemAdmin();
    if (checkStatusError(response)) {
        return '';
    }
    return response.token;
}

async function getFirstTenantAdminId(token: string, tenantAdminsInfo: SearchTenantAdminRes) {
    let tenantAdminId;
    if (checkTenantAdminOrTenantExist(tenantAdminsInfo)) {
        const firstTenantAdminId = tenantAdminsInfo.data[0].id.id;
        tenantAdminId = firstTenantAdminId;
    } else {
        loggers.warning('Tenant admin is not exist, try to create new tenant admin', 'Check Tenant admin');
        tenantAdminId = await createTenantAdmin(token);
    }
    loggers.debug({ tenantAdminId }, 'Get tenant admin id success');
    return tenantAdminId;
}

async function getFirstTenantId(token: string, tenantInfo: SearchTenantRes, tenantAdminId: string) {
    let tenantId;
    if (checkTenantAdminOrTenantExist(tenantInfo)) {
        const firstTenantId = tenantInfo.data[0].id.id;
        tenantId = firstTenantId;
    } else {
        loggers.warning('Tenant is not exist, try to create new tenant', 'Check Tenant');
        tenantId = await createTenant(token, tenantAdminId);
    }
    loggers.debug({ tenantId }, 'Get tenant id success');
    return tenantId;
}

async function getTenantToken(adminToken: string, tenantId: string) {
    const tenantInfo = await loginTenant(adminToken, tenantId);
    if (checkStatusError(tenantInfo)) {
        simpleMsg('Get tenant token error');
        return '';
    }
    const tenantToken = tenantInfo.token;
    simpleMsg('Get tenant token success');
    return tenantToken;
}

type GetTenantTokenRes = {
    status: number
    tenantToken: string
}

export default async function getOrCreateNewTenantToGeToken(): Promise<GetTenantTokenRes> {
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
