/* eslint-disable max-classes-per-file */
import { TB_USER } from '../../constants/env';
import * as TBUserConnecter from '../../library/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import { SystemAdminProfileProps } from '../../interface/user';
import TBLoginSystemAdminDTO from '../../interface/thingsboardConnector/TBLoginSystemAdminDTO';

const loggers = new WinstonLogger({ type: 'User component' });

const defaultAdminProfile: SystemAdminProfileProps = {
    username: TB_USER.systemAdminEmail,
    password: TB_USER.systemAdminPassword,
};

interface GetSystemAdminTokenRes {
    status: number;
    token?: string;
    refreshToken?: string;
    errorMessage?: any;
}

class GetSystemAdminTokenDTO implements GetSystemAdminTokenRes {
    status: number;

    token: string;

    refreshToken: string;

    errorMessage?: any;

    // 來自前一個DTO
    constructor(data: TBLoginSystemAdminDTO) {
        this.status = data.status;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.errorMessage = data.errorMessage; // 錯誤的時候會出現
    }
}

export default async function getSystemAdminToken(adminProfile?: SystemAdminProfileProps) {
    loggers.debug('Try to get admin token', 'Login system admin');
    const response = await TBUserConnecter.loginSystemAdmin(adminProfile || defaultAdminProfile);
    const DTO = new GetSystemAdminTokenDTO(response);
    return DTO;
}
