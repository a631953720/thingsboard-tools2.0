import express from 'express';
import { simpleMsg } from '../../helpers/loggers';
import { getOrCreateNewTenantToGetToken } from '../../controller/user';

const router = express.Router();

router.get('/test', (req, res) => {
    simpleMsg(req);
    res.json('echo');
});

router.get('/getTenantToken', async (req, res) => {
    simpleMsg(req);
    const test = await getOrCreateNewTenantToGetToken();
    res.status(200).json(test);
});

export default router;
