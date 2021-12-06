export default function checkTenantAdminOrTenantExist(tenantInfo: any) {
    if (Array.isArray(tenantInfo.data)) {
        if (tenantInfo.data.length > 0) {
            return true;
        }
    }
    return false;
}
