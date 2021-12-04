import ENV from '../constants/env';

import logger from './createWinstonLogger';

const { isDebug } = ENV.Server;
const {
    CommonLoggerConfig,
    ShowSimpleMessage,
} = logger;

type CommonLoggerProps = {
    type: string,
    message: any
};

function showDebugLog({ type, message }: CommonLoggerProps) {
    if (isDebug) {
        CommonLoggerConfig.info({
            label: `[${type}]`,
            message,
        });
    }
}

function showWarningLog({ type, message }: CommonLoggerProps) {
    CommonLoggerConfig.warn({
        label: `[${type}]`,
        message,
    });
}

function showErrorLog({ type, message }: CommonLoggerProps) {
    CommonLoggerConfig.error({
        label: `[${type}]`,
        message,
    });
}

const loggers = {
    showDebugLog,
    showErrorLog,
    showWarningLog,
    // https://github.com/winstonjs/winston/issues/1591
    // 不用bind，會出現self._addDefaultMeta is not a function的錯誤
    showSimpleMessage: ShowSimpleMessage.info.bind(ShowSimpleMessage),
};

export default loggers;

// 下面可用來測試功能是否正常
loggers.showSimpleMessage('----------logger test start----------');
loggers.showDebugLog({
    type: 'debug',
    message: 'debug',
});
loggers.showErrorLog({
    type: 'error',
    message: 'error',
});
loggers.showWarningLog({
    type: 'warning',
    message: 'warning',
});
loggers.showSimpleMessage('----------logger test end-----------');
