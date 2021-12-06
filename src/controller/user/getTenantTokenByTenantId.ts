import { getSystemAdminToken, getTenantToken } from '../../service/user';
import { HTTPStatusRes, HTTP2xx, HTTP5xx } from '../../constants/defaultHTTPCode';

export default async function getTenantTokenByTenantId(
    tenantId: string,
): Promise<HTTPStatusRes> {
    const adminToken = await getSystemAdminToken();
    if (!adminToken) return HTTP5xx({ errorMessage: 'Get system admin token error' });

    const tenantToken = await getTenantToken(adminToken, tenantId);
    if (!tenantToken) return HTTP5xx({ errorMessage: 'Get tenant token error' });
    return HTTP2xx({
        data: {
            tenantId,
            tenantToken,
        },
    });
}
