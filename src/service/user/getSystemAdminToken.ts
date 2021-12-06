import env from '../../constants/env';
import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';
import { SystemAdminProfileProps } from '../../types/user';

const loggers = new WinstonLogger({ type: 'User component' });

const defaultAdminProfile: SystemAdminProfileProps = {
    username: env.TB_User.systemAdminEmail,
    password: env.TB_User.systemAdminPassword,
};

export default async function getSystemAdminToken(adminProfile?: SystemAdminProfileProps) {
    loggers.debug('Try to get admin token', 'Login system admin');
    const response = await TBUserConnecter.loginSystemAdmin(adminProfile || defaultAdminProfile);
    if (checkStatusError(response)) {
        return '';
    }
    return response.token;
}
