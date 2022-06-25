/* eslint-disable no-await-in-loop */
import { Actions, Device, Devices } from '../../interface/serviceRequest/device/setTBDeviceActionDTO';
import { TBDeviceEntity } from '../../library/thingsboardConnecter/mqtt';
import WinstonLogger from '../../helpers/loggers';
import GetAllDeviceActionDTO from '../../interface/serviceResponse/device/getAllDeviceActionDTO';
import { entityFind } from '../../library/thingsboardConnecter/entityQuery';
import { buildSetDevicesActionDTO, checkEntityFunctionBuilder, deviceActionBuilder } from './utils';

const loggers = new WinstonLogger({ type: 'Device service' });
const map: Map<string, TBDeviceEntity> = new Map();

export async function setDevicesAction(tenantToken: string, deviceList: Devices) {
  const errorDeviceResult: Array<Device> = [];
  // query TB entity list
  const { errorMessage, entityIdList } = await entityFind(tenantToken, {
    entityType: 'DEVICE',
    entityList: deviceList.map((d) => d.id),
    pageLink: { page: 0, pageSize: 1024 },
    entityFields: ['name'],
    latestValues: [],
  });

  // 檢查是否有錯誤，並建立對照表做檢查
  if (errorMessage) return buildSetDevicesActionDTO({ status: 500, errorMessage: 'entityFind error' });
  const entityMapping: Record<string, boolean> = {};
  entityIdList.forEach((entity) => {
    entityMapping[entity] = false;
  });
  const checkEntity = checkEntityFunctionBuilder(entityMapping);

  // set device action likes send data or subscribe RPC
  for (let i = 0; i < deviceList.length; i += 1) {
    const { id } = deviceList[i];

    const { isFind, haveBeenUsed } = checkEntity(id);
    // 如果device不存在就記錄下來，且忽略已經處理過的device
    if (!isFind) errorDeviceResult.push(deviceList[i]);
    if (isFind && !haveBeenUsed) {
      await deviceActionBuilder(deviceList[i], map);
    }
  }
  if (errorDeviceResult.length > 0) {
    loggers.warning({ errorDeviceList: errorDeviceResult.map((v) => v.name) }, 'errorDeviceResult length > 0');
  }
  return buildSetDevicesActionDTO({ status: 200, errorMessage: '', errorDeviceResult });
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
