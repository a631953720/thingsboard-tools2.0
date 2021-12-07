import express from 'express';
import { simpleMsg } from '../../helpers/loggers';
import {
    getOrCreateNewTenantToGetToken,
    getTenantTokenByTenantId,
} from '../../controller/user';
import checkStatusError from '../../helpers/checkStatusError';

const router = express.Router();

router.get('/test', (req, res) => {
    res.json('echo');
});

// 若tenant或是tenant admin不存在會自動create
router.post('/getOrCreateNewTenantToGetToken?autoCreate', async (req, res) => {
    const response = await getOrCreateNewTenantToGetToken();
    simpleMsg(`getOrCreateNewTenantToGetToken, status: ${response.status}`);
    if (checkStatusError(response)) {
        res.status(response.status).json(response);
    }
    res.status(response.status).json(response.data);
});

// 會自動登入systemAdmin，單純只靠tenant id取得token
router.get('/getTenantTokenByTenantId/:tenantId', async (req, res) => {
    const response = await getTenantTokenByTenantId(req.params.tenantId);
    simpleMsg(`getTenantTokenByTenantId, status: ${response.status}`);
    if (checkStatusError(response)) {
        res.status(response.status).json(response);
    }
    res.status(response.status).json(response.data);
});

export default router;
