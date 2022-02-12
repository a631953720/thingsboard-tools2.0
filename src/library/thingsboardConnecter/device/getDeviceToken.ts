import TBGetDeviceTokenDTO from '../../../interface/thingsboardConnector/device/TBGetDeviceTokenDTO';
import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Device' });

export default async function getTBDeviceToken(token: string, deviceId: string) {
    const response = await APICaller({
        method: 'GET',
        url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/device/${deviceId}/credentials`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    });
    // eslint-disable-next-line no-throw-literal
    const DTO = new TBGetDeviceTokenDTO(response);
    loggers.debug({ DTO, response }, 'Get devices');
    return DTO;
}
