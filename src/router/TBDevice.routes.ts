import express from 'express';
import { createDevicesValidator } from '../middleware/deviceValidator.middleware';
import { createTBDevices } from '../controller/TBDevice.controller';

const router = express.Router();

router.use('/create', createDevicesValidator);

router.get('/test/:deviceCount', (req, res) => {
    res.status(200).send('success');
});
router.post('/create', createTBDevices);

export default router;
