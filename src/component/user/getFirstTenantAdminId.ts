import checkTenantAdminOrTenantExist from './helpers/checkTenantAdminOrTenantExist';
import * as TBUserConnecter from '../../interface/thingsboardConnecter/user';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'User component' });

export default async function getFirstTenantAdminId(
    token: string,
    tenantAdminName: string,
) {
    let tenantAdminId = '';
    const tenantAdminsInfo = await TBUserConnecter.searchTenantAdmin(token, tenantAdminName);
    if (checkStatusError(tenantAdminsInfo)) return '';
    if (checkTenantAdminOrTenantExist(tenantAdminsInfo)) {
        const firstTenantAdminId = tenantAdminsInfo.data[0].id.id;
        tenantAdminId = firstTenantAdminId;
    }
    loggers.debug({ tenantAdminId }, 'Get tenant admin id success');
    return tenantAdminId;
}
