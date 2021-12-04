import env from '../../constants/env';
import * as TBUserConnecter from '../../interface/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import checkAxiosError from '../../helpers/checkAxiosError';

const loggers = new WinstonLogger({ type: 'User component' });

type TenantProfile = {
    authority: string,
    email: string,
    tenantId: {
        entityType: string,
        id: string,
    },
    firstName: string,
    lastName: string,
}

const getTenantProfile = (tenantAdminId: string): TenantProfile => ({
    authority: 'TENANT_ADMIN',
    email: env.TB_User.tenantEmail,
    tenantId: {
        entityType: 'TENANT',
        id: tenantAdminId,
    },
    firstName: 'test',
    lastName: env.TB_User.tenantName,
});

export default async function createTenant(
    token: string,
    tenantAdminId: string,
    profile?: TenantProfile,
) {
    const newTenantInfo = await TBUserConnecter.createTenant(
        token,
        tenantAdminId,
        profile || getTenantProfile(tenantAdminId),
    );

    if (checkAxiosError(newTenantInfo)) {
        loggers.error('Create Tenant error', 'Create new tenant');
        return '';
    }

    const newTenantId = newTenantInfo.id.id;
    loggers.debug({ newTenantInfo }, 'Create new tenant');
    return newTenantId as string;
}
