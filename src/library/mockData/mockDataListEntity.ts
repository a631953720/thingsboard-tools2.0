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

  /**
   * 嘗試取得 MockDataEntity config，若找不到則回傳 undefined
   */
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

  /**
   * 取得所有 MockDataEntity 設定列表
   */
  public getNameList() {
    return this.nameList.map((name) => this.getEntityConfig(name));
  }

  /**
   * 嘗試取得 MockDataEntity 的實體，不存在則回傳undefined
   */
  public getMockDataEntity(name: string) {
    const find = this.nameList.find((n) => n === name);
    if (find) return map.get(find);
    return undefined;
  }

  /**
   * 嘗試建立 MockDataEntity 的實體，不存在則回傳false。
   * 成功 create 會將實體存在Map當中，以name:MockDataEntity的方式
   */
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

  /**
   * 嘗試更新 MockDataEntity 的設定，若找不到實體，回傳false
   */
  public updateMockDataEntity(name: string, data: object) {
    const find = this.nameList.find((n) => n === name);

    // can not find
    if (!find) return false;

    const entity = map.get(find);

    if (!entity) return false;

    entity.setConfig(data);

    return entity;
  }

  /**
   * 嘗試刪除 MockDataEntity 的實體，無法刪除則回傳false
   */
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
