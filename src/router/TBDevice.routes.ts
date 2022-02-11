import express from 'express';
import { createDevicesValidator, deleteDevicesValidator } from '../middleware/deviceValidator.middleware';
import { createTBDevices, deleteTBDevices, getTBDevices } from '../controller/TBDevice.controller';
import getTenantToken from '../middleware/getTenantToken.middleware';

const router = express.Router();

router.use(getTenantToken);
router.use('/create', createDevicesValidator);
router.use('/delete', deleteDevicesValidator);

router.get('/test', (req, res) => {
    res.status(200).send('success');
});

router.get('/list', getTBDevices);
router.post('/create', createTBDevices);
router.delete('/delete', deleteTBDevices);

router.post('/action', (req, res) => {
    res.status(200).send('API 開發中');
});

export default router;
