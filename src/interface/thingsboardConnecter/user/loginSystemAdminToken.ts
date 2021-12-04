import env from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'System admin' });

const adminProfile = {
    username: env.TB_User.systemAdminEmail,
    password: env.TB_User.systemAdminPassword,
};

type Response = {
    status: number
    token: string
    refreshToken: string
};

export default function loginSystemAdminToken() {
    loggers.debug(adminProfile, 'Login admin account');
    return APICaller({
        method: 'post',
        url: `http://${env.TB.ip}:${env.TB.port}/api/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: jsonStringify(adminProfile),
    }) as Promise<Response>;
}
