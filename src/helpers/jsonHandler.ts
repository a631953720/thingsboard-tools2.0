import loggers from './loggers';

const { showErrorLog } = loggers;

export function jsonParse(params: any) {
    try {
        const jsonObject = JSON.parse(params);
        return jsonObject;
    } catch (error) {
        showErrorLog({
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
        showErrorLog({
            type: 'Json stringify',
            message: 'jsonStringify error',
        });
        return params;
    }
}
