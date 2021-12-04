import env from '../../constants/env';
import * as TBUserConnecter from '../../application/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import checkTenantAdminOrTenantExist from './checkTenantAdminOrTenantExist';
import createTenantAdmin from './createTenantAdmin';
import createTenant from './createTenant';
import checkAxiosError from '../../helpers/checkAxiosError';

const loggers = new WinstonLogger({ type: 'User component' });
const { tenantAdminName, tenantEmail } = env.TB_User;
const {
    loginSystemAdminToken,
    searchTenantAdmin,
    searchTenant,
    loginTenant,
} = TBUserConnecter;

async function getSystemAdminToken() {
    loggers.debug('Try to get admin token', 'Login system admin');
    const response = await loginSystemAdminToken();
    if (checkAxiosError(response)) {
        return '';
    }
    return response.token;
}

export default async function tryGetTenantToken() {
    let tenantAdminId = '';
    let tenantId = '';
    const adminToken = await getSystemAdminToken();

    // 1. 檢查Tenant admin是否存在並取得id
    loggers.debug({ tenantAdminName }, 'search tenantAdmin');
    // eslint-disable-next-line max-len
    const tenantAdminsInfo = await searchTenantAdmin(adminToken, tenantAdminName);
    if (checkTenantAdminOrTenantExist(tenantAdminsInfo)) {
        const firstTenantAdminId = tenantAdminsInfo.data[0].id.id;
        tenantAdminId = firstTenantAdminId;
    } else {
        loggers.warning('Tenant admin is not exist, try to create new tenant admin', 'Check Tenant admin');
        tenantAdminId = await createTenantAdmin(adminToken);
    }
    loggers.debug({ tenantAdminId }, 'Get tenant admin id success');

    // 2. 檢查Tenant是否存在並取得Tenant id
    loggers.debug({ tenantEmail }, 'Search tenant');
    const searchTenantInfo = await searchTenant(
        adminToken,
        tenantAdminId,
        tenantEmail,
    );

    if (checkTenantAdminOrTenantExist(searchTenantInfo)) {
        const firstTenantId = searchTenantInfo.data[0].id.id;
        tenantId = firstTenantId;
    } else {
        loggers.warning('Tenant is not exist, try to create new tenant', 'Check Tenant');
        tenantId = await createTenant(adminToken, tenantAdminId);
    }
    loggers.debug({ tenantId }, 'Get tenant id success');

    // 3. 取得Tenant token
    const tenantInfo = await loginTenant(adminToken, tenantId);
    const tenantToken = tenantInfo.token;
    loggers.debug({ tenantToken }, 'Get tenant token success');
    return tenantToken;
}
