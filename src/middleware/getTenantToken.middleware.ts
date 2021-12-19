/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { simpleMsg } from '../helpers/loggers';
import checkStatusError from '../helpers/checkStatusError';
import autoLoginToGetTenantToken from '../service/user/autoLoginToGetTenantToken';

let catchToken = '';
let timeIntervalId: ReturnType<typeof setInterval>;

export default async function getTenantToken(req: Request, res: Response, next: NextFunction) {
    if (catchToken) {
        req.headers.TBTenantToken = catchToken;
        return next();
    }
    const tenant = await autoLoginToGetTenantToken(req.headers.TBAdminToken as string);
    if (checkStatusError(tenant)) {
        return next({
            status: tenant.status,
            errorMessage: tenant.errorMessage,
        });
    }
    catchToken = tenant.token;
    req.headers.TBTenantToken = catchToken;

    simpleMsg('Set time interval to reset TB tenant token catch');
    timeIntervalId = setInterval(() => {
        simpleMsg('Reset TB tenant token catch');
        catchToken = '';
        clearInterval(timeIntervalId);
    }, 600 * 1000);

    return next();
}
