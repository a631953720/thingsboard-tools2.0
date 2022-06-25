import { TB_SERVER } from '../../../constants/env';
import APICaller from '../../../helpers/apiCaller';
import { jsonStringify } from '../../../helpers/jsonHandler';
import WinstonLogger from '../../../helpers/loggers';
import { createDTO, EntityFindReq, queryBuilder } from './utils';

const loggers = new WinstonLogger({ type: 'Entity query' });

export default async function entityFind(token: string, config: EntityFindReq) {
  const response = await APICaller({
    method: 'post',
    url: `http://${TB_SERVER.apiHost}/api/entitiesQuery/find`,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${token}`,
    },
    data: jsonStringify(queryBuilder(config)),
  });
  const DTO = createDTO(response);
  loggers.debug({ DTO }, 'Entity query');
  return DTO;
}
