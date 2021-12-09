import TBSearchTenantAdminDTO from '../../../interface/thingsboardConnector/TBSearchTenantAdminDTO';
import TBSearchTenantDTO from '../../../interface/thingsboardConnector/TBSearchTenantDTO';

export default function isEntityListEmpty(tenantInfo: TBSearchTenantDTO | TBSearchTenantAdminDTO) {
    if (tenantInfo.data.length < 1) {
        return true;
    }
    return false;
}
