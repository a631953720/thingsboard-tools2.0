import TBGetDeviceDTO from '../../../interface/thingsboardConnector/device/TBGetDeviceDTO';
import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Device' });

export default async function getTBDevice(token: string, pageSize = 1024, page = 0, sortProperty = 'createdTime', sortOrder = 'DESC', type = '') {
  const response = await APICaller({
    method: 'GET',
    url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/tenant/deviceInfos?pageSize=${pageSize}&page=${page}&sortProperty=${sortProperty}&sortOrder=${sortOrder}&type=${type}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${token}`,
    },
  });
  const DTO = new TBGetDeviceDTO(response);
  loggers.debug({ DTO, response }, 'Get devices');
  return DTO;
}
