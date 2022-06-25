import { Request, Response, NextFunction } from 'express';
import generateMockData from '../library/mockData/generateMockData';
import HTTPError, { newHTTPError } from '../constants/defaultHTTPCode';
import { checkArrayValueType, checkValueType } from '../helpers/utility';
import WinstonLogger from '../helpers/loggers';

const loggers = new WinstonLogger({ type: 'deviceValidator.middleware' });
const commonError = newHTTPError(400);

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
    // if (!deviceList.every((v) => checkValueType(v, 'string')) && !deviceList.every((v) => checkValueType(v, 'object')))
    if (!checkArrayValueType({ array: deviceList, type: 'string' }) && !checkArrayValueType({ array: deviceList, type: 'object' })) {
      return next(
        HTTPError({
          status: 400,
          errorMessage: 'deviceList items must be string or object',
        })
      );
    }
    // 檢查陣列元素是否為真
    // if (!deviceList.every((v) => v))
    if (!checkArrayValueType({ array: deviceList })) {
      return next(
        HTTPError({
          status: 400,
          errorMessage: 'deviceList items is unavailable',
        })
      );
    }
    // if (deviceList.every((v) => checkValueType(v, 'object')))
    if (checkArrayValueType({ array: deviceList, type: 'object' })) {
      // 檢查陣列元素是務件的情況下是否可以取得id
      // if (!deviceList.every((v) => v.id))
      if (!checkArrayValueType({ array: deviceList, key: 'id' })) {
        return next(
          HTTPError({
            status: 400,
            errorMessage: 'deviceList items can not get "id" parameter',
          })
        );
      }
      // if (!deviceList.every((v) => checkValueType(v.id, 'string')))
      if (!checkArrayValueType({ array: deviceList, key: 'id', type: 'string' })) {
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

export function setDevicesActionValidator(req: Request, _res: Response, next: NextFunction) {
  const { body } = req;
  const { deviceList } = body;

  if (!Array.isArray(deviceList)) return next(commonError('deviceList must be an array'));
  if (deviceList.length === 0) return next(commonError('deviceList length is 0'));
  if (!checkArrayValueType({ array: deviceList, key: 'name', type: 'string' })) return next(commonError('device name is unavailable'));
  if (!checkArrayValueType({ array: deviceList, key: 'id', type: 'string' })) return next(commonError('device id is unavailable'));
  if (!checkArrayValueType({ array: deviceList, key: 'token', type: 'string' })) return next(commonError('device token is unavailable'));
  if (!checkArrayValueType({ array: deviceList, key: 'type', type: 'string' })) return next(commonError('device type is unavailable'));
  // eslint-disable-next-line prettier/prettier
  if (!checkArrayValueType({ array: deviceList, key: 'frequency', type: 'number' })) return next(commonError('device frequency is unavailable'));
  if (!deviceList.every((v) => Array.isArray(v.action))) return next(commonError('device action is unavailable'));

  return next();
}

export function upsertMockDataEntityValidator(req: Request, _res: Response, next: NextFunction) {
  const { body } = req;
  const { name, data } = body;

  if (!checkValueType(name, 'string') && !checkValueType(name, 'number')) return next(commonError('name must be string or number'));
  if (Array.isArray(data)) return next(commonError('data must be object'));

  // 嘗試看看是否可以正常產生假資料
  try {
    const v = generateMockData(data);
    loggers.debug(v, 'generateMockData');
  } catch (error) {
    return next(commonError('"data" formate error'));
  }

  return next();
}

export function setTBDeviceFrequencyValidator(req: Request, _res: Response, next: NextFunction) {
  const { body } = req;
  const { deviceList, frequency } = body;

  if (!Array.isArray(deviceList)) return next(commonError('deviceList must be a string array'));
  if (!checkArrayValueType({ array: deviceList, type: 'string' })) return next(commonError('deviceList must be a string array'));
  if (!checkValueType(frequency, 'number')) return next(commonError('frequency must be a number'));

  return next();
}
