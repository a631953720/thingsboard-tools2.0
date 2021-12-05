import env from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { SystemAdminProfileProps } from '../../../types/user';

const loggers = new WinstonLogger({ type: 'System admin' });

type LoginSystemAdminRes = {
    status: number
    token: string
    refreshToken: string
};

export default function loginSystemAdmin(adminProfile: SystemAdminProfileProps) {
    loggers.debug(adminProfile, 'Login admin account');
    return APICaller({
        method: 'post',
        url: `http://${env.TB.ip}:${env.TB.port}/api/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: jsonStringify(adminProfile),
    }) as Promise<LoginSystemAdminRes>;
}
