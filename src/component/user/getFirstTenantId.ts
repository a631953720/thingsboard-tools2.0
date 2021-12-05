import checkTenantAdminOrTenantExist from './helpers/checkTenantAdminOrTenantExist';
import * as TBUserConnecter from '../../interface/thingsboardConnecter/user';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'User component' });

export default async function getFirstTenantId(
    token: string,
    tenantAdminId: string,
    tenantEmail: string,
) {
    let tenantId = '';
    const searchTenantInfo = await TBUserConnecter.searchTenant(token, tenantAdminId, tenantEmail);
    if (checkStatusError(searchTenantInfo)) return '';
    if (checkTenantAdminOrTenantExist(searchTenantInfo)) {
        const firstTenantId = searchTenantInfo.data[0].id.id;
        tenantId = firstTenantId;
    }
    loggers.debug({ tenantId }, 'Get tenant id success');
    return tenantId;
}
