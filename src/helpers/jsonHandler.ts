import WinstonLogger from './loggers';

const loggers = new WinstonLogger({ type: 'API caller' });

export function jsonParse(params: any) {
    try {
        const jsonObject = JSON.parse(params);
        return jsonObject;
    } catch (error) {
        loggers.error('JsonParser error', 'Json handler');
        return params;
    }
}

export function jsonStringify(params: any) {
    try {
        const jsonString = JSON.stringify(params);
        return jsonString;
    } catch (error) {
        loggers.error('JsonStringify error', 'Json handler');
        return params;
    }
}
