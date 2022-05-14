export type Actions = 'sendData' | 'subscribeRPC';

export const actionConfigs: Actions[] = ['sendData', 'subscribeRPC'];

export type Device = {
  id: string;
  name: string;
  token: string;
  type: string;
  action?: Array<Actions>;
};

export type Devices = Array<Device>;
interface SetTBDeviceActionReq {
  deviceList: Devices;
}

export default class SetTBDeviceActionReqDTO implements SetTBDeviceActionReq {
  deviceList: Devices;

  constructor(data: any) {
    this.deviceList = data.deviceList;
  }
}
