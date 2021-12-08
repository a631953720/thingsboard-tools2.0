import { LoginTenantRes } from './TBUserInterface';

export default class TBLoginTenantDTO implements LoginTenantRes {
    status: number;

    token: string;

    refreshToken: string;

    errorMessage?: any;

    constructor(data: any) {
        this.status = data.status;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.errorMessage = data.data;
    }
}
