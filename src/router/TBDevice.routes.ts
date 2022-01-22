import express from 'express';
import { createDevicesValidator } from '../middleware/deviceValidator.middleware';
import { createTBDevices, deleteTBDevices } from '../controller/TBDevice.controller';
import getTenantToken from '../middleware/getTenantToken.middleware';

const router = express.Router();

router.use(getTenantToken);
router.use('/create', createDevicesValidator);

router.get('/test', (req, res) => {
    res.status(200).send('success');
});
router.post('/create', createTBDevices);
router.delete('/delete', deleteTBDevices);

export default router;
