export default function checkTenantAdminOrTenantExist(tenantAdminsInfo: any) {
    if (Array.isArray(tenantAdminsInfo.data)) {
        if (tenantAdminsInfo.data.length > 0) {
            return true;
        }
    }
    return false;
}
