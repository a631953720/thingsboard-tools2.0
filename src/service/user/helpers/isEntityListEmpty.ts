import TBSearchTenantAdminDTO from '../../../interface/thingsboardConnector/user/TBSearchTenantAdminDTO';
import TBSearchTenantDTO from '../../../interface/thingsboardConnector/user/TBSearchTenantDTO';

export default function isEntityListEmpty(tenantInfo: TBSearchTenantDTO | TBSearchTenantAdminDTO) {
  if (tenantInfo.data.length < 1) {
    return true;
  }
  return false;
}
