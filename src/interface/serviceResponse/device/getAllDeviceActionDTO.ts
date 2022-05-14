type Devices = Array<{
  name: string;
  type: string;
  canFindMockDataEntity: boolean;
  historySendTimes: number;
  sendTimes: number;
  createTime: number;
  startTime: number;
  endTime: number;
  testTime: string;
  action?: Array<string>;
}>;

export default class GetAllDeviceActionDTO {
  devices: Devices;

  constructor(data: any) {
    if (Array.isArray(data)) {
      this.devices = data.map((d) => ({
        name: d.name,
        type: d.type,
        action: d.action,
        historySendTimes: d.historySendTimes,
        sendTimes: d.sendTimes,
        createTime: d.createTime,
        startTime: d.startTime,
        endTime: d.endTime,
        testTime: `${(d.endTime - d.startTime) / 1000} s`,
        canFindMockDataEntity: d.canMapMockDataEntity,
      }));
    } else {
      this.devices = [];
    }
  }
}
