import { getTBDevice } from '../../library/thingsboardConnecter/device';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';
import GetDeviceDTO from '../../interface/serviceResponse/device/getDevicesDTO';
import getTBDeviceToken from '../../library/thingsboardConnecter/device/getDeviceToken';

const loggers = new WinstonLogger({ type: 'Device service' });

export default async function getDevices(tenantToken: string) {
    const newData = [];
    const devices = await getTBDevice(tenantToken);
    if (checkStatusError(devices)) return new GetDeviceDTO(devices);

    // eslint-disable-next-line no-unreachable-loop
    for (let i = 0; i < devices.data.length; i += 1) {
        const device = devices.data[i];
        // eslint-disable-next-line no-await-in-loop
        const deviceToken = await getTBDeviceToken(tenantToken, device.id.id);
        if (checkStatusError(deviceToken)) return new GetDeviceDTO(deviceToken);
        newData.push({
            id: device.id.id,
            name: device.name,
            type: device.type,
            label: device.label,
            createdTime: device.createdTime,
            token: deviceToken.credentialsId,
        });
    }
    const DTO = new GetDeviceDTO({
        ...devices,
        status: 200,
        data: newData,
    });
    loggers.debug({ DTO }, 'Get TB devices');
    return DTO;
}
