import mqtt from 'mqtt';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'MQTT' });

type MQTTClient = {
    [id: string]: mqtt.Client;
};

type MQTTClientArr = Array<MQTTClient>;

export default class MQTTClientEntity {
    clientList: MQTTClientArr;

    constructor() {
        this.clientList = [];
    }

    public checkClientIsExist(id: string) {
        const client = this.clientList.find((c) => Object.keys(c)[0] === id);
        if (client) return true;
        return false;
    }

    public getClientIndex(id: string) {
        const index = this.clientList.findIndex((c) => Object.keys(c)[0] === id);
        return index;
    }

    public getClient(id: string) {
        const find = this.clientList.find((c) => Object.keys(c)[0] === id);
        if (find) {
            return find[id];
        }
        return find;
    }

    public removeClient(id: string) {
        this.clientList = this.clientList.filter((c) => Object.keys(c)[0] !== id);
        loggers.debug({ clientList: this.clientList }, 'Update client array');
    }

    public addClient(client: MQTTClient) {
        this.clientList.push(client);
        loggers.debug(`device id: ${Object.keys(client)[0]}`, 'Add mqtt client to array');
    }
}
