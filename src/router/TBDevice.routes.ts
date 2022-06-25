import express from 'express';
import {
  createDevicesValidator,
  deleteDevicesValidator,
  setDevicesActionValidator,
  setTBDeviceFrequencyValidator,
  upsertMockDataEntityValidator,
} from '../middleware/deviceValidator.middleware';
import {
  createTBDevices,
  deleteTBDevices,
  getMockDataList,
  getTBDevices,
  createMockData,
  updateMockData,
  deleteMockData,
  setTBDeviceAction,
  getTBDeviceAction,
  stopTBDeviceAction,
  setTBDeviceFrequency,
} from '../controller/TBDevice.controller';
import getTenantToken from '../middleware/getTenantToken.middleware';

const router = express.Router();

router.use(getTenantToken);
router.use('/create', createDevicesValidator);
router.use('/delete', deleteDevicesValidator);
router.use('/action/update', setDevicesActionValidator);
router.use('/data/setting/create', upsertMockDataEntityValidator);
router.use('/data/setting/update', upsertMockDataEntityValidator);
router.post('/action/frequency', setTBDeviceFrequencyValidator);

router.get('/test', (_req, res) => {
  res.status(200).send('success');
});

router.get('/list', getTBDevices);
router.post('/create', createTBDevices);
router.delete('/delete', deleteTBDevices);
router.get('/action/list', getTBDeviceAction);
router.post('/action/update', setTBDeviceAction);
router.post('/action/frequency', setTBDeviceFrequency);

router.get('/data/setting/list', getMockDataList);
router.post('/data/setting/create', createMockData);
router.post('/data/setting/update', updateMockData);
router.delete('/data/setting/delete/:name', deleteMockData);

router.post('/action/stop', stopTBDeviceAction);

export default router;
