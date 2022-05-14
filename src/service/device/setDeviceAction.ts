/* eslint-disable no-await-in-loop */
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

function checkCanGetDataEntity(client: TBDeviceEntity) {
  loggers.debug(client.getInfos());
  return client.getCanMapMockDataEntity();
}

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

export async function setDevicesAction(deviceList: Devices) {
  for (let i = 0; i < deviceList.length; i += 1) {
    const { action = [], id, name } = deviceList[i];
    const findClient = map.get(id);
    let copyAction = [...action];
    if (findClient) {
      simpleMsg(`device "${name}" has been exist, try to overwrite action`);
      await delay(allDelay);
      findClient.updateSendDataFlag();
      if (checkCanGetDataEntity(findClient) === false) {
        copyAction = copyAction.filter((v) => v !== 'sendData');
      }

      // 避免反覆的解除訂閱造成無法正常接收RPC的訊息
      // 若上次的行為有subscribeRPC，則重置subscribeRPC以外的行為
      if (checkHistoryActionIsRepeat(copyAction, findClient.getAction(), 'subscribeRPC')) {
        await findClient.stopMQTTClientSendData();
        await setClientAction(
          findClient,
          copyAction.filter((a) => a !== 'subscribeRPC')
        );
      } else {
        // reset client action
        await findClient.stopMQTTClientSendData();
        await findClient.unsubscribeRPCTopic();
        // set client action
        await setClientAction(findClient, copyAction);
      }

      findClient.updateAction(copyAction);
    } else {
      // init mqtt client
      await delay(allDelay);
      const client = new TBDeviceEntity(deviceList[i], sendDataDelay);
      client.updateSendDataFlag();
      if (checkCanGetDataEntity(client) === false) {
        copyAction = copyAction.filter((v) => v !== 'sendData');
      }

      map.set(id, client);
      await setClientAction(client, copyAction);
      client.updateAction(copyAction);
    }
  }
}

export function getAllDeviceAction() {
  const array: any[] = [];
  map.forEach((value) => {
    const v = value.getInfos();
    array.push(v);
  });

  const DTO = new GetAllDeviceActionDTO(array);
  loggers.debug({ DTO }, 'Get all devices action');
  return DTO;
}

export function stopDeviceAction(deviceIdList: string[], action: Actions) {
  deviceIdList.forEach((id) => {
    const deviceEntity = map.get(id);
    if (!deviceEntity) loggers.warning(`device id: ${id} not found`);
    else {
      if (action === 'sendData') deviceEntity.stopMQTTClientSendData();
      if (action === 'subscribeRPC') deviceEntity.unsubscribeRPCTopic();
    }
  });
}

// export async function disconnectDevice(deviceList: Devices) {

// }
