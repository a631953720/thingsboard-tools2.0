import mqtt from 'mqtt';
import WinstonLogger from '../../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'MQTT' });

type MQTTClient = {
    [deviceName: string]: mqtt.Client;
};

type MQTTClientArr = Array<MQTTClient>;

export default class MQTTClientEntity {
    clientList: MQTTClientArr;

    constructor() {
        this.clientList = [];
    }

    public checkClientIsExist(deviceName: string) {
        const client = this.clientList.find((c) => Object.keys(c)[0] === deviceName);
        if (client) return true;
        return false;
    }

    public getClientIndex(deviceName: string) {
        const index = this.clientList.findIndex((c) => Object.keys(c)[0] === deviceName);
        return index;
    }

    public removeClient(index: number) {
        const client = this.clientList[index];
        this.clientList = this.clientList.filter((c) => Object.keys(c)[0] !== Object.keys(client)[0]);
        loggers.debug({ clientList: this.clientList }, 'Update client array');
    }

    public addClient(client: MQTTClient) {
        this.clientList.push(client);
        loggers.debug(`device name: ${Object.keys(client)[0]}`, 'Add mqtt client to array');
    }
}
