import { DeviceProfile } from '../../../interface/thingsboardConnector/device/TBDeviceInterface';
import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import TBCreateDeviceDTO from '../../../interface/thingsboardConnector/device/TBCreateDeviceDTO';

const loggers = new WinstonLogger({ type: 'Device' });

export default async function createTBDevice(token: string, deviceProfile: DeviceProfile) {
  const response = await APICaller({
    method: 'post',
    url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/device`,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${token}`,
    },
    data: jsonStringify(deviceProfile),
  });
  const DTO = new TBCreateDeviceDTO(response);
  loggers.debug({ DTO }, 'Create device');
  return DTO;
}
