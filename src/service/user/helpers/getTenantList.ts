import TBSearchTenantAdminDTO from '../../../interface/thingsboardConnector/user/TBSearchTenantAdminDTO';
import TBSearchTenantDTO from '../../../interface/thingsboardConnector/user/TBSearchTenantDTO';
import { searchTenant, searchTenantAdmin } from '../../../library/thingsboardConnecter/user';

type getTBFirstElementProps = {
    token: string;
    searchText: string;
    tenantAdminId?: string;
};

export default async function getTenantList({
    token,
    searchText,
    tenantAdminId, // 有值代表查詢的是Tenant，否則查詢Tenant admin
}: getTBFirstElementProps): Promise<TBSearchTenantDTO | TBSearchTenantAdminDTO> {
    if (tenantAdminId) {
        const tenantsInfo = await searchTenant(token, tenantAdminId, searchText);
        return tenantsInfo;
    }
    const tenantAdminsInfo = await searchTenantAdmin(token, searchText);
    return tenantAdminsInfo;
}
