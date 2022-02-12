import mqtt from 'mqtt';
import { TB_SERVER } from '../../../constants/env';
import WinstonLogger, { simpleMsg } from '../../../helpers/loggers';
import { delay } from '../../../helpers/utility';
import { jsonParse, jsonStringify } from '../../../helpers/jsonHandler';
import MQTTClientEntity from './clients';

const loggers = new WinstonLogger({ type: 'MQTT' });
const MQTTClients = new MQTTClientEntity();

type DeviceList = Array<{
    name: string;
    id: string;
    token: string;
}>;
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

export function createMQTTClientToTB(deviceList: DeviceList) {
    const count = deviceList.length;
    const rawData = JSON.stringify({ test: 1 });
    loggers.debug(
        {
            deviceCount: count,
            deviceList,
        },
        'createMQTTClientToTB'
    );

    deviceList.forEach(async (d, idx) => {
        if (MQTTClients.checkClientIsExist(d.name)) {
            simpleMsg(`${d.name} is already connected`);
        } else {
            await delay(allDelay + allDelay * idx);
            const client = await initConnect(d.name, d.token);
            MQTTClients.addClient({ [d.name]: client });

            delay(allDelay + allDelay * count, () => {
                client.publish('v1/devices/me/telemetry', rawData, () => {
                    simpleMsg(`${d.name} send data`);
                });
            });

            simpleMsg(`${d.name} subscribe TB RPC topic`);
            client.subscribe('v1/devices/me/rpc/request/+');
            client.on('message', (topic, message) => {
                simpleMsg(`device: ${d.name}`);
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
    });
}

export function stopMQTTClient(deviceList: DeviceList) {
    const count = deviceList.length;
    loggers.debug({
        deviceCount: count,
        deviceList,
    });
    deviceList.forEach(async (d, idx) => {
        const client = MQTTClients.clientList.find((c) => Object.keys(c)[0] === d.name);
        if (client) {
            await delay(allDelay + allDelay * idx);
            simpleMsg(`${d.name} disconnect`);
            client[d.name].end();
            MQTTClients.removeClient(MQTTClients.getClientIndex(d.name));
        }
    });
}
