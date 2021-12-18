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
