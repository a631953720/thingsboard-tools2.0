import deleteDevice from '../../library/thingsboardConnecter/device/deleteDevice';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';
import DeleteDeviceDTO from '../../interface/serviceResponse/device/deleteDeviceDTO';
import getDeviceIdList from '../../helpers/handleDataFormat';

const loggers = new WinstonLogger({ type: 'Device service' });

export default async function deleteDevices(tenantToken: string, deviceIdList: string[] | object[]) {
    const newDeviceList = getDeviceIdList(deviceIdList);
    loggers.debug({ newDeviceList }, 'Delete devices id list');
    if (newDeviceList.length <= 0) {
        return new DeleteDeviceDTO({ status: 500, errorMessage: 'Internal Server Error' });
    }
    if (Array.isArray(newDeviceList)) {
        for (let i = 0; i < newDeviceList.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const res = await deleteDevice(tenantToken, newDeviceList[i]);
            if (checkStatusError(res)) return new DeleteDeviceDTO(res);
        }
    }
    return new DeleteDeviceDTO({ status: 200 });
}
