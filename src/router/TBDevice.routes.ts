import express from 'express';
import {
  createDevicesValidator,
  deleteDevicesValidator,
  setDevicesActionValidator,
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
} from '../controller/TBDevice.controller';
import getTenantToken from '../middleware/getTenantToken.middleware';

const router = express.Router();

router.use(getTenantToken);
router.use('/create', createDevicesValidator);
router.use('/delete', deleteDevicesValidator);
router.use('/action/update', setDevicesActionValidator);
router.use('/data/setting/create', upsertMockDataEntityValidator);
router.use('/data/setting/update', upsertMockDataEntityValidator);

router.get('/test', (req, res) => {
  res.status(200).send('success');
});

router.get('/list', getTBDevices);
router.post('/create', createTBDevices);
router.delete('/delete', deleteTBDevices);
router.get('/action/list', getTBDeviceAction);
router.post('/action/update', setTBDeviceAction);

router.get('/data/setting/list', getMockDataList);
router.post('/data/setting/create', createMockData);
router.post('/data/setting/update', updateMockData);
router.delete('/data/setting/delete/:name', deleteMockData);

router.post('/action/stop', (req, res) => {
  res.status(200).send('API 開發中');
});

export default router;
