import WinstonLogger from './loggers';

const loggers = new WinstonLogger({ type: 'API caller' });

export function jsonParse(params: any) {
    try {
        const jsonObject = JSON.parse(params);
        return jsonObject;
    } catch (error) {
        loggers.error({
            type: 'Json parse',
            message: 'jsonParser error',
        });
        return params;
    }
}

export function jsonStringify(params: any) {
    try {
        const jsonString = JSON.stringify(params);
        return jsonString;
    } catch (error) {
        loggers.error({
            type: 'Json stringify',
            message: 'jsonStringify error',
        });
        return params;
    }
}
