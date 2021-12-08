import express from 'express';
import { autoLoginTenantAccount } from '../../controller/userController';

const router = express.Router();

router.get('/test', (req, res) => {
    res.json('echo');
});

// 若tenant或是tenant admin不存在會自動create
router.get('/autoLoginTenant', autoLoginTenantAccount);

export default router;
