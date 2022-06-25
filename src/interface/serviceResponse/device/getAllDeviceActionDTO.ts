import { convertTimeToString, handleTestTime } from '../../../helpers/utility';

type Devices = Array<{
  name: string;
  type: string;
  canFindMockDataEntity: boolean;
  totalSendTimes: number;
  sendTimes: number;
  createTime: number;
  startTime: number;
  lastSendTime: number;
  testTime: string;
  action?: Array<string>;
  sendDataFrequency: number;
}>;

export default class GetAllDeviceActionDTO {
  devices: Devices;

  constructor(data: any) {
    if (Array.isArray(data)) {
      this.devices = data.map((d) => ({
        id: d.id,
        name: d.name,
        type: d.type,
        action: d.action,
        totalSendTimes: d.historySendTimes,
        sendTimes: d.sendTimes,
        createTime: d.createTime,
        startTime: d.startTime,
        lastSendTime: d.endTime,
        testTime: convertTimeToString(handleTestTime(d.startTime, d.endTime)),
        canFindMockDataEntity: d.canMapMockDataEntity,
        sendDataFrequency: d.sendDataFrequency,
      }));
    } else {
      this.devices = [];
    }
  }
}
