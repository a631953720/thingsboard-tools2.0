/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import checkStatusError from '../helpers/checkStatusError';
import { createDevices } from '../service/device';
import CreateTBDeviceReqDTO from '../interface/serviceRequest/device/createTBDevicesDTO';

export async function createTBDevices(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req;
        const { deviceCount, ...profile } = new CreateTBDeviceReqDTO(body);
        const response = await createDevices(
            req.headers.TBTenantToken as string,
            deviceCount,
            profile
        );

        if (checkStatusError(response)) {
            return next({
                status: response.status,
                errorMessage: response.errorMessage,
            });
        }
        return res.status(response.status).json(response.list);
    } catch (error) {
        return next({
            status: 500,
            errorMessage: 'Internal Server Error',
        });
    }
}