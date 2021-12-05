export type SystemAdminProfileProps = {
    username: string
    password: string
}

type TenantAdminEntity = {
    id: {
        id: string
        entityType: string
    },
    name: string
    title: string
}

export type SearchTenantAdminRes = {
    status: number
    data: Array<TenantAdminEntity>
    hasNext: boolean
    totalElements: number
    totalPages: number
}

type TenantEntity = {
    id: {
        id: string
        entityType: string
    },
    name: string
    firstName: string
    lastName: string
}

export type SearchTenantRes = {
    status: number
    data: Array<TenantEntity>
    hasNext: boolean
    totalElements: number
    totalPages: number
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
