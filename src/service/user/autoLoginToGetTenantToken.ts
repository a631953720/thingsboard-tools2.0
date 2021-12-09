import checkStatusError from '../../helpers/checkStatusError';
import { TB_USER } from '../../constants/env';
import WinstonLogger from '../../helpers/loggers';
import { loginByTenantId, loginSystemAdmin } from '../../library/thingsboardConnecter/user';
import getTenantList from './helpers/getTenantList';
import { SystemAdminProfileProps } from '../../interface/user';
import isTenantEntityNotFound from './helpers/isTenantEntityNotFound';

// eslint-disable-next-line no-unused-vars
const loggers = new WinstonLogger({ type: 'User service' });

const { tenantAdminName, tenantEmail, systemAdminEmail } = TB_USER;
const defaultAdminProfile: SystemAdminProfileProps = {
    username: TB_USER.systemAdminEmail,
    password: TB_USER.systemAdminPassword,
};

interface GetTenantTokenRes {
    status: number;
    systemAdminEmail: string;
    tenantAdminName: string;
    tenantEmail: string;
    token: string;
    refreshToken: string;
    errorMessage: any;
}

class AutoLoginToGetTenantTokenDTO implements GetTenantTokenRes {
    status: number;

    systemAdminEmail: string;

    tenantAdminName: string;

    tenantEmail: string;

    token: string;

    refreshToken: string;

    errorMessage: any;

    constructor(data: any) {
        this.status = data.status;
        this.systemAdminEmail = data.systemAdminEmail;
        this.tenantAdminName = data.tenantAdminName;
        this.tenantEmail = data.tenantEmail;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.errorMessage = data.errorMessage;
    }
}

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
