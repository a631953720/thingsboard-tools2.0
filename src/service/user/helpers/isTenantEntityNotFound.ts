import checkStatusError from '../../../helpers/checkStatusError';
import checkTenantAdminOrTenantEmpty from './isEntityListEmpty';
import TBSearchTenantAdminDTO from '../../../interface/thingsboardConnector/TBSearchTenantAdminDTO';
import TBSearchTenantDTO from '../../../interface/thingsboardConnector/TBSearchTenantDTO';

export default function isTenantEntityNotFound(entity: TBSearchTenantDTO | TBSearchTenantAdminDTO) {
    if (checkStatusError(entity)) {
        return true;
    }
    if (checkTenantAdminOrTenantEmpty(entity)) {
        return true;
    }
    return false;
}
