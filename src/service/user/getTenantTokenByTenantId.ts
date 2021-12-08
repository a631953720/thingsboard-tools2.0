import { NextFunction, Request, Response } from 'express';
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

}
