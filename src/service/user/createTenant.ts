import { TB_USER } from '../../constants/env';
import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import checkStatusError from '../../helpers/checkStatusError';
import { TenantProfileProps } from '../../types/user';

const loggers = new WinstonLogger({ type: 'User component' });

const getTenantProfile = (tenantAdminId: string): TenantProfileProps => ({
    authority: 'TENANT_ADMIN',
    email: TB_USER.tenantEmail,
    tenantId: {
        entityType: 'TENANT',
        id: tenantAdminId,
    },
    firstName: 'test',
    lastName: TB_USER.tenantName,
});

export default async function createTenant(
    token: string,
    tenantAdminId: string,
    profile?: TenantProfileProps,
) {
    const newTenantInfo = await TBUserConnecter.createTenant(
        token,
        tenantAdminId,
        profile || getTenantProfile(tenantAdminId),
    );

    if (checkStatusError(newTenantInfo)) {
        loggers.error('Create Tenant error', 'Create new tenant');
        return '';
    }

    const newTenantId = newTenantInfo.id.id;
    loggers.debug({ newTenantInfo }, 'Create new tenant');
    return newTenantId as string;
}
