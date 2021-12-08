import { NextFunction, Request, Response } from 'express';
import checkStatusError from '../../helpers/checkStatusError';
import { TB_USER } from '../../constants/env';
import {
    getSystemAdminToken,
    getFirstTenantAdminId,
    getFirstTenantId,
    getTenantToken,
    createTenantAdmin,
    createTenant,
} from '../../service/user';
import WinstonLogger from '../../helpers/loggers';
import { HTTPError } from '../../constants/defaultHTTPCode';

const loggers = new WinstonLogger({ type: 'User component' });

const { tenantAdminName, tenantEmail, systemAdminEmail } = TB_USER;

interface GetTenantTokenRes {
    status: number;
    systemAdminEmail: string;
    tenantAdminName: string;
    tenantEmail: string;
    token: string;
}

class GetTenantTokenDTO implements GetTenantTokenRes {
    status: number;

    systemAdminEmail: string;

    tenantAdminName: string;

    tenantEmail: string;

    token: string;

    constructor(data: any) {
        this.status = data.status;
        this.systemAdminEmail = data.systemAdminEmail;
        this.tenantAdminName = data.tenantAdminName;
        this.tenantEmail = data.tenantEmail;
        this.token = data.token;
    }
}

export default async function getOrCreateNewTenantToGetToken(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    let tenantAdminId: string;
    let tenantId: string;
    const adminToken = await getSystemAdminToken();
    if (checkStatusError(adminToken))
        return next(HTTPError({ status: 500, errorMessage: 'Get system admin token error' }));

    // 1. 取得搜尋到的第一個Tenant admin id，若不存在就會嘗試create新的
    const tenantAdminInfo = await getFirstTenantAdminId(adminToken.token, tenantAdminName);
    if (checkStatusError(tenantAdminInfo)) {
        loggers.warning('Tenant is not exist, try to create new tenant', 'Check Tenant');
        const newTenantAdmin = await createTenantAdmin(adminToken.token);
        if (checkStatusError(newTenantAdmin)) {
            return next(
                HTTPError({
                    status: newTenantAdmin.status,
                    errorMessage: newTenantAdmin.errorMessage,
                })
            );
        }
        tenantAdminId = newTenantAdmin.id;
    }
    tenantAdminId = tenantAdminInfo.tenantAdminId;
    if (!tenantAdminId) return next(HTTPError({ errorMessage: 'Get tenant admin id error' }));

    // 2. 取得搜尋到的第一個Tenant id，若不存在就會嘗試create新的
    const tenantInfo = await getFirstTenantId(adminToken.token, tenantAdminId, tenantEmail);
    if (checkStatusError(tenantInfo)) {
        loggers.warning(
            'Tenant admin is not exist, try to create new tenant admin',
            'Check Tenant admin'
        );
        const newTenant = await createTenant(adminToken.token, tenantAdminId);
        if (checkStatusError(newTenant)) {
            return next(
                HTTPError({ status: newTenant.status, errorMessage: newTenant.errorMessage })
            );
        }
        tenantId = newTenant.id;
    }
    tenantId = tenantInfo.tenantId;
    if (!tenantId) return next(HTTPError({ errorMessage: 'Get Tenant id error' }));

    // 3. 取得Tenant token
    const tenantToken = await getTenantToken(adminToken.token, tenantId);

    if (checkStatusError(tenantToken))
        return next(
            HTTPError({ status: tenantToken.status, errorMessage: tenantToken.errorMessage })
        );

    const DTO = new GetTenantTokenDTO({
        systemAdminEmail,
        tenantAdminName,
        tenantEmail,
        token: tenantToken.token,
    });
    console.log(DTO);
    return res.status(200).json(DTO);
}
