import mqtt from 'mqtt';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'MQTT' });

type MQTTClient = {
    [id: string]: mqtt.Client;
};

type MQTTClientArr = Array<MQTTClient>;

export default class MQTTClientEntity {
    // 利用id對應MQTT Client
    clientList: MQTTClientArr;

    constructor() {
        this.clientList = [];
    }

    /**
     * 檢查device id 對應的 MQTT Client是否存在
     * @param id device id
     * @returns 存在為true反之為false
     */
    public checkClientIsExist(id: string) {
        const client = this.clientList.find((c) => Object.keys(c)[0] === id);
        if (client) return true;
        return false;
    }

    /**
     * 取得device id 對應的 MQTT Client index 值
     * @param id device id
     * @returns index number
     */
    public getClientIndex(id: string) {
        const index = this.clientList.findIndex((c) => Object.keys(c)[0] === id);
        return index;
    }

    /**
     * 取得device id 對應的 MQTT Client
     * @param id device id
     * @returns MQTTClient | undefined
     */
    public getClient(id: string) {
        const find = this.clientList.find((c) => Object.keys(c)[0] === id);
        if (find) {
            return find[id];
        }
        return find;
    }

    /**
     * 刪除device id 對應的 MQTT Client，若找不到則維持原client list
     * @param id device id
     */
    public removeClient(id: string) {
        this.clientList = this.clientList.filter((c) => Object.keys(c)[0] !== id);
        loggers.debug({ clientList: this.clientList }, 'Update client array');
    }

    /**
     * 新增MQTTClient到client list內
     * @param client [id]:MqttClient 的物件
     */
    public addClient(client: MQTTClient) {
        this.clientList.push(client);
        loggers.debug(`device id: ${Object.keys(client)[0]}`, 'Add mqtt client to array');
    }
}
