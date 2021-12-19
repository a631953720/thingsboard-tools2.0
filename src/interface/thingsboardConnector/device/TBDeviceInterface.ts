export interface CreateDeviceRes {
    status: number;
    name: string;
    type: string;
    label?: string;
    deviceProfileId: {
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
};
