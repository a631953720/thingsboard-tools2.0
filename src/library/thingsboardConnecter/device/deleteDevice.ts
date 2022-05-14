import TBDeleteDeviceDTO from '../../../interface/thingsboardConnector/device/TBDeleteDeviceDTO';
import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Device' });

export default async function deleteTBDevice(token: string, deviceId: string) {
  const response = await APICaller({
    method: 'DELETE',
    url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/device/${deviceId}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${token}`,
    },
  });
  const DTO = new TBDeleteDeviceDTO(response);
  loggers.debug({ DTO, response }, 'Delete device');
  return DTO;
}
