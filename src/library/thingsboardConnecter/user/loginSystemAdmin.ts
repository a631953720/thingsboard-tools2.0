import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { SystemAdminProfileProps } from '../../../interface/user';
import LoginSystemAdminDTO from '../../../interface/thingsboardConnector/user/TBLoginSystemAdminDTO';

const loggers = new WinstonLogger({ type: 'System admin' });

export default async function loginSystemAdmin(adminProfile: SystemAdminProfileProps) {
  const response = await APICaller({
    method: 'post',
    url: `http://${TB_SERVER.ip}:${TB_SERVER.port}/api/auth/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: jsonStringify(adminProfile),
  });
  const DTO = new LoginSystemAdminDTO(response);
  loggers.debug({ adminProfile: adminProfile.username, DTO }, 'Login admin account');
  return DTO;
}
