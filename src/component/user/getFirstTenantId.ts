import checkTenantAdminOrTenantExist from './helpers/checkTenantAdminOrTenantExist';
import createTenant from './createTenant';
import WinstonLogger from '../../helpers/loggers';
import { SearchTenantRes } from '../../types/user';

const loggers = new WinstonLogger({ type: 'User component' });

export default async function getFirstTenantId(
    token: string,
    tenantInfo: SearchTenantRes,
    tenantAdminId: string,
) {
    let tenantId;
    if (checkTenantAdminOrTenantExist(tenantInfo)) {
        const firstTenantId = tenantInfo.data[0].id.id;
        tenantId = firstTenantId;
    } else {
        loggers.warning('Tenant is not exist, try to create new tenant', 'Check Tenant');
        tenantId = await createTenant(token, tenantAdminId);
    }
    loggers.debug({ tenantId }, 'Get tenant id success');
    return tenantId;
}
