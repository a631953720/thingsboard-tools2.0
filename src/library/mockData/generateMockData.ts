import { checkValueType, checkArrayValueType, randomNum } from '../../helpers/utility';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Mock data entity' });

export default function generateMockData(obj: any) {
    loggers.debug(obj, 'setMockData');
    // checkValueType
    const newObj: any = {};
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        if (checkValueType(obj[key], 'string')) newObj[key] = obj[key];
        if (checkValueType(obj[key], 'number')) newObj[key] = obj[key];
        // number array
        else if (Array.isArray(obj[key])) {
            const IsNumberArr = checkArrayValueType({
                array: obj[key],
                type: 'number',
            });
            if (obj[key][0] > obj[key][1]) throw new Error('array[0] > array[1]');
            if (IsNumberArr && obj[key].length > 0 && obj[key].length <= 2) {
                if (obj[key].length === 1)
                    // eslint-disable-next-line prefer-destructuring
                    newObj[key] = obj[key][0];
                if (obj[key].length === 2) newObj[key] = randomNum(obj[key][1], obj[key][1], obj[key][0]);
            } else {
                throw new Error('set array error');
            }
        } else if (checkValueType(obj[key], 'object')) newObj[key] = generateMockData(obj[key]);
    });
    return newObj;
}
