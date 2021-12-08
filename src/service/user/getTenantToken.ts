import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
// import checkStatusError from '../../helpers/checkStatusError';
// import { simpleMsg } from '../../helpers/loggers';
import TBLoginTenantDTO from '../../interface/thingsboardConnector/TBLoginTenantDTO';

interface getTenantTokenRes {
    status: number;
    token?: string;
    refreshToken?: string;
    errorMessage?: any;
}

class GetTenantTokenDTO implements getTenantTokenRes {
    status: number;

    token: string;

    refreshToken: string;

    errorMessage?: any;

    // 來自前一個DTO
    constructor(data: TBLoginTenantDTO) {
        this.status = data.status;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.errorMessage = data.errorMessage; // 錯誤的時候會出現
    }
}

export default async function getTenantToken(adminToken: string, tenantId: string) {
    const tenantInfo = await TBUserConnecter.loginByTenantId(adminToken, tenantId);
    const DTO = new GetTenantTokenDTO(tenantInfo);
    return DTO;
}
