import { TB_USER } from '../../constants/env';
import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import checkStatusError from '../../helpers/checkStatusError';
import { TenantAdminsProfileProps } from '../../interface/user';

const loggers = new WinstonLogger({ type: 'User component' });

export default async function createTenantAdmin(
    token: string,
    tenantAdminProfile?: TenantAdminsProfileProps,
) {
    let newTenantAdminId = '';
    const newTenantAdminInfo = await TBUserConnecter.createTenantAdmin(
        token,
        tenantAdminProfile ? { ...tenantAdminProfile } : { title: TB_USER.tenantAdminName },
    );

    if (checkStatusError(newTenantAdminInfo)) {
        loggers.error('Create Tenant error', 'Create new tenant');
        return newTenantAdminId;
    }

    newTenantAdminId = newTenantAdminInfo.id.id;
    loggers.debug({ newTenantAdminId }, 'Create new tenant admin');

    return newTenantAdminId;
}
