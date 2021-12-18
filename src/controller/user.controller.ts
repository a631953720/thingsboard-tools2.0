/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import checkStatusError from '../helpers/checkStatusError';
import { autoLoginToGetTenantToken } from '../service/user';

export async function autoLoginTenantAccount(_req: Request, res: Response, next: NextFunction) {
    try {
        const response = await autoLoginToGetTenantToken();
        if (checkStatusError(response)) {
            return next({
                status: response.status,
                errorMessage: response.errorMessage,
            });
        }
        return res.status(200).json(response);
    } catch (error) {
        return next({
            status: 500,
            errorMessage: 'Internal Server Error',
        });
    }

}
