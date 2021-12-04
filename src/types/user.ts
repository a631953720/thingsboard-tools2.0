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
