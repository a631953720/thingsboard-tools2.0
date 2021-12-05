import checkTenantAdminOrTenantExist from './helpers/checkTenantAdminOrTenantExist';
import createTenantAdmin from './createTenantAdmin';
import WinstonLogger from '../../helpers/loggers';
import { SearchTenantAdminRes } from '../../types/user';

const loggers = new WinstonLogger({ type: 'User component' });

export default async function getFirstTenantAdminId(
    token: string,
    tenantAdminsInfo: SearchTenantAdminRes,
) {
    let tenantAdminId;
    if (checkTenantAdminOrTenantExist(tenantAdminsInfo)) {
        const firstTenantAdminId = tenantAdminsInfo.data[0].id.id;
        tenantAdminId = firstTenantAdminId;
    } else {
        loggers.warning('Tenant admin is not exist, try to create new tenant admin', 'Check Tenant admin');
        tenantAdminId = await createTenantAdmin(token);
    }
    loggers.debug({ tenantAdminId }, 'Get tenant admin id success');
    return tenantAdminId;
}
