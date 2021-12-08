import express from 'express';
import { getOrCreateNewTenantToGetToken, getTenantTokenByTenantId } from '../../controller/user';

const router = express.Router();

router.get('/test', (req, res) => {
    res.json('echo');
});

// 若tenant或是tenant admin不存在會自動create
router.post('/getOrCreateNewTenantToGetToken', getOrCreateNewTenantToGetToken);

// 會自動登入systemAdmin，單純只靠tenant id取得token
router.get('/getTenantTokenByTenantId/:tenantId', getTenantTokenByTenantId);

export default router;
