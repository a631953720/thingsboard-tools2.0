import { TB_USER } from '../../constants/env';
import { loginByTenantId, loginSystemAdmin } from '../../library/thingsboardConnecter/user';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';
import getTenantList from './helpers/getTenantList';
import isTenantEntityNotFound from './helpers/isTenantEntityNotFound';
import { SystemAdminProfileProps } from '../../interface/user';
import AutoLoginToGetTenantTokenDTO from '../../interface/serviceResponse/autoLoginToGetTenantTokenDTO';

// eslint-disable-next-line no-unused-vars
const loggers = new WinstonLogger({ type: 'User service' });

const { tenantAdminName, tenantEmail, systemAdminEmail } = TB_USER;
const defaultAdminProfile: SystemAdminProfileProps = {
    username: TB_USER.systemAdminEmail,
    password: TB_USER.systemAdminPassword,
};

export default async function autoLoginToGetTenantToken() {
    // 1. 取得Admin token
    const admin = await loginSystemAdmin(defaultAdminProfile);
    if (checkStatusError(admin)) {
        return new AutoLoginToGetTenantTokenDTO({
            status: admin.status,
            errorMessage: admin.errorMessage,
        });
    }
    const adminToken = admin.token;

    // 2. 取得Tenant admin id
    const tenantAdmin = await getTenantList({
        token: adminToken,
        searchText: tenantAdminName,
    });
    if (isTenantEntityNotFound(tenantAdmin)) {
        return new AutoLoginToGetTenantTokenDTO({
            status: 500,
            errorMessage: 'Tenant entity not found or search API error',
        });
    }
    const firstTenantAdminId = tenantAdmin.data[0].id.id;

    // 3. 取得Tenant id
    const tenant = await getTenantList({
        token: adminToken,
        tenantAdminId: firstTenantAdminId,
        searchText: tenantEmail,
    });
    if (isTenantEntityNotFound(tenant)) {
        return new AutoLoginToGetTenantTokenDTO({
            status: 500,
            errorMessage: 'Tenant entity not found or search API error',
        });
    }
    const firstTenantId = tenant.data[0].id.id;

    // 4. 取得Tenant token
    const tenantToken = await loginByTenantId(adminToken, firstTenantId);
    if (checkStatusError(tenantToken)) {
        return new AutoLoginToGetTenantTokenDTO({
            status: tenantToken.status,
            errorMessage: tenantToken.errorMessage,
        });
    }
    const DTO = new AutoLoginToGetTenantTokenDTO({
        systemAdminEmail,
        tenantAdminName,
        tenantEmail,
        token: tenantToken.token,
        refreshToken: tenantToken.refreshToken,
    });
    loggers.debug({ DTO }, 'Auto login tenant account response');
    return DTO;
}
