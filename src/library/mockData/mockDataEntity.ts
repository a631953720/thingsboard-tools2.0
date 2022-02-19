import generateMockData from './generateMockData';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Mock data entity' });

export default class MockDataEntity {
    // 輸入的是任意物件，會當作假資料生成的依據
    private config: object;

    constructor(data: object) {
        this.config = data;
    }

    /**
     * 取得當前實體的設定
     */
    public getConfig() {
        loggers.debug(this.config, 'getConfig');
        return this.config;
    }

    /**
     * 更新當前實體的設定
     */
    public setConfig(data: object) {
        loggers.debug(data, 'setConfig');
        this.config = data;
    }

    /**
     * 生成假資料
     */
    public generate() {
        const v = generateMockData(this.config);
        loggers.debug(v, 'generate data');
        return v;
    }
}
