/* eslint-disable no-await-in-loop */
// import { Device } from '../../interface/device';
import { delay } from '../../helpers/utility';
import { Actions, Devices } from '../../interface/serviceRequest/device/setTBDeviceActionDTO';
import { TBDeviceEntity } from '../../library/thingsboardConnecter/mqtt';
import WinstonLogger, { simpleMsg } from '../../helpers/loggers';
import GetAllDeviceActionDTO from '../../interface/serviceResponse/device/getAllDeviceActionDTO';

const loggers = new WinstonLogger({ type: 'Device service' });

const allDelay = 0.1;
const sendDataDelay = 1;
const availableActions: Actions[] = ['sendData', 'subscribeRPC'];
const map: Map<string, TBDeviceEntity> = new Map();

function checkHistoryActionIsRepeat(newAction: Actions[] | undefined, oldAction: Actions[] | undefined, target: Actions) {
    if (newAction && oldAction) {
        const a = newAction.findIndex((i) => i === target);
        const b = oldAction.findIndex((i) => i === target);
        if (a > -1 && b > -1) return true;
    }
    return false;
}

async function setClientAction(client: TBDeviceEntity, action: Actions[]) {
    for (let i = 0; i < action.length; i += 1) {
        if (action[i] === availableActions[0]) {
            await client.setMQTTClientSendData();
        }
        if (action[i] === availableActions[1]) {
            await client.subscribeRPCTopic();
        }
    }
}

export async function setDeviceAction(deviceList: Devices) {
    for (let i = 0; i < deviceList.length; i += 1) {
        const { action, id, name } = deviceList[i];
        const findClient = map.get(id);
        if (findClient) {
            simpleMsg(`device "${name}" has been exist, try to overwrite action`);
            await delay(allDelay);

            // 避免反覆的解除訂閱造成無法正常接收RPC的訊息
            // 若上次的行為有subscribeRPC，則重置subscribeRPC以外的行為
            if (checkHistoryActionIsRepeat(action, findClient.getAction(), 'subscribeRPC')) {
                await findClient.stopMQTTClientSendData();
                if (action) {
                    await setClientAction(
                        findClient,
                        action.filter((a) => a !== 'subscribeRPC')
                    );
                }
            } else {
                // reset client action
                await findClient.stopMQTTClientSendData();
                await findClient.unsubscribeRPCTopic();
                // set client action
                if (action) await setClientAction(findClient, action);
            }

            findClient.updateAction(action);
        } else {
            // init mqtt client
            await delay(allDelay);
            const client = new TBDeviceEntity(deviceList[i], sendDataDelay);

            map.set(id, client);
            if (action) await setClientAction(client, action);
        }
    }
}

export function getAllDeviceAction() {
    const array: Array<{
        name: string;
        action?: Array<string>;
    }> = [];

    map.forEach((value) => {
        const { name, action } = value.getInfos();
        array.push({
            name,
            action,
        });
    });

    const DTO = new GetAllDeviceActionDTO(array);
    loggers.debug({ DTO }, 'Get all devices action');
    return DTO;
}

// export async function stopDeviceAction(deviceList: Devices) {

// }

// export async function disconnectDevice(deviceList: Devices) {

// }
