import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import checkStatusError from '../../helpers/checkStatusError';
import { simpleMsg } from '../../helpers/loggers';

export default async function getTenantToken(adminToken: string, tenantId: string) {
    const tenantInfo = await TBUserConnecter.loginByTenantId(adminToken, tenantId);
    if (checkStatusError(tenantInfo)) {
        simpleMsg('Get tenant token error');
        return '';
    }
    const tenantToken = tenantInfo.token;
    simpleMsg('Get tenant token success');
    return tenantToken;
}
