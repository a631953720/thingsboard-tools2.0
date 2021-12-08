import { NextFunction, Request, Response } from 'express';
import { getSystemAdminToken, getTenantToken } from '../../service/user';
import { HTTPError } from '../../constants/defaultHTTPCode';
import checkStatusError from '../../helpers/checkStatusError';

interface GetTenantTokenByTenantIdRes {
    status: number;
    tenantId: string;
    token: string;
}

class GetTenantTokenByTenantIdDTO implements GetTenantTokenByTenantIdRes {
    status: number;

    tenantId: string;

    token: string;

    constructor(data: any) {
        this.status = data.status;
        this.tenantId = data.tenantId;
        this.token = data.token;
    }
}

export default async function getTenantTokenByTenantId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { tenantId } = req.params;
    const adminToken = await getSystemAdminToken();
    if (checkStatusError(adminToken))
        return next(
            HTTPError({ status: adminToken.status, errorMessage: adminToken.errorMessage })
        );

    const tenantToken = await getTenantToken(adminToken.token, tenantId);
    if (checkStatusError(tenantToken))
        return next(
            HTTPError({ status: tenantToken.status, errorMessage: tenantToken.errorMessage })
        );

    const DTO = new GetTenantTokenByTenantIdDTO({
        status: 200,
        tenantId,
        token: tenantToken.token,
    });
    return res.status(DTO.status).json(DTO);
}
