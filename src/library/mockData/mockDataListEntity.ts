import WinstonLogger from '../../helpers/loggers';
import MockDataEntity from './mockDataEntity';

const loggers = new WinstonLogger({ type: 'Mock data entity list' });
const map = new Map<string, MockDataEntity>();

export default class MockDataListEntity {
    private nameList: Array<string>;

    constructor() {
        this.nameList = Array.from(map.keys());
    }

    private updateNameList() {
        this.nameList = Array.from(map.keys());
    }

    public getEntityConfig(name: string) {
        const find = this.nameList.find((n) => n === name);
        if (!find) return undefined;
        const entity = map.get(find);
        if (!entity) return undefined;
        return {
            name,
            config: entity.getConfig(),
        };
    }

    public getNameList() {
        return this.nameList.map((name) => this.getEntityConfig(name));
    }

    public getMockDataEntity(name: string) {
        const find = this.nameList.find((n) => n === name);
        if (find) return map.get(find);
        return undefined;
    }

    public createMockDataEntity(name: string, data: object) {
        const find = this.nameList.find((n) => n === name);

        // can not create
        if (find) return false;

        loggers.warning(`can not find MockDataEntity: ${name}, try create new one`, 'createMockDataEntity');
        const entity = new MockDataEntity(data);
        map.set(name, entity);
        this.updateNameList();
        return entity;
    }

    public updateMockDataEntity(name: string, data: object) {
        const find = this.nameList.find((n) => n === name);

        // can not find
        if (!find) return false;

        const entity = map.get(find);

        if (!entity) return false;

        entity.setConfig(data);

        return entity;
    }

    public deleteMockDataEntity(name: string) {
        const find = this.nameList.find((n) => n === name);
        if (find) {
            const isDelete = map.delete(find);
            this.updateNameList();
            return isDelete;
        }
        loggers.error(`can not find MockDataEntity: ${name}`, 'deleteMockDataEntity');
        return false;
    }
}
