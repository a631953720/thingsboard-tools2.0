import getTBDevice from '../../library/thingsboardConnecter/device/getDevices';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';
import GetDeviceDTO from '../../interface/serviceResponse/device/getDevicesDTO';

const loggers = new WinstonLogger({ type: 'Device service' });

export default async function getDevices(tenantToken: string) {
    const devices = await getTBDevice(tenantToken);
    if (checkStatusError(devices)) return new GetDeviceDTO(devices);
    const DTO = new GetDeviceDTO({
        ...devices,
        status: 200,
        data: devices.data.map((d) => ({
            id: d.id.id,
            name: d.name,
            type: d.type,
            label: d.label,
            createdTime: d.createdTime,
        })),
    });
    loggers.debug({ DTO }, 'Get TB devices');
    return DTO;
}
