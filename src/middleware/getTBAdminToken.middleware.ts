/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { loginSystemAdmin } from '../library/thingsboardConnecter/user';
import { TB_USER } from '../constants/env';
import { SystemAdminProfileProps } from '../interface/user';
import checkStatusError from '../helpers/checkStatusError';
import { simpleMsg } from '../helpers/loggers';
import HTTPError from '../constants/defaultHTTPCode';

let catchToken = '';
let timeIntervalId: ReturnType<typeof setInterval>;

const defaultAdminProfile: SystemAdminProfileProps = {
    username: TB_USER.systemAdminEmail,
    password: TB_USER.systemAdminPassword,
};

export default async function getTBAdminToken(req: Request, res: Response, next: NextFunction) {
    if (catchToken) {
        req.headers.TBAdminToken = catchToken;
        return next();
    }
    const admin = await loginSystemAdmin(defaultAdminProfile);
    if (checkStatusError(admin)) {
        return next(
            HTTPError({
                status: admin.status,
                errorMessage: admin.errorMessage,
            })
        );
    }
    catchToken = admin.token;
    req.headers.TBAdminToken = catchToken;

    simpleMsg('Set time interval to reset TB system admin token catch');
    timeIntervalId = setInterval(() => {
        simpleMsg('Reset TB system admin token catch');
        catchToken = '';
        clearInterval(timeIntervalId);
    }, 600 * 1000);

    return next();
}
