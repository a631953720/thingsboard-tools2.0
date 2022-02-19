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
    getMockDataEntity,
    getTBDevices,
    setMockDataEntity,
    setTBDeviceAction,
} from '../controller/TBDevice.controller';
import getTenantToken from '../middleware/getTenantToken.middleware';

const router = express.Router();

router.use(getTenantToken);
router.use('/create', createDevicesValidator);
router.use('/delete', deleteDevicesValidator);
router.use('/action', setDevicesActionValidator);
router.use('/data/setting/create', upsertMockDataEntityValidator);

router.get('/test', (req, res) => {
    res.status(200).send('success');
});

router.get('/list', getTBDevices);
router.post('/create', createTBDevices);
router.delete('/delete', deleteTBDevices);
router.post('/action', setTBDeviceAction);

router.get('/data/setting/list', getMockDataEntity);
router.post('/data/setting/create', setMockDataEntity);

router.post('/action/stop', (req, res) => {
    res.status(200).send('API 開發中');
});

export default router;
