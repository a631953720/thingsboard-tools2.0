import { LoginSystemAdminRes } from './TBUserInterface';

export default class TBLoginSystemAdminDTO implements LoginSystemAdminRes {
    status: number;

    token: string;

    refreshToken: string;

    errorMessage?: any;

    constructor(data: any) {
        this.status = data.status;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.errorMessage = data.data; // 錯誤的時候會出現
    }
}
