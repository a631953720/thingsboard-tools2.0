export interface DeleteDeviceRes {
    status: number;
    errorMessage?: any;
}

export interface CreateDeviceRes {
    status: number;
    name: string;
    type: string;
    label?: string;
    deviceProfileId: {
        entityType: string;
        id: string;
    };
    id: {
        entityType: string;
        id: string;
    };
    additionalInfo: any;
    errorMessage?: any;
}

export type DeviceProfile = {
    name: string;
    type: string;
    label?: string;
};

export type DeviceInfo = {
    id: string;
    name: string;
    type: string;
    label: string;
};

export type GetDeviceRes = {
    status: number;
    data: Array<{
        createdTime: number;
        id: {
            id: string;
            entityType: string;
        };
        name: string;
        type: string;
        label: string;
        tenantId: {
            entityType: string;
            id: string;
        };
    }>;
    hasNext: boolean;
    totalElements: number;
    totalPages: number;
    errorMessage?: any;
};
