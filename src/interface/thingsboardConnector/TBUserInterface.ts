/* eslint-disable max-classes-per-file */
export interface LoginSystemAdminRes {
    status: number;
    token: string;
    refreshToken: string;
    errorMessage?: any;
}

export interface LoginTenantRes {
    status: number;
    token?: string;
    refreshToken?: string;
    errorMessage?: any;
}

export interface CreateTenantRes {
    status: number;
    id?: {
        // API 成功才會有
        entityType: string;
        id: string;
    };
    name?: string;
    lastName?: string;
    firstName?: string;
    email?: string;
    errorMessage?: any;
}

export interface CreateTenantAdminRes {
    status: number;
    id?: {
        // API 成功才會有
        entityType: string;
        id: string;
    };
    name?: string;
    email?: string;
    errorMessage?: any;
}

export type TenantEntity = {
    id: {
        id: string;
        entityType: string;
    };
    name: string;
    firstName: string;
    lastName: string;
    errorMessage?: any;
};

export interface SearchTenantRes {
    status: number;
    data?: Array<TenantEntity>;
    hasNext?: boolean;
    totalElements?: number;
    totalPages?: number;
    errorMessage?: any;
}

export type TenantAdminEntity = {
    id: {
        id: string;
        entityType: string;
    };
    name: string;
    title: string;
    errorMessage?: any;
};

export interface SearchTenantAdminRes {
    status: number;
    data?: Array<TenantAdminEntity>;
    hasNext?: boolean;
    totalElements?: number;
    totalPages?: number;
    errorMessage?: any;
}
