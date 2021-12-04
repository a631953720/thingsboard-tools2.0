import env from '../../constants/env';
import * as TBUserConnecter from '../../application/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import checkAxiosError from '../../helpers/checkAxiosError';

const loggers = new WinstonLogger({ type: 'User component' });

const getTenantProfile = (tenantAdminId: string) => ({
    authority: 'TENANT_ADMIN',
    email: env.TB_User.tenantEmail,
    tenantId: {
        entityType: 'TENANT',
        id: tenantAdminId,
    },
    firstName: 'test',
    lastName: env.TB_User.tenantName,
});

export default async function createTenant(token: string, tenantAdminId: string) {
    const newTenantInfo = await TBUserConnecter.createTenant(
        token,
        tenantAdminId,
        getTenantProfile(tenantAdminId),
    );

    if (checkAxiosError(newTenantInfo)) {
        loggers.error('Create Tenant error', 'Create new tenant');
        return '';
    }

    const newTenantId = newTenantInfo.id.id;
    loggers.debug({ newTenantInfo }, 'Create new tenant');
    return newTenantId as string;
}
