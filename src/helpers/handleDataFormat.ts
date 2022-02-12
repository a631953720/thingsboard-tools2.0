import { checkValueType } from './utility';
import WinstonLogger from './loggers';

const loggers = new WinstonLogger({ type: 'handleDataFormat' });

export default function getDeviceIdList(deviceList: string[] | object[]) {
    try {
        // eslint-disable-next-line no-param-reassign
        loggers.debug({ deviceList }, 'get device id list');
        const list = deviceList.map((d: any) => {
            if (checkValueType(d, 'string')) return d as string;
            return d.id as string;
        });
        if (!list.every((id: any) => checkValueType(id, 'string'))) {
            throw new Error('Get device id list error');
        }
        return list;
    } catch (error) {
        loggers.error({ error }, 'get device id list');
        return [];
    }
}
