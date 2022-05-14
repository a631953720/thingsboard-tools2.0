import { Actions } from './setTBDeviceActionDTO';

interface Request {
  deviceIds: string[];
  action?: Actions;
}

export default class StopTBDeviceActionDTO implements Request {
  deviceIds: string[];

  action?: Actions;

  constructor(props: any) {
    this.deviceIds = props.deviceList;
    this.action = props.action;
  }
}
