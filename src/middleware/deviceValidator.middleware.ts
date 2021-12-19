/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import HTTPError from '../constants/defaultHTTPCode';

export function createDevicesValidator(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { deviceCount, deviceName, deviceType, deviceLabel } = body;
    if (typeof deviceCount !== 'number') {
        return next(
            HTTPError({
                status: 400,
                errorMessage: 'deviceCount must be a number',
            })
        );
    }
    if (typeof deviceName !== 'string') {
        return next(
            HTTPError({
                status: 400,
                errorMessage: 'deviceName must be a string',
            })
        );
    }
    if (typeof deviceType !== 'string') {
        return next(
            HTTPError({
                status: 400,
                errorMessage: 'deviceType must be a string',
            })
        );
    }
    if (deviceLabel && typeof deviceLabel !== 'string') {
        return next(
            HTTPError({
                status: 400,
                errorMessage: 'deviceLabel must be a string',
            })
        );
    }
    return next();
}
