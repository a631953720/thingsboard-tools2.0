import express from 'express';
import { simpleMsg } from '../../helpers/loggers';
import { getOrCreateNewTenantToGetToken } from '../../controller/user';
import checkStatusError from '../../helpers/checkStatusError';

const router = express.Router();

router.get('/test', (req, res) => {
    simpleMsg(req);
    res.json('echo');
});

router.get('/getTenantToken', async (req, res) => {
    simpleMsg(req);
    const test = await getOrCreateNewTenantToGetToken();
    if (checkStatusError(test)) {
        res.status(test.status).json(test);
    }
    res.status(test.status).json(test.data);
});

export default router;
