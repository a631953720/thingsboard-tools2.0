import mqtt from 'mqtt';
import { TB_SERVER } from '../../../constants/env';
import { simpleMsg } from '../../../helpers/loggers';
import { delayInterval } from '../../../helpers/utility';
import { jsonParse, jsonStringify } from '../../../helpers/jsonHandler';
import MQTTClientEntity from './clients';
import { Actions } from '../../../interface/serviceRequest/device/setTBDeviceActionDTO';

const MQTTClients = new MQTTClientEntity();

type Device = {
    id: string;
    name: string;
    token: string;
    action?: Array<Actions>;
};
// eslint-disable-next-line no-unused-vars
const allDelay = 0.1;

function initConnect(name: string, token: string) {
    const client = mqtt.connect(`mqtt://${TB_SERVER.ip}:1883`, {
        username: token,
    });

    client.once('connect', () => {
        simpleMsg(`${name} connected`);
    });

    client.once('error', (error) => {
        simpleMsg(`${name} can't connect: ${error}`);
        client.end();
    });

    return client;
}

export default class TBDeviceEntity {
    private device: Device;

    private sendDataDelay: number;

    private client: mqtt.MqttClient | undefined;

    private timer?: ReturnType<typeof setInterval>;

    private firstToInitOnMessage: boolean;

    constructor(device: Device, sendDataDelay: number) {
        this.device = device;
        this.sendDataDelay = sendDataDelay;
        this.firstToInitOnMessage = true;

        const find = MQTTClients.getClient(this.device.id);
        if (find) {
            simpleMsg(`${this.device.name} is already connected`);
            this.client = find;
        } else {
            this.client = initConnect(this.device.name, this.device.token);
            MQTTClients.addClient({ [this.device.id]: this.client });
        }
    }

    public getInfos() {
        return this.device;
    }

    public getClient() {
        return this.client;
    }

    public getAction() {
        return this.device.action;
    }

    public updateAction(action?: Array<Actions>) {
        this.device.action = action;
    }

    public async setMQTTClientSendData() {
        const { client, timer } = this;
        if (timer) return timer;
        if (client) {
            const rawData = jsonStringify({ test: 1 });

            const id = delayInterval(this.sendDataDelay, () => {
                client.publish('v1/devices/me/telemetry', rawData, () => {
                    simpleMsg(`${this.device.name} send data`);
                });
            });

            this.timer = id;
            return id;
        }
        return false;
    }

    public async subscribeRPCTopic() {
        const { client, device, firstToInitOnMessage } = this;
        if (client) {
            simpleMsg(`${device.name} subscribe TB RPC topic`);
            client.subscribe('v1/devices/me/rpc/request/+');
            if (firstToInitOnMessage) {
                client.on('message', (topic, message) => {
                    simpleMsg(`device: ${device.name}`);
                    simpleMsg(`request.topic: ${topic}`);
                    simpleMsg('request.body: ', jsonParse(message));

                    const serverRPCMessage = jsonParse(message);
                    const requestId = topic.slice('v1/devices/me/rpc/request/'.length);
                    const responsePayload = jsonStringify({
                        method: serverRPCMessage.method,
                        params: {
                            ...serverRPCMessage.params,
                            isDone: true,
                        },
                    });

                    // client acts as an echo service
                    client.publish(`v1/devices/me/rpc/response/${requestId}`, responsePayload);
                });
            }
            this.firstToInitOnMessage = false;
        }
        return false;
    }

    public async stopMQTTClientSendData() {
        const { timer } = this;
        if (timer) {
            clearInterval(timer);
            this.timer = undefined;
        }
    }

    public async unsubscribeRPCTopic() {
        const { client } = this;
        if (client) {
            client.unsubscribe('v1/devices/me/rpc/request/+');
        }
    }

    public async removeMQTTClient() {
        const client = MQTTClients.getClient(this.device.id);
        if (client) {
            simpleMsg(`${this.device.name} disconnect`);
            client.end();
            MQTTClients.removeClient(this.device.id);
            this.client = undefined;
        }
    }
}
