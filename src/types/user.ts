export type SystemAdminProfileProps = {
    username: string
    password: string
}

export type TenantProfileProps = {
    authority: 'TENANT_ADMIN',
    email: string,
    tenantId: { // Tenant admin id
        entityType: 'TENANT',
        id: string,
    },
    firstName: string,
    lastName: string,
}

export type TenantAdminsProfileProps = {
    title: string
    additionalInfo?: {
        description: string
    }
    email?: string
    country?: string
    city?: string
    state?: string
    address?: string
    address2?: string
    phone?: string
}
