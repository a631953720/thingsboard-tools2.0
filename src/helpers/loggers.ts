import { SERVER } from '../constants/env';
import winstonLoggers from './createWinstonLogger';
import { DateFormat, DateToMMDD } from './utility';

const { isDebug } = SERVER;
const { CommonLoggerConfig, ShowSimpleMessage } = winstonLoggers;

type LoggersProps = {
  type: string;
};

export default class Loggers {
  private type: string;

  constructor({ type }: LoggersProps) {
    this.type = type;
  }

  debug(message: any, action = '') {
    if (isDebug) {
      CommonLoggerConfig(DateToMMDD(Date.now())).info({
        time: DateFormat(new Date().toISOString()),
        label: `[${this.type}]`,
        message: {
          action,
          message,
        },
      });
    }
  }

  error(message: any, action = '') {
    CommonLoggerConfig(DateToMMDD(Date.now())).error({
      time: DateFormat(new Date().toISOString()),
      label: `[${this.type}]`,
      message: {
        action,
        message,
      },
    });
  }

  warning(message: any, action = '') {
    CommonLoggerConfig(DateToMMDD(Date.now())).warn({
      time: DateFormat(new Date().toISOString()),
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
testLogger.debug('debug');
testLogger.error('error');
testLogger.warning('warning');
simpleMsg('----------logger test end-----------');
