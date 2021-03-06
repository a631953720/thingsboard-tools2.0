/* eslint-disable no-await-in-loop */
import { createTBDevice } from '../../library/thingsboardConnecter/device';
import { TB_DEVICE } from '../../constants/env';
import checkStatusError from '../../helpers/checkStatusError';
import WinstonLogger from '../../helpers/loggers';
import { DeviceInfo, DeviceProfile } from '../../interface/thingsboardConnector/device/TBDeviceInterface';
import CreateDevicesDTO from '../../interface/serviceResponse/device/createDevicesDTO';
import getTBDeviceToken from '../../library/thingsboardConnecter/device/getDeviceToken';

const loggers = new WinstonLogger({ type: 'Device service' });

export default async function createDevices(tenantToken: string, count?: number, customProfile?: DeviceProfile) {
  const deviceCount = count || TB_DEVICE.deviceCount;
  const deviceArr: DeviceInfo[] = [];
  let deviceProfile: DeviceProfile;
  if (customProfile?.name) {
    deviceProfile = {
      ...customProfile,
    };
  } else {
    deviceProfile = {
      name: TB_DEVICE.deviceName,
      type: TB_DEVICE.deviceType,
      label: TB_DEVICE.deviceLabel,
    };
  }
  loggers.debug({ deviceProfile }, 'Create devices profile ');
  for (let i = 0; i < deviceCount; i += 1) {
    const profile = {
      ...deviceProfile,
      name: `${deviceProfile.name}-${i}`,
    };
    const res = await createTBDevice(tenantToken, profile);
    if (checkStatusError(res)) return new CreateDevicesDTO(res);
    const deviceToken = await getTBDeviceToken(tenantToken, res.id.id);
    if (checkStatusError(deviceToken)) return new CreateDevicesDTO(deviceToken);
    deviceArr.push({
      id: res.id.id,
      name: res.name,
      type: res.type,
      label: res.label || '',
      token: deviceToken.credentialsId,
    });
  }
  const DTO = new CreateDevicesDTO({
    status: 201,
    list: deviceArr,
  });
  loggers.debug({ DTO }, 'Create devices to TB');
  return DTO;
}
