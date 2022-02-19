import generateMockData from './generateMockData';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Mock data entity' });

export default class MockDataEntity {
    private config: object;

    constructor(data: object) {
        this.config = data;
    }

    public getConfig() {
        loggers.debug(this.config, 'getConfig');
        return this.config;
    }

    public setConfig(data: object) {
        loggers.debug(data, 'setConfig');
        this.config = data;
    }

    public generate() {
        const v = generateMockData(this.config);
        loggers.debug(v, 'generate data');
        return v;
    }
}
