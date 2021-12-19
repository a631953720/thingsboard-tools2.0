import express from 'express';
import { createDevicesValidator } from '../middleware/deviceValidator.middleware';
import { createTBDevices } from '../controller/TBDevice.controller';
import getTenantToken from '../middleware/getTenantToken.middleware';

const router = express.Router();

router.use(getTenantToken);
router.use('/create', createDevicesValidator);

router.get('/test', (req, res) => {
    res.status(200).send('success');
});
router.post('/create', createTBDevices);

export default router;
