import { Actions } from './setTBDeviceActionDTO';

interface StopTBDeviceActionReq {
  [deviceId: string]: {
    action: Actions[];
  };
}

export default class StopTBDeviceActionDTO implements StopTBDeviceActionReq {}
