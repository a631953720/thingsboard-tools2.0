import env from '../../constants/env';
import * as TBUserConnecter from '../../application/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';

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
    const newTenantAdminInfo = await TBUserConnecter.createTenant(
        token,
        tenantAdminId,
        getTenantProfile(tenantAdminId),
    );
    const newTenantId = newTenantAdminInfo.id.id;
    loggers.debug({ newTenantAdminInfo }, 'Create new tenant');
    return newTenantId as string;
}
