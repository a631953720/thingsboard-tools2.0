/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import HTTPError from '../constants/defaultHTTPCode';
import { checkValueType } from '../helpers/utility';

export function createDevicesValidator(req: Request, _res: Response, next: NextFunction) {
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

export function deleteDevicesValidator(req: Request, _res: Response, next: NextFunction) {
    const { body } = req;
    const { deviceList } = body;

    if (Array.isArray(deviceList)) {
        if (deviceList.length <= 0) {
            return next(
                HTTPError({
                    status: 400,
                    errorMessage: 'deviceList length <= 0',
                })
            );
        }
        if (
            !deviceList.every((v) => checkValueType(v, 'string')) &&
            !deviceList.every((v) => checkValueType(v, 'object'))
        ) {
            return next(
                HTTPError({
                    status: 400,
                    errorMessage: 'deviceList items must be string or object',
                })
            );
        }
        // 檢查陣列元素是否為真
        if (!deviceList.every((v) => v)) {
            return next(
                HTTPError({
                    status: 400,
                    errorMessage: 'deviceList items must be string or object',
                })
            );
        }
        if (deviceList.every((v) => checkValueType(v, 'object'))) {
            // 檢查陣列元素是務件的情況下是否可以取得id
            if (!deviceList.every((v) => v.id)) {
                return next(
                    HTTPError({
                        status: 400,
                        errorMessage: 'deviceList items can not get "id" parameter',
                    })
                );
            }
            if (!deviceList.every((v) => checkValueType(v.id, 'string'))) {
                return next(
                    HTTPError({
                        status: 400,
                        errorMessage: 'deviceList items "id" parameter must be string',
                    })
                );
            }
        }
    } else {
        return next(
            HTTPError({
                status: 400,
                errorMessage: 'deviceList must be an array',
            })
        );
    }
    return next();
}
