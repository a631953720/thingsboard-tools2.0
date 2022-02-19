import { checkValueType, randomNum } from '../../helpers/utility';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Mock data entity' });

export default function generateMockData(obj: any) {
    loggers.debug(obj, 'setMockData');
    const newObj: any = {};
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        if (checkValueType(obj[key], 'string')) newObj[key] = obj[key];
        else if (checkValueType(obj[key], 'number')) newObj[key] = randomNum(obj[key]);
        else if (Array.isArray(obj[key])) newObj[key] = obj[key].map((v: any) => randomNum(v));
        else if (checkValueType(obj[key], 'object')) newObj[key] = generateMockData(obj[key]);
    });
    return newObj;
}
