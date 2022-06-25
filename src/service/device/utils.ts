/* eslint-disable no-await-in-loop */
import { delay } from '../../helpers/utility';
import { Actions, Device } from '../../interface/serviceRequest/device/setTBDeviceActionDTO';
import { TBDeviceEntity } from '../../library/thingsboardConnecter/mqtt';
import WinstonLogger, { simpleMsg } from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'Device service' });

const allDelay = 0.1;
const defaultSendDataDelay = 10;
const availableActions: Actions[] = ['sendData', 'subscribeRPC'];

// device action
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

export function checkEntityFunctionBuilder(entityMapping: Record<string, boolean>) {
  return (deviceId: string) => {
    const res = {
      isFind: false,
      haveBeenUsed: false,
    };
    const findEntity = entityMapping[deviceId];
    // entityMapping is string boolean map
    if (typeof findEntity === 'boolean') {
      res.isFind = true;
      res.haveBeenUsed = findEntity;
      return res;
    }
    return res;
  };
}

export async function deviceActionBuilder(device: Device, map: Map<string, TBDeviceEntity>) {
  const { action = [], id, name } = device;
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
    const client = new TBDeviceEntity(device, defaultSendDataDelay);
    client.updateSendDataFlag();
    if (checkCanGetDataEntity(client) === false) {
      copyAction = copyAction.filter((v) => v !== 'sendData');
    }

    map.set(id, client);
    await setClientAction(client, copyAction);
    client.updateAction(copyAction);
  }
}

type SetDevicesActionDTO = {
  status: number;
  errorMessage?: any;
  errorDeviceResult?: any;
};

export function buildSetDevicesActionDTO(data: any): SetDevicesActionDTO {
  return {
    status: data.status,
    errorMessage: data.errorMessage,
    errorDeviceResult: data.errorDeviceResult,
  };
}

type SetDevicesActionFrequencyDTO = {
  status: number;
  errorMessage?: any;
  errorDeviceResult?: any;
};

export function buildSetDevicesActionFrequencyDTO(data: any): SetDevicesActionFrequencyDTO {
  return {
    status: data.status,
    errorMessage: data.errorMessage,
    errorDeviceResult: data.errorDeviceResult,
  };
}

// device action
