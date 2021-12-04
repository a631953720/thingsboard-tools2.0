import env from '../constants/env';
import winstonLoggers from './createWinstonLogger';

const { isDebug } = env.Server;
const {
    CommonLoggerConfig,
    ShowSimpleMessage,
} = winstonLoggers;

type LoggersProps = {
    type: string
};

export default class Loggers {
    private type: string;

    constructor({ type }: LoggersProps) {
        this.type = type;
    }

    debug(message: any, action = '') {
        if (isDebug) {
            CommonLoggerConfig.info({
                label: `[${this.type}]`,
                message: {
                    action,
                    message,
                },
            });
        }
    }

    error(message: any, action = '') {
        CommonLoggerConfig.error({
            label: `[${this.type}]`,
            message: {
                action,
                message,
            },
        });
    }

    warning(message: any, action = '') {
        CommonLoggerConfig.warn({
            label: `[${this.type}]`,
            message: {
                action,
                message,
            },
        });
    }
}

export const simpleMsg = ShowSimpleMessage.info.bind(ShowSimpleMessage);

const testLogger = new Loggers({ type: 'Winston logger test' });
// 下面可用來測試功能是否正常
simpleMsg('----------logger test start----------');
testLogger.debug({
    message: 'debug',
});
testLogger.error({
    message: 'error',
});
testLogger.warning({
    message: 'warning',
});
simpleMsg('----------logger test end-----------');
