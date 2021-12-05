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
    authority: string,
    email: string,
    tenantId: {
        entityType: string,
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
