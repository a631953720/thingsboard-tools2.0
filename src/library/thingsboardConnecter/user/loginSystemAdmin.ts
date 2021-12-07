import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { SystemAdminProfileProps } from '../../../interface/user';

const loggers = new WinstonLogger({ type: 'System admin' });

interface LoginSystemAdminRes {
    status: number;
    token: string;
    refreshToken: string;
}

class LoginSystemAdminDTO implements LoginSystemAdminRes {
    status: number;

    token: string;

    refreshToken: string;

    constructor(data: any) {
        this.status = data.status;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
    }
}

export default async function loginSystemAdmin(adminProfile: SystemAdminProfileProps) {
    const response = await APICaller({
        method: 'post',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: jsonStringify(adminProfile),
    });
    const DTO = new LoginSystemAdminDTO(response);
    loggers.debug({ adminProfile: adminProfile.username, DTO }, 'Login admin account');
    return DTO;
}
