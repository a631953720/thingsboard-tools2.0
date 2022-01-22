import deleteDevice from '../../library/thingsboardConnecter/device/deleteDevice';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';
import DeleteDeviceDTO from '../../interface/serviceResponse/device/deleteDeviceDTO';

const loggers = new WinstonLogger({ type: 'Device service' });

export default async function deleteDevices(tenantToken: string, deviceIdList: string[]) {
    if (Array.isArray(deviceIdList)) {
        loggers.debug({ deviceIdList }, 'Delete devices id list');
        for (let i = 0; i < deviceIdList.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const res = await deleteDevice(tenantToken, deviceIdList[i]);
            if (checkStatusError(res)) return new DeleteDeviceDTO(res);
        }
    }
    return new DeleteDeviceDTO({ status: 200 });
}
